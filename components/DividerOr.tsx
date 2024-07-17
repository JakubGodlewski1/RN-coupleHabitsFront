import {View, Text} from "react-native";

type Props = {
    classNames?:{
        wrapper?:String
    }
}

export default function DividerOr({classNames}:Props){

    return <View className={`flex-row items-center justify-between ${classNames?.wrapper}`}>
        <View className="border-t-[0.5px] border-gray-300 grow mr-5"/>
        <Text>or</Text>
        <View className="border-t-[0.5px] border-gray-300 grow ml-5"/>
    </View>
}