import axios from "axios";
import { environments } from "../config/environments";
import { storage } from "../utils/storage";

/**
 * HttpService Class
 * A service class that handles HTTP requests using axios
 * Provides methods for making API calls with standardized configuration
 */
class HttpService {
  // Axios instance for making HTTP requests
  axiosInstance: any;

  // Base URL from environment variables for API endpoints
  baseURL = environments.baseApiUrl;

  // Default timeout for requests (60 seconds)
  timeout = 60000;
  /**
   * Initialize the axios instance with default configuration
   * Sets up request and response interceptors
   */
  init() {
    // Create new axios instance with base configuration
    this.axiosInstance = axios.create({
      baseURL: this.baseURL,
      headers: {
        // Allow cross-origin requests
        ["Access-Control-Allow-Origin"]: "*",
        // Set default content type to JSON
        ["Content-Type"]: "application/json",
      },
      timeout: this.timeout,
    });

    // Add request interceptor
    // Modifies request config before sending
    this.axiosInstance.interceptors.request.use((config: any) => {
      // Get stored headers from localStorage
      const headers: any = this.getHeader();

      // Merge existing headers with remember-me flag
      const newHeader = {
        ...headers,
      };

      // Apply merged headers to request config
      config.headers = newHeader;

      return config;
    });

    // Add response interceptor
    // Handles responses and errors
    this.axiosInstance.interceptors.response.use(
      // Success handler - returns only the response data
      (response: any) => {
        storage.setHeaders(response.headers);
        return response.data;
      },
      // Error handler - processes HTTP errors
      async (error: any) => {
        const status = error.response?.status;
        switch (status) {
          // Handle 404 and 500 errors
          case 404:
          case 500:
            return Promise.reject({ internal_server_error: "msg" });
          default:
            return Promise.reject(error);
        }
      },
    );
  }

  /**
   * Get headers from localStorage
   * @returns {Object} Stored headers or empty object
   */
  getHeader() {
    return JSON.parse(localStorage.getItem("headers") || "{}");
  }

  /**
   * Perform GET request
   * @param {string} url - API endpoint
   * @returns {Promise} API response
   */
  get(url: string) {
    return this.axiosInstance.get(url);
  }

  /**
   * Perform POST request
   * @param {string} url - API endpoint
   * @param {any} data - Request payload
   * @returns {Promise} API response
   */
  post(url: string, data: any) {
    return this.axiosInstance.post(url, data);
  }

  /**
   * Perform PUT request
   * @param {string} url - API endpoint
   * @param {any} data - Request payload
   * @returns {Promise} API response
   */
  put(url: string, data: any) {
    return this.axiosInstance.put(url, data);
  }

  /**
   * Perform PATCH request
   * @param {string} url - API endpoint
   * @param {any} data - Request payload
   * @returns {Promise} API response
   */
  patch(url: string, data: any) {
    return this.axiosInstance.patch(url, data);
  }

  /**
   * Perform DELETE request
   * @param {string} url - API endpoint
   * @returns {Promise} API response
   */
  delete(url: string) {
    return this.axiosInstance.delete(url);
  }
}

export default HttpService;
