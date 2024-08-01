import {router} from "expo-router";
import CenteredActivityIndicator from "@/components/CenteredActivityIndicator";
import {useUserExists} from "@/hooks/useUserExists";

//redirect user to the intended init page which is hero section
const Index = () => {

    useUserExists({
        onUserExists: () => router.push('/(dashboard)'),
        onUserNotExists: () => router.push("/hero"),
    })

    return <CenteredActivityIndicator/>
};
export default Index;