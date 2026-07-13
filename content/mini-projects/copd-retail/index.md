---
title: "Mini Project #2"
---

# Mini Project #2
## California COPD and Electronic Smoking Device Availability

## Introduction

This mini project compares two county-level California datasets: adult COPD prevalence from CDC PLACES and retail availability of electronic smoking devices. The goal is to map where COPD prevalence is higher and where electronic smoking devices were more available in stores, then compare whether the two patterns seem to move together.

## Dataset Overview

- Geographic unit: **58 California counties**
- COPD measure: **age-adjusted adult COPD prevalence, 2023**
- Retail measure: **percentage of surveyed retailers with electronic smoking devices available, 2016**
- Shared join key: **county FIPS code**

## Scatterplot

<figure id="copd-retail-scatterplot" class="disease-map-figure">
<iframe src="fig.html" title="Scatterplot comparing California county COPD prevalence and retail electronic smoking device availability" loading="lazy"></iframe>
<figcaption>Fig 3. County-level COPD prevalence compared with retail electronic smoking device availability.</figcaption>
</figure>

## LMplot

<figure>
<img src="fig_three.png" alt="Linear regression plot comparing California county COPD prevalence and retail electronic smoking device availability" style="display: block; width: 100%; height: auto;" loading="lazy">
<figcaption>Fig 4. Linear regression plot comparing county-level COPD prevalence with retail electronic smoking device availability.</figcaption>
</figure>

## Interactive Choropleth Maps

<section class="disease-map-dashboard" aria-label="California COPD and retail ESD choropleth maps">
<div class="disease-map-dashboard__header">
<div>
<p class="survey-eyebrow">Mini Project / County Maps</p>
<h3>COPD and Retail ESD Availability in California</h3>
<p class="survey-lede">Hover over each county to see its FIPS code, mapped value, statewide rank, and the paired value from the other dataset.</p>
</div>
<div class="disease-map-stats">
<div class="survey-stat">
<span class="survey-stat__label">Counties</span>
<span class="survey-stat__value">58</span>
<span class="survey-stat__sub">California county rows</span>
</div>
<div class="survey-stat">
<span class="survey-stat__label">Time Period</span>
<span class="survey-stat__value">2016 / 2023</span>
<span class="survey-stat__sub">Retail ESD / COPD</span>
</div>
</div>
</div>

<figure id="copd-choropleth" class="disease-map-figure">
<div class="disease-map-figure__header">
<div>
<h4>California COPD Prevalence by County</h4>
<p>Age-adjusted adult COPD prevalence from CDC PLACES, 2023.</p>
</div>
<a class="disease-map-button" href="copd-choropleth.html" target="_blank" rel="noopener">Open graph</a>
</div>
<iframe src="copd-choropleth.html" title="Interactive California county choropleth map of COPD prevalence" loading="lazy"></iframe>
<figcaption>Fig 1. Adult COPD prevalence by California county, shown with a red-orange color scale.</figcaption>
</figure>

<figure id="retail-esd-choropleth" class="disease-map-figure">
<div class="disease-map-figure__header">
<div>
<h4>California Retail ESD Availability by County</h4>
<p>Percentage of surveyed retailers with electronic smoking devices available, 2016.</p>
</div>
<a class="disease-map-button disease-map-button--teal" href="retail-esd-choropleth.html" target="_blank" rel="noopener">Open graph</a>
</div>
<iframe src="retail-esd-choropleth.html" title="Interactive California county choropleth map of retail electronic smoking device availability" loading="lazy"></iframe>
<figcaption>Fig 2. Retail electronic smoking device availability by California county, shown with a blue-teal color scale.</figcaption>
</figure>
</section>

## Individual Dataset Patterns

### COPD Prevalence

COPD prevalence ranges from **3.3%** to **7.8%** across California counties, with an average of about **5.4%**. The highest values appear in more rural northern counties, especially **Trinity**, **Modoc**, **Lake**, **Lassen**, and **Sierra**. The lowest values are in larger Bay Area counties such as **Santa Clara**, **San Mateo**, **San Francisco**, **Alameda**, and **Marin**.

### Retail ESD Availability

Retail availability ranges from **0.0%** to **89.0%**, with an average of about **63.1%**. The highest values are in **San Luis Obispo**, **Placer**, **Lassen**, **Sacramento**, and **Butte**. **Alpine** and **Sierra** have 0.0% in the 2016 retail dataset, which makes them stand out strongly on the map.

## Comparison

The two maps do not show a strong county-level relationship. Some counties have high retail ESD availability but moderate COPD prevalence, such as **San Luis Obispo** and **Placer**. Other counties have high COPD prevalence without especially high retail availability, such as **Trinity**. The correlation between the two mapped variables is about **-0.02**, which is essentially no linear relationship in this dataset.

This comparison should be interpreted carefully because the datasets come from different years: retail availability is from **2016**, while COPD prevalence is from **2023**. Also, retail availability does not directly measure how many people smoke or vape; it only measures whether stores had electronic smoking devices available.

## Conclusion

The choropleth maps are useful for seeing geographic patterns separately. COPD prevalence is highest in several rural northern counties, while retail ESD availability is more mixed across the state. Together, the maps suggest that county-level store availability of electronic smoking devices alone does not explain the pattern of COPD prevalence in California.
