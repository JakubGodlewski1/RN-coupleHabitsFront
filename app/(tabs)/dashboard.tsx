import {SafeAreaWrapper} from "@/components/SafeAreaWrapper";
import TopBar from "@/components/TopBar";
import Tabs from "@/components/Tabs";

export default function Dashboard() {

    return <SafeAreaWrapper options={{disableBottomSafeArea: true}}>
        <TopBar classNames={{wrapper: "mb-4"}}/>
        <Tabs onPress={() => {
        }} options={["Todo", "Completed", "All"]}/>
    </SafeAreaWrapper>
}