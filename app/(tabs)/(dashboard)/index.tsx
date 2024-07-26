import {SafeAreaWrapper} from "@/components/SafeAreaWrapper";
import TopBar from "@/components/TopBar";
import Tabs from "@/components/Tabs";
import ConnectWithPartnerDisplay from "@/components/ConnectWithPartnerDisplay";
import {DASHBOARD_TABS, EXAMPLE_HABIT} from "@/utils/consts";
import {DashboardTabKey} from "@/types";
import {View} from "react-native";
import {router} from "expo-router";
import {useUser} from "@/api/hooks/useUser";
import Avatar from "@/components/Avatar";
import HabitCard from "@/components/HabitCard";
import Text from "@/components/Text";

export default function Dashboard() {
    const {user} = useUser()

    return <SafeAreaWrapper classNames={{wrapper: "relative"}} style={{gap: 16}}
                            options={{disableBottomSafeArea: true}}>
        <TopBar/>
        <Tabs<DashboardTabKey> value="todo" onPress={() => {
        }} options={DASHBOARD_TABS}/>
        <View className="grow bg-white -mx-4 p-4 rounded-t-3xl">
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
                                <Text classNames={{text: "text-center mt-4 mx-14"}}>After adding your first habit, you will
                                    see it here.</Text>
                            )}
                        </View>
                    </> :
                    <ConnectWithPartnerDisplay/>
            }
        </View>
    </SafeAreaWrapper>
}


