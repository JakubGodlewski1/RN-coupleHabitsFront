import {useMutation} from "@tanstack/react-query";
import {getAxiosInstance} from "@/api/axiosInstance";
import {CreateHabit} from "@/types";
import {queryClient} from "@/api/queryClient";
import {queryKeys} from "@/api/queryKeys";
import {Alert} from "react-native";
import {router} from "expo-router";

export const useCreateHabit = () => {

    const createHabit = async (habit: CreateHabit) => {
        const api = await getAxiosInstance()
        return await api.post("/habits", habit)
    }

    const {isPending, mutate} = useMutation({
        mutationFn: (habit: CreateHabit) => createHabit(habit),
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: [queryKeys.useUser]
            })
            router.back()
        },
        onError: () => {
            Alert.alert("Something went wrong, try again later")
        }
    })

    return {isPending, createHabit: mutate}
}