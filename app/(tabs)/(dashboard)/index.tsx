import {SafeAreaWrapper} from "@/components/SafeAreaWrapper";
import TopBar from "@/components/TopBar";
import Tabs from "@/components/Tabs";
import ConnectWithPartnerDisplay from "@/components/ConnectWithPartnerDisplay";

const repeatOptions: { key: "todo" | "completed" | "all", label: string }[] = [
    {
        key: "todo",
        label: "Todo"
    },
    {
        key: "completed",
        label: "Completed"
    },
    {
        key: "all",
        label: "All"
    }
]

export default function Dashboard() {

    return <SafeAreaWrapper style={{gap: 16}} options={{disableBottomSafeArea: true}}>
        <TopBar/>
        <Tabs value="todo" onPress={() => {
        }} options={repeatOptions}/>
        <ConnectWithPartnerDisplay/>
    </SafeAreaWrapper>
}


