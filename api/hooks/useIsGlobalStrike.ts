import {GlobalStrike, Habit} from "@/types";
import {useUser} from "@/api/hooks/useUser";
import {filters} from "@/utils/habitFilters";

const noGlobalStrikeUpdate = (habit: Habit) => {
    return {
        url: `/habits/${habit.id}`,
        data: habit
    }
}

const globalStrikeUpdate = (habit: Habit, action: "increase" | "decrease") => {
    return {
        url: `/game-accounts/game-account`,
        data: {
            habit,
            action
        }
    }
}

export const useIsGlobalStrike = () => {
    const {user} = useUser()
    const isGlobalStrike = (updatedHabit: Habit): GlobalStrike => {
        const {assignedForTodayWithWeekly, habitUncompleted} = filters

        if (!user) {
            throw new Error(`User does not exist`)
        }

        const habitsAssignedForToday = user.habits.filter(assignedForTodayWithWeekly)
        const habitIsCompleted = updatedHabit.details.partner.completed && updatedHabit.details.mine.completed

        //check if the updated habit is assigned for today
        const isAssignedForToday = habitsAssignedForToday.find(h => h.id === updatedHabit.id)
        if (!isAssignedForToday) {
            return noGlobalStrikeUpdate(updatedHabit)
        }

        //check if there is only one undone habit for today and the upcoming habit is completed, if so, increase global strike
        if (
            habitsAssignedForToday.filter(habitUncompleted).length === 1 &&
            habitIsCompleted
        ) {
            return globalStrikeUpdate(updatedHabit, "increase")
        }

        //check if all the habits assigned for today are completed and the upcoming habit is uncompleted, if so, decrease global strike
        if (
            habitsAssignedForToday.filter(habitUncompleted).length === 0 &&
            !habitIsCompleted
        ) {
            return globalStrikeUpdate(updatedHabit, "increase")
        }

        return noGlobalStrikeUpdate(updatedHabit)
    }


    return {isGlobalStrike}
}