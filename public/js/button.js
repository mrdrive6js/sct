const allBtn = document.querySelectorAll(".btn-mute");
allBtn.forEach(function (el) {
  el.setAttribute("tabindex", "-1");
});
