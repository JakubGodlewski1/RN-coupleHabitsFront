import {CreateHabit, DashboardTabKey, FrequencyType, Repeat} from "@/types";

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