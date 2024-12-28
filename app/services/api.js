const BASE_URL = "";

 const trainServices = {
  searchTrain: async (params) => {
    try {
      const response = await fetch(`${BASE_URL}/search-train`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(params),
      });
      return await response.json();
    } catch (error) {
      console.error("Search Train Error:", error);
      throw error;
    }
  },

  getLiveStatus: async (trainNumber) => {
    try {
      const response = await fetch(`${BASE_URL}/live-status/${trainNumber}`);
      return await response.json();
    } catch (error) {
      console.error("Live Status Error:", error);
      throw error;
    }
  },

  getSchedule: async (trainNumber) => {
    try {
      const response = await fetch(`${BASE_URL}/schedule/${trainNumber}`);
      return await response.json();
    } catch (error) {
      console.error("Schedule Error:", error);
      throw error;
    }
  },

  getPNRStatus: async (pnrNumber) => {
    try {
      const response = await fetch(`${BASE_URL}/pnr-status/${pnrNumber}`);
      return await response.json();
    } catch (error) {
      console.error("PNR Status Error:", error);
      throw error;
    }
  },

  checkSeatAvailability: async (params) => {
    try {
      const response = await fetch(`${BASE_URL}/seat-availability`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(params),
      });
      return await response.json();
    } catch (error) {
      console.error("Seat Availability Error:", error);
      throw error;
    }
  },

  getFare: async (params) => {
    try {
      const response = await fetch(`${BASE_URL}/fare`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(params),
      });
      return await response.json();
    } catch (error) {
      console.error("Fare Error:", error);
      throw error;
    }
  },
};


export default trainServices