(function () {
  function setupMiniProjectToggle() {
    const heading = Array.from(document.querySelectorAll("h1, h2")).find((item) => item.textContent.trim() === "Mini Project #1");
    if (!heading || heading.dataset.dropdownReady === "true") return;

    const panel = document.createElement("div");
    const panelId = "mini-project-1-content";
    panel.className = "mini-project-dropdown__content";
    panel.id = panelId;
    panel.hidden = true;

    let next = heading.nextElementSibling;
    while (next && next.tagName !== "H1") {
      const current = next;
      next = next.nextElementSibling;
      panel.append(current);
    }

    const button = document.createElement("button");
    button.type = "button";
    button.className = "mini-project-dropdown__button";
    button.setAttribute("aria-expanded", "false");
    button.setAttribute("aria-controls", panelId);
    button.innerHTML = `<span class="mini-project-dropdown__icon" aria-hidden="true"></span><span>${heading.textContent.trim()}</span>`;

    heading.textContent = "";
    heading.classList.add("mini-project-dropdown");
    heading.dataset.dropdownReady = "true";
    heading.append(button);
    heading.after(panel);

    button.addEventListener("click", () => {
      const isOpen = button.getAttribute("aria-expanded") === "true";
      button.setAttribute("aria-expanded", String(!isOpen));
      panel.hidden = isOpen;
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", setupMiniProjectToggle);
  } else {
    setupMiniProjectToggle();
  }

  const root = document.getElementById("music-survey-dashboard");
  if (!root) return;

  const script = document.currentScript || Array.from(document.scripts).find((item) => item.src.includes("music-survey.js"));
  const dataUrl = root.dataset.surveySrc || new URL("../data/music-survey.json", script ? script.src : window.location.href).href;
  const palette = ["#e63b7a", "#ffb000", "#00a88f", "#3d7eff", "#ff6b2f", "#7c4dff", "#26a65b", "#d048d5", "#0087a8", "#f05a28"];
  const state = {
    gender: "All",
    grade: "All",
    race: "All",
    artist: "All",
    album: "All",
  };
  const labels = {
    gender: "Gender",
    grade: "Grade",
    race: "Race",
    artist: "Artist",
    album: "Album",
  };
  const preferredOrder = {
    gender: ["Female", "Male"],
    grade: ["Junior", "Senior"],
    race: ["Asian", "South Asian", "White"],
  };
  const colorMap = new Map();
  let surveyRows = [];

  function colorFor(value) {
    if (!colorMap.has(value)) {
      colorMap.set(value, palette[colorMap.size % palette.length]);
    }
    return colorMap.get(value);
  }

  function sortValues(key, values) {
    const order = preferredOrder[key] || [];
    return values.sort((a, b) => {
      const aIndex = order.indexOf(a);
      const bIndex = order.indexOf(b);
      if (aIndex !== -1 || bIndex !== -1) {
        return (aIndex === -1 ? 999 : aIndex) - (bIndex === -1 ? 999 : bIndex);
      }
      return a.localeCompare(b);
    });
  }

  function countBy(rows, key) {
    return rows.reduce((counts, row) => {
      const value = row[key] || "Unknown";
      counts.set(value, (counts.get(value) || 0) + 1);
      return counts;
    }, new Map());
  }

  function sortedCounts(counts) {
    return Array.from(counts.entries()).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
  }

  function topCount(counts) {
    return sortedCounts(counts)[0] || ["None", 0];
  }

  function percent(count, total) {
    if (!total) return "0%";
    return `${((count / total) * 100).toFixed(1)}%`;
  }

  function matchesFilters(row) {
    return Object.entries(state).every(([key, value]) => value === "All" || row[key] === value);
  }

  function setLoading(message) {
    root.querySelector("[data-survey-stats]").innerHTML = `<p class="survey-empty">${message}</p>`;
  }

  function populateFilters() {
    root.querySelectorAll("[data-filter]").forEach((select) => {
      const key = select.dataset.filter;
      const values = sortValues(key, Array.from(new Set(surveyRows.map((row) => row[key]).filter(Boolean))));
      select.innerHTML = ["All", ...values].map((value) => `<option value="${value}">${value}</option>`).join("");
      select.value = state[key];
      select.addEventListener("change", () => {
        state[key] = select.value;
        render();
      });
    });

    surveyRows.forEach((row) => {
      Object.values(row).forEach((value) => colorFor(value));
    });
  }

  function renderStats(rows) {
    const total = rows.length;
    const [topArtist, topArtistCount] = topCount(countBy(rows, "artist"));
    const [topAlbum, topAlbumCount] = topCount(countBy(rows, "album"));
    const gradeCounts = sortedCounts(countBy(rows, "grade"));
    const gradeText = gradeCounts.length
      ? gradeCounts.map(([grade, count]) => `${grade}: ${count}`).join(" / ")
      : "No grade data";

    root.querySelector("[data-survey-stats]").innerHTML = [
      statCard("Responses", total, `${percent(total, surveyRows.length)} of dataset`),
      statCard("Top Artist", topArtist, `${topArtistCount} response${topArtistCount === 1 ? "" : "s"}`),
      statCard("Top Drake Album", topAlbum, `${topAlbumCount} vote${topAlbumCount === 1 ? "" : "s"}`),
      statCard("Grade Split", gradeText, total ? "Current selection" : "No matches"),
    ].join("");
  }

  function statCard(label, value, subtext) {
    return `
      <div class="survey-stat">
        <span class="survey-stat__label">${label}</span>
        <span class="survey-stat__value">${value}</span>
        <span class="survey-stat__sub">${subtext}</span>
      </div>
    `;
  }

  function renderBars(rows, key, selector) {
    const container = root.querySelector(selector);
    const entries = sortedCounts(countBy(rows, key));
    const max = Math.max(...entries.map((entry) => entry[1]), 1);
    container.textContent = "";

    if (!entries.length) {
      container.innerHTML = '<p class="survey-empty">No responses match this selection.</p>';
      return;
    }

    entries.forEach(([name, count]) => {
      const button = document.createElement("button");
      const isActive = state[key] === name;
      button.type = "button";
      button.className = `survey-bar${isActive ? " is-active" : ""}`;
      button.dataset.selectChart = key;
      button.dataset.value = name;
      button.setAttribute("aria-pressed", String(isActive));
      button.setAttribute("aria-label", `${labels[key]}: ${name}, ${count} responses`);
      button.style.setProperty("--bar-width", `${Math.max(8, (count / max) * 100)}%`);
      button.style.setProperty("--bar-color", colorFor(name));
      button.innerHTML = `
        <span class="survey-bar__label">${name}</span>
        <span class="survey-bar__track" aria-hidden="true"><span class="survey-bar__fill"></span></span>
        <span class="survey-bar__count">${count} <small>${percent(count, rows.length)}</small></span>
      `;
      container.append(button);
    });
  }

  function renderDonuts(rows) {
    const container = root.querySelector("[data-chart='demographics']");
    container.textContent = "";

    ["gender", "grade", "race"].forEach((key) => {
      const entries = sortedCounts(countBy(rows, key));
      const total = rows.length;
      let start = 0;
      const segments = entries.length
        ? entries.map(([name, count]) => {
            const end = start + (count / total) * 360;
            const segment = `${colorFor(name)} ${start.toFixed(2)}deg ${end.toFixed(2)}deg`;
            start = end;
            return segment;
          }).join(", ")
        : "#dce5ef 0deg 360deg";

      const block = document.createElement("div");
      block.className = "survey-donut";
      block.innerHTML = `
        <div class="survey-donut__top">
          <div class="survey-donut__ring" style="--segments: conic-gradient(${segments})"><span>${total}</span></div>
          <div>
            <h5>${labels[key]}</h5>
            <p class="survey-donut__summary">${entries.length ? `${entries.length} group${entries.length === 1 ? "" : "s"}` : "No matching data"}</p>
          </div>
        </div>
        <div class="survey-legend">
          ${entries.map(([name, count]) => `
            <div class="survey-legend__item">
              <span class="survey-legend__swatch" style="--swatch: ${colorFor(name)}"></span>
              <span>${name}</span>
              <strong>${count} (${percent(count, total)})</strong>
            </div>
          `).join("")}
        </div>
      `;
      container.append(block);
    });
  }

  function renderSpotlight(rows) {
    const container = root.querySelector("[data-survey-spotlight]");
    if (!rows.length) {
      container.innerHTML = '<li><strong>No matches</strong>Try another combination of filters.</li>';
      return;
    }

    const [topArtist, topArtistCount] = topCount(countBy(rows, "artist"));
    const [topAlbum, topAlbumCount] = topCount(countBy(rows, "album"));
    const gradeCounts = sortedCounts(countBy(rows, "grade"));
    const raceCounts = sortedCounts(countBy(rows, "race"));
    const gradeStory = gradeCounts.length > 1 && gradeCounts[0][1] === gradeCounts[1][1]
      ? `Juniors and seniors are tied at ${gradeCounts[0][1]} each.`
      : `${gradeCounts[0][0]} leads the current selection with ${gradeCounts[0][1]} response${gradeCounts[0][1] === 1 ? "" : "s"}.`;
    const raceStory = raceCounts.length > 1 && raceCounts[0][1] === raceCounts[1][1]
      ? `${raceCounts[0][0]} and ${raceCounts[1][0]} are tied at ${raceCounts[0][1]} each.`
      : `${raceCounts[0][0]} is the largest race group in this view.`;

    container.innerHTML = [
      `<li><strong>${topArtist}</strong>${topArtistCount} response${topArtistCount === 1 ? "" : "s"} chose this as their favorite artist.</li>`,
      `<li><strong>${topAlbum}</strong>${topAlbumCount} vote${topAlbumCount === 1 ? "" : "s"} put this Drake album on top.</li>`,
      `<li><strong>Demographic pulse</strong>${gradeStory} ${raceStory}</li>`,
    ].join("");
  }

  function renderFilterNote(rows) {
    const active = Object.entries(state)
      .filter(([, value]) => value !== "All")
      .map(([key, value]) => `${labels[key]}: ${value}`);
    const note = active.length ? active.join(" | ") : "All responses";
    root.querySelector("[data-active-summary]").textContent = `${note} - showing ${rows.length} of ${surveyRows.length}`;
  }

  function render() {
    const rows = surveyRows.filter(matchesFilters);
    root.querySelectorAll("[data-filter]").forEach((select) => {
      select.value = state[select.dataset.filter];
    });
    renderStats(rows);
    renderBars(rows, "artist", "[data-chart='artists']");
    renderBars(rows, "album", "[data-chart='albums']");
    renderDonuts(rows);
    renderSpotlight(rows);
    renderFilterNote(rows);
  }

  root.addEventListener("click", (event) => {
    const reset = event.target.closest("[data-action='reset']");
    if (reset) {
      Object.keys(state).forEach((key) => {
        state[key] = "All";
      });
      render();
      return;
    }

    const chartButton = event.target.closest("[data-select-chart]");
    if (!chartButton) return;
    const key = chartButton.dataset.selectChart;
    const value = chartButton.dataset.value;
    state[key] = state[key] === value ? "All" : value;
    render();
  });

  setLoading("Loading survey graphics...");
  fetch(dataUrl)
    .then((response) => {
      if (!response.ok) throw new Error(`Could not load ${dataUrl}`);
      return response.json();
    })
    .then((rows) => {
      surveyRows = rows;
      populateFilters();
      render();
    })
    .catch(() => {
      root.querySelector("[data-survey-stats]").innerHTML = '<p class="survey-error">The survey graphics could not load.</p>';
    });
})();
