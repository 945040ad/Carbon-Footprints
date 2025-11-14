# Carbon Footprint Calculator

A simple full‑stack web app for estimating an individual's annual CO₂ emissions from:

- Transportation (car, bus, train, bike/scooter, flights)
- Home electricity
- Food (diet type)
- Waste & recycling
- Water usage

The frontend is a static HTML/CSS/JS page, and the backend is a Node.js + Express API.

---

## Project Structure

```text
.
├── backend
│   ├── server.js
│   ├── routes
│   │   └── emissions.js
│   ├── package.json
│   ├── .env.example (template for environment variables)
│   └── node_modules/ (created after npm install)
└── frontend
    ├── index.html
    └── style.css


Yes—this goes inside your existing <script> block in frontend/index.html, replacing the old onclick handler.

Concretely:

1. Open frontend/index.html.
2. Find this part near the bottom (inside <script>):
js
3. Replace that whole function with the new version:
js
Keep everything else in the <script> (the updateFuelTypeLock function, event listener, etc.) as it is. Then reload the page; “Total CO₂ Emissions” will appear on its own line above the breakdown.

3. Food

•  Input: diet type:
◦  none (exclude food emissions completely)
◦  meat_heavy
◦  average (Average / Mixed)
◦  vegetarian
◦  vegan
•  Backend uses rough annual CO₂ values per person for each diet type (kg CO₂e per year).

4. Waste & Recycling

•  Input:
◦  Household waste (kg/week)
◦  Recycled (% of total waste)
•  Backend:
◦  Converts weekly waste to annual: kg/week × 52.
◦  Computes the non‑recycled (landfilled) portion based on recycling rate.
◦  Multiplies landfilled waste by a landfill emission factor (WASTE_LANDFILL_FACTOR in kg CO₂ per kg waste).

5. Water Usage

•  Input: Water usage (litres/day) per person.
•  Backend:
◦  Converts to annual litres: litres/day × 365.
◦  Uses a WATER_FACTOR_PER_LITRE (e.g. 0.0003 kg CO₂ per litre) to estimate CO₂ from water supply + treatment.

6. Results Display

The frontend shows:

•  Total CO₂ Emissions (kg/year) on its own line.
•  A breakdown:
◦  Transport
◦  Electricity
◦  Food
◦  Waste
◦  Water

All values are illustrative and intended for educational/demo purposes, not for official reporting.



Getting Started

Prerequisites

•  Node.js (LTS version recommended)
•  npm (comes with Node.js)
•  A modern web browser

1. Backend Setup

From the project root:

cd backend
npm install


Create a .env file (or copy from .env.example):

cp .env.example .env

Edit .env and set at least:

PORT=5001
# Optional: if you integrate Climatiq later
# CLIMATIQ_API_KEY=your_real_api_key_here


Start the backend server:

npm run devstart
# or
npm start

The main API endpoint is:

•  POST http://localhost:5001/api/emissions/calculate

You can also test this endpoint using Postman or similar tools by sending JSON like:

{
  "carKm": 1000,
  "vehicleType": "car",
  "fuelType": "petrol",
  "electricityUsage": 300,
  "dietType": "average",
  "wasteKgPerWeek": 10,
  "recyclingRate": 20,
  "waterLitersPerDay": 150
}




2. Frontend Setup

The frontend is static HTML + CSS + vanilla JS.

You have two common options:

Option A: Open directly in the browser

1. From the project root, open frontend/index.html in your browser (double‑click or File → Open).
2. Make sure the backend is running on http://localhost:5001.

> Note: in some setups you might serve index.html via something like VS Code Live Server on a port such as http://localhost:5500. That’s fine as long as the backend URL in the JS fetch call still points to http://localhost:5001/api/emissions/calculate.

Option B: Serve with a simple static server

From the project root:

cd frontend
npx serve .

Then open the URL printed in the terminal (for example http://localhost:5500).



How the Frontend Talks to the Backend

In frontend/index.html, the Calculate button sends a POST request to the backend:

fetch("http://localhost:5001/api/emissions/calculate", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    carKm,
    vehicleType,
    fuelType,
    electricityUsage,
    dietType,
    wasteKgPerWeek,
    recyclingRate,
    waterLitersPerDay
  })
});


The backend responds with JSON containing all emission components and the total, which are then rendered in the Result box.



Styling

The UI uses a light, green, eco‑inspired color palette defined in frontend/style.css:

•  Soft green gradient background.
•  White card with green accents.
•  Green "Calculate" button.
•  Centered layout and inputs.

You can customize the colors and layout by editing style.css.



Notes & Limitations

•  Emission factors used here are approximate and intended for learning / prototyping only.
•  The model is simplified (e.g. no detailed breakdown of different types of flights, regions, or electricity grid mixes).
•  For more accurate or region‑specific factors, you can integrate external services such as the Climatiq API and replace some of the hard‑coded factors in backend/routes/emissions.js.



Possible Future Improvements

•  Integrate Climatiq or similar APIs for dynamic emission factors.
•  Add authentication and user profiles so different people can save scenarios.
•  Add graphs/visualizations for the yearly footprint.
•  Support exporting results as PDF or CSV.
•  Internationalization (i18n) and additional units (e.g. miles, kWh/month).
