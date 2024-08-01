import {Alert, Image, Keyboard, ScrollView, TouchableOpacity, View} from "react-native";
import {useHandleTabBar} from "@/hooks/useHandleTabBar";
import Text from "@/components/Text";
import Button from "@/components/Button";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import DividerOr from "@/components/DividerOr";
import Input from "@/components/Input";
import {copyToClipboard} from "@/utils/copyToClipboard";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import {router} from "expo-router";
import {useConnectPartner} from "@/api/hooks/useConnectPartner";
import {useEffect, useState} from "react";
import {useUser} from "@/api/hooks/useUser";

export default function ConnectWithPartner() {
    const [code, setCode] = useState<string>("");
    useHandleTabBar(true)
    const {connect, isPending} = useConnectPartner()
    const {user, refetch, isLoading} = useUser()

    useEffect(() => {
        if (user?.partner.connected) {
            router.back()
            Alert.alert("Connection successful!", "Create your first habit now!")
        }
    }, [user?.partner.connected]);

    if (!user) {
        return Alert.alert("Something went wrong, try again later");
    }

    return <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <TouchableOpacity onPress={() => Keyboard.dismiss()} activeOpacity={1} className="p-4 bg-white grow">
            <KeyboardAwareScrollView
                contentContainerStyle={{gap: 16, alignItems: "center", flexGrow: 1, paddingBottom: 10}}>
                <Image className="w-[50vw] h-[50vw]" source={require("../../../assets/illustrations/hands.png")}/>
                <Text classNames={{text: "font-mainExtraBold"}} type="h3">
                    Let's <Text type="h3" classNames={{text: "text-primary font-mainExtraBold"}}>connect</Text> with
                    your
                    partner
                </Text>
                <Text classNames={{text: "font-mainExtraBold text-center text-xl leading-6"}}>
                    Either give the {"\n"}code to your partner
                </Text>
                <View style={{gap: 8}} className="flex-row">
                    <Button classNames={{text: "text-2xl font-mainBold", wrapper: "p-4 flex-1"}} iconPosition="right"
                            onPress={() => copyToClipboard({
                                textToCopy: user.connectionCode,
                                message: "Your connection code has been copied to clipboard"
                            })} title={user.connectionCode}>
                        <MaterialCommunityIcons size={24} color="white" name="content-copy"/>
                    </Button>
                    <Button
                        disabled={isLoading}
                        classNames={{wrapper: "flex-1"}}
                        type="secondary" onPress={refetch}
                        title={isLoading ? "Checking" : "Connected!"}/>
                </View>

                <DividerOr/>
                <View style={{gap: 8}} className="self-stretch grow">
                    <Input
                        value={code}
                        placeholder="e.g. 3ED5E3"
                        onChangeText={value => setCode(value)}
                        label="Enter the code from your partner"
                    />
                    <Button
                        disabled={isPending}
                        onPress={() => connect(code)}
                        type="secondary"
                        title="Connect"
                    />
                    <Button classNames={{wrapper: "mt-auto"}} type="skip" onPress={router.back} title="Later"/>

                </View>
            </KeyboardAwareScrollView>
        </TouchableOpacity>
    </ScrollView>


}