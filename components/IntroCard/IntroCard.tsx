import {View} from 'react-native';
import Text from "@/components/Text";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import {Shadows} from "@/styles/Shadows";
import {RefObject} from "react";
import {Swipeable} from "react-native-gesture-handler";
import SwipebleIntroCardWrapper from "@/components/IntroCard/SwipeableIntroCardWrapper";
import {Habit} from "@/types";

const IntroCard = ({animationDirection, habit}: { animationDirection?: "left" | "right", habit: Habit }) => {
    const animate = (ref: RefObject<Swipeable>) => {

        if (ref.current && animationDirection) {
            const swipeLeft = ref.current?.openLeft
            const swipeRight = ref.current?.openRight
            const animate = animationDirection === "left" ? swipeLeft : swipeRight
            const close = ref.current?.close

            animate()
            setTimeout(close, 800)

            return setInterval(() => {
                animate()
                setTimeout(close, 800)
            }, 1600);
        }
    }

    return <View className="border-2 border-skip rounded-2xl overflow-hidden">
        <View style={{...Shadows}} className="m-2 rounded-2xl bg-white">
            <SwipebleIntroCardWrapper options={animationDirection ? {animate} : {}} habit={habit}>
                <View className="flex-row bg-white h-[88px] rounded-2xl border-x-[0.5px] border-skip shadow-md">
                    <View
                        className="p-2 flex-1 bg-white rounded-l-xl items-center border-r-[0.2px] border-l-4 border-l-white"
                    >
                        <Text
                            classNames={{text: "shrink text-center text-sm -ml-2 font-mainBold mb-auto"}}>{habit.details.user.label}</Text>
                        <BouncyCheckbox
                            style={{marginRight: "auto", padding: 10, margin: -10}}
                            fillColor="#6EC166"
                            disableBuiltInState={true}
                            isChecked={habit.details.user.completed}
                            size={20}
                            innerIconStyle={{
                                borderRadius: 4,
                                borderColor: habit.details.user.completed ? "#6EC166" : "gray"
                            }}
                            iconStyle={{borderRadius: 4}}
                        />
                    </View>
                    <View
                        className={`p-2 flex-1 bg-white border-r-4 rounded-r-xl
                     ${habit.details.partner.completed ? "border-secondary" : "border-primary"}`}
                    >
                        <Text
                            classNames={{text: "shrink text-center text-sm font-mainBold"}}>{habit.details.partner.label}</Text>
                    </View>
                </View>
            </SwipebleIntroCardWrapper>
        </View>
    </View>
};

export default IntroCard