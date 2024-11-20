import {ScrollView, TouchableOpacity, View} from "react-native";
import PageTitle from "@/components/PageTitle";
import Text from "@/components/Text";
import {SafeAreaWrapper} from "@/components/SafeAreaWrapper";
import {Shadows} from "@/styles/Shadows";
import {copyToClipboard} from "@/utils/copyToClipboard";

const examplHabits = [
    "Wake up at 5 AM",
    "Eat healthy",
    "Read for at least 20 minutes",
    "Exercise for at least 20 minutes",
    "Go to the gym",
    "No sweets",
    "No junk food",
    "No energy drinks",
    "Drink at least 2 liters of water",
    "Work on side business for at least 1 hour",
    "Spend at least 1 hour with my partner",
    "Don't eat cheat meals",
    "Don't watch Netflix",
    "Don't use Instagram",
    "Get up after first alarm clock sound",
    "Call my friend",
    "Call my grandparents",
    "Call my mum",
    "Call my dad",
    "Call my sibling",
    "Meditate for at least 10 minutes",
    "Write a journal",
    "Go to bed before 10 PM",
    "Spend 30 minutes learning something new",
    "Go for a walk",
    "No snacking after 8 PM",
    "No social media before noon",
    "Eat at least 1 serving of vegetables",
    "Stretch for 5 minutes",
    "No phone during meals",
    "No alcohol",
    "No complaining",
    "Plan my day",
    "Eat a healthy breakfast",
    "Do 10 push-ups after waking up",
    "Limit coffee to one cup",
    "Take a cold shower",
    "25 minutes of focused work",
    "Do 50 squats after waking up",
    "No phone first 30 minutes after waking",
    "Drink a glass of water right after waking",
    "Limit junk food to 1 serving",
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

    return (
        <TouchableOpacity style={{...Shadows}} onPress={() => copyToClipboard({
            textToCopy: habitTitle,
            message: `Copied to clipboard 😊`
        })}
                          className="bg-white flex-1 p-4 rounded-lg items-center justify-center">
            <Text classNames={{text: "shrink text-center leading-7"}}>
                {habitTitle}
            </Text>
        </TouchableOpacity>
    )
}