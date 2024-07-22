import {SafeAreaWrapper} from "@/components/SafeAreaWrapper";
import IntroCard from "@/components/IntroCard";
import React from "react";
import {View} from "react-native";
import Button from "@/components/Button";
import {router} from "expo-router";
import PageTitle from "@/components/PageTitle";
import {NumberedRow} from "@/components/NumberedRow";

export default function CardsManagement() {

    return <SafeAreaWrapper>
        <PageTitle>Card details</PageTitle>
        <View className="space-y-8">
            <View>
                <NumberedRow text="Swipe left to either delete or update the habit." number="1"/>
                <IntroCard type="left"/>
            </View>
            <View>
                <NumberedRow text="Swipe up to see the habit's stats." number="2"/>
                <IntroCard type="top"/>
            </View>
        </View>
        <Button classNames={{wrapper: "mt-auto mb-2"}} onPress={() => router.push("pic-slides")} title="Next"/>
    </SafeAreaWrapper>
}