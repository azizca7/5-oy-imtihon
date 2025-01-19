const kirishText = document.querySelector(".title-text .kirish");
const kirishForm = document.querySelector("form.kirish");
const royxatdanOtishForm = document.querySelector("form.royxatdan-otish");
const kirishBtn = document.querySelector("label.kirish");
const royxatdanOtishBtn = document.querySelector("label.royxatdan-otish");
const royxatdanOtishLink = document.querySelector("form .signup-link a");

function validate(email, password) {
  const emailTekshiruv = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  if (!emailTekshiruv.test(email)) {
    alert("Noto'g'ri email formati!");
    kirishForm.reset();
    royxatdanOtishForm.reset();
    return false;
  }

  if (password.length < 6) {
    alert("Parol kamida 6 ta belgidan iborat bo'lishi kerak!");
    return false;
  }

  return true;
}

royxatdanOtishBtn &&
  royxatdanOtishBtn.addEventListener("click", function (e) {
    e.preventDefault();

    kirishForm.style.marginLeft = "-50%";
    kirishText.style.marginLeft = "-50%";
    document.querySelector(".title-text .kirish").classList.remove("active");
    document
      .querySelector(".title-text .royxatdan-otish")
      .classList.add("active");
  });

kirishBtn &&
  kirishBtn.addEventListener("click", function (e) {
    e.preventDefault();

    kirishForm.style.marginLeft = "0%";
    kirishText.style.marginLeft = "0%";
    document
      .querySelector(".title-text .royxatdan-otish")
      .classList.remove("active");
    document.querySelector(".title-text .kirish").classList.add("active");
  });

royxatdanOtishLink &&
  royxatdanOtishLink.addEventListener("click", function (e) {
    e.preventDefault();
    royxatdanOtishBtn.click();
  });

kirishForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = document.querySelector("form.kirish input[type='text']").value;
  const password = document.querySelector(
    "form.kirish input[type='password']"
  ).value;

  const storedEmail = localStorage.getItem("email");
  const storedPassword = localStorage.getItem("password");

  if (validate(email, password)) {
    if (email === storedEmail && password === storedPassword) {
      window.location.href = "http://127.0.0.1:5500/pages/home.html";
    } else {
      alert("Noto'g'ri email yoki parol!");
    }
  }
});

royxatdanOtishForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = document.querySelector(
    "form.royxatdan-otish input[type='text']"
  ).value;
  const password = document.querySelector(
    "form.royxatdan-otish input[type='password']"
  ).value;

  if (validate(email, password)) {
    localStorage.setItem("email", email);
    localStorage.setItem("password", password);

    window.location.href = "http://127.0.0.1:5500/index.html";
  }
});
