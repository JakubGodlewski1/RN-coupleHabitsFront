import TopBar from "@/components/TopBar";
import Tabs from "@/components/Tabs";
import {DASHBOARD_TABS} from "@/utils/consts";
import {DashboardTabKey} from "@/types";
import {View} from "react-native";
import Avatar from "@/components/Avatar";
import {SafeAreaView, useSafeAreaInsets} from "react-native-safe-area-context";
import React, {PropsWithChildren} from "react";
import Text from "@/components/Text";
import {AntDesign} from "@expo/vector-icons";
import Button from "@/components/Button";
import {router} from "expo-router";
import {useUser} from "@/api/hooks/useUser";

export default function AvatarInfo() {
    const {user} = useUser()

    return <Surroundings>
        <View className="relative">
            <View className="absolute bottom-0 left-0 right-0">
                <View className="absolute top-2 -left-6 -right-6">
                    <View className="mx-auto -mb-2">
                        <AntDesign name="caretup" size={20} color="white"/>
                    </View>
                    <View className="bg-white p-2 rounded-lg">
                        <TextView/>
                    </View>
                </View>
            </View>
            <Avatar ownership="main" url={user?.avatar || null} text="You"/>
        </View>
    </Surroundings>
}

const Surroundings = ({children}: PropsWithChildren) => {
    const {top, bottom} = useSafeAreaInsets()
    const transparency = "bg-black/60"

    return <View className="relative grow">
        <View style={{height: top}} className={`z-10 absolute top-0 left-0 right-0 ${transparency}`}/>
        <View style={{height: bottom}} className={`z-10 absolute bottom-0 left-0 right-0 ${transparency}`}/>
        <SafeAreaView className="grow">
            <View className="grow" style={{gap: 16}}>
                <View className={`z-10 absolute top-0 bottom-0 left-0 right-0 ${transparency}`}/>
                <View style={{gap: 16}} className="px-4">
                    <TopBar/>
                    <Tabs<DashboardTabKey>
                        value="todo"
                        onPress={() => {
                        }}
                        options={DASHBOARD_TABS}/>
                </View>
                <View className="grow bg-white p-2 rounded-t-3xl z-30 relative">
                    <View className={`absolute top-0 bottom-0 left-0 right-0 z-50 rounded-t-3xl ${transparency}`}/>
                    <View className="z-[60]">
                        <View
                            className="flex-row justify-around p-2 rounded-2xl">
                            {children}
                            <View>
                                <View
                                    className={`absolute top-0 bottom-0 left-0 right-0 z-50 rounded-full ${transparency}`}/>
                                <Avatar ownership="partner" url={null} text="Partner"/>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
            <View className={`${transparency} px-4`}>
                <Button classNames={{wrapper: "mt-auto mb-2"}} onPress={() => router.push("/(dashboard)")}
                        title="Next"/>
            </View>
        </SafeAreaView>
    </View>
}

const TextView = () => <View className="relative">
    <Text classNames={{text: "text-[16px] text-center"}}>
        Click here to update your avatar
    </Text>
</View>