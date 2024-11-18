import {Alert, View} from 'react-native';
import Text from "@/components/Text";
import {Habit} from "@/types";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import {Shadows} from "@/styles/Shadows";
import SwipebleCardWrapper from "@/components/SwipebleCardWrapper";
import {useToggleCheckbox} from "@/api/hooks/useToggleCheckbox";
import Purchases from "react-native-purchases";
import {useUser} from "@/api/hooks/useUser";
import RevenueCatUI, {PAYWALL_RESULT} from "react-native-purchases-ui";
import {useUpdateGameAccount} from "@/api/hooks/useUpdateGameAccount";
import CenteredActivityIndicator from "@/components/CenteredActivityIndicator";

const HabitCard = ({habit, hideIndicators = false}: { habit: Habit, hideIndicators?: boolean }) => {
    const {toggleCheckbox, isUpdating} = useToggleCheckbox()
    const {user, isLoading} = useUser()
    const {updateGameAccount, isPending: isUpdatingGameAccount} = useUpdateGameAccount()

    if (isLoading || !user) {
        return null
    }

    const handleToggleCheckbox = async () => {
        //validate that user has a valid subscription, if so, toggle. otherwise show popup
        //validate that user has pro access to the app
        const purchaserInfo = await Purchases.getCustomerInfo()
        const isSubscribed = purchaserInfo.entitlements.active['pro'] !== undefined;
        const {gameAccount} = user

        if (isSubscribed || (gameAccount.pro && !gameAccount.isPayer)) {
            toggleCheckbox({
                id: habit.id,
                isCompleted: !habit.details.user.completed
            })

        } else {
            //subscription has ended
            if (!isSubscribed && gameAccount.isPayer) {
                updateGameAccount({pro: false})
            }

            //user has to pay
            try {
                const result: PAYWALL_RESULT = await RevenueCatUI.presentPaywall({displayCloseButton: true})
                if (result === "PURCHASED") {
                    //send api request to add user's partner as pro member
                    updateGameAccount({pro: true})
                }

            } catch (err) {
                Alert.alert("Something went wrong, try again later")
                console.log(err)
            }
        }
    }

    if (isUpdatingGameAccount) {
        return <CenteredActivityIndicator/>
    }

    return <View className="border-2 border-skip rounded-2xl overflow-hidden">
        <View style={{...Shadows}} className="m-2 rounded-2xl bg-white">
            <SwipebleCardWrapper habit={habit}>
                <View className="flex-row bg-white h-[88px] rounded-2xl border-x-[0.5px] border-skip shadow-md">
                    <View
                        className=" p-2 flex-1 bg-white rounded-l-xl items-center border-r-[0.2px] border-l-4 border-l-white"
                    >
                        <Text
                            classNames={{text: "shrink text-center text-sm -ml-2 font-mainBold mb-auto"}}>{habit.details.user.label}</Text>
                        {
                            !hideIndicators &&
                            <BouncyCheckbox
                                disabled={isUpdating}
                                style={{marginRight: "auto", padding: 10, margin: -10}}
                                fillColor="#6EC166"
                                disableBuiltInState={true}
                                isChecked={habit.details.user.completed}
                                onPress={handleToggleCheckbox}
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
                        className={`p-2 flex-1 bg-white rounded-r-xl
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