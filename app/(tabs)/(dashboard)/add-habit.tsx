import {TouchableOpacity, View} from "react-native";
import Text from "@/components/Text";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import React, {useEffect} from "react";
import PageTitle from "@/components/PageTitle";
import Input from "@/components/Input";
import Tabs from "@/components/Tabs";
import Dropdown from "@/components/Dropdown";
import Button from "@/components/Button";
import {router} from "expo-router";
import {useTabBarContext} from "@/hooks/useTabBarContext";

export default function AddHabit() {
    const [theSameLabel, setTheSameLabel] = React.useState(false);
    const {setIsVisible} = useTabBarContext()

    //hide tabBar
    useEffect(() => {
        setIsVisible(false)
        return () => setIsVisible(true)
    }, []);

    return <View className="p-4 bg-white grow">
        <PageTitle>Create a habit</PageTitle>
        <View style={{gap: 8}}>
            <TouchableOpacity activeOpacity={90} onPress={() => setTheSameLabel(p => !p)}
                              className="flex-row space-x-2">
                <Text>We want to implement the same habit</Text>
                <BouncyCheckbox
                    fillColor="#FF5545"
                    disableBuiltInState={true}
                    isChecked={theSameLabel}
                    onPress={() => setTheSameLabel(p => !p)}
                    size={20}
                    innerIconStyle={{borderRadius: 4, borderColor: theSameLabel ? "#FF5545" : "gray"}}
                    iconStyle={{borderRadius: 4}}
                />
            </TouchableOpacity>
            <Input label="Our habit" placeholder="Out habit" value={""} onChangeText={() => {
            }}/>
            <Input label="Partner's habit" placeholder="Out habit" value={""} onChangeText={() => {
            }}/>
            <Text classNames={{text: "font-mainBold"}}>How often</Text>
            <Tabs options={["Repeat", "Specific days"]} onPress={() => {
            }}/>
            <Dropdown options={[{label: "Daily", key: "daily"}, {label: "Weekly", key: "weekly"}]}/>
        </View>
        <View style={{gap: 8}} className="flex-row mt-auto mb-2">
            <Button classNames={{wrapper: "flex-1"}} onPress={() => router.back()} title="Cancel" type="skip"/>
            <Button classNames={{wrapper: "flex-1"}} onPress={() => {
            }} title="Create"/>
        </View>

    </View>
}
