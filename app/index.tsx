import {Link, router, useRootNavigationState} from "expo-router";
import CenteredActivityIndicator from "@/components/CenteredActivityIndicator";

//redirect user to the intended init page which is hero section
const Index = () => {

    // router.push("/(no-tabs)/hero")
    // useUserExists({
    //     onUserExists: () => router.push('/(tabs)/(dashboard)'),
    //     onUserNotExists: () => router.push("/(no-tabs)/hero"),
    // })

    return <Link className="mt-20" href="/(no-tabs)/hero">hero</Link>
    return <CenteredActivityIndicator/>
};
export default Index;