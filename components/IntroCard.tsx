import {Alert, TouchableOpacity, View, Animated} from "react-native";
import {Shadows} from "@/styles/Shadows";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import Text from "@/components/Text";
import {EXAMPLE_HABIT} from "@/utils/consts";
import {Feather} from "@expo/vector-icons";
import {useEffect, useRef, useState} from "react";

const habit = EXAMPLE_HABIT

export default function IntroCard({type}: { type: "top" | "left" }) {
    const [isLeftVisible, setLeftVisible] = useState<boolean>(false);
    const [isTopVisible, setTopVisible] = useState<boolean>(false);
    const animateSwipe = useRef(new Animated.Value(0)).current; // Initial value for right position: 0

    useEffect(() => {
        // Animate to the new position when isLeftVisible changes
        Animated.timing(animateSwipe, {
            toValue: type === "left" ? isLeftVisible ? 64 : 0 : isTopVisible ? 50 : 0,
            duration: 300,
            useNativeDriver: false,
        }).start();
    }, [isLeftVisible, animateSwipe, isTopVisible]);

    useEffect(() => {
        const intervalId = setInterval(() => {
            if (type === "left") {
                setLeftVisible(p => !p)
            }
            if (type === "top") {
                setTopVisible(p => !p)
            }
        }, 1500)
        return () => clearInterval(intervalId)
    }, []);

    return <View className="border-2 border-skip rounded-2xl overflow-hidden">
        <View style={{...Shadows}} className="m-2 rounded-2xl bg-white">
            {type === "left" && <LeftSwipeView/>}
            {type === "top" && <TopSwipeView/>}
            <Animated.View
                style={{right: type === "left" ? animateSwipe : 0, bottom: type === "top" ? animateSwipe : 0}}
                className="flex-row bg-white h-[88px] rounded-2xl relative">
                <View
                    className=" py-2 px-4 flex-1 bg-white rounded-l-xl items-center border-r-[0.2px]"
                >
                    <Text
                        classNames={{text: "shrink text-center text-sm -ml-2 font-mainBold mb-auto"}}>{habit.details.mine.label}</Text>
                    <BouncyCheckbox
                        style={{marginRight: "auto"}}
                        fillColor="#6EC166"
                        size={20}
                        innerIconStyle={{
                            borderRadius: 4,
                            borderColor: "gray"
                        }}
                        iconStyle={{borderRadius: 4}}
                    />
                </View>
                <View
                    className={`p-2 flex-1 bg-white border-r-4 rounded-r-xl border-primary`}
                >
                    <Text
                        classNames={{text: "shrink text-center text-sm font-mainBold"}}>{habit.details.partner.label}</Text>
                </View>
            </Animated.View>
        </View>
    </View>
}


const LeftSwipeView = () => <View style={{gap: 4}} className=" w-16 p-1 absolute right-0 top-0 bottom-0 -z-10">
    <View className="bg-primary flex-1 rounded-xl items-center justify-center">
        <Feather color="white" size={20} name="trash-2"/>
    </View>
    <View className="bg-tertiary flex-1 rounded-xl items-center justify-center">
        <Feather color="white" size={20} name="edit"/>
    </View>
</View>

const TopSwipeView = () => <View
    className="absolute bottom-0 w-[94%] mx-[3%] mb-1 flex-row  border-t-[0.6px] border-skip pt-[2px]">
    <Text classNames={{text: "mx-auto"}}>Strike: 🔥 <Text
        classNames={{text: "font-mainBold"}}>12</Text></Text>
</View>