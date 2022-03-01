console.log("In log register js");
const btn = document.getElementById("register-submit");
const form = document.querySelector("form");

const showError = (element) => {
  const errDiv = document.createElement("div");
  element.setAttribute("placeholder", "This field is required");
  element.parentElement.appendChild(errDiv);
  element.classList.add("error");
};

const clearError = (elementArr) => {
  for (let element of elementArr) {
    element.classList.remove("error");
  }
  return;
};

btn.addEventListener("click", (e) => {
  e.preventDefault();
  const inputArr = Array.from(document.querySelectorAll("input"));
  clearError(inputArr);
  for (let input of inputArr) {
    if (input.value === "") {
      return showError(input);
    }
  }

  return form.submit();
});
