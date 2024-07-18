import {SafeAreaWrapper} from "@/components/SafeAreaWrapper";
import TopBar from "@/components/TopBar";

export default function Dashboard() {

    return <SafeAreaWrapper options={{disableBottomSafeArea: true}}>
        <TopBar/>
        
    </SafeAreaWrapper>
}