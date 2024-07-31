import {View, TouchableOpacity, Alert} from "react-native";
import Animated, {useAnimatedStyle, useSharedValue, withSpring} from "react-native-reanimated";
import {Feather} from "@expo/vector-icons";
import {PanGestureHandler, Swipeable} from "react-native-gesture-handler";
import {PropsWithChildren, ReactNode, useEffect, useRef, useState} from "react";
import Text from "@/components/Text";
import {Habit, HabitFormType} from "@/types";
import {useDeleteHabit} from "@/api/hooks/useDeleteHabit";
import {useUpdateHabit} from "@/api/hooks/useUpdateHabit";
import {router} from "expo-router";

export default function SwipebleCardWrapper({habit, children}: { habit: Habit, children: ReactNode }) {
    const {isDeleting, deleteHabit} = useDeleteHabit()
    const swipeableRef = useRef(null)

    const leftSwipe = () => {
        return <View className="my-auto items-center justify-center w-24">
            <Text classNames={{text: "text-center"}}>Strike: </Text>
            <Text
                classNames={{text: "font-mainBold text-center"}}>🔥12 days</Text>
        </View>
    }

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
                onPress={() => {
                    router.push({
                        pathname: "habit-form",
                        params: {
                            type: "update",
                            initHabitJSON: JSON.stringify(habit)
                        } as HabitFormType
                    })
                    // @ts-ignore
                    swipeableRef.current?.close()
                }}
                className="bg-tertiary flex-1 rounded-xl items-center justify-center"
            >
                <Feather color="white" size={20} name="edit"/>
            </TouchableOpacity>
        </View>
    }

    return <Swipeable
        ref={swipeableRef}
        renderRightActions={rightSwipe}
        renderLeftActions={leftSwipe}
    >
        {children}
    </Swipeable>


}