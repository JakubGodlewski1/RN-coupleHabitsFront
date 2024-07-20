import MultiSelect from "@/components/MultiSelect";
import {CreateHabit, SpecificDays, SpecificDaysMultiSelectKey} from "@/types";
import {Dispatch, SetStateAction} from "react";
import {produce} from "immer";

//type of object that is being required in MultiSelect component
type SpecificDaysFrontend = {
    key: SpecificDaysMultiSelectKey;
    label: string;
    isSelected: boolean;
}

type Props = {
    options: SpecificDays,
    setData: Dispatch<SetStateAction<CreateHabit>>
}

export default function SpecificDaysMultiSelect({options, setData}: Props) {

    const handleUpdateSpecificDays = (day: SpecificDaysMultiSelectKey) => {
        setData(produce(draft => {
            if (draft.frequency.type === "specific days") {
                draft.frequency.specificDaysOption = {...options, [day]: !options[day]}
            }
        }))
    }

    const mapToSpecialDays = (specificDaysDBFormat: SpecificDays): SpecificDaysFrontend[] => {
        const labelMap: Record<SpecificDaysMultiSelectKey, string> = {
            monday: "Mo",
            tuesday: "Tu",
            wednesday: "We",
            thursday: "Th",
            friday: "Fr",
            saturday: "Sa",
            sunday: "Su",
        }

        return Object.entries(specificDaysDBFormat).map(([key, value]): SpecificDaysFrontend => ({
            key: key as SpecificDaysMultiSelectKey,
            isSelected: value,
            label: labelMap[key as SpecificDaysMultiSelectKey],
        }))
    }

    return <MultiSelect options={mapToSpecialDays(options)} onPress={handleUpdateSpecificDays}/>
}