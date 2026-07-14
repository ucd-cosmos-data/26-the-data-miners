(function () {
  var cursor = document.querySelector(".mine-cursor");
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  var finePointer = window.matchMedia("(pointer: fine)");
  var cursorX = -100;
  var cursorY = -100;
  var targetX = -100;
  var targetY = -100;

  function isEnabled() {
    return cursor && finePointer.matches && !reduceMotion.matches;
  }

  function moveCursor() {
    if (!isEnabled()) {
      document.body.classList.remove("mine-cursor-enabled");
      return;
    }

    cursorX += (targetX - cursorX) * 0.2;
    cursorY += (targetY - cursorY) * 0.2;
    cursor.style.transform = "translate3d(" + (cursorX - 14) + "px, " + (cursorY - 14) + "px, 0)";
    window.requestAnimationFrame(moveCursor);
  }

  if (!isEnabled()) {
    return;
  }

  document.body.classList.add("mine-cursor-enabled");

  window.addEventListener("mousemove", function (event) {
    targetX = event.clientX;
    targetY = event.clientY;
  }, { passive: true });

  window.addEventListener("mousedown", function () {
    cursor.classList.add("is-pressing");
  });

  window.addEventListener("mouseup", function () {
    window.setTimeout(function () {
      cursor.classList.remove("is-pressing");
    }, 160);
  });

  document.addEventListener("mouseover", function (event) {
    if (event.target.closest("a, button, input, select, textarea, [role='button']")) {
      cursor.classList.add("is-hovering");
    }
  });

  document.addEventListener("mouseout", function (event) {
    if (event.target.closest("a, button, input, select, textarea, [role='button']")) {
      cursor.classList.remove("is-hovering");
    }
  });

  window.requestAnimationFrame(moveCursor);
}());
