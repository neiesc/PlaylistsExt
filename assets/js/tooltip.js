(function () {
  window.addEventListener("load", () => {
    document.querySelectorAll(".has-tooltip").forEach((div) => {
      div.innerHTML += '<div class="is-tooltip">' + div.title + "</div>";
      div.title = "";
    });
  });
})();
