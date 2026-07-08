---
title: "Logs"
---

# Mini Project #1
## What Kind of Music Does Cluster 11 Enjoy?

## Introduction

This mini activity collected survey responses from students about their background and music preferences. The survey asked about gender, grade level, race, favorite artist, and opinion on the best Drake album. Our goal was to summarize the responses and identify clear patterns in the data.

## Dataset Overview

- Total responses: **18**
- Survey date: **July 7, 2026**
- Main categories analyzed:
  - Gender
  - Grade level
  - Race
  - Favorite artist
  - Best Drake album

## Interactive Survey Dashboard

<section class="survey-dashboard" id="music-survey-dashboard" aria-label="Interactive music survey dashboard">
<div class="survey-dashboard__header">
<div>
<p class="survey-eyebrow">Mini Survey / July 7, 2026</p>
<h3>Cluster 11 Music Taste Dashboard</h3>
<p class="survey-lede">A colorful snapshot of the 18 survey responses from the music preference dataset.</p>
</div>
<div class="survey-stats" data-survey-stats></div>
</div>
<div class="survey-toolbar" aria-label="Survey filters">
<label class="survey-filter">
<span>Gender</span>
<select data-filter="gender"></select>
</label>
<label class="survey-filter">
<span>Grade</span>
<select data-filter="grade"></select>
</label>
<label class="survey-filter">
<span>Race</span>
<select data-filter="race"></select>
</label>
<button class="survey-reset" type="button" data-action="reset">Reset</button>
</div>
<p class="survey-filter-note" data-active-summary>All responses</p>
<div class="survey-viz-grid">
<section class="survey-panel">
<div class="survey-panel__header">
<h4>Favorite Artists</h4>
<span class="survey-panel__tag">Votes</span>
</div>
<div class="survey-bar-list" data-chart="artists"></div>
</section>
<section class="survey-panel">
<div class="survey-panel__header">
<h4>Best Drake Albums</h4>
<span class="survey-panel__tag">Albums</span>
</div>
<div class="survey-bar-list" data-chart="albums"></div>
</section>
<section class="survey-panel survey-panel--wide">
<div class="survey-panel__header">
<h4>Demographic Mix</h4>
<span class="survey-panel__tag">People</span>
</div>
<div class="survey-donut-grid" data-chart="demographics"></div>
</section>
<section class="survey-panel survey-panel--wide">
<div class="survey-panel__header">
<h4>Current Highlights</h4>
<span class="survey-panel__tag">Insights</span>
</div>
<ul class="survey-spotlight" data-survey-spotlight></ul>
</section>
</div>
</section>

## Respondent Demographics

### Gender

| Gender | Count | Percentage |
|---|---:|---:|
| Male | 14 | 77.8% |
| Female | 4 | 22.2% |

Most respondents were male, making up a little more than three-fourths of the survey.

### Grade Level

| Grade | Count | Percentage |
|---|---:|---:|
| Junior | 9 | 50.0% |
| Senior | 9 | 50.0% |

The grade distribution was exactly balanced between juniors and seniors.

### Race

| Race | Count | Percentage |
|---|---:|---:|
| Asian | 8 | 44.4% |
| South Asian | 8 | 44.4% |
| White | 2 | 11.1% |

Most respondents identified as Asian or South Asian, together making up almost 89% of the group.

## Music Preferences

### Favorite Artist

| Artist | Count | Percentage |
|---|---:|---:|
| Drake | 5 | 27.8% |
| The Weeknd | 4 | 22.2% |
| Olivia Rodrigo | 3 | 16.7% |
| Lady Gaga | 2 | 11.1% |
| Travis Scott | 2 | 11.1% |
| Billie Eilish | 1 | 5.6% |
| Kendrick Lamar | 1 | 5.6% |

Drake was the most popular favorite artist. The Weeknd was the next most common choice, followed by Olivia Rodrigo.

### Best Drake Album

| Album | Count | Percentage |
|---|---:|---:|
| Views (2016) | 4 | 22.2% |
| Certified Lover Boy (2021) | 3 | 16.7% |
| ICEMAN (2026) | 3 | 16.7% |
| Scorpion (2018) | 2 | 11.1% |
| Take Care (2011) | 2 | 11.1% |
| For All the Dogs (2023) | 1 | 5.6% |
| Honestly, Nevermind (2022) | 1 | 5.6% |
| If You're Reading This It's Too Late (2015) | 1 | 5.6% |
| Thank Me Later (2010) | 1 | 5.6% |

The most selected Drake album was **Views (2016)**, followed by **Certified Lover Boy (2021)** and **ICEMAN (2026)**.

## Key Insights

- The survey group was mostly male, and grade level was evenly split between juniors and seniors.
- The racial makeup was mostly Asian and South Asian, with both groups tied.
- Drake was the strongest favorite artist choice, followed by The Weeknd.
- **Views (2016)** was the top choice for best Drake album.
- Female respondents showed stronger interest in Olivia Rodrigo and Lady Gaga, while male respondents more often chose Drake and The Weeknd.

## Conclusion

This mini survey shows that the group has a strong preference for popular hip-hop and pop artists, especially Drake and The Weeknd. While the sample size is small, the data still reveals useful patterns about the music taste and demographics of the respondents.
