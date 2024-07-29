import React, {PropsWithChildren, useCallback, useState, Children, ReactElement} from "react";
import {FlatList, RefreshControl, View} from "react-native";
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
        });
        setRefreshing(false);
    }, []);

    const childArray: ReactElement[] = Children.toArray(children) as ReactElement[];

    const renderItem = ({item}: { item: ReactElement }) => {
        return item;
    };

    return (
        <FlatList
            nestedScrollEnabled={true}
            CellRendererComponent={({children, style}) => (
                <View style={[style, {flex: 1}]} children={children}/>
            )}
            contentContainerStyle={{flexGrow: 1, maxHeight: 100}}
            data={childArray}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>
            }
        />
    );
}