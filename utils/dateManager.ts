export class DateManager {
    static millisecondsToMidnight(offsetInMinutes: number = 0) {
        //returns amount of milliseconds between now and midnight
        const now: Date = new Date();

        const midnight: Date = new Date(now);
        midnight.setHours(0, 0, 0, 0); // Set to midnight of today
        midnight.setDate(midnight.getDate() + 1); // Move to next day

        const midnightPlus5Min: Date = new Date(midnight);
        midnightPlus5Min.setMinutes(midnightPlus5Min.getMinutes() + offsetInMinutes);

        return midnightPlus5Min.getTime() - now.getTime();


    }
}