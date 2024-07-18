import {View, TouchableOpacity} from "react-native";
import {AntDesign} from "@expo/vector-icons";
import Text from "@/components/Text";

export default function TopBar() {

    return <View className="flex-row space-x-4 h-14">
        <View className="bg-white px-4 h-full flex-row justify-between grow rounded-xl items-center">
            <Text>🔥Strike: <Text classNames={{text: "font-mainBold"}}>0 Days</Text></Text>
            <Text>Points: <Text classNames={{text: "font-mainBold"}}>0</Text> </Text>
        </View>
        <TouchableOpacity className="h-full w-14 rounded-xl bg-tertiary items-center justify-center">
            <AntDesign size={24} color="white" name="plus"/>
        </TouchableOpacity>
    </View>
}