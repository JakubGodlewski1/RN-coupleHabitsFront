import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import {DEFAULT_URL} from "@/utils/consts";

// Base configuration for Axios
const baseConfig = {
    baseURL: DEFAULT_URL,
    headers: {
        'x-auth-type': 'simple-auth',
    },
};

// Create the initial Axios instance
const api = axios.create(baseConfig);

// Function to get a new Axios instance with the additional header
export const getAxiosInstance = async () => {
    // Retrieve the token from secure storage
    const value = await SecureStore.getItemAsync('auth-token');
    // If no token is found, return the initial Axios instance
    if (!value) {
        return api;
    }

    // Clone the base configuration and add the token to the headers
    const configWithAuthToken = {
        ...baseConfig,
        headers: {
            ...baseConfig.headers,
            'x-auth-token': value,
        },
    };

    // Return a new Axios instance with the modified configuration
    return axios.create(configWithAuthToken);
};

