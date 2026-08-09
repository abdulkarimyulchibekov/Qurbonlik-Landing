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
    
    alert("Arizangiz muvaffaqiyatli yuborildi!");
    
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