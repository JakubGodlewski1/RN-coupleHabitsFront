import {DashboardTabKey, Habit} from "@/types";
import {RefreshControl, SectionList, View} from "react-native";
import {allTabSections, completedTabSections, todoTabSections} from "@/utils/habitFilters";
import HabitCard from "@/components/HabitCard";
import Text from "@/components/Text";
import {useCallback, useState} from "react";
import {queryClient} from "@/api/queryClient";
import {queryKeys} from "@/api/queryKeys";

type Props = {
    habits: Habit[],
    currentTab: DashboardTabKey
}

export default function FilteredHabits({currentTab, habits}: Props) {
    const options = {
        all: allTabSections(habits),
        completed: completedTabSections(habits),
        todo: todoTabSections(habits)
    }

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

    return <SectionList
        showsVerticalScrollIndicator={false}
        style={{
            flex: 1
        }}
        ListFooterComponent={
            <View className="h-10"></View>
        }
        scrollToOverflowEnabled={true}
        scrollEnabled={true}
        refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>
        }
        sections={options[currentTab]}
        keyExtractor={item => item.id}
        renderItem={(item) => (
            <View className="mb-3">
                <HabitCard habit={item.item}/>
            </View>

        )}
        renderSectionHeader={({section: {data, label}}) => {
            return data.length > 0 ? <View className="bg-[#F6F6F6] px-4 py-2 rounded-full mx-auto my-2">
                <Text classNames={{text: "text-sm font-mainSemiBold"}}>{label}</Text>
            </View> : <></>
        }}
    />
}