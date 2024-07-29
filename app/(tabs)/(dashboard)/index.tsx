import TopBar from "@/components/TopBar";
import Tabs from "@/components/Tabs";
import ConnectWithPartnerDisplay from "@/components/ConnectWithPartnerDisplay";
import {DASHBOARD_TABS} from "@/utils/consts";
import {DashboardTabKey} from "@/types";
import {View} from "react-native";
import {useUser} from "@/api/hooks/useUser";
import Avatar from "@/components/Avatar";
import Text from "@/components/Text";
import {SafeAreaView} from "react-native-safe-area-context";
import RefetchHabitsOnPull from "@/components/RefetchHabitsOnPull";
import {useEffect, useRef, useState} from "react";
import FilteredHabits from "@/components/FilteredHabits";
import CenteredActivityIndicator from "@/components/CenteredActivityIndicator";

export default function Dashboard() {
    const {user, isLoading} = useUser()
    const [currentTab, setCurrentTab] = useState<DashboardTabKey>("todo")

    if (isLoading) {
        return <CenteredActivityIndicator/>;
    }

    if (isLoading) {
        return <CenteredActivityIndicator/>
    }

    return <SafeAreaView className="grow" edges={["top"]}>
        {/*<RefetchHabitsOnPull>*/}
        <View className="relative grow" style={{gap: 16}}>
            <View style={{gap: 16}} className="px-4">
                <TopBar/>
                <Tabs<DashboardTabKey>
                    value={currentTab}
                    onPress={(tab) => setCurrentTab(tab)}
                    options={DASHBOARD_TABS}/>
            </View>
            <View className="grow bg-white p-4 rounded-t-3xl">
                {
                    user?.partner.connected ? <>
                            <View className="flex-row justify-around ">
                                <Avatar text="You"/>
                                <Avatar text="Partner"/>
                            </View>
                            <View style={{gap: 8}} className="mt-4 grow">
                                {user.habits.length !== 0 ?
                                    <FilteredHabits habits={user.habits} currentTab={currentTab}/> :
                                    (
                                        <Text classNames={{text: "text-center mt-4 mx-14"}}>After adding your first
                                            habit,
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
        {/*</RefetchHabitsOnPull>*/}
    </SafeAreaView>
}


