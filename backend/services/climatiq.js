// const axios = require("axios");

// const CLIMATIQ_API_KEY = process.env.CLIMATIQ_API_KEY;
// const CLIMATIQ_BASE_URL = "https://api.climatiq.io";

// if (!CLIMATIQ_API_KEY) {
//   console.warn("Warning: CLIMATIQ_API_KEY is not set. Emission calculations will fail.");
// }

// const client = axios.create({
//   baseURL: CLIMATIQ_BASE_URL,
//   headers: {
//     Authorization: `Bearer ${CLIMATIQ_API_KEY}`,
//     "Content-Type": "application/json",
//   },
// });

// // Example: calculate travel emissions by distance (km, car, etc.)
// async function calculateTravelEmissions({ distance_km, vehicle_type }) {
//   // Pick an appropriate emission factor from Climatiq docs.
//   // Example factor: 'passenger_vehicle-vehicle_type_car-fuel_source_na-distance_na'
//   const emissionFactor = "passenger_vehicle-vehicle_type_car-fuel_source_na-distance_na";

//   const body = {
//     emission_factor: emissionFactor,
//     parameters: {
//       distance: distance_km,
//       distance_unit: "km",
//     },
//   };

//   const { data } = await client.post("/compute", body);
//   return data.co2e; // total CO2e in kg
// }

// async function calculateElectricityEmissions({ kwh, country }) {
//   // Replace with relevant factor from Climatiq docs, e.g. country-specific electricity
//   const emissionFactor = "electricity-energy_source_grid_mix-location_" + country.toLowerCase();

//   const body = {
//     emission_factor: emissionFactor,
//     parameters: {
//       energy: kwh,
//       energy_unit: "kWh",
//     },
//   };

//   const { data } = await client.post("/compute", body);
//   return data.co2e;
// }

// module.exports = {
//   calculateTravelEmissions,
//   calculateElectricityEmissions,
// };
// const axios = require("axios");

// const CLIMATIQ_API_KEY = process.env.CLIMATIQ_API_KEY;
// const CLIMATIQ_BASE_URL = "https://api.climatiq.io";

// if (!CLIMATIQ_API_KEY) {
//   console.warn("Warning: CLIMATIQ_API_KEY is not set. Emission calculations will fail.");
// }

// const client = axios.create({
//   baseURL: CLIMATIQ_BASE_URL,
//   headers: {
//     Authorization: `Bearer ${CLIMATIQ_API_KEY}`,
//     "Content-Type": "application/json",
//   },
// });

// // Example: calculate travel emissions by distance (km, car).
// // Uses a sample factor from Climatiq's docs for car travel.
// async function calculateTravelEmissions({ distance_km }) {
//   const emissionFactor = "passenger_vehicle-vehicle_type_car-fuel_source_na-distance_na";

//   const body = {
//     emission_factor: emissionFactor,
//     parameters: {
//       distance: distance_km,
//       distance_unit: "km",
//     },
//   };

//   const { data } = await client.post("/estimate", body);
//   return data.co2e; // kg CO2e
// }

// module.exports = {
//   calculateTravelEmissions,
// };





const axios = require("axios");

const API_URL = "https://beta3.api.climatiq.io/estimate";

async function calculateTravelEmissions({ distance_km, fuelType }) {
  try {
    const response = await axios.post(
      API_URL,
      {
        model: "cm_91C1YjSmxJdnMJnQHQx5y8", // Official car emissions model
        parameters: {
          distance: distance_km,
          distance_unit: "km",
          fuel_type: fuelType
        }
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.CLIMATIQ_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    return response.data.co2e;
  } catch (err) {
    console.error("Climatiq API Error:", err.response?.data || err.message);
    return 0;
  }
}

module.exports = { calculateTravelEmissions };
