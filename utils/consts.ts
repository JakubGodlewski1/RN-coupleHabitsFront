import {CreateHabit, DashboardTabKey, FrequencyType, Habit, Repeat, User} from "@/types";
import {Platform} from "react-native";

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
        mine: {
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
        mine: {
            label: "Run for at least 10 minutes",
            completed: false
        },
        partner: {
            label: "Run for at least 10 minutes",
            completed: false
        },
    }
}

const IOS = "http://localhost:3000"
const ANDROID = "http://10.0.2.2:3000"
const external = "https://plenty-mice-kick.loca.lt/api/v1"
const isExternal = true

export const DEFAULT_URL = isExternal ? external : `${Platform.OS === "android" ? ANDROID : IOS}/api/v1`