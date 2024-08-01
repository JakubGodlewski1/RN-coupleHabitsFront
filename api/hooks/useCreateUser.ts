import {getAxiosInstance} from "@/api/axiosInstance";
import {useSecureStore} from "@/hooks/useSecureStore";
import {useEffect, useState} from "react";
import {Alert} from "react-native";
import {useMutation} from "@tanstack/react-query";
import {queryClient} from "@/api/queryClient";
import {queryKeys} from "@/api/queryKeys";
import {User} from "@/types";

export const useCreateUser = () => {
    const {getString, saveString, error: secureStoreError} = useSecureStore()
    const [user, setUser] = useState<User | null>(null);

    const {mutate: createAccount, isPending, isError, error} = useMutation({
        mutationFn: async () => {
            const api = await getAxiosInstance()
            return await api.post("/auth/sign-up", {}, {
                headers: {
                    "content-type": "application/json"
                }
            })
        },
        onError: () => Alert.alert("We could not create the account, your data will not be saved"),
        onSuccess: async (data) => {
            setUser(data.data.data)
            await saveString("auth-token", data.headers["x-auth-token"])
            await queryClient.invalidateQueries({queryKey: [queryKeys.useUser]})
        }
    })

    useEffect(() => {
        if (secureStoreError || isError) {
            if (secureStoreError) {
                console.log("secure store error: " + secureStoreError)
            } else console.log("network error: " + error?.stack)
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


    return {isPending, user}
}