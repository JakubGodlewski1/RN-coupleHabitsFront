import {SafeAreaWrapper} from "@/components/SafeAreaWrapper";
import TopBar from "@/components/TopBar";
import Tabs from "@/components/Tabs";
import ConnectWithPartnerDisplay from "@/components/ConnectWithPartnerDisplay";

export default function Dashboard() {

    return <SafeAreaWrapper style={{gap: 16}} options={{disableBottomSafeArea: true}}>
        <TopBar/>
        <Tabs onPress={() => {
        }} options={["Todo", "Completed", "All"]}/>
        <ConnectWithPartnerDisplay/>
    </SafeAreaWrapper>
}


