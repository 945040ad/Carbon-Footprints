// const express = require('express');
// const router = express.Router();
// router.post('/calculate', (req, res) => {
//     res.json({message: "Emissions route Working"});
// });
// module.exports = router;







// const express = require("express");
// const router = express.Router();

// // Emission factors (simple version)
// const FACTORS = {
//   petrol: 2.31,       // kg CO2 per liter equivalent
//   diesel: 2.68,
//   cng: 2.00,
//   electricity: 0.82   // kg CO2 per kWh (India avg)
// };

// router.post("/calculate", (req, res) => {
//   const { carKm, fuelType, electricityUsage } = req.body;

//   // Convert inputs to numbers
//   const km = Number(carKm) || 0;
//   const electricity = Number(electricityUsage) || 0;

//   // Transportation calculation (simple model)
//   const emissionFactor = FACTORS[fuelType] || 0;
//   const transportCO2 = km * emissionFactor * 0.15; 
//   // (0.15 is an approximate liters/km conversion)

//   // Electricity
//   const electricityCO2 = electricity * FACTORS.electricity;

//   const total = transportCO2 + electricityCO2;

//   res.json({
//     transportCO2,
//     electricityCO2,
//     total,
//     message: "Carbon footprint calculated successfully"
//   });
// });

// module.exports = router;







// const express = require("express");
// const router = express.Router();
// const { calculateTravelEmissions } = require("../services/climatiq");

// // Simple in-memory store for now
// const records = [];

// // POST /api/emissions
// router.post("/", async (req, res) => {
//   try {
//     const { date, commute } = req.body;
//     // commute: { distance_km }

//     let totalCo2e = 0;
//     const breakdown = {};

//     if (commute) {
//       const commuteCo2e = await calculateTravelEmissions(commute);
//       breakdown.commute = commuteCo2e;
//       totalCo2e += commuteCo2e;
//     }

//     const record = {
//       date,
//       totalCo2e,
//       breakdown,
//       createdAt: new Date().toISOString(),
//     };

//     records.push(record);
//     res.status(201).json(record);
//   } catch (err) {
//     console.error("Error calculating emissions:", err.response?.data || err.message);
//     res.status(500).json({ error: "Failed to calculate emissions" });
//   }
// });

// // GET /api/emissions
// router.get("/", (req, res) => {
//   res.json(records);
// });

// module.exports = router;






router.post("/calculate", async (req, res) => {
  try {
    const { carKm, fuelType, electricityUsage } = req.body;

    // Convert inputs
    const commute = { distance_km: Number(carKm), fuelType };

    // Get travel emissions from Climatiq
    const travelCo2 = await calculateTravelEmissions(commute);

    // Simple electricity formula
    const electricityCo2 = Number(electricityUsage) * 0.82;

    const total = travelCo2 + electricityCo2;

    res.json({
      travelCo2,
      electricityCo2,
      total
    });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Failed to calculate emissions" });
  }
});
