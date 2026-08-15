const customSelect = document.getElementById("customSelect");
const selected = customSelect.querySelector(".select-selected");
const selectedText = document.getElementById("selectedText");
const options = customSelect.querySelectorAll(".option");
const hiddenInput = document.getElementById("typeInput");

// Open / close
selected.addEventListener("click", () => {
  customSelect.classList.toggle("open");
  selected.classList.toggle("active");
});

// Select option
options.forEach(option => {
  option.addEventListener("click", () => {
    selectedText.textContent = option.textContent;
    hiddenInput.value = option.dataset.value;
    
    customSelect.classList.remove("open");
    selected.classList.remove("active");
  });
});

// Close when clicking outside
document.addEventListener("click", (e) => {
  if (!customSelect.contains(e.target)) {
    customSelect.classList.remove("open");
    selected.classList.remove("active");
  }
});

const form = document.querySelector(".hero__form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  
  const name = document.querySelector(".form__name").value.trim();
  const phone = document.querySelector(".form__phone").value.trim();
  const type = document.getElementById("typeInput").value;
  
  // Check that the custom select has been selected
  if (!type) {
    alert("Iltimos, qurbonlik turini tanlang.");
    return;
  }
  
  const submitButton = document.querySelector(".form__submit");
  
  // Prevent double submissions
  submitButton.disabled = true;
  submitButton.textContent = "Yuborilmoqda...";
  
  try {
    
    const response = await fetch(
      "/.netlify/functions/lead",
      {
        method: "POST",
        
        headers: {
          "Content-Type": "application/json"
        },
        
        body: JSON.stringify({
          name: name,
          phone: phone,
          type: type
        })
      }
    );
    
    const result = await response.json();
    
    if (!response.ok) {
      throw new Error(result.error || "Server error");
    }
    
    console.log("Lead successfully sent:", result);
    
    document.getElementById("successPopup").classList.add("active");
    
    // Clear form
    form.reset();
    
    // Reset custom select
    selectedText.textContent = "Qurbonlik turini tanlang:";
    hiddenInput.value = "";
    
  } catch (error) {
    
    console.error("Submission error:", error);
    
    alert(
      "Arizani yuborishda xatolik yuz berdi. Iltimos, qayta urinib ko'ring."
    );
    
  } finally {
    
    submitButton.disabled = false;
    submitButton.textContent = "Ariza qoldirish";
  }
});

const phoneInput = document.querySelector(".form__phone");

phoneInput.addEventListener("input", () => {
  // Keep only digits and +
  let value = phoneInput.value.replace(/[^\d+]/g, "");
  
  // Must start with +998
  if (!value.startsWith("+998")) {
    value = "+998";
  }
  
  // Keep +998 + maximum 9 digits
  value = "+998" + value.slice(4).replace(/\D/g, "").slice(0, 9);
  
  phoneInput.value = value;
});

const successPopup = document.getElementById("successPopup");
const successPopupClose = document.getElementById("successPopupClose");
const successPopupButton = document.getElementById("successPopupButton");

successPopupClose.addEventListener("click", () => {
  successPopup.classList.remove("active");
});

successPopupButton.addEventListener("click", () => {
  successPopup.classList.remove("active");
});

successPopup.addEventListener("click", (e) => {
  if (e.target === successPopup) {
    successPopup.classList.remove("active");
  }
});