import {z} from 'zod';

// Define Repeat type validator
export const repeatValidator = z.enum(["daily", "weekly"]);

// Define Specific_days type validator
export const specificDaysValidator = z.object({
    monday: z.boolean(),
    tuesday: z.boolean(),
    wednesday: z.boolean(),
    thursday: z.boolean(),
    friday: z.boolean(),
    saturday: z.boolean(),
    sunday: z.boolean(),
});

// Define FrequencyType type validator
export const frequencyTypeValidator = z.enum(["repeat", "specific days"]);

// Define Frequency type validator
export const frequencyValidator = z.union([
    z.object({
        type: z.literal("repeat"),
        repeatOption: repeatValidator,
    }),
    z.object({
        type: z.literal("specific days"),
        specificDaysOption: specificDaysValidator,
    })
]);

// Define CreateHabit type validator
export const createHabitValidator = z.object({
    frequency: frequencyValidator,
    details: z.object({
        mine: z.object({
            label: z.string().min(2, "Label is too short.").max(30, "Label is too long. max 30 characters"),
            completed: z.boolean(),
        }),
        partner: z.object({
            label: z.string().min(2, "Label is too short.").max(30, "Label is too long. max 30 characters"),
            completed: z.boolean(),
        })
    })
});