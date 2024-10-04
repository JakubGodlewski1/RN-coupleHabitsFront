import {SafeAreaWrapper} from "@/components/SafeAreaWrapper";
import HabitCard from "@/components/HabitCard";
import {Habit} from "@/types";
import {View} from "react-native";
import Button from "@/components/Button";
import {router} from "expo-router";
import PageTitle from "@/components/PageTitle";
import {NumberedRow} from "@/components/NumberedRow";

const habits: Habit[] = [
    {
        strike: 0,
        id: "0",
        details: {
            mine: {
                label: "Run for at least 10 minutes",
                completed: false
            },
            partner: {
                label: "Read 2 pages of a non-fiction",
                completed: false
            }
        },
        frequency: {
            type: "repeat",
            repeatOption: "daily"
        }

    },
    {
        strike: 0,
        id: "1",
        details: {
            mine: {
                label: "Run for at least 10 minutes",
                completed: true
            },
            partner: {
                label: "Read 2 pages of a non-fiction",
                completed: true
            }
        },
        frequency: {
            type: "repeat",
            repeatOption: "daily"
        }

    }
]

export default function HowToPlay() {

    return <SafeAreaWrapper>
        <PageTitle>How to play</PageTitle>
        <View className="space-y-8">
            <View>
                <NumberedRow text="Create a shared habit with your partner..." number="1"/>
                <HabitCard habit={habits[0]}/>
            </View>
            <View>
                <NumberedRow text="Get points and strike when you both finish your tasks..." number="2"/>
                <HabitCard habit={habits[1]}/>
            </View>
            <View>

                <NumberedRow text="Trade the points for days off without losing your global strike!" number="3"/>
            </View>
        </View>
        <Button classNames={{wrapper: "mt-auto mb-2"}} iconPosition="right" onPress={() => {
            router.push("/(intro)/cards-management")
        }} title="Next"/>
    </SafeAreaWrapper>
}