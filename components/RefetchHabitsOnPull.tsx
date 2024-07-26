import {RefreshControl, ScrollView} from "react-native";
import {PropsWithChildren, useCallback, useState} from "react";
import {queryClient} from "@/api/queryClient";
import {queryKeys} from "@/api/queryKeys";

export default function RefetchHabitsOnPull({children}: PropsWithChildren) {
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        await queryClient.invalidateQueries({
            queryKey: [queryKeys.useUser]
        }, {
            throwOnError: false
        })
        setRefreshing(false);
    }, []);

    return <ScrollView
        refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>
        } contentContainerStyle={{flexGrow: 1, overflow: "visible"}}>
        {children}
    </ScrollView>
}