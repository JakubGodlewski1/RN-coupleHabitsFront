import {DashboardTabKey, Habit} from "@/types";
import {RefreshControl, ScrollView, SectionList, View} from "react-native";
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

    return <ScrollView
        contentContainerStyle={{gap: 12}}
        showsVerticalScrollIndicator={false}
        style={{flex: 1}}
    >
        {options[currentTab].map(({label, data}) => (
            <>
                {data.length > 0 ? <View key={label} className="bg-[#F6F6F6] px-4 py-2 rounded-full mx-auto my-2">
                    <Text classNames={{text: "text-sm font-mainSemiBold"}}>{label}</Text>
                </View> : <></>}
                {
                    data.map(h => (
                        <HabitCard hideIndicators={currentTab === "all"} key={h.id} habit={h}/>
                    ))
                }
            </>
        ))}
        <View className="h-6"></View>
    </ScrollView>

}