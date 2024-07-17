import React from 'react';
import {TouchableOpacity, View} from 'react-native';

import Text from "@/components/Text";
import {Habit} from "@/types";
import BouncyCheckbox from "react-native-bouncy-checkbox";

type Props = {
    habit: Habit,

    options?:{
        disabled?: boolean,
        noCheckboxes?: boolean,
    }
}

const defaultOptions = {disabled:false, noCheckboxes:false};


const HabitCard = ({habit, options=defaultOptions }:Props) => {
    const [isSelected, setIsSelected] = React.useState(false);

    return <>
        <View className="border-2 border-skip rounded-2xl">
            <View  className="m-2 flex-row h-[88px]">
                <TouchableOpacity
                    activeOpacity={100}
                    onPress={()=>setIsSelected(p=>options?.disabled ? p : !p)}
                    className=" p-2 flex-1 bg-white rounded-l-xl flex-row items-start border-r-[0.2px]"
                >
                    <BouncyCheckbox
                        fillColor="#6EC166"
                        disableBuiltInState={true}
                        isChecked={habit.details.mine.completed}
                        onPress={()=>setIsSelected(p=>options?.disabled ? p : !p)}
                        size={20}
                        innerIconStyle={{borderRadius:4,  borderColor: habit.details.mine.completed ? "#6EC166":"gray"}}
                        iconStyle={{borderRadius:4}}
                    />
                    <Text classNames={{text:"shrink text-sm -ml-2 font-mainBold"}}>{habit.details.mine.label}</Text>
                </TouchableOpacity>
                <View
                    className={`p-2 flex-1 bg-white border-r-4 rounded-r-xl
                     ${habit.details.partner.completed ? "border-secondary" : "border-primary"}`}
                >
                    <Text classNames={{text:"shrink text-sm font-mainBold"}}>{habit.details.partner.label}</Text>
                </View>
            </View>
        </View>
    </>

};

export default HabitCard;
