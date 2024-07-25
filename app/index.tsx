import {Redirect} from "expo-router";

//redirect user to the intended init page which is hero section
const Index = () => {
    return <Redirect href="/(no-tabs)/hero"/>;


};
export default Index;