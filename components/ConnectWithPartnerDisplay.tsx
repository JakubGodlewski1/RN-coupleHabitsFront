import {View, Image} from "react-native";
import Avatar from "@/components/Avatar";
import Button from "@/components/Button";
import Text from "@/components/Text";
import {router} from "expo-router";
import {User} from "@/types";

export default function ConnectWithPartnerDisplay({user}: { user: User }) {

    return <View className="border-[1px] border-skip grow mb-8 rounded-xl bg-skip/10 p-4 space-y-3 justify-between">
        <View className="flex-row justify-around ">
            <Avatar url={user.avatar} text="You"/>
            <Avatar url={user.partner.avatar} text="Partner"/>
        </View>
        <View className="items-center">
            <Image className="w-[65vw] h-[40vw]" source={require("@/assets/illustrations/couple_handshaking.png")}/>
            <Text classNames={{text: "text-center font-mainBold  mt-2"}}>
                Connect with your partner to add and see your habits.
            </Text>
        </View>
        <Button
            classNames={{wrapper: "mx-auto"}}
            onPress={() => router.push("connect-with-partner")} title="Connect with your partner">
            <Image className="w-6 h-6 mr-2" source={require("@/assets/icons/hands_puzzles.png")}/>
        </Button>
    </View>
}