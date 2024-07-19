import {CreateHabit, DashboardTabKey, Repeat, SpecificDaysMultiSelectKey} from "@/types";

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

export const SPECIFIC_DAYS_MULTISELECT_OPTIONS: {
    key: SpecificDaysMultiSelectKey;
    label: string;
    isSelected: boolean;
}[] =
    [
        {
            key: 1,
            label: "Mo",
            isSelected: true
        },
        {
            key: 2,
            label: "Tu",
            isSelected: false
        },
        {
            key: 3,
            label: "We",
            isSelected: false
        },
        {
            key: 4,
            label: "Th",
            isSelected: false
        },
        {
            key: 5,
            label: "Fr",
            isSelected: false
        },
        {
            key: 6,
            label: "Sa",
            isSelected: false
        },
        {
            key: 0,
            label: "Su",
            isSelected: false
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