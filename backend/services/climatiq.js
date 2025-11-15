const axios = require("axios");

const API_URL = "https://beta3.api.climatiq.io/estimate";

async function calculateTravelEmissions({ distance_km, fuelType }) {
  const body = {
    model: "cm_91C1YjSmxJdnMJnQHQx5y8",
    parameters: {
      distance: distance_km,
      distance_unit: "km",
      fuel_type: fuelType === "petrol" ? "gasoline" : fuelType
    }
  };

  try {
    const response = await axios.post(API_URL, body, {
      headers: {
        Authorization: `Bearer ${process.env.CLIMATIQ_API_KEY}`,
        "Content-Type": "application/json"
      }
    });

    // Check if response has the expected structure
    if (response.data && typeof response.data.co2e === 'number') {
      return response.data.co2e;
    } else {
      throw new Error("Invalid response structure from Climatiq API");
    }
  } catch (err) {
    console.error("Climatiq API Error:", err.response?.data || err.message);
    // Throw error to allow fallback to static factors in the route handler
    throw err;
  }
}

module.exports = { calculateTravelEmissions };

