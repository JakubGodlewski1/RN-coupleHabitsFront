import TopBar from "@/components/TopBar";
import Tabs from "@/components/Tabs";
import ConnectWithPartnerDisplay from "@/components/ConnectWithPartnerDisplay";
import {DASHBOARD_TABS} from "@/utils/consts";
import {DashboardTabKey} from "@/types";
import {RefreshControl, ScrollView, View} from "react-native";
import {useUser} from "@/api/hooks/useUser";
import Avatar from "@/components/Avatar";
import HabitCard from "@/components/HabitCard";
import Text from "@/components/Text";
import {useCallback, useState} from "react";
import {SafeAreaView} from "react-native-safe-area-context";
import {queryClient} from "@/api/queryClient";
import {queryKeys} from "@/api/queryKeys";

export default function Dashboard() {
    const {user} = useUser()
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

    return <SafeAreaView className="grow" edges={["top"]}>
        <ScrollView
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>
            } contentContainerStyle={{flexGrow: 1, overflow: "visible"}}>
            <View className="relative grow " style={{gap: 16}}>
                <View style={{gap: 16}} className="px-4">
                    <TopBar/>
                    <Tabs<DashboardTabKey> value="todo" onPress={() => {
                    }} options={DASHBOARD_TABS}/>
                </View>

                <View className="grow bg-white p-4 rounded-t-3xl">
                    {
                        user?.gameAccount ? <>
                                <View className="flex-row justify-around ">
                                    <Avatar text="You"/>
                                    <Avatar text="Partner"/>
                                </View>
                                <View style={{gap: 8}} className="mt-4">
                                    {user.habits.map(h => (
                                        <HabitCard key={h.id} habit={h}/>
                                    ))}
                                    {user.habits.length === 0 && (
                                        <Text classNames={{text: "text-center mt-4 mx-14"}}>After adding your first habit,
                                            you
                                            will
                                            see it here.</Text>
                                    )}
                                </View>
                            </> :
                            <ConnectWithPartnerDisplay/>
                    }
                </View>
            </View>
        </ScrollView>


    </SafeAreaView>
}


