let translations = {};
let currentLanguage = "uz";
const languageSelect = document.getElementById("languageSelect");
const languageOptions = languageSelect.querySelectorAll(".language-option");
const languageSelected = languageSelect.querySelector(
  ".language-select__selected"
);

languageSelected.addEventListener("click", () => {
  languageSelect.classList.toggle("open");
});

async function loadTranslations() {
  const response = await fetch("../locales/translations.json");
  
  if (!response.ok) {
    throw new Error("Failed to load translations");
  }
  
  translations = await response.json();
  
  setLanguage(currentLanguage);
}

function setLanguage(language) {
  if (!translations[language]) {
    language = "uz";
  }
  
  document.documentElement.lang = language;
  
  document.querySelectorAll("[data-i18n]").forEach(element => {
    const key = element.dataset.i18n;
    
    if (translations[language][key]) {
      element.textContent = translations[language][key];
    }
  });
  
  document.querySelectorAll("[data-i18n-placeholder]").forEach(element => {
    const key = element.dataset.i18nPlaceholder;
    
    if (translations[language][key]) {
      element.placeholder = translations[language][key];
    }
  });
  
  currentLanguage = language;
}

loadTranslations().catch(error => {
  console.error("Translation error:", error);
});

languageOptions.forEach(option => {
  option.addEventListener("click", () => {
    const language = option.dataset.lang;
    
    setLanguage(language);
    
    currentLanguage.textContent = option.textContent;
    languageSelect.classList.remove("open");
  });
});