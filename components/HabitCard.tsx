import {Alert, StyleSheet, TouchableOpacity, View} from 'react-native';
import Text from "@/components/Text";
import {Habit} from "@/types";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import {PanGestureHandler, Swipeable} from "react-native-gesture-handler";
import {Shadows} from "@/styles/Shadows";
import {Feather} from "@expo/vector-icons";
import Animated, {useAnimatedStyle, useSharedValue, withSpring} from "react-native-reanimated";

type Props = {
    habit: Habit,

    options?: {
        disabled?: boolean,
        noCheckboxes?: boolean,
    }
}

const defaultOptions = {disabled: false, noCheckboxes: false};


const HabitCard = ({habit, options = defaultOptions}: Props) => {
    const translateY = useSharedValue(0);

    const gestureHandler = (event: any) => {
        if (event.nativeEvent.translationY < -20) {
            translateY.value = withSpring(-50, {
                damping: 20,
                stiffness: 300,
                mass: 0.5
            })
        } else {
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
                onPress={() => Alert.alert("Deleting", "Are you sure you want to delete this habit?", [{text: "Cancel"}, {text: "Yes"}])}
                className="bg-primary flex-1 rounded-xl items-center justify-center"
            >
                <Feather color="white" size={20} name="trash-2"/>
            </TouchableOpacity>
            <TouchableOpacity className="bg-tertiary flex-1 rounded-xl items-center justify-center">
                <Feather color="white" size={20} name="edit"/>
            </TouchableOpacity>
        </View>
    }

    return <View className="border-2 border-skip rounded-2xl overflow-hidden">
        <View style={{...Shadows}} className="m-2 rounded-2xl bg-white">
            <View className="absolute bottom-0 w-[94%] mx-[3%] mb-1 flex-row border-t-[0.6px] border-skip pt-[2px]">
                <Text classNames={{text: "mr-auto"}}>Strike: 🔥 <Text
                    classNames={{text: "font-mainBold"}}>12</Text></Text>
            </View>
            <PanGestureHandler onGestureEvent={gestureHandler}>
                <Animated.View style={[{overflow: "hidden"}, animatedStyle]}>
                    <Swipeable
                        renderRightActions={rightSwipe}
                    >
                        <View className="flex-row bg-white h-[88px] rounded-2xl ">
                            <TouchableOpacity
                                activeOpacity={100}
                                onPress={() => {
                                }}
                                className=" py-2 px-4 flex-1 bg-white rounded-l-xl items-center border-r-[0.2px]"
                            >
                                <Text
                                    classNames={{text: "shrink text-center text-sm -ml-2 font-mainBold mb-auto"}}>{habit.details.mine.label}</Text>
                                <BouncyCheckbox
                                    style={{marginRight: "auto"}}
                                    fillColor="#6EC166"
                                    disableBuiltInState={true}
                                    isChecked={habit.details.mine.completed}
                                    onPress={() => {
                                    }}
                                    size={20}
                                    innerIconStyle={{
                                        borderRadius: 4,
                                        borderColor: habit.details.mine.completed ? "#6EC166" : "gray"
                                    }}
                                    iconStyle={{borderRadius: 4}}
                                />
                            </TouchableOpacity>
                            <View
                                className={`p-2 flex-1 bg-white border-r-4 rounded-r-xl
                     ${habit.details.partner.completed ? "border-secondary" : "border-primary"}`}
                            >
                                <Text
                                    classNames={{text: "shrink text-center text-sm font-mainBold"}}>{habit.details.partner.label}</Text>
                            </View>
                        </View>
                    </Swipeable>
                </Animated.View>
            </PanGestureHandler>
        </View>
    </View>
};

export default HabitCard;


const styles = StyleSheet.create({
    card: {
        width: 300,
        height: 400,
        backgroundColor: 'lightblue',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.25,
        shadowRadius: 5,
        elevation: 5,
    },
});