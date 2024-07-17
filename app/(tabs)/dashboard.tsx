import {View, Text} from "react-native";
import {SafeAreaWrapper} from "@/components/SafeAreaWrapper";

export default function Dashboard(){

    return <SafeAreaWrapper options={{disableBottomSafeArea:true}}>
        <Text>Dashboard</Text>
    </SafeAreaWrapper>
}