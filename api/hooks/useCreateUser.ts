import {useMutation} from "react-query";
import {api} from "@/api/axiosInstance";
import {useSecureStore} from "@/hooks/useSecureStore";
import {useEffect} from "react";
import {Alert} from "react-native";

export const useCreateUser = () => {
    const {getString, saveString, error: secureStoreError} = useSecureStore()

    useEffect(() => {
        if (secureStoreError) {
            Alert.alert("Something went wrong, try again later")
        }
    }, [secureStoreError]);

    const {mutate: createAccount, isLoading, isError, error} = useMutation({
        mutationFn: async () => await api.post("/auth/sign-up"),
        onSuccess: async (data) => {
            await saveString("auth-token", data.headers["x-auth-token"])
        }
    })

    useEffect(() => {
        //check if user is not logged in yet
        const validateToken = async () => {
            const token = await getString("auth-token")
            if (!token)
                createAccount()
        }

        validateToken()
    }, []);
}