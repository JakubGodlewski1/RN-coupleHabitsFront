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
        onError: () => Alert.alert("We could not create the account, your data will not be saved"),
        onSuccess: async (data) => {
            await saveString("auth-token", data.headers["x-auth-token"])
            await queryClient.invalidateQueries({queryKey: [queryKeys.useUser]})
        }
    })

    useEffect(() => {
        if (secureStoreError || isError) {
            if (secureStoreError) {
                console.log("secure store error: " + secureStoreError)
            } else console.log("network error: " + error?.message)
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