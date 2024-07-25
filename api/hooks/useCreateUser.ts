import {getAxiosInstance} from "@/api/axiosInstance";
import {useSecureStore} from "@/hooks/useSecureStore";
import {useEffect} from "react";
import {Alert} from "react-native";
import {useMutation} from "@tanstack/react-query";
import {queryClient} from "@/api/queryClient";
import {queryKeys} from "@/api/queryKeys";

export const useCreateUser = () => {
    const {getString, saveString, error: secureStoreError} = useSecureStore()

    const {mutate: createAccount, isPending, isError, error} = useMutation({
        mutationFn: async () => {
            const api = await getAxiosInstance()
            return await api.post("/auth/sign-up")
        },
        onSuccess: async (data) => {
            //save jwt
            await saveString("auth-token", data.headers["x-auth-token"])
            //update cache
            queryClient.setQueryData(
                [queryKeys.useUser],
                data?.data.data
            )
        }
    })

    useEffect(() => {
        if (secureStoreError || isError) {
            Alert.alert("Something went wrong, try again later")
        }
    }, [secureStoreError, isError]);

    useEffect(() => {
        //check if user is not logged in yet
        const validateToken = async () => {
            const userExists = await getString("auth-token")
            if (!userExists)
                createAccount()
        }

        validateToken()
    }, []);


    return {isPending}
}