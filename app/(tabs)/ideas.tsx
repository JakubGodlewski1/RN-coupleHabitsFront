import {View, Text} from "react-native";
import {SafeAreaWrapper} from "@/components/SafeAreaWrapper";

export default function Ideas(){

    return <SafeAreaWrapper options={{disableBottomSafeArea:true}}>
        <Text>Ideas</Text>
    </SafeAreaWrapper>
}