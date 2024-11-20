import {Alert, TouchableOpacity, View} from "react-native";
import {Feather} from "@expo/vector-icons";
import {Swipeable} from "react-native-gesture-handler";
import {ReactNode, RefObject, useEffect, useRef} from "react";
import Text from "@/components/Text";
import {Habit, HabitFormType} from "@/types";
import {useDeleteHabit} from "@/api/hooks/useDeleteHabit";
import {router} from "expo-router";
import {queryKeys} from "@/api/queryKeys";
import {useQueryClient} from "@tanstack/react-query";
import {useOptimisticUpdateContext} from "@/hooks/useOptimisticUpdateContext";

type Props = {
    habit: Habit,
    children: ReactNode,
    options?: {
        animate?: (swipeableRef: RefObject<Swipeable>) => NodeJS.Timeout | undefined
    }
}

export default function SwipebleCardWrapper({habit, children, options}: Props) {
    const {isDeleting, deleteHabit, status} = useDeleteHabit()
    const queryClient = useQueryClient();
    const {setIsUpdating} = useOptimisticUpdateContext()

    const handleDeleteHabit = (id: string) => {
        queryClient.cancelQueries({queryKey: [queryKeys.useUser]})
        setIsUpdating(true)
        deleteHabit(id)
    }

    useEffect(() => {
        if (status === "success" || status === "error") {
            setIsUpdating(false)
        }
    }, [status]);

    //animate the card
    const swipeableRef = useRef<Swipeable>(null)

    useEffect(() => {
        let id = undefined as NodeJS.Timeout | undefined
        if (options?.animate && swipeableRef)
            id = options.animate(swipeableRef)

        return () => clearTimeout(id)
    }, [swipeableRef.current]);

    const leftSwipe = () => {
        return <View className="my-auto items-center justify-center w-24">
            <Text classNames={{text: "text-center"}}>Strike: </Text>
            <Text
                classNames={{text: "font-mainBold text-center"}}>🔥{habit.strike} days</Text>
        </View>
    }

    const rightSwipe = () => {
        return <View style={{gap: 4}} className=" w-16 p-1">
            <TouchableOpacity
                onPress={() => Alert.alert("Deleting", "Are you sure you want to delete this habit?",
                    [
                        {text: "Cancel"},
                        {text: "Yes", onPress: () => handleDeleteHabit(habit.id)},
                    ])}
                className="bg-primary flex-1 rounded-xl items-center justify-center"
            >
                <Feather color={isDeleting ? "gray/30" : "white"} size={20} name="trash-2"/>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => {
                    router.push({
                        pathname: "/habit-form",
                        params: {
                            type: "update",
                            initHabitJSON: JSON.stringify(habit)
                        } as HabitFormType
                    })
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