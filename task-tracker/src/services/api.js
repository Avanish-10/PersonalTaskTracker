import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:5058/api"
});

// Automatically attach userId to every request
api.interceptors.request.use((config) => {

    const userId = localStorage.getItem("userId");

    if (userId) {
        config.headers.userId = userId;
    }

    return config;
});

export default api;