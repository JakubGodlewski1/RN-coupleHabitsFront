import {useState} from "react";
import * as SecureStore from 'expo-secure-store';

export const useSecureStore = () => {
    const [error, setError] = useState<string | null>(null);

    const handleError = (err: any) => {
        if (err instanceof Error) {
            setError(err.message)
        } else {
            setError("Something went wrong, try again later");
        }
    }

    const saveString = async (key: string, value: string) => {
        try {
            await SecureStore.setItemAsync(key, value);
        } catch (err: any) {
            handleError(err)
        }
    }

    const saveObject = async (key: string, value: string) => {
        try {
            const jsonValue = JSON.stringify(value)
            await SecureStore.setItemAsync(key, jsonValue);
        } catch (err) {
            handleError(err)
        }
    }

    const getString = async (key: string) => {
        try {
            const value = await SecureStore.getItemAsync(key);
            if (value) {
                return value
            }
        } catch (err) {
            handleError(err)
        }
    }

    const getObject = async (key: string) => {
        try {
            const jsonValue = await SecureStore.getItemAsync(key);
            return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch (err) {
            handleError(err)
        }
    };

    const deleteAny = async (key: string) => {
        try {
            await SecureStore.deleteItemAsync(key);
        } catch (err) {
            handleError(err)
        }
    }

    return {saveObject, saveString, getObject, getString, error, deleteAny}
}