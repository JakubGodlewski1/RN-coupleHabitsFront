import {TouchableOpacity, View} from "react-native";
import Text from "@/components/Text";
import {useState} from "react";

type Props<T extends string> = {
    options: T[],
    onPress: (option: T) => void,
    initialValue?: T,
}

export default function Tabs<T extends string>({options, onPress, initialValue = options[0]}: Props<T>) {
    const [selected, setSelected] = useState<T>(initialValue)

    return <View className="flex-row space-x-2 justify-evenly bg-white p-2 h-14 rounded-xl border-[1px] border-skip">
        {options.map((option) => (
            <TouchableOpacity activeOpacity={90} onPress={() => {
                onPress(option)
                setSelected(option)
            }}
                              className={`grow justify-center rounded-lg ${selected === option ? "bg-primary" : ""}`}
                              key={option}>
                <Text
                    classNames={{text: `text-center ${selected === option ? "text-white font-mainBold" : "text-backgroundItem"}`}}>{option}</Text>
            </TouchableOpacity>
        ))}
    </View>
}