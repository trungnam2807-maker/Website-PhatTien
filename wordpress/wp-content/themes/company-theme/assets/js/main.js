(function () {
  var modal = document.querySelector("[data-company-voucher-modal]");
  if (!modal) {
    return;
  }

  var triggerSelector = "[data-company-voucher-trigger]";
  var closeSelector = "[data-company-voucher-close]";

  function openModal() {
    modal.setAttribute("aria-hidden", "false");
    var firstInput = modal.querySelector("input,textarea,select");
    if (firstInput) {
      firstInput.focus();
    }
  }

  function closeModal() {
    modal.setAttribute("aria-hidden", "true");
  }

  document.querySelectorAll(triggerSelector).forEach(function (el) {
    el.addEventListener("click", openModal);
    el.addEventListener("keydown", function (evt) {
      if (evt.key === "Enter" || evt.key === " ") {
        evt.preventDefault();
        openModal();
      }
    });
  });

  modal.querySelectorAll(closeSelector).forEach(function (el) {
    el.addEventListener("click", closeModal);
  });

  modal.addEventListener("click", function (evt) {
    if (evt.target === modal) {
      closeModal();
    }
  });

  document.addEventListener("keydown", function (evt) {
    if (evt.key === "Escape" && modal.getAttribute("aria-hidden") === "false") {
      closeModal();
    }
  });
})();
