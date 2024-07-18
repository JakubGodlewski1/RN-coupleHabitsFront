import {View, Image} from "react-native";
import Avatar from "@/components/Avatar";
import Button from "@/components/Button";
import Text from "@/components/Text";

export default function ConnectWithPartnerDisplay() {

    return <View className="grow bg-white -mx-4 p-4 rounded-t-3xl">
        <View className="border-[1px] border-skip grow mb-8 rounded-xl bg-skip/10 p-4 space-y-3 justify-between">
            <View className="flex-row justify-around ">
                <Avatar text="You"/>
                <Avatar text="Partner"/>
            </View>
            <View className="items-center">
                <Image className="w-[65vw] h-[40vw]" source={require("@/assets/illustrations/couple_handshaking.png")}/>
                <Text classNames={{text: "text-center font-mainBold text-sm mt-2"}}>
                    Connect with your partner to discover and track the habits of both you and your partner here.
                </Text>
            </View>
            <Button
                classNames={{wrapper: "mx-auto"}}
                onPress={() => {
                }} title="Connect with your partner">
                <Image className="w-6 h-6 mr-2" source={require("@/assets/icons/hands_puzzles.png")}/>
            </Button>
        </View>
    </View>
}