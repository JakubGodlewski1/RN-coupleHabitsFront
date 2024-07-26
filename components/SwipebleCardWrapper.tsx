import {View, TouchableOpacity, Alert} from "react-native";
import Animated, {useAnimatedStyle, useSharedValue, withSpring} from "react-native-reanimated";
import {Feather} from "@expo/vector-icons";
import {PanGestureHandler, Swipeable} from "react-native-gesture-handler";
import {PropsWithChildren, ReactNode, useState} from "react";
import Text from "@/components/Text";
import {Habit, HabitFormType} from "@/types";
import {useDeleteHabit} from "@/api/hooks/useDeleteHabit";
import {useUpdateHabit} from "@/api/hooks/useUpdateHabit";
import {router} from "expo-router";

export default function SwipebleCardWrapper({habit, children}: { habit: Habit, children: ReactNode }) {
    const translateY = useSharedValue(0);
    const [isSwipedUp, setIsSwipedUp] = useState(false);
    const {isDeleting, deleteHabit} = useDeleteHabit()

    const gestureHandler = (event: any) => {
        if (event.nativeEvent.translationY < -20) {
            setIsSwipedUp(true)
            translateY.value = withSpring(-50, {
                damping: 20,
                stiffness: 300,
                mass: 0.5
            })
        } else {
            setIsSwipedUp(false)
            translateY.value = withSpring(0,
                {
                    damping: 20,
                    stiffness: 300,
                    mass: 0.5
                })
        }
    };

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{translateY: translateY.value}],
        };
    });

    const rightSwipe = () => {
        return <View style={{gap: 4}} className=" w-16 p-1">
            <TouchableOpacity
                onPress={() => Alert.alert("Deleting", "Are you sure you want to delete this habit?",
                    [
                        {text: "Cancel"},
                        {text: "Yes", onPress: () => deleteHabit(habit.id)},
                    ])}
                className="bg-primary flex-1 rounded-xl items-center justify-center"
            >
                <Feather color={isDeleting ? "gray/30" : "white"} size={20} name="trash-2"/>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => router.push({
                    pathname: "habit-form",
                    params: {
                        type: "update",
                        initHabitJSON: JSON.stringify(habit)
                    } as HabitFormType
                })}
                className="bg-tertiary flex-1 rounded-xl items-center justify-center"
            >
                <Feather color="white" size={20} name="edit"/>
            </TouchableOpacity>
        </View>
    }

    return <>
        {isSwipedUp && (
            <View className="absolute bottom-0 w-[94%] mx-[3%] mb-1 flex-row border-t-[0.6px] border-skip pt-[2px]">
                <Text classNames={{text: "mr-auto"}}>Strike: 🔥 <Text
                    classNames={{text: "font-mainBold"}}>12</Text></Text>
            </View>
        )}
        <PanGestureHandler onGestureEvent={gestureHandler}>
            <Animated.View style={[{overflow: "hidden"}, animatedStyle]}>
                <Swipeable
                    renderRightActions={rightSwipe}
                >
                    {children}
                </Swipeable>
            </Animated.View>
        </PanGestureHandler>
    </>


}