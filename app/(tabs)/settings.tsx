import Text from "@/components/Text";
import {Platform, Switch, TouchableOpacity, View} from "react-native";
import Button from "@/components/Button";
import {Entypo} from "@expo/vector-icons";
import {useState} from "react";
import {Shadows} from "@/styles/Shadows";
import PageTitle from "@/components/PageTitle";

export default function Settings() {
    const [showHabitCard, setShowHabitCard] = useState(false);

    return <View className="grow">
        <PageTitle>Settings</PageTitle>
        <View style={{gap: 16}} className="grow">
            <Button classNames={{wrapper: "justify-between"}} iconPosition="right" onPress={() => {
            }} title="Sign in/Sign up">
                <Entypo color="white" size={24} name="chevron-small-right"/>
            </Button>
            <Button classNames={{wrapper: "justify-between"}} type="secondary" iconPosition="right" onPress={() => {
            }} title="Take day off">
                <Text classNames={{text: "text-white"}}><Text
                    classNames={{text: "font-mainBold"}}>⭐️ 900</Text> Points</Text>
            </Button>
            <Button classNames={{wrapper: "justify-between"}} iconPosition="right" type="white" onPress={() => {
            }} title="Change profile picture">
                <Entypo size={24} name="chevron-small-right"/>
            </Button>
            <View style={{...Shadows}}
                  className={`flex-row  items-center justify-between space-x-5 bg-white rounded-[20px] p-4`}>
                <Text classNames={{text: "font-mainBold "}}>Show habit card's stats</Text>
                {Platform.OS === "ios" ?
                    <Switch trackColor={{true: "#FF5545"}}
                            onValueChange={visible => setShowHabitCard(visible)}
                            value={showHabitCard}/> :
                    <Switch
                        style={{marginVertical: -8}}
                        thumbColor="#FF5545" trackColor={{true: "#ffbbb5"}}
                        onValueChange={visible => setShowHabitCard(visible)}
                        value={showHabitCard}/>
                }
            </View>
        </View>


    </View>
}