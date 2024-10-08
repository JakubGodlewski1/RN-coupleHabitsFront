import {View} from 'react-native';
import Text from "@/components/Text";
import {Habit} from "@/types";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import {Shadows} from "@/styles/Shadows";
import SwipebleCardWrapper from "@/components/SwipebleCardWrapper";
import {useToggleCheckbox} from "@/api/hooks/useToggleCheckbox";

const HabitCard = ({habit, hideIndicators = false}: { habit: Habit, hideIndicators?: boolean }) => {
    const {toggleCheckbox, isUpdating} = useToggleCheckbox()

    return <View className="border-2 border-skip rounded-2xl overflow-hidden">
        <View style={{...Shadows}} className="m-2 rounded-2xl bg-white">
            <SwipebleCardWrapper habit={habit}>
                <View className="flex-row bg-white h-[88px] rounded-2xl border-x-[0.5px] border-skip shadow-md">
                    <View
                        className=" py-2 px-4 flex-1 bg-white rounded-l-xl items-center border-r-[0.2px] border-l-4 border-l-white"
                    >
                        <Text
                            classNames={{text: "shrink text-center text-sm -ml-2 font-mainBold mb-auto"}}>{habit.details.user.label}</Text>
                        {
                            !hideIndicators &&
                            <BouncyCheckbox
                                disabled={isUpdating}
                                style={{marginRight: "auto"}}
                                fillColor="#6EC166"
                                disableBuiltInState={true}
                                isChecked={habit.details.user.completed}
                                onPress={() => toggleCheckbox({
                                    id: habit.id,
                                    isCompleted: !habit.details.user.completed
                                })}
                                size={20}
                                innerIconStyle={{
                                    borderRadius: 4,
                                    borderColor: habit.details.user.completed ? "#6EC166" : "gray"
                                }}
                                iconStyle={{borderRadius: 4}}
                            />
                        }

                    </View>
                    <View
                        className={`px-4 py-2 flex-1 bg-white rounded-r-xl
                        ${!hideIndicators && "border-r-4 "}
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