import SecureStoreService from "@/utils/SecureStore";
import {isToday} from "date-fns";

export const hasBeenReloadedToday = async () => {
    const lastTimeReloaded = await SecureStoreService.get("lastTimeReloaded");
    if (!lastTimeReloaded || !isToday(lastTimeReloaded)) {
        await SecureStoreService.set("lastTimeReloaded", new Date().toString());
        return false
    }
    return true
}