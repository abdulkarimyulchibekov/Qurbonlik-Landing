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