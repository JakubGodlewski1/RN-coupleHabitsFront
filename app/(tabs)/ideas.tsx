import {ScrollView, TouchableOpacity, View, Alert} from "react-native";
import PageTitle from "@/components/PageTitle";
import Text from "@/components/Text";
import {SafeAreaWrapper} from "@/components/SafeAreaWrapper";
import * as Clipboard from 'expo-clipboard';
import {Shadows} from "@/styles/Shadows";


const examplHabits = [
    "Wake up early",
    "Exercise daily",
    "Read regularly",
    "Practice gratitude",
    "Meditate",
    "Stay hydrated",
    "Plan your day",
    "Eat healthily",
    "Limit screen time",
    "Learn something new",
    "Declutter",
    "Save money",
    "Practice mindfulness",
    "Sleep well",
    "Connect with others",
    "Set goals",
    "Journal",
    "Volunteer",
    "Limit multitasking",
    "Positive self-talk",
    "Save money",
    "Practice mindfulness",
    "Sleep well",
    "Connect with others",
    "Set goals",
    "Journal",
    "Volunteer",
    "Limit multitasking",
    "Positive self-talk", "Journal",
    "Volunteer",
    "Limit multitasking",
    "Positive self-talk", "Journal",
    "Volunteer",
    "Limit multitasking",
    "Positive self-talk", "Journal",
    "Volunteer",
    "Limit multitasking",
    "Positive self-talk", "Journal",
    "Volunteer",
    "Limit multitasking",
    "Positive self-talk", "Journal",
    "Volunteer",
    "Limit multitasking",
    "Positive self-talk",

];

export default function Ideas() {

    return <SafeAreaWrapper>
        <PageTitle>Ideas</PageTitle>
        <ScrollView showsVerticalScrollIndicator={false}>
            {examplHabits.map((_, i) => {
                if (i * 2 + 1 >= examplHabits.length) return
                return <View key={i} style={{gap: 8}} className="flex-row mb-2">
                    <IdeaCard habitTitle={examplHabits[i * 2]}/>
                    <IdeaCard habitTitle={examplHabits[i * 2 + 1]}/>
                </View>
            })}
            <View className="h-32"/>
        </ScrollView>
    </SafeAreaWrapper>
}


const IdeaCard = ({habitTitle}: { habitTitle: string }) => {
    const copyToClipboard = async () => {
        await Clipboard.setStringAsync(habitTitle);
        Alert.alert("Copied to clipboard", `Habit "${habitTitle}" has been copied to your clipboard.`);
    };

    return (
        <TouchableOpacity style={{...Shadows}} onPress={copyToClipboard}
                          className="bg-white flex-1 p-4 rounded-lg items-center justify-center">
            <Text classNames={{text: "shrink text-center leading-7"}}>
                {habitTitle}
            </Text>
        </TouchableOpacity>
    )
}