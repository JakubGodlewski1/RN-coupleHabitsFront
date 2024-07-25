import {SafeAreaWrapper} from "@/components/SafeAreaWrapper";
import TopBar from "@/components/TopBar";
import Tabs from "@/components/Tabs";
import ConnectWithPartnerDisplay from "@/components/ConnectWithPartnerDisplay";
import {DASHBOARD_TABS, EXAMPLE_HABIT} from "@/utils/consts";
import {DashboardTabKey} from "@/types";
import {View} from "react-native";
import {router} from "expo-router";
import {useUser} from "@/api/hooks/useUser";
import CenteredActivityIndicator from "@/components/CenteredActivityIndicator";
import Avatar from "@/components/Avatar";
import HabitCard from "@/components/HabitCard";

export default function Dashboard() {
    const {data: user, isLoading} = useUser()

    if (isLoading) {
        return <CenteredActivityIndicator/>
    }

    return <SafeAreaWrapper classNames={{wrapper: "relative"}} style={{gap: 16}}
                            options={{disableBottomSafeArea: true}}>
        <TopBar/>
        <Tabs<DashboardTabKey> value="todo" onPress={() => router.push("/pricing")} options={DASHBOARD_TABS}/>
        <View className="grow bg-white -mx-4 p-4 rounded-t-3xl">
            {
                user.partner ? <>
                        <View className="flex-row justify-around ">
                            <Avatar text="You"/>
                            <Avatar text="Partner"/>
                        </View>
                        <View style={{gap: 8}} className="mt-4">
                            <HabitCard habit={EXAMPLE_HABIT}/>
                        </View>
                    </> :
                    <ConnectWithPartnerDisplay/>
            }
        </View>
    </SafeAreaWrapper>
}


