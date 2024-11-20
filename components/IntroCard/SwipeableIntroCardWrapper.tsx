import {TouchableOpacity, View} from "react-native";
import {Feather} from "@expo/vector-icons";
import {Swipeable} from "react-native-gesture-handler";
import {ReactNode, RefObject, useEffect, useRef} from "react";
import Text from "@/components/Text";
import {Habit} from "@/types";

type Props = {
    habit: Habit,
    children: ReactNode,
    options?: {
        animate?: (swipeableRef: RefObject<Swipeable>) => NodeJS.Timeout | undefined
    }
}

export default function SwipebleIntroCardWrapper({habit, children, options}: Props) {

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
                className="bg-primary flex-1 rounded-xl items-center justify-center"
            >
                <Feather color="white" size={20} name="trash-2"/>
            </TouchableOpacity>
            <TouchableOpacity
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