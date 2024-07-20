import {SafeAreaWrapper} from "@/components/SafeAreaWrapper";
import TopBar from "@/components/TopBar";
import Tabs from "@/components/Tabs";
import ConnectWithPartnerDisplay from "@/components/ConnectWithPartnerDisplay";
import {DASHBOARD_TABS} from "@/utils/consts";
import {DashboardTabKey, Habit} from "@/types";
import {View} from "react-native";
import Avatar from "@/components/Avatar";
import HabitCard from "@/components/HabitCard";

const habit: Habit = {
    id: "0",
    frequency: {
        type: "repeat",
        repeatOption: "daily"
    },
    details: {
        mine: {
            label: "Run for at least 10 minutes",
            completed: false
        },
        partner: {
            label: "Run for at least 10 minutes",
            completed: false
        },
    }
}

export default function Dashboard() {

    return <SafeAreaWrapper style={{gap: 16}} options={{disableBottomSafeArea: true}}>
        <TopBar/>
        <Tabs<DashboardTabKey> value="todo" onPress={() => {
        }} options={DASHBOARD_TABS}/>
        <View className="grow bg-white -mx-4 p-4 rounded-t-3xl">
            {/*<ConnectWithPartnerDisplay/>*/}
            <View className="flex-row justify-around ">
                <Avatar text="You"/>
                <Avatar text="Partner"/>
            </View>
            <View style={{gap: 8}} className="mt-4">
                <HabitCard habit={habit}/>
            </View>
        </View>
    </SafeAreaWrapper>
}


