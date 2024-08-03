export function getUtcOffsetHours(): string {
    // Create a new Date object
    const now = new Date();

    // Get the timezone offset in minutes from UTC
    const offsetInMinutes = now.getTimezoneOffset();

    // Convert minutes to hours and return the result
    // Positive offset means local time is ahead of UTC
    // Negative offset means local time is behind UTC
    return (-offsetInMinutes / 60).toString();
}