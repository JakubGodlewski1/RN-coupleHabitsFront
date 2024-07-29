import {Habit, SpecificDays} from "@/types";


const daysOfTheWeek: { [key: number]: keyof SpecificDays } = {
    0: "sunday",
    1: "monday",
    2: "tuesday",
    3: "wednesday",
    4: "thursday",
    5: "friday",
    6: "saturday",
}

const todayInSpecificDays = (specificDays: SpecificDays): boolean => {
    const todayDayOfTheWeek = new Date().getDay();
    return specificDays[daysOfTheWeek[todayDayOfTheWeek]]
};

const habitCompleted = (habit: Habit) => habit.details.partner.completed && habit.details.mine.completed
const habitUncompleted = (habit: Habit) => !habit.details.partner.completed || !habit.details.mine.completed
const todoThisWeek = (habit: Habit) => habit.frequency = {type: "repeat", repeatOption: "weekly"}

//check if the habit is to be done today
const todoTodayHelper = (habit: Habit, includeWeekly: boolean) => {
    const frequency = habit.frequency;
    const today = new Date().getDay();


}

const todoTodayWithThisWeek = (habit: Habit) => {
    return todoTodayHelper(habit, true);
}

const todoTodayWithoutThisWeek = (habit: Habit) => {
    return todoTodayHelper(habit, false);
}

const daily = (habit: Habit) => habit.frequency.type === "repeat" && habit.frequency.repeatOption === "daily"
const weekly = (habit: Habit) => habit.frequency.type === "repeat" && habit.frequency.repeatOption === "weekly"
const specificDays = (habit: Habit) => habit.frequency.type === "specific days"

//logical filters, mostly for interaction with db etc
const habitFiltersLogical = {
    completed: (habits: Habit[]) => habits.filter(habitCompleted),
    uncompleted: (habits: Habit[]) => habits.filter(habitUncompleted),
    assignedForToday: (habits: Habit[]) => habits.filter(todoTodayWithThisWeek),
}

//filters for displaying proper habits on the ui
const habitFiltersUI = {
    todoThisWeekUncompleted: (habits: Habit[]) => habits.filter(habitUncompleted).filter(todoThisWeek),
    todoThisWeekCompleted: (habits: Habit[]) => habits.filter(habitCompleted).filter(todoThisWeek),
    todoTodayUncompleted: (habits: Habit[]) => habits.filter(habitUncompleted).filter(todoTodayWithoutThisWeek),
    todoTodayCompleted: (habits: Habit[]) => habits.filter(habitCompleted).filter(todoTodayWithoutThisWeek),
    daily: (habits: Habit[]) => habits.filter(daily),
    weekly: (habits: Habit[]) => habits.filter(weekly),
    specificDays: (habits: Habit[]) => habits.filter(specificDays),

}

export const habitFilters = {
    logical: habitFiltersLogical,
    UI: habitFiltersUI
}


