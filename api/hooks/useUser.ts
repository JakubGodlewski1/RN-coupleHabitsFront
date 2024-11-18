import {useQuery} from "@tanstack/react-query";
import {queryKeys} from "@/api/queryKeys";
import {User} from "@/types";
import {useEffect, useState} from "react";
import {Alert, AppState} from "react-native";
import {useAxios} from "@/api/hooks/useAxios";
import {hasBeenReloadedToday} from "@/utils/hasBeenReloadedToday";
import {queryClient} from "@/api/queryClient";
import {useOptimisticUpdateContext} from "@/hooks/useOptimisticUpdateContext";

export const useUser = ({polling}: { polling: boolean } = {polling: false}) => {
    const {getAxiosInstance} = useAxios()
    const [appState, setAppState] = useState(AppState.currentState);
    const [dailyLoading, setDailyLoading] = useState(false);
    const {isUpdating} = useOptimisticUpdateContext()

    useEffect(() => {
        const subscription = AppState.addEventListener("change", nextAppState => setAppState(nextAppState));
        return () => subscription.remove()
    }, []);

    const {isError, error, isLoading, data, refetch} = useQuery({
        refetchInterval: (!isUpdating && appState === "active" && polling) ? 1500 : false,
        queryKey: [queryKeys.useUser],
        staleTime: Infinity,
        gcTime: Infinity,
        queryFn: async ({signal}) => {
            const api = await getAxiosInstance();
            try {
                const res = await api.get("/users", {signal})
                return res.data
            } catch (err: any) {
                if (err.message === "canceled") {
                    return
                }
                Alert.alert("Something went wrong while fetching your data, try again later")
            }
            return null
        }
    })

    useEffect(() => {
        if (isError) {
            Alert.alert("We could not load your data, try again later")
        }
    }, [isError]);

    useEffect(() => {
        const validateHasLoadedToday = async () => {
            if (!(await hasBeenReloadedToday())) {
                setDailyLoading(true)
                await queryClient.invalidateQueries({
                    queryKey: [queryKeys.useUser]
                })
                setDailyLoading(false)
            }
        }

        if (AppState.currentState === "active") {
            validateHasLoadedToday()
        }

    }, [AppState.currentState !== "active"])

    return {
        isLoading: (isLoading || dailyLoading),
        error,
        isError,
        user: isUpdating ? queryClient.getQueryData<User>([queryKeys.useUser]) : data as User | undefined,
        refetch
    }
}