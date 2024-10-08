import {SafeAreaWrapper} from "@/components/SafeAreaWrapper";
import {View} from "react-native";
import Button from "@/components/Button";
import {router} from "expo-router";
import PageTitle from "@/components/PageTitle";
import {NumberedRow} from "@/components/NumberedRow";
import IntroCard from "@/components/IntroCard/IntroCard";
import {EXAMPLE_HABIT} from "@/utils/consts";

export default function CardsManagement() {

    return <SafeAreaWrapper>
        <PageTitle>Card details</PageTitle>
        <View className="space-y-8">
            <View>
                <NumberedRow text="Swipe left to either delete or update the habit." number="1"/>
                <IntroCard habit={EXAMPLE_HABIT} animationDirection="right"/>
            </View>
            <View>
                <NumberedRow text="Swipe right to see the habit's stats." number="2"/>
                <IntroCard habit={EXAMPLE_HABIT} animationDirection="left"/>
            </View>
        </View>
        <Button classNames={{wrapper: "mt-auto mb-2"}} onPress={() => router.push("/dashboard-info")} title="Next"/>
    </SafeAreaWrapper>
}