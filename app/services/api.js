import axios from "axios";

const BASE_URL = "http://192.168.238.92:8080/api/public/trains";

const trainServices = {
  searchTrain: async (params) => {
    try {
      const response = await axios.post(`${BASE_URL}/search`, params, {
        headers: { "Content-Type": "application/json" },
      });
      return response.data;
    } catch (error) {
      console.error("Search Train Error:", error.response || error.message);
      throw error;
    }
  },

  getLiveStatus: async (trainNumber) => {
    try {
      const response = await axios.get(`${BASE_URL}/liveStatus`, {
        params: { trainNo: trainNumber },
      });
      console.log("response", response.data);
      return response.data;
    } catch (error) {
      console.error("Live Status Error:", error.response || error.message);
      throw error;
    }
  },

  getSchedule: async (trainNumber) => {
    try {
      console.log("trainNumber", trainNumber);
      const response = await axios.get(`${BASE_URL}/schedule`, {
        params: { trainNo: trainNumber },
      });
      console.log("response", response.data);
      return response.data;
    } catch (error) {
      console.error("Schedule Error:", error.response || error.message);
      throw error;
    }
  },

  getPNRStatus: async (pnrNumber) => {
    try {
      const response = await axios.get(`${BASE_URL}/pnr-status`,{params: { pnr: pnrNumber },});
      return response.data;
    } catch (error) {
      console.error("PNR Status Error:", error.response || error.message);
      throw error;
    }
  },

  checkSeatAvailability: async (params) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/seat-availability`,
        params,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      return response.data;
    } catch (error) {
      console.error(
        "Seat Availability Error:",
        error.response || error.message
      );
      throw error;
    }
  },

  getFare: async (params) => {
    try {
      const response = await axios.post(`${BASE_URL}/fare`, params, {
        headers: { "Content-Type": "application/json" },
      });
      return response.data;
    } catch (error) {
      console.error("Fare Error:", error.response || error.message);
      throw error;
    }
  },
};

export default trainServices;
