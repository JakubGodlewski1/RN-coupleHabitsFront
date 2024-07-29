import HabitCard from "@/components/HabitCard";
import {DashboardTabKey, Habit} from "@/types";

type Props = {
    habits: Habit[],
    currentTab: DashboardTabKey
}

export default function FilteredHabits({currentTab, habits}: Props) {


    return habits.map(h => (
        <HabitCard key={h.id} habit={h}/>
    ))
}