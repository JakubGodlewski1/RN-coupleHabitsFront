import {z} from "zod";
import {
    createHabitValidator,
    frequencyTypeValidator,
    frequencyValidator,
    repeatValidator,
    specificDaysValidator
} from "@/validators/habitValidators";
import {signInValidator, signUpValidator} from "@/validators/authValidators";


//auth
type SignUp = z.infer<typeof signUpValidator>
type SignIn = z.infer<typeof signInValidator>

//habit details
type Repeat = z.infer<typeof repeatValidator>
type SpecificDays = z.infer<typeof specificDaysValidator>

// type Frequency = Repeat | SpecificDays
type FrequencyType = z.infer<typeof frequencyTypeValidator>
type Frequency = z.infer<typeof frequencyValidator>

//create Habit - use it in a form when creating or altering a habit
type CreateHabit = z.infer<typeof createHabitValidator>
type Habit = CreateHabit & { id: string }

//user (data from the server containing all the necessary information)
type User = {
    avatar: null | string;
    partner: {
        connected: boolean,
        avatar: null | string;
    }
    connectionCode: string,
    email: string,
    habits: Habit[],
    gameAccount: {
        strike: number,
        points: number
    }
};

//Tabs
type DashboardTabKey = "todo" | "completed" | "all"
type SpecificDaysMultiSelectKey = "monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday"

//habit form
type HabitFormType = {
    type: "create" | "update",
    initHabitJSON: string
}