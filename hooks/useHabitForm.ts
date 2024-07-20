import React, {useCallback, useState} from "react";
import {CreateHabit, FrequencyType, SpecificDays, SpecificDaysMultiSelectKey} from "@/types";
import {DEFAULT_CREATE_HABIT} from "@/utils/consts";
import {produce} from "immer";
import {useHandleTabBar} from "@/hooks/useHandleTabBar";


export default function useHabitForm() {
    const [data, setData] = useState<CreateHabit>(DEFAULT_CREATE_HABIT)
    const [errors, setErrors] = useState({});
    const [theSameLabel, setTheSameLabel] = React.useState(false);

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
                    draft.details.partner.label = draft.details.mine.label
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
        setData,
        errors,
        data,
        isTheSameLabel: theSameLabel,
        handleToggleTheSameLabel,
        handleFrequencyTypeChange
    }
}