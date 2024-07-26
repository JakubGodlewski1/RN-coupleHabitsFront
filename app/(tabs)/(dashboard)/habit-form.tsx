import {Keyboard, TouchableOpacity, View} from "react-native";
import Text from "@/components/Text";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import PageTitle from "@/components/PageTitle";
import Input from "@/components/Input";
import Tabs from "@/components/Tabs";
import Dropdown from "@/components/Dropdown";
import Button from "@/components/Button";
import {router, useLocalSearchParams} from "expo-router";
import {FrequencyType, HabitFormType} from "@/types";
import {produce} from "immer";
import {HOW_OFTEN_TABS} from "@/utils/consts";
import useHabitForm from "@/hooks/useHabitForm";
import SpecificDaysMultiSelect from "@/components/SpecificDaysMultiSelect";
import {useCreateHabit} from "@/api/hooks/useCreateHabit";
import {useUpdateHabit} from "@/api/hooks/useUpdateHabit";

const dropdownOptions: { key: "daily" | "weekly", label: string }[] = [{label: "Daily", key: "daily"}, {
    label: "Weekly",
    key: "weekly"
}]

export default function HabitForm() {
    const {type, initHabitJSON} = useLocalSearchParams() as HabitFormType

    const {
        onSubmit,
        data,
        setData,
        isTheSameLabel,
        handleToggleTheSameLabel,
        handleFrequencyTypeChange,
    } = useHabitForm({type, initHabitJSON})

    const {createHabit, isPending} = useCreateHabit()
    const {updateHabit, isUpdating} = useUpdateHabit()

    return <TouchableOpacity onPress={() => Keyboard.dismiss()} activeOpacity={1} className="p-4 bg-white grow">
        <PageTitle>{type === "create" ? "Create" : "Update"} a habit</PageTitle>
        <View style={{gap: 8}}>
            <TouchableOpacity activeOpacity={90} onPress={handleToggleTheSameLabel}
                              className="flex-row space-x-2">
                <Text>We want to implement the same habit</Text>
                <BouncyCheckbox
                    fillColor="#FF5545"
                    disableBuiltInState={true}
                    isChecked={isTheSameLabel}
                    onPress={handleToggleTheSameLabel}
                    size={20}
                    innerIconStyle={{borderRadius: 4, borderColor: isTheSameLabel ? "#FF5545" : "gray"}}
                    iconStyle={{borderRadius: 4}}
                />
            </TouchableOpacity>
            <Input label={isTheSameLabel ? "Our habit" : "My habit"} placeholder="Run at least 2km"
                   value={data.details.mine.label}
                   onChangeText={(value) => setData(produce(draft => {
                       if (isTheSameLabel) {
                           draft.details.mine.label = value;
                           draft.details.partner.label = value;
                       } else
                           draft.details.mine.label = value;
                   }))}/>
            {!isTheSameLabel &&
                <Input
                    label="Partner's habit"
                    placeholder="Read 2 pages of non-ficton"
                    value={data.details.partner.label}
                    onChangeText={(value) => setData(produce(draft => {
                        draft.details.partner.label = value;
                    }))}/>}

            <Text classNames={{text: "font-mainBold"}}>How often</Text>
            <Tabs<FrequencyType> value={data.frequency.type} options={HOW_OFTEN_TABS}
                                 onPress={handleFrequencyTypeChange}/>
            {data.frequency.type === "repeat" && (
                <Dropdown
                    selectedKey={data.frequency.repeatOption}
                    onPress={(key) => setData(produce(draft => {
                        draft.frequency = {type: "repeat", repeatOption: key}
                    }))}
                    options={dropdownOptions}
                />
            )}
            {data.frequency.type === "specific days" && (
                <SpecificDaysMultiSelect
                    setData={setData}
                    options={data.frequency.specificDaysOption}
                />
            )}
        </View>
        <View style={{gap: 8}} className="flex-row mt-auto mb-2">
            <Button disabled={isPending} classNames={{wrapper: "flex-1"}} onPress={() => router.back()} title="Cancel"
                    type="skip"/>
            <Button
                disabled={isPending || isUpdating}
                classNames={{wrapper: "flex-1"}}
                onPress={() => onSubmit(() => type === "create" ? createHabit(data) : updateHabit({
                    ...data,
                    id: JSON.parse(initHabitJSON).id
                }))}
                type="primary"
                title={type === "create" ? isPending ? "Creating" : "Create" : isUpdating ? "Updating" : "Update"}
            />
        </View>
    </TouchableOpacity>
}
