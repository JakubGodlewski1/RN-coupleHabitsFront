import {SafeAreaWrapper} from "@/components/SafeAreaWrapper";
import Text from "@/components/Text";
import Button from "@/components/Button";
import {View} from "react-native";
import {Feather, MaterialIcons} from "@expo/vector-icons";

export default function Settings(){

    return <SafeAreaWrapper options={{disableBottomSafeArea:true}}>
            <View className="p-3 border-3 grow">
                <Text classNames={{wrapper:"mb-2"}} type="h1">Settings</Text>
                <Button classnames={{wrapper:"justify-between px-2 mb-2"}} white={true} onPress={()=>{}} title="Change profile picture">
                    <MaterialIcons style={{color:"black"}} size={24} name="tag-faces"/>
                </Button>
                <View className="mt-auto">
                    <Button classnames={{wrapper:" px-2 justify-start mb-2"}} white={true} onPress={()=>{}} title="Sign in"/>
                    <Button size="md" classnames={{wrapper:" px-2 justify-start mt-auto"}}  onPress={()=>{}} title="Sign up"/>
                </View>
            </View>
    </SafeAreaWrapper>
}