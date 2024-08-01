import {getAxiosInstance} from "@/api/axiosInstance";
import {useQuery} from "@tanstack/react-query";
import {queryKeys} from "@/api/queryKeys";
import {User} from "@/types";
import {useEffect} from "react";
import {Alert} from "react-native";
import {locationForIndex} from "sucrase/dist/types/parser/traverser/base";

export const useUser = () => {

    const {isError, error, isLoading, data, refetch} = useQuery({
        queryKey: [queryKeys.useUser],
        staleTime: Infinity,
        gcTime: Infinity,
        queryFn: async () => {
            const api = await getAxiosInstance();
            console.log("use user api fires")
            try {
                const res = await api.get("/users/user")
                return res.data.data
            } catch (err) {
                Alert.alert("Something went wrong while fetching your data, try again later")
            }
            return null
        },
        initialData: () => {
        }
    })

    useEffect(() => {
        if (isError) {
            Alert.alert("We could not load your data, try again later")
        }
    }, [isError]);

    return {isLoading, error, isError, user: data as User | undefined, refetch}
}