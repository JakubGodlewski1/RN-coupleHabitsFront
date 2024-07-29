import {Habit, SpecificDays} from "@/types";


//LEGEND
//todo - not completed
//assigned = both completed and uncompleted
//completed - completed


const daysOfTheWeek: { [key: number]: keyof SpecificDays } = {
    0: "sunday",
    1: "monday",
    2: "tuesday",
    3: "wednesday",
    4: "thursday",
    5: "friday",
    6: "saturday",
}

const assignedForTodayFromSpecificDays = (habit: Habit) => {
    const todayDayOfTheWeek = new Date().getDay();
    return (habit.frequency.type === "specific days" && habit.frequency.specificDaysOption[daysOfTheWeek[todayDayOfTheWeek]])
}

const daily = (habit: Habit) => habit.frequency.type === "repeat" && habit.frequency.repeatOption === "daily"
const weekly = (habit: Habit) => habit.frequency.type === "repeat" && habit.frequency.repeatOption === "weekly"
const specificDays = (habit: Habit) => habit.frequency.type === "specific days"

const assignedForTodayWithoutWeekly = (habit: Habit) => assignedForTodayFromSpecificDays(habit) || daily(habit)

const habitCompleted = (habit: Habit) => habit.details.partner.completed && habit.details.mine.completed
const habitUncompleted = (habit: Habit) => !habit.details.partner.completed || !habit.details.mine.completed

const assignedForThisWeek = (habit: Habit) => habit.frequency.type === "repeat" && habit.frequency.repeatOption === "weekly"
const notAssignedForThisWeek = (habit: Habit) => habit.frequency.type === "specific days" || (habit.frequency.type === "repeat" && habit.frequency.repeatOption === "daily")

const completedTodayWithoutWeekly = (habit: Habit) => habitCompleted(habit) && notAssignedForThisWeek(habit)
const completedTodayOnlyWeekly = (habit: Habit) => habitCompleted(habit) && assignedForThisWeek(habit)

const todoTodayWithoutWeekly = (habit: Habit) => habitUncompleted(habit) && assignedForTodayWithoutWeekly(habit)
const todoTodayOnlyWeekly = (habit: Habit) => habitUncompleted(habit) && weekly(habit)


/*all tabs sections*/
const allTabOptions = [
    {
        label: "Daily",
        filter: daily
    },
    {
        label: "Weekly",
        filter: weekly
    },
    {
        label: "Specific days",
        filter: specificDays
    }
]

export const allTabSections = (habits: Habit[]) => {
    return allTabOptions.map(frequencyType => ({
        label: frequencyType.label,
        data: habits.filter(frequencyType.filter)
    }))
}


/*completed tab sections*/
const completedTabOptions = [
    {
        label: "Today",
        filter: completedTodayWithoutWeekly
    },
    {
        label: "This week",
        filter: completedTodayOnlyWeekly
    }
]

export const completedTabSections = (habits: Habit[]) => {
    return completedTabOptions.map(frequencyType => ({
        label: frequencyType.label,
        data: habits.filter(frequencyType.filter)
    }))
}

/*tab sections todo*/
const todoTabOptions = [
    {
        label: "Today",
        filter: todoTodayWithoutWeekly
    },
    {
        label: "This week",
        filter: todoTodayOnlyWeekly
    }
]

export const todoTabSections = (habits: Habit[]) => {
    return todoTabOptions.map(frequencyType => ({
        label: frequencyType.label,
        data: habits.filter(frequencyType.filter)
    }))
}




