import {SafeAreaWrapper} from "@/components/SafeAreaWrapper";
import IntroCard from "@/components/IntroCard";
import Text from "@/components/Text";
import React from "react";
import {View} from "react-native";
import Button from "@/components/Button";
import {router} from "expo-router";

export default function IntroCards() {

    return <View className="grow">
        <SafeAreaWrapper classNames={{wrapper: "justify-evenly"}}>
            <View>
                <IntroCard type="left"/>
                <Text classNames={{text: "mt-2 mx-4 text-center"}} type="h3">Swipe left to either delete or update the
                    habit.</Text>
            </View>
            <View>
                <IntroCard type="top"/>
                <Text classNames={{text: "mt-2 mx-4 text-center"}} type="h3">Swipe up see the habit's stats.</Text>
            </View>
        </SafeAreaWrapper>
        <View style={{gap: 20}} className="flex-row bg-black/50 p-5 pb-10 mt-auto">
            <Button classNames={{wrapper: "flex-1"}} type="skip" onPress={() => router.push("./(tabs)")}
                    title="Skip"/>
            <Button classNames={{wrapper: "flex-1"}} onPress={() => {
            }} title="Next"/>
        </View>
    </View>


}