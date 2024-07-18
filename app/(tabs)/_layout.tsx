import {Link, Navigator, router} from "expo-router";
import {Image, Platform, TouchableOpacity, View} from "react-native";
import {SafeAreaWrapper} from "@/components/SafeAreaWrapper";
// @ts-ignore
import bulb from "./../../assets/icons/bulb.png"
// @ts-ignore
import bulb_active from "./../../assets/icons/bulb_active.png"
import {Ionicons, MaterialCommunityIcons} from "@expo/vector-icons";
import Slot = Navigator.Slot;
import {ReactNode, useState} from "react";

type CurrentPage = "ideas" | "dashboard" | "settings"

const icons: { name: CurrentPage, body: (currentPage: CurrentPage) => ReactNode }[] = [{
    name: "ideas",
    body: (currentPage: CurrentPage) => <Image className="w-10 h-10"
                                               source={currentPage === "ideas" ? bulb_active : bulb}/>
},
    {
        name: "dashboard",
        body: (currentPage) => <MaterialCommunityIcons color={currentPage === "dashboard" ? "#413085" : "#5CBFEC"}
                                                       size={40} name="view-dashboard"/>
    },
    {
        name: "settings",
        body: (currentPage) => <Ionicons size={40} color={currentPage === "settings" ? "#413085" : "#5CBFEC"}
                                         name="settings-sharp"/>
    }


]

export default function TabsLayout() {
    const [currentPage, setCurrentPage] = useState<CurrentPage>("dashboard");

    return <View className="grow justify-center">
        <SafeAreaWrapper options={{disableBottomSafeArea: true}}>
            {<Slot/>}
        </SafeAreaWrapper>
        <View className="h-32 items-center justify-evenly flex-row">
            {icons.map(icon => (
                <TouchableOpacity
                    key={icon.name}
                    activeOpacity={100}
                    className={
                        `px-2.5 py-4 rounded-full
                     ${currentPage === icon.name ? "bg-white" : ""}
                     ${Platform.OS === "android" ? "-mb-4" : "-mb-2"}
                     `}
                    onPress={() => {
                        setCurrentPage(icon.name)
                        router.replace(`/(tabs)/${icon.name}`)
                    }}>
                    {icon.body(currentPage)}
                </TouchableOpacity>
            ))}

            {Platform.OS === "ios" ?
                <View
                    className="-z-10 bg-tertiaryLight h-[60vw] mt-auto rounded-t-full absolute w-[120vw] -left-[10%] top-0"/> :
                <View
                    className="-z-10 bg-tertiaryLight h-[100vw] mt-auto rounded-t-full absolute w-[200vw] -left-[50%] top-0"/>
            }
        </View>
    </View>
}