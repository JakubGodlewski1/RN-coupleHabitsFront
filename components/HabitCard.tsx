import React, {useRef, useState} from 'react';
import {Pressable,  View} from 'react-native';

import Text from "@/components/Text";
import {Shadows} from "@/styles/Shadows";
import {Habit} from "@/types";
import BouncyCheckbox from "react-native-bouncy-checkbox";

type Props = {
    habit: Habit,

    options?:{
        disabled?: boolean,
        noCheckboxes?: boolean,
        noMiddleLines?: boolean
    }
}

const defaultOptions = {disabled:false, noCheckboxes:false, noMiddleLines:false};
const HabitCard = ({habit, options=defaultOptions }:Props) => {


    return  <View className="relative bg-white rounded-lg flex-row space-x-3 h-[88px]" style={Shadows.sm}>
        <Pressable
            className="m-1.5 min-w-0 p-2 bg-white flex-1 flex-row justify-start items-start rounded-md"
            style={[Shadows.sm, {elevation:2}]}
        >
            {!options?.noCheckboxes && (
                <BouncyCheckbox
                    disableBuiltInState
                    isChecked={habit.details.mine.completed}
                    bounceEffectIn={1.2}
                    innerIconStyle={{borderRadius:4}}
                    iconStyle={{borderRadius:4}}
                    fillColor="#25e56b"
                    size={18}
                    className="-mr-2 w-8"
                />
            )}
            <Text classNames={{wrapper:"shrink tracking-tight leading-5"}}>Read at least one page of non-fiction a day</Text>
        </Pressable>
        <View className="bg-white flex-1 rounded-md p-2 relative m-1.5" style={[Shadows.sm, {elevation:2}]}>
            <Text classNames={{wrapper:"shrink tracking-tight leading-5"}}>{habit.details.partner.label}</Text>
            {!options?.noCheckboxes && (
                <View className={`absolute bottom-1 right-1 w-3.5 h-3.5 rounded-full ${habit.details.partner.completed ? "bg-success" :"bg-error"}`}></View>
            )}
        </View>
        {!options?.noMiddleLines && (
            <View className="absolute left-[50%] right-[50%] h-full border-x-[1px] -translate-x-[17px] border-gray-200 w-2.5"></View>
        )}
    </View>
};

export default HabitCard;
