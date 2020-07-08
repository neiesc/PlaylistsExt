(function () {
  window.addEventListener("load", () => {
    document.querySelectorAll(".has-tooltip").forEach((div) => {
      if (div.title) {
        div.innerHTML += '<div class="is-tooltip">' + div.title + "</div>";
        div.title = "";
      }

      if (div.dataset.img) {
        div.innerHTML += `<div style="width:${div.dataset.imgWidth}px" class="is-tooltip"><img src="${div.dataset.img}" /></div>`;
        div.dataset.img = "";
      }
    });
  });
})();
