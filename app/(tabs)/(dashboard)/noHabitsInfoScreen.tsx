import {View} from "react-native";
import {filters} from "@/utils/habitFilters";
import Text from "@/components/Text";
import {DashboardTabKey, User} from "@/types";

export default function NoHabitsInfoScreen({user, currentTab}: { user: User, currentTab: DashboardTabKey }) {

    return <View>
        {/*user does not have any habits whatsover*/}
        {user.habits.length === 0 && (
            <Text classNames={{text: "text-center mt-4 mx-14"}}>After adding your first
                habit, you will see it here.</Text>
        )}
        {/*User does not have any habits scheduled for today including weekly*/}

        {
            user.habits.filter(filters.assignedForTodayWithWeekly).length > 0 &&
            user.habits.filter(filters.habitUncompleted).length === 0 &&
            currentTab === "todo" &&
            <Text classNames={{text: "text-center mt-4 mx-14"}}>You have completed all habits
                scheduled for today</Text>
        }
        {/*Empty completed section*/}
        {
            user.habits.length > 0 &&
            user.habits.filter(filters.habitCompleted).length === 0 &&
            currentTab === "completed" &&
            <Text classNames={{text: "text-center mt-4 mx-14"}}>You have not completed any habits
                today</Text>
        }
        {/*user don't have any habits scheduled for today*/}
        {(
            user.habits.filter(filters.assignedForTodayWithoutWeekly).length === 0 &&
            user.habits.filter(filters.weekly).length === 0 &&
            currentTab === "todo" &&
            user.habits.length > 0
        ) && (
            <Text classNames={{text: "text-center mt-4 mx-14"}}>You don't have any habits
                scheduled for today</Text>
        )
        }
    </View>
}