import {useState} from "react";
import {CreateHabit, FrequencyType, HabitFormType} from "@/types";
import {produce} from "immer";
import {useHandleTabBar} from "@/hooks/useHandleTabBar";
import {createHabitValidator} from "@/validators/habitValidators";
import {Alert} from "react-native";
import {useUser} from "@/api/hooks/useUser";


export default function useHabitForm({type, initHabitJSON}: HabitFormType) {
    const InitialStateOfTheSameLabel = () => type === "update" && (data.details.user.label === data.details.partner.label) && data.details.partner.label.length > 0;

    const [data, setData] = useState<CreateHabit>(JSON.parse(initHabitJSON))
    const [errors, setErrors] = useState<{ userLabel: string | undefined, partnerLabel: string | undefined }>({
        userLabel: undefined,
        partnerLabel: undefined,
    });
    const [theSameLabel, setTheSameLabel] = useState(InitialStateOfTheSameLabel);

    //if its habit update, set the same label to true if the habits are the same

    const {user} = useUser()

    const onSubmit = (submitFn: (habit: CreateHabit) => void) => {
        if (!user?.partner.connected) {
            return Alert.alert("You have to connect with your partner first!")
        }

        const result = createHabitValidator.safeParse(data)
        if (result.success) {
            submitFn(data)
        } else {
            const userLabel = result.error.format().details?.user?.label?._errors[0]
            const partnerLabel = result.error.format().details?.partner?.label?._errors[0]
            setErrors({
                partnerLabel,
                userLabel
            })
        }
    }

    //hide tabBar on android when page is opened
    useHandleTabBar(true)

    const handleFrequencyTypeChange = (key: FrequencyType) => {
        if (key === data.frequency.type) {
            return
        }
        setData(produce(draft => {
            if (key === "repeat") {
                draft.frequency = {
                    type: "repeat",
                    repeatOption: "daily"
                }
            }

            if (key === "specific days") {
                draft.frequency = {
                    type: "specific days",
                    specificDaysOption: {
                        monday: true,
                        tuesday: false,
                        wednesday: false,
                        thursday: false,
                        friday: false,
                        saturday: false,
                        sunday: false,
                    }
                }
            }
        }))
    }

    const handleToggleTheSameLabel = () => {
        setTheSameLabel((p) => {
            if (!p) {
                setData(produce(draft => {
                    draft.details.partner.label = draft.details.user.label
                }))
            } else {
                setData(produce(draft => {
                    draft.details.partner.label = ""
                }))
            }

            return !p
        })
    }

    return {
        onSubmit,
        setData,
        errors,
        data,
        isTheSameLabel: theSameLabel,
        handleToggleTheSameLabel,
        handleFrequencyTypeChange
    }
}