import {CreateHabit, DashboardTabKey, FrequencyType, Habit, Repeat} from "@/types";
import {Platform} from "react-native";

const isProduction = process.env.EXPO_PUBLIC_NODE_ENV === "production"

export const DASHBOARD_TABS: {
    key: DashboardTabKey,
    label: string
}[] = [
    {
        key: "todo",
        label: "Todo"
    },
    {
        key: "completed",
        label: "Completed"
    },
    {
        key: "all",
        label: "All"
    }
]

export const HOW_OFTEN_TABS: {
    key: FrequencyType,
    label: string
}[] = [
    {
        key: "repeat",
        label: "Repeat"
    },
    {
        key: "specific days",
        label: "Specific days"
    },
]

export const REPEAT_DROPDOWN_OPTIONS: {
    key: Repeat,
    label: string
}[] = [
    {
        key: "daily",
        label: "Daily"
    },
    {
        key: "weekly",
        label: "Weekly"
    },
]


export const DEFAULT_CREATE_HABIT: CreateHabit = {
    strike: 0,
    details: {
        user: {
            label: "",
            completed: false
        },
        partner: {
            label: "",
            completed: false
        },
    },
    frequency: {
        type: "repeat",
        repeatOption: "daily"
    }
}

export const EXAMPLE_HABIT: Habit = {
    strike: 0,
    id: "0",
    frequency: {
        type: "repeat",
        repeatOption: "daily"
    },
    details: {
        user: {
            label: "Work out",
            completed: false
        },
        partner: {
            label: "Read a book for at least 20 minutes",
            completed: false
        },
    }
}

//choose localhost or external (production) backend url
const IOS = "http://localhost:3000"
const ANDROID = "http://10.0.2.2:3000"

const productionUrl = "https://api.couplehabits.com/api/v1"
export const DEFAULT_URL = isProduction ? productionUrl : `${Platform.OS === "android" ? ANDROID : IOS}/api/v1`

