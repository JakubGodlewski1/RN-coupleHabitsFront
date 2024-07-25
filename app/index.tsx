import {router} from "expo-router";
import {useUserExists} from "@/hooks/useUserExists";
import CenteredActivityIndicator from "@/components/CenteredActivityIndicator";

//redirect user to the intended init page which is hero section
const Index = () => {

    useUserExists({
        onUserExists: () => router.push("/(tabs)/(dashboard)"),
        onUserNotExists: () => router.push("/(no-tabs)/hero"),
    })

    return <CenteredActivityIndicator/>
};
export default Index;