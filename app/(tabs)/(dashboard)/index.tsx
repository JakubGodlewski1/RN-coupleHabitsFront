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
import React, {useState} from "react";
import FilteredHabits from "@/components/FilteredHabits";
import CenteredActivityIndicator from "@/components/CenteredActivityIndicator";
import {ShadowsLight} from "@/styles/Shadows";
import NoHabitsInfoScreen from "@/app/(tabs)/(dashboard)/noHabitsInfoScreen";

export default function Dashboard() {
    const {user, isLoading} = useUser({polling: true})
    const [currentTab, setCurrentTab] = useState<DashboardTabKey>("todo")

    if (isLoading) {
        return <CenteredActivityIndicator/>;
    }

    if (!user) {
        return <View className="grow items-center justify-center">
            <Text classNames={{text: "text-center mx-4"}}>
                We were unable to retrieve your user data. Please contact our support team at
                <Text classNames={{text: "font-mainBold"}}> contact@couplehabits.com
                </Text>
            </Text>
        </View>
    }

    return <SafeAreaView className="grow" edges={["top"]}>
        <View className="relative grow" style={{gap: 16}}>
            <View style={{gap: 16}} className="px-4">
                <TopBar user={user}/>
                <Tabs<DashboardTabKey>
                    value={currentTab}
                    onPress={(tab) => setCurrentTab(tab)}
                    options={DASHBOARD_TABS}/>
            </View>
            <View className="grow bg-white p-2 rounded-t-3xl">
                {
                    user?.partner?.connected ? <>
                            <View style={ShadowsLight} className="flex-row justify-around bg-white p-2 rounded-2xl">
                                <Avatar ownership="main" url={user.avatar} text="You"/>
                                <Avatar ownership="partner" url={user.partner.avatar} text="Partner"/>
                            </View>
                            <View style={{gap: 8}} className="grow p-2">
                                <NoHabitsInfoScreen user={user} currentTab={currentTab}/>
                                <FilteredHabits habits={user.habits} currentTab={currentTab}/>
                            </View>
                        </> :
                        <ConnectWithPartnerDisplay user={user!}/>
                }
            </View>
        </View>
        {/*</RefetchHabitsOnPull>*/}
    </SafeAreaView>
}


