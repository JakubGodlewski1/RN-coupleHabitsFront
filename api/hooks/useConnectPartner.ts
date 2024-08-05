import {useMutation} from "@tanstack/react-query";
import {Alert} from "react-native";
import {queryClient} from "@/api/queryClient";
import {queryKeys} from "@/api/queryKeys";
import {getAxiosInstance} from "@/api/axiosInstance";
import {subDays} from "date-fns";

export const useConnectPartner = () => {

    const connectWithPartner = async (connectionCode: string) => {
        if (connectionCode.length !== 6) {
            return Alert.alert("Connection code should be 6 characters long")
        }

        const api = await getAxiosInstance()
        return await api.patch("/users/user", {
            connectionCode,
            lastTimeCompleted: subDays(new Date(), 1).toString()
        })
    }

    const {isPending, mutate} = useMutation({
        mutationFn: connectWithPartner,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [queryKeys.useUser]
            })
        },
        onError: () => {
            Alert.alert("Something went wrong, try again later")
        }
    })

    return {isPending, connect: mutate}
}