import TopBar from "@/components/TopBar";
import Tabs from "@/components/Tabs";
import {DASHBOARD_TABS, EXAMPLE_HABIT} from "@/utils/consts";
import {DashboardTabKey} from "@/types";
import {View} from "react-native";
import Avatar from "@/components/Avatar";
import {SafeAreaView, useSafeAreaInsets} from "react-native-safe-area-context";
import React, {useEffect} from "react";
import HabitCard from "@/components/HabitCard";
import Text from "@/components/Text";
import {AntDesign} from "@expo/vector-icons";
import Button from "@/components/Button";
import {router} from "expo-router";

export default function DashboardInfo() {
    const {top, bottom} = useSafeAreaInsets()
    const transparency = "bg-black/60"

    return (
        <View className="relative grow">
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
                            {/*left column*/}
                            <View className="bg-white/95 rounded-lg absolute -top-3 -bottom-3 left-0 right-[51%]">
                                <View className="absolute bottom-0 left-0 right-0">
                                    <View className="absolute top-4 left-4 right-4 bg-white p-2 rounded-lg">
                                        <View className="absolute -top-3 left-[50%] -translate-x-1">
                                            <AntDesign name="caretup" size={20} color="white"/>
                                        </View>
                                        <Text
                                            classNames={{text: " text-center text-[16px]"}}>
                                            <Text classNames={{text: "text-[16px] font-mainExtraBold"}}>Your
                                                task </Text>
                                            (part of your shared habit) and
                                            <Text classNames={{text: "text-[16px] font-mainExtraBold"}}> your
                                                avatar </Text>
                                            (You can update it later)</Text>
                                    </View>
                                </View>
                            </View>
                            {/*right column*/}
                            <View
                                className="bg-white/95 rounded-lg absolute -top-3 -bottom-3 left-[51%] right-0">
                                <View className="absolute bottom-0 left-0 right-0">
                                    <View className="absolute top-4 left-4 right-4 bg-white p-2 rounded-lg">
                                        <View className="absolute -top-3 left-[50%] -translate-x-1">
                                            <AntDesign className="" name="caretup" size={20} color="white"/>
                                        </View>
                                        <Text
                                            classNames={{text: " text-center text-[16px]"}}>
                                            <Text classNames={{text: "text-[16px] font-mainExtraBold"}}>Your partner's
                                                task </Text>
                                            and their
                                            <Text
                                                classNames={{text: "text-[16px] font-mainExtraBold"}}> avatar</Text></Text>
                                    </View>
                                </View>
                            </View>
                            {/*elements inside*/}
                            <View
                                className="flex-row justify-around  p-2 rounded-2xl z-30">
                                <Avatar ownership="main" url={null} text="You"/>
                                <Avatar ownership="partner" url={null} text="Partner"/>
                            </View>
                            <View style={{gap: 8}} className="grow p-2 mt-4">
                                <HabitCard habit={EXAMPLE_HABIT}/>
                            </View>
                        </View>
                    </View>
                </View>
                <View className={`${transparency} px-4`}>
                    <Button classNames={{wrapper: "mt-auto mb-2"}} onPress={() => router.push("/avatar-info")}
                            title="Next"/>
                </View>
            </SafeAreaView>
        </View>

    )
}