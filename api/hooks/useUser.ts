import {useQuery} from "@tanstack/react-query";
import {queryKeys} from "@/api/queryKeys";
import {User} from "@/types";
import {useEffect, useState} from "react";
import {Alert, AppState} from "react-native";
import {useAxios} from "@/api/hooks/useAxios";

export const useUser = ({polling}: { polling: boolean } = {polling: false}) => {
    const {getAxiosInstance} = useAxios()
    const [appState, setAppState] = useState(AppState.currentState);

    useEffect(() => {
        const subscription = AppState.addEventListener("change", nextAppState => {
            console.log(appState)
            setAppState(nextAppState);
        });
        return () => {
            subscription.remove();
        };
    }, []);

    const {isError, error, isLoading, data, refetch} = useQuery({
        refetchInterval: appState === "active" && polling ? 1500 : false,
        queryKey: [queryKeys.useUser],
        staleTime: Infinity,
        gcTime: Infinity,
        queryFn: async () => {
            const api = await getAxiosInstance();
            try {
                const res = await api.get("/users")
                return res.data
            } catch (err) {
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

    return {isLoading, error, isError, user: data as User | undefined, refetch}
}