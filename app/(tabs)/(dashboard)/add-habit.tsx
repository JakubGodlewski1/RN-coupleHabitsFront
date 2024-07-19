import {TouchableOpacity, View} from "react-native";
import Text from "@/components/Text";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import React, {useState} from "react";
import PageTitle from "@/components/PageTitle";
import Input from "@/components/Input";
import Tabs from "@/components/Tabs";
import Dropdown from "@/components/Dropdown";
import Button from "@/components/Button";
import {router} from "expo-router";
import MultiSelect from "@/components/MultiSelect";
import {CreateHabit, SpecificDaysMultiSelectKey} from "@/types";
import {useHandleTabBar} from "@/hooks/useHandleTabBar";
import {produce} from "immer";
import {DEFAULT_CREATE_HABIT, REPEAT_DROPDOWN_OPTIONS, SPECIFIC_DAYS_MULTISELECT_OPTIONS} from "@/utils/consts";

export default function AddHabit() {
    const [theSameLabel, setTheSameLabel] = React.useState(false);
    const [data, setData] = useState<CreateHabit>(DEFAULT_CREATE_HABIT)

    //hide tabBar on android when page is opened
    useHandleTabBar(true)

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

    return <View className="p-4 bg-white grow">
        <PageTitle>Create a habit</PageTitle>
        <View style={{gap: 8}}>
            <TouchableOpacity activeOpacity={90} onPress={handleToggleTheSameLabel}
                              className="flex-row space-x-2">
                <Text>We want to implement the same habit</Text>
                <BouncyCheckbox
                    fillColor="#FF5545"
                    disableBuiltInState={true}
                    isChecked={theSameLabel}
                    onPress={handleToggleTheSameLabel}
                    size={20}
                    innerIconStyle={{borderRadius: 4, borderColor: theSameLabel ? "#FF5545" : "gray"}}
                    iconStyle={{borderRadius: 4}}
                />
            </TouchableOpacity>
            <Input label={theSameLabel ? "Our habit" : "My habit"} placeholder="Run at least 2km"
                   value={data.details.mine.label}
                   onChangeText={(value) => setData(produce(draft => {
                       if (theSameLabel) {
                           draft.details.mine.label = value;
                           draft.details.partner.label = value;
                       } else
                           draft.details.mine.label = value;
                   }))}/>
            {!theSameLabel &&
                <Input
                    label="Partner's habit"
                    placeholder="Read 2 pages of non-ficton"
                    value={data.details.partner.label}
                    onChangeText={(value) => setData(produce(draft => {
                        draft.details.partner.label = value;
                    }))}/>}

            <Text classNames={{text: "font-mainBold"}}>How often</Text>
            <Tabs<"daily" | "weekly"> value="daily" options={REPEAT_DROPDOWN_OPTIONS} onPress={() => {
            }}/>
            <Dropdown options={[{label: "Daily", key: "daily"}, {label: "Weekly", key: "weekly"}]}/>
            <MultiSelect<SpecificDaysMultiSelectKey> onPress={() => {
            }} options={SPECIFIC_DAYS_MULTISELECT_OPTIONS}/>
        </View>
        <View style={{gap: 8}} className="flex-row mt-auto mb-2">
            <Button classNames={{wrapper: "flex-1"}} onPress={() => router.back()} title="Cancel" type="skip"/>
            <Button classNames={{wrapper: "flex-1"}} onPress={() => {
            }} title="Create"/>
        </View>

    </View>
}
