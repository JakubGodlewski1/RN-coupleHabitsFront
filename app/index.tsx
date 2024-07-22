import {Redirect} from "expo-router";

//redirect user to the intended init page which is hero section
const Index = () => {
    //correct root
    return <Redirect href="/(no-tabs)/hero"/>;
    // return <Redirect href="/intro-cards"/>;

};
export default Index;