const hideLoader = (btn_el) => {
  btn_el.querySelector(".fa").classList.add("fa-chevron-right");
  btn_el.querySelector(".fa").innerHTML = "";
};

const showLoader = (btn_el) => {
  btn_el.querySelector(".fa").classList.remove("fa-chevron-right");
  btn_el.querySelector(".fa").innerHTML =
    "<img src='/__________img/spinner.gif' alt='loader' />";
};
