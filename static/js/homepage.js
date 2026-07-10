(function () {
  var home = document.querySelector(".mine-home");
  if (!home) {
    return;
  }

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  var finePointer = window.matchMedia("(pointer: fine)");
  var cursor = document.querySelector(".mine-cursor");
  var countLabel = document.querySelector("[data-diamond-count]");
  var cursorX = -100;
  var cursorY = -100;
  var targetX = -100;
  var targetY = -100;
  var count = 0;

  function enableCursor() {
    return cursor && finePointer.matches && !reduceMotion.matches;
  }

  function moveCursor() {
    if (!enableCursor()) {
      document.body.classList.remove("mine-cursor-enabled");
      return;
    }

    cursorX += (targetX - cursorX) * 0.2;
    cursorY += (targetY - cursorY) * 0.2;
    cursor.style.transform = "translate3d(" + (cursorX - 14) + "px, " + (cursorY - 14) + "px, 0)";
    requestAnimationFrame(moveCursor);
  }

  function burstSparkles(x, y) {
    if (reduceMotion.matches) {
      return;
    }

    for (var i = 0; i < 8; i += 1) {
      var sparkle = document.createElement("span");
      var angle = (Math.PI * 2 * i) / 8;
      var distance = 18 + Math.random() * 16;
      sparkle.className = "sparkle";
      sparkle.style.left = x + "px";
      sparkle.style.top = y + "px";
      sparkle.style.setProperty("--spark-x", Math.cos(angle) * distance + "px");
      sparkle.style.setProperty("--spark-y", Math.sin(angle) * distance + "px");
      document.body.appendChild(sparkle);
      window.setTimeout(function (node) {
        node.remove();
      }, 560, sparkle);
    }
  }

  if (enableCursor()) {
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
    requestAnimationFrame(moveCursor);
  }

  document.querySelectorAll("a, button, .diamond-ore").forEach(function (item) {
    item.addEventListener("mouseenter", function () {
      if (cursor) {
        cursor.classList.add("is-hovering");
      }
    });
    item.addEventListener("mouseleave", function () {
      if (cursor) {
        cursor.classList.remove("is-hovering");
      }
    });
  });

  var revealItems = Array.prototype.slice.call(document.querySelectorAll(".reveal-on-scroll"));
  if ("IntersectionObserver" in window && !reduceMotion.matches) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.26 });

    revealItems.forEach(function (item) {
      observer.observe(item);
    });
  } else {
    revealItems.forEach(function (item) {
      item.classList.add("is-visible");
    });
  }

  var parallaxItems = Array.prototype.slice.call(document.querySelectorAll("[data-parallax]"));
  var ticking = false;

  function updateParallax() {
    var scrollTop = window.scrollY || window.pageYOffset;
    var documentHeight = document.documentElement.scrollHeight - window.innerHeight;
    var progress = documentHeight > 0 ? scrollTop / documentHeight : 0;

    home.style.setProperty("--mine-progress", progress.toFixed(4));
    parallaxItems.forEach(function (item) {
      var depth = parseFloat(item.getAttribute("data-parallax")) || 0;
      item.style.transform = "translate3d(0, " + (scrollTop * depth) + "px, 0)";
    });
    ticking = false;
  }

  if (!reduceMotion.matches) {
    window.addEventListener("scroll", function () {
      if (!ticking) {
        window.requestAnimationFrame(updateParallax);
        ticking = true;
      }
    }, { passive: true });
    updateParallax();
  }

  document.querySelectorAll(".diamond-ore").forEach(function (ore) {
    ore.addEventListener("click", function (event) {
      if (ore.classList.contains("is-collected")) {
        return;
      }

      ore.classList.add("is-collected");
      count += 1;
      if (countLabel) {
        countLabel.textContent = String(count);
      }
      burstSparkles(event.clientX, event.clientY);
    });
  });
})();
