import {useEffect, useState} from "react";
import * as SecureStore from 'expo-secure-store'

export const useAfterIntro = (mode: "save" | "read" = "read") => {
    const [isLoading, setIsLoading] = useState(true);
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        if (mode === "read") {
            const getToken = async () => {
                const t = await SecureStore.getItemAsync("after-intro")
                setToken(t)
                setIsLoading(false);
            }
            getToken()
        }

        if (mode === "save") {
            const saveToken = async () => {
                await SecureStore.setItemAsync("after-intro", "true")
                setIsLoading(false)
            }
            saveToken()
        }
    }, [])

    return {isLoading, token}
}

