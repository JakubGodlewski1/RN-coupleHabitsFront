import {SignedIn, SignedOut} from '@clerk/clerk-expo'
import React from "react";
import {View} from "react-native";
import {Redirect} from "expo-router";


const Index = () => {

    return <View>
        <SignedIn>
            <Redirect href="/(dashboard)"/>
        </SignedIn>
        <SignedOut>
            <Redirect href="/hero"/>
        </SignedOut>
    </View>
};
export default Index;