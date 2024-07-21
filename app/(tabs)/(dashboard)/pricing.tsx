import {View, Image, Dimensions, Platform, ViewStyle, TouchableOpacity, ScrollView} from "react-native";
import {AntDesign} from "@expo/vector-icons";
import {SafeAreaWrapper} from "@/components/SafeAreaWrapper";
import Text from "@/components/Text";
import React, {ReactNode, useState} from "react";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import Button from "@/components/Button";

type CardTitle = "Monthly" | "Yearly" | "Forever"

type PriceCardType = {
    title: CardTitle,
    price: number,
    onPress: (title: CardTitle) => void,
    selected: CardTitle | undefined
}


export default function Pricing() {
    const [selected, setSelected] = useState<CardTitle | undefined>(undefined)

    return <AndroidWrapper style={{gap: 14, padding: 16, flexGrow: 1, backgroundColor: "white"}}>
        <Text classNames={{text: ""}} type="h2">Pricing plan</Text>
        <View className="border-t-[0.5px] border-black/40"></View>
        <View className='flex-row bg-white border-[1px] border-skip rounded-2xl'>
            <View className="aspect-square h-12 grow rounded-2xl bg-[#FF9900] mr-2 items-center justify-center">
                <AntDesign color="white" size={20} name="infocirlceo"/>
            </View>
            <Text classNames={{text: "shrink text-normal text-wrap leading-5 p-1"}}>To continue using the app, start
                your
                free
                trial.</Text>
        </View>
        <Image
            style={{height: (Dimensions.get('window').width - 32) * 0.55}}
            resizeMode="contain"
            className="w-full"
            source={require("./../../../assets/images/pricing.png")}/>
        <PriceCard selected={selected} price={8.9} title="Monthly" onPress={(title) => setSelected(title)}/>
        <PriceCard selected={selected} price={48.9} title="Yearly" onPress={(title) => setSelected(title)}/>
        <PriceCard selected={selected} price={99} title="Forever" onPress={(title) => setSelected(title)}/>
        <Button type="tertiary" classNames={{wrapper: "mt-auto mb-2"}} onPress={() => {
        }} title="Start 14 days free trial"/>
    </AndroidWrapper>
}


const AndroidWrapper = ({children, classNames, style}: {
    children: ReactNode,
    classNames?: {
        wrapper?: string
    },
    style?: ViewStyle
}) => {
    return <ScrollView contentContainerStyle={{flexGrow: 1}}>
        {Platform.OS === "android" ?
            <SafeAreaWrapper style={style} classNames={{wrapper: classNames?.wrapper}}>{children}</SafeAreaWrapper> :
            <View style={style} className={`${classNames?.wrapper} bg-blue-400`}>{children}</View>}
    </ScrollView>


}


const PriceCard = ({title, price, onPress, selected}: PriceCardType) => {
    const isSelected = selected === title

    return <TouchableOpacity onPress={() => onPress(title)}
                             className={`p-3 rounded-2xl border-[1px] flex-row items-center ${isSelected ? "border-primary" : " border-skip"}`}>
        <BouncyCheckbox
            fillColor="#FF5545"
            disableBuiltInState={true}
            isChecked={isSelected}
            onPress={() => onPress(title)}
            size={20}
            innerIconStyle={{borderRadius: 999, borderWidth: 0.5, borderColor: "gray"}}
            iconStyle={{borderRadius: 999}}
        />
        <View>
            <View className="flex-row">
                <Text type="h3">{title}</Text>
                {title === "Yearly" && (
                    <View className="px-2 py-0.5 bg-primary rounded-full self-center ml-1">
                        <Text classNames={{text: "text-sm text-white"}}>Best option</Text>
                    </View>
                )}
            </View>
            <Text classNames={{text: "text-sm text-black/70"}}>Partner account included</Text>
        </View>
        <View className="ml-auto items-end">
            <Text type="h3">{price}$</Text>
            {title === "Yearly" && (
                <View className="px-2 py-0.5 bg-secondary rounded-full self-center ml-1">
                    <Text classNames={{text: "text-sm font-mainExtraBold text-white"}}>-55%</Text>
                </View>
            )}
        </View>
    </TouchableOpacity>
}