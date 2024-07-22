import {View} from "react-native";
import {Shadows} from "@/styles/Shadows";
import Text from "@/components/Text";

export const NumberedRow = ({text, number}: { text: String, number: String }) => {
    return <View className="flex-row space-x-2 mb-2">
        <View style={{...Shadows}} className="bg-primary rounded-md h-6 w-6 justify-center items-center mr-2">
            <Text classNames={{text: "text-white -mt-0.5 font-mainBold"}}>{number}</Text>
        </View>
        <Text classNames={{text: "flex-1"}}>{text}</Text>
    </View>
}