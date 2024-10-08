import {AxiosError} from "axios";
import {Alert} from "react-native";

export const handleError = (error: Error | AxiosError) => {
    let errorMessage = "An unknown error occurred"; // default message

    // Check if it's an AxiosError
    if (error instanceof AxiosError) {
        const data = error.response?.data;
        if (data?.message) {
            errorMessage = data.message; // API error message
        } else if (error.message) {
            errorMessage = error.message; // Axios generated message (e.g., Network Error)
        }
    } else if (error instanceof Error) {
        // Non-Axios error, e.g., JavaScript errors
        errorMessage = error.message;
    }

    // Display the error message in console and optionally in UI
    console.error(errorMessage);
    Alert.alert(errorMessage);
}