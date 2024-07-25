import {useMutation} from "@tanstack/react-query";
import {router} from "expo-router";
import {Alert} from "react-native";
import {getAxiosInstance} from "@/api/axiosInstance";
import {queryClient} from "@/api/queryClient";
import {queryKeys} from "@/api/queryKeys";

export const useConnectPartner = () => {

    const connectWithPartner = async (connectionCode: string) => {
        if (connectionCode.length !== 6) {
            return Alert.alert("Connection code should be 6 characters long")
        }

        const api = await getAxiosInstance()
        return await api.patch("/users/user", {
            type: "partner",
            connectionCode
        })
    }

    const {isPending, mutate} = useMutation({
        mutationFn: connectWithPartner,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [queryKeys.useUser]
            })
            router.back()
            Alert.alert("Connection successful!", "Create your first habit now!")
        },
        onError: () => {
            Alert.alert("Something went wrong, try again later")
        }
    })

    return {isPending, connect: mutate}
}