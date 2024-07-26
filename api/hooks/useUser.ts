import {getAxiosInstance} from "@/api/axiosInstance";
import {useQuery} from "@tanstack/react-query";
import {queryKeys} from "@/api/queryKeys";
import {User} from "@/types";
import {useEffect} from "react";
import {Alert} from "react-native";

export const useUser = () => {

    const {isError, error, isLoading, data, refetch} = useQuery({
        queryKey: [queryKeys.useUser],
        staleTime: Infinity,
        gcTime: Infinity,
        retry: 3,
        queryFn: async () => {
            const api = await getAxiosInstance();
            console.log("use user api fires")
            const res = await api.get("/users/user")
            return res.data.data
        }
    })

    useEffect(() => {
        if (isError) {
            Alert.alert("We could not load your data, try again later")
        }
    }, [isError]);

    return {isLoading, error, isError, user: data as User | undefined, refetch}
}