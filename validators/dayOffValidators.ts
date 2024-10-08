import {filters} from "@/utils/habitFilters";
import {User} from "@/types";

export const validateDayOff = (user: User): { success: boolean, message: string } => {
    const {gameAccount: {points, dayOffPrice}, habits} = user
    const {assignedForTodayWithoutWeekly, habitUncompleted} = filters

    if (points < dayOffPrice) {
        return {success: false, message: "You don't have enough points to take a day off!"};
    }

    const habitsScheduledForTodayUncompleted = habits.filter(assignedForTodayWithoutWeekly).filter(habitUncompleted)
    console.log(habitsScheduledForTodayUncompleted)

    if (habitsScheduledForTodayUncompleted.length === 0) {
        return {
            success: false,
            message: "You don't have any habits scheduled for today. There is no point in taking a day off."
        };
    }

    return {
        success: true,
        message: "Everything is ok"
    }
}