import {TouchableOpacity, View} from 'react-native';
import Text from "@/components/Text";
import {Habit} from "@/types";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import {Shadows} from "@/styles/Shadows";
import SwipebleCardWrapper from "@/components/SwipebleCardWrapper";
import {useUpdateHabit} from "@/api/hooks/useUpdateHabit";
import {produce} from "immer";

const HabitCard = ({habit}: { habit: Habit }) => {
    const {updateHabit, isUpdating} = useUpdateHabit({isToggle: true})

    const onToggle = () => {
        updateHabit(produce(habit, draft => {
            draft.details.mine.completed = !habit.details.mine.completed
        }))
    }

    return <View className="border-2 border-skip rounded-2xl overflow-hidden">
        <View style={{...Shadows}} className="m-2 rounded-2xl bg-white">
            <SwipebleCardWrapper habit={habit}>
                <View className="flex-row bg-white h-[88px] rounded-2xl ">
                    <TouchableOpacity
                        disabled={isUpdating}
                        activeOpacity={100}
                        onPress={onToggle}
                        className=" py-2 px-4 flex-1 bg-white rounded-l-xl items-center border-r-[0.2px]"
                    >
                        <Text
                            classNames={{text: "shrink text-center text-sm -ml-2 font-mainBold mb-auto"}}>{habit.details.mine.label}</Text>
                        <BouncyCheckbox
                            disabled={isUpdating}
                            style={{marginRight: "auto"}}
                            fillColor="#6EC166"
                            disableBuiltInState={true}
                            isChecked={habit.details.mine.completed}
                            onPress={onToggle}
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
            </SwipebleCardWrapper>
        </View>
    </View>
};

export default HabitCard;