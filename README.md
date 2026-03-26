# 🌱 Climate Neutral
### A Web Application for Vehicle Fleet Emission Management

> *Revolutionizing the way vehicle emissions are managed and reduced — one fleet at a time.*

---

## 📖 About the Project

**Climate Neutral** is a cutting-edge web application designed to help individuals and organizations manage their vehicle fleets more efficiently and reduce carbon emissions. The application provides tools to calculate emissions, visualize data, and suggest strategies for improving fleet sustainability.

By simply entering vehicle data, users gain valuable insights into the emissions intensity of their vehicles — enabling informed decision-making and strategic planning. The platform also provides eco-friendly driving practices and alternative vehicle options, such as electric or hybrid models.

---

## 🚨 The Problem

> *"The transportation sector is a major contributor to carbon emissions, posing a significant threat to our environment and public health. Traditional approaches to managing emissions have fallen short, leaving individuals and organizations without the tools and guidance needed to make informed decisions about their transportation choices."*

---

## ✨ Features

| Feature | Description |
|--------|-------------|
| 🚗 **Fleet Management** | Add, edit, and delete vehicle fleet data manually or via CSV upload |
| 📊 **Emissions Dashboard** | Visualize current emissions and emissions intensity per vehicle |
| 🌿 **Green Options** | Explore and select eco-friendly alternatives for each vehicle |
| 💰 **Action Savings** | View individual and overall CO₂ savings (in TCO₂e) with dynamic charts |
| ⚡ **EV Alternatives** | Browse and compare EV alternatives with emissions intensity bar graphs |
| 📄 **PDF Export** | Download and print emissions reports and charts |
| 📍 **Province Settings** | Adjust province to auto-update regional emission constants |

---

## 🗂️ Application Pages

### 1. Landing Page — `/landing.html`
The entry point of the application. Welcomes users and introduces Climate Neutral's mission. Click **"Get Started"** to begin your sustainability journey.

### 2. User Input Page — `/main.html`
Central hub for managing fleet data.
- Manually add vehicle data via a modal form
- Upload fleet data using a **CSV file**
- Edit, update, or delete existing entries
- Adjust **province settings** to apply accurate regional emission constants

### 3. Current Emissions Page — `/current-emissions.html`
Visual dashboard showing your fleet's environmental impact.
- **Current Emissions** graph — total emissions across the fleet
- **Current Emissions Intensity** graph — emissions per vehicle
- Export graphs as a **PDF report**

### 4. Green Options Page — `/green-options.html`
Explore sustainable transportation alternatives.
- Select a green option from a dropdown for each vehicle
- All vehicles must have a green option selected before proceeding

### 5. Intermission Page — `/analyser.html`
A transitional processing page that analyzes your selected green options. Click **"Start Analyzing"** once the calculations are ready.

### 6. Action Savings Page — `/action-savings.html`
View the impact of your green choices.
- **Individual Savings** — per-vehicle emission savings in TCO₂e
- **Overall Savings** — total fleet emission savings with a dynamic speedometer
- **Pie Chart** — breakdown of emission savings per vehicle

### 7. EV Alternatives Page — `/best-ev-options.html`
Browse suggested EV alternatives tailored to your fleet.
- Searchable and sortable alternatives table
- **Bar graph** showing emissions intensity per alternative
- North American manufacturer vehicles are highlighted separately
- Print the page for records or stakeholder sharing

---

## 🛠️ Tech Stack

- **Frontend:** Vanilla JavaScript, HTML, CSS
- **Charts:** [Chart.js](https://www.chartjs.org/)
- **Alerts:** [SweetAlert2](https://sweetalert2.github.io/)
- **Unit Testing:** [Jest](https://jestjs.io/)
- **End-to-End Testing:** [Cypress](https://www.cypress.io/)
- **Data Source:** [Natural Resources Canada — Fuel Consumption Ratings](https://fcr-ccc.nrcan-rncan.gc.ca/en)
- **Emission Factors:** [Environment and Climate Change Canada](https://www.canada.ca/en/environment-climate-change/services/climate-change/pricing-pollution-how-it-will-work/output-based-pricing-system/federal-greenhouse-gas-offset-system/emission-factors-reference-values.html)

---

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/dhvani2510/climate-neutral-by-ecocoders.git
   cd climate-neutral-by-ecocoders
   ```

2. **Open the application**
   - Open `landing.html` in your browser to launch the app.

3. **Run unit tests**
   ```bash
   npm install
   npm test
   ```

4. **Run end-to-end tests**
   ```bash
   npx cypress open
   ```

---

## 👥 Team — EcoCoders

| Name |
|------|
| **Dhvani Sheth** |
| **Iverique Nkayilu** |
| **Parth Dangaria** |
| **Riddhi Jobanputra** |
| **Suril Shukla** |

---

## 📚 References

1. [Jest — Delightful JavaScript Testing](https://jestjs.io/)
2. [Cypress — JavaScript End to End Testing Framework](https://www.cypress.io/)
3. [Natural Resources Canada — Fuel Consumption Ratings](https://fcr-ccc.nrcan-rncan.gc.ca/en)
4. [Environment and Climate Change Canada — Emission Factors and Reference Values](https://www.canada.ca/en/environment-climate-change/services/climate-change/pricing-pollution-how-it-will-work/output-based-pricing-system/federal-greenhouse-gas-offset-system/emission-factors-reference-values.html)
5. [Chart.js — Open Source HTML5 Charts](https://www.chartjs.org/)
6. [SweetAlert2](https://sweetalert2.github.io/)

---

## 📄 License

This project was developed as part of **COMP 8967 Internship Project - I (Winter 2024)** at the university, guided by **Prof. Kalyani Selvarajah**.

---

<p align="center">Made with 💚 by EcoCoders — for a cleaner, greener future.</p>
