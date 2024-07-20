import React from 'react';
import {Alert, TouchableOpacity, View} from 'react-native';

import Text from "@/components/Text";
import {Habit} from "@/types";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import {Swipeable} from "react-native-gesture-handler";
import {Shadows} from "@/styles/Shadows";
import {Feather} from "@expo/vector-icons";

type Props = {
    habit: Habit,

    options?: {
        disabled?: boolean,
        noCheckboxes?: boolean,
    }
}

const defaultOptions = {disabled: false, noCheckboxes: false};


const HabitCard = ({habit, options = defaultOptions}: Props) => {

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

    return <View className="border-2 border-skip rounded-2xl">
        <View style={{...Shadows}} className="m-2 rounded-2xl bg-white">
            <Swipeable
                renderRightActions={rightSwipe}
            >
                <View className="flex-row bg-white h-[88px] rounded-2xl">
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


        </View>
    </View>
};

export default HabitCard;
