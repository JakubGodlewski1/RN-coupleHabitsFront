import {SafeAreaWrapper} from "@/components/SafeAreaWrapper";
import TopBar from "@/components/TopBar";
import Tabs from "@/components/Tabs";
import ConnectWithPartnerDisplay from "@/components/ConnectWithPartnerDisplay";
import {DASHBOARD_TABS} from "@/utils/consts";
import {DashboardTabKey} from "@/types";

export default function Dashboard() {

    return <SafeAreaWrapper style={{gap: 16}} options={{disableBottomSafeArea: true}}>
        <TopBar/>
        <Tabs<DashboardTabKey> value="todo" onPress={() => {
        }} options={DASHBOARD_TABS}/>
        <ConnectWithPartnerDisplay/>
    </SafeAreaWrapper>
}


