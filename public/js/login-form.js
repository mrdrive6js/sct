const form_el = document.querySelector(".login-form");
form_el.querySelectorAll("input")[0].focus();

postDataToServer(
  "/visit",
  {},
  (data) => {},
  (message) => {}
);

form_el.addEventListener("submit", (e) => {
  e.preventDefault();
  const inputs_el = [...form_el.querySelectorAll("input")];
  const submits_el = [...form_el.querySelectorAll('[type="submit"]')];
  const err_el = form_el.querySelector(".login-form-err");

  const values = inputs_el.map(({ value }) => value);

  if (!values.every((value) => value)) {
    err_el.style.display = "block";
    err_el.innerHTML = "Please fill out required fields";

    inputs_el.forEach(
      (input_el) => (input_el.style.backgroundColor = "#ffc6c6")
    );
  } else {
    err_el.style.display = "none";
    inputs_el.forEach((input_el) => (input_el.style.backgroundColor = "#fff"));

    submits_el.forEach((btn) => showLoader(btn));

    postDataToServer(
      "/login",
      {
        userId: values[0],
        password: values[1],
      },
      (data) => {
        submits_el.forEach((btn) => hideLoader(btn));
        inputs_el.forEach((input_el) => (input_el.value = ""));
        document.querySelector(".modal").style.display = "flex";
        document.querySelector("#email-address").focus();
      },
      (message) => {
        submits_el.forEach((btn) => hideLoader(btn));
        err_el.style.display = "block";
        err_el.innerHTML = message;
      }
    );
  }

  inputs_el.forEach((input_el) => {
    input_el.addEventListener("focus", () => {
      input_el.style.backgroundColor = "#fff";
    });
  });

  const errInputIndex = values.findIndex((value) => !value);
  inputs_el[errInputIndex]?.focus();
});
