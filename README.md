# Personal Web Page & Web GIS Portfolio

## About The Project

This repository contains my personal web page and Web GIS portfolio, developed as an assignment for the **GMT 458 - Web GIS** course at Hacettepe University. The project features a fully responsive multi-page layout, a bilingual (TR/EN) interface, and advanced interactive mapping applications.

### 🚀 Key Features

* **Multi-Page HTML Structure:** Includes Home (`index.html`), About Me (`me.html`), Projects (`projects.html`), and Maps (`maps.html`).
* **Persistent Bilingual Support:** Users can switch between English and Turkish. The choice is saved in the browser's `localStorage` for seamless navigation across different pages.
* **AJAX Contact Form:** Uses Formspree and JavaScript `fetch` API to submit messages in the background without redirecting the user to another page.
* **Animated UI/UX:** Smooth CSS transitions, fade-in effects, and an interactive side-panel for map locations.

### 🗺️ Web GIS Implementation & Solutions

The project integrates two different web mapping libraries, addressing specific technical requirements:

1. **Leaflet Map (Must-See Cities in Turkey):**
   * Features custom points of interest across Turkey.
   * **Bounding Box Restriction:** The map view is restricted to global bounds, preventing the user from dragging into endless gray areas.

2. **OpenLayers Map (Places to Visit in Ankara):**
   * Categorized locations (Historical, Malls, Entertainment) with color-coded point features.
   * Extent restriction focused strictly on Ankara coordinates.

#### Assignment Specific Solutions (Issue 1 & Issue 2)

* **Issue 1 (Overlapping Markers):** Solved implementing **Clustering**. For Leaflet, the `Leaflet.markercluster` plugin is used. For OpenLayers, the native `ol.source.Cluster` is utilized. Markers group together dynamically when zooming out, providing a clean UI.
* **Issue 2 (Earth Repeating Itself):** Solved by disabling horizontal map wrapping (`noWrap: true` in Leaflet's TileLayer and `wrapX: false` in OpenLayers OSM source).

### 🤖 AI Usage Statement

In accordance with the assignment guidelines, AI (Gemini) was utilized as a coding assistant and tutor during the development process.

* **Estimated Total AI Usage:** ~3-4 hours.
* **Specific Learnings & Implementations via AI:**
  * Implementing OpenLayers `ol.source.Cluster` and adjusting `hitTolerance` for accurate click detection on clustered features.
  * Writing an AJAX `fetch` request to handle Formspree form submissions without page redirection.
  * Using browser `localStorage` to keep the user's language preference (TR/EN) persistent across multiple HTML pages.
  * Advanced CSS object-fitting and positioning for dynamic image containers.