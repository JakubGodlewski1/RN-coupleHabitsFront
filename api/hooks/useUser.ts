import {useQuery, useQueryClient} from "@tanstack/react-query";
import {queryKeys} from "@/api/queryKeys";
import {User} from "@/types";
import {useEffect, useState} from "react";
import {Alert, AppState} from "react-native";
import {useAxios} from "@/api/hooks/useAxios";
import {hasBeenReloadedToday} from "@/utils/hasBeenReloadedToday";
import {useOptimisticUpdateContext} from "@/hooks/useOptimisticUpdateContext";
import {useUpdateGameAccount} from "@/api/hooks/useUpdateGameAccount";

export const useUser = ({polling}: { polling: boolean } = {polling: false}) => {
    const {getAxiosInstance} = useAxios()
    const [appState, setAppState] = useState(AppState.currentState);
    const [dailyLoading, setDailyLoading] = useState(false);
    const {isUpdating} = useOptimisticUpdateContext()
    const [refetchErrorAmount, setRefetchErrorAmount] = useState(0);
    const {updateGameAccount} = useUpdateGameAccount()
    const queryClient = useQueryClient();

    useEffect(() => {
        const subscription = AppState.addEventListener("change", nextAppState => setAppState(nextAppState));
        return () => subscription.remove()
    }, []);

    const {isError, error, isLoading, data, refetch} = useQuery({
        refetchInterval: (refetchErrorAmount < 3 && !isUpdating && appState === "active" && polling) ? 1500 : false,
        queryKey: [queryKeys.useUser],
        staleTime: Infinity,
        gcTime: Infinity,
        queryFn: async ({signal}) => {
            const api = await getAxiosInstance();
            try {
                const res = await api.get("/users", {signal})
                setRefetchErrorAmount(0)
                return res.data
            } catch (err: any) {
                if (err.message === "canceled") {
                    return
                }
                if (refetchErrorAmount === 0) {
                    Alert.alert("Something went wrong while fetching your data, try again later")
                }
                setRefetchErrorAmount(p => p + 1)
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
            const cache = queryClient.getQueryData([queryKeys.useUser]) as undefined | User

            if (
                !(await hasBeenReloadedToday()) &&
                cache &&
                cache.partner.connected
            ) {
                //update utc offset - 1 time daily (in case there was time change or user went abroad to a different timezone)
                updateGameAccount({utcOffset: -Math.floor(new Date().getTimezoneOffset() / 60)})

                //refetch all habits - 1 time daily
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