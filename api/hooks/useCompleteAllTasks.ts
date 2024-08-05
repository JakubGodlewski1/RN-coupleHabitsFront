import {useMutation} from "@tanstack/react-query";
import {getAxiosInstance} from "@/api/axiosInstance";
import {queryClient} from "@/api/queryClient";
import {queryKeys} from "@/api/queryKeys";
import {Axios, AxiosError} from "axios";
import {Alert} from "react-native";

export const useCompleteAllTasks = () => {
    const completeAllTasks = async () => {
        const api = await getAxiosInstance()
        try {
            return await api.patch("/game-accounts/complete-all", {
                todayDate: new Date().toString()
            })

        } catch (err) {
            const axiosError = err as AxiosError
            // @ts-ignore
            const errorMessage = axiosError?.response?.data?.message || "Something went wrong"
            throw new Error(errorMessage)
        }
    }

    const {mutate, isPending} = useMutation({
        mutationFn: completeAllTasks,
        onSettled: async () => {
            await queryClient.invalidateQueries({
                queryKey: [queryKeys.useUser]
            })
        }, onError: (error) => {
            Alert.alert(error.message)
        },
        onSuccess: () => {
            Alert.alert("All tasks completed, take a day off. You deserve it (:")
        }
    })

    return {completeAllTasks: mutate, isPending}
}