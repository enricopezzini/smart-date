import { ChronoUnit, ChronUnitType, DateUtilities, DayOfWeekName } from "./DateUtilities";
import { format as formatter } from "date-fns";

export class SmartDate extends Date implements DateUtilities {
    public static min(...values: (Date | string)[]): SmartDate {
        return new SmartDate(DateUtilities.min(...values));
    }

    public static max(...values: (Date | string)[]): SmartDate {
        return new SmartDate(DateUtilities.max(...values));
    }

    public isAfter(anotherDate: Date | SmartDate | string = new Date(), unit: ChronUnitType = ChronoUnit.SECOND): boolean {
        return DateUtilities.compare(this, anotherDate, unit) > 0;
    }

    public isAfterMillisecond(anotherDate: Date | SmartDate | string = new Date()): boolean {
        return this.isAfter(anotherDate, ChronoUnit.MILLISECOND);
    }

    public isAfterNow(unit: ChronUnitType = ChronoUnit.SECOND): boolean {
        return this.isAfter(new Date(), unit);
    }

    public isAfterOrSame(anotherDate: Date | SmartDate | string = new Date(), unit: ChronUnitType = ChronoUnit.SECOND): boolean {
        return DateUtilities.compare(this, anotherDate, unit) >= 0;
    }

    public isAfterOrToday(anotherDate: Date | SmartDate | string = new Date()): boolean {
        return this.isAfterOrSame(anotherDate, ChronoUnit.DAYS);
    }

    public isAfterOrSameNow(unit: ChronUnitType = ChronoUnit.SECOND): boolean {
        return this.isAfterOrSame(new Date(), unit);
    }

    public isBetween(beforeDate: Date | SmartDate | string = new Date(), afterDate: Date | SmartDate | string, unit: ChronUnitType): boolean {
        return DateUtilities.compare(this, beforeDate, unit) >= 0 && DateUtilities.compare(this, afterDate, unit) <= 0;
    }

    public isBeforeOrSame(anotherDate: Date | SmartDate | string = new Date(), unit: ChronUnitType = ChronoUnit.SECOND): boolean {
        return DateUtilities.compare(this, anotherDate, unit) <= 0;
    }

    public isBeforeOrSameMillisecond(anotherDate: Date | SmartDate | string = new Date()): boolean {
        return DateUtilities.compare(this, anotherDate, ChronoUnit.MILLISECOND) <= 0;
    }

    public isBeforeOrSameNow(unit: ChronUnitType = ChronoUnit.SECOND): boolean {
        return this.isBeforeOrSame(new Date(), unit);
    }

    public isBefore(anotherDate: Date | SmartDate | string = new Date(), unit: ChronUnitType = ChronoUnit.SECOND): boolean {
        return DateUtilities.compare(this, anotherDate, unit) < 0;
    }

    public isBeforeNow(unit: ChronUnitType = ChronoUnit.SECOND): boolean {
        return this.isBefore(new Date(), unit);
    }

    public isBeforeToday(): boolean {
        return this.isBefore(new Date(), ChronoUnit.DAYS);
    }

    public isBeforeOrSameToday(): boolean {
        return this.isBeforeOrSame(new Date(), ChronoUnit.DAYS);
    }

    public isSame(anotherDate: Date | SmartDate | string = new Date(), unit: ChronUnitType = ChronoUnit.SECOND): boolean {
        return DateUtilities.compare(this, anotherDate, unit) === 0;
    }

    public isSameMillisecond(anotherDate: Date | SmartDate | string = new Date()): boolean {
        return this.isSame(anotherDate, ChronoUnit.MILLISECOND);
    }

    public isSameDay(anotherDate: Date | SmartDate | string = new Date()): boolean {
        return this.isSame(anotherDate, ChronoUnit.DAYS);
    }

    public isToday(): boolean {
        return DateUtilities.compare(this, new SmartDate(), ChronoUnit.DAYS) === 0;
    }

    public isNotSame(anotherDate: Date | SmartDate = new Date(), unit: ChronUnitType = ChronoUnit.SECOND): boolean {
        return DateUtilities.compare(this, anotherDate, unit) !== 0;
    }

    public isWithin(fromDate: Date | SmartDate = new Date(), toDate: Date | SmartDate = new Date(), unit: ChronUnitType = ChronoUnit.SECOND): boolean {
        return DateUtilities.isWithin(this, fromDate, toDate, unit);
    }

    /**
     * Doesn't change {@link this} instance
     * @param quantity
     * @param unit
     */
    public less(quantity: number, unit: ChronUnitType): SmartDate {
        return new SmartDate(DateUtilities.subtract(this, quantity, unit));
    }

    /**
     * Doesn't change {@link this} instance
     * @param quantity
     */
    public lessDays(quantity: number): SmartDate {
        return this.less(quantity, ChronoUnit.DAYS);
    }

    /**
     * Doesn't change {@link this} instance
     * @param quantity
     */
    public static nowLessDays(quantity: number): SmartDate {
        return new SmartDate().less(quantity, ChronoUnit.DAYS);
    }

    /**
     * Doesn't change {@link this} instance
     * @param quantity
     */
    public static nowLessDaysAtStartOfDay(quantity: number): SmartDate {
        return new SmartDate().less(quantity, ChronoUnit.DAYS);
    }

    /**
     * Doesn't change {@link this} instance
     * @param quantity
     */
    public lessMonths(quantity: number): SmartDate {
        return this.less(quantity, ChronoUnit.MONTHS);
    }

    /**
     * Doesn't change {@link this} instance
     * @param quantity
     */
    public lessMinutes(quantity: number): SmartDate {
        return this.less(quantity, ChronoUnit.MINUTES);
    }

    /**
     * Doesn't change {@link this} instance
     * @param quantity
     */
    public lessDaysAtStartOfDay(quantity: number): SmartDate {
        return this.lessDays(quantity).atStartOfDay();
    }

    /**
     * Doesn't change {@link this} instance
     * @param quantity
     */
    public lessDaysAtEndOfDay(quantity: number): SmartDate {
        return this.lessDays(quantity).atEndOfDay();
    }

    /**
     * Doesn't change {@link this} instance
     * @param quantity
     * @param unit
     */
    public add(quantity: number, unit: ChronUnitType): SmartDate {
        return new SmartDate(DateUtilities.add(this, quantity, unit));
    }

    /**
     * Doesn't change {@link this} instance
     * @param quantity
     */
    public addMonths(quantity: number): SmartDate {
        return this.add(quantity, ChronoUnit.MONTHS);
    }

    /**
     * Doesn't change {@link this} instance
     * @param quantity
     */
    public addMonthsAtEndOfDay(quantity: number): SmartDate {
        return this.addMonths(quantity).atEndOfDay();
    }

    /**
     * Doesn't change {@link this} instance
     * @param quantity
     */
    public static nowAddMonths(quantity: number): SmartDate {
        return new SmartDate().add(quantity, ChronoUnit.MONTHS);
    }

    /**
     * Doesn't change {@link this} instance
     * @param quantity
     */
    public static nowAddMonthsAtEndOfDay(quantity: number): SmartDate {
        return new SmartDate().add(quantity, ChronoUnit.MONTHS).atEndOfDay();
    }

    /**
     * Doesn't change {@link this} instance
     * @param quantity
     */
    public addDays(quantity: number): SmartDate {
        return this.add(quantity, ChronoUnit.DAYS);
    }

    /**
     * Doesn't change {@link this} instance
     * @param quantity
     */
    public static nowAddDays(quantity: number): SmartDate {
        return new SmartDate().add(quantity, ChronoUnit.DAYS);
    }

    /**
     * Doesn't change {@link this} instance
     * @param quantity
     */
    public addDaysAtEndOfDay(quantity: number): SmartDate {
        return this.addDays(quantity).atEndOfDay();
    }

    /**
     * Doesn't change {@link this} instance
     * @param quantity
     */
    public static nowAddDaysAtEndOfDay(quantity: number): SmartDate {
        return new SmartDate().addDays(quantity).atEndOfDay();
    }

    /**
     * Doesn't change {@link this} instance
     * @param quantity
     */
    public addDaysAtStartOfDay(quantity: number): SmartDate {
        return this.addDays(quantity).atStartOfDay();
    }

    /**
     * This changes {@link this} instance
     * @param quantity
     * @param unit
     */
    public set(quantity: number, unit: ChronUnitType): SmartDate {
        super.setTime(DateUtilities.add(this, quantity, unit).getTime());
        return this;
    }

    public difference(otherDate: Date | string, unit: ChronUnitType): number {
        return DateUtilities.difference(this, otherDate, unit);
    }

    public differenceDays(otherDate: Date | string, roundingMode: RoundingModeType = "floor"): number {
        return SmartNumber.round(this.differenceDays(otherDate), roundingMode);
    }

    public static differenceDays(firstDate: SmartDate | Date | string, secondDate: SmartDate | Date | string, roundingMode: RoundingModeType = "floor"): SmartNumber {
        return SmartNumber.round(new SmartDate(firstDate).difference(secondDate, ChronoUnit.DAYS), roundingMode);
    }

    public static differenceDaysFromNow(date: Date | string, roundingMode: RoundingModeType = "floor"): number {
        return SmartNumber.round(new SmartDate().differenceDays(date), roundingMode);
    }

    atStartOfDay(): SmartDate {
        return new SmartDate(DateUtilities.atStartOfDay(this));
    }

    static nowAtStartOfDay(): SmartDate {
        return new SmartDate().atStartOfDay();
    }

    atEndOfDay(): SmartDate {
        return new SmartDate(DateUtilities.atEndOfDay(this));
    }

    static nowAtEndOfDay(): SmartDate {
        return new SmartDate().atEndOfDay();
    }

    getNextOccurrence(dayOfWeek: DayOfWeekName) {
        return new SmartDate(DateUtilities.getNextOccurrence(dayOfWeek, this)).atStartOfDay();
    }

    getDayOfWeek(): DayOfWeekName {
        return DateUtilities.getNextDayOfWeek(0, this);
    }

    getTomorrowDayOfWeek(): DayOfWeekName {
        return DateUtilities.getNextDayOfWeek(1, this);
    }

    formatAsDate(): string {
        return this.format("yyyy-MM-dd");
    }

    static nowFormatAsDate(): string {
        return new SmartDate().formatAsDate();
    }

    formatAsUTCDateTime(hideMilliseconds = true): string {
        return DateUtilities.formatAsDateTime(this, { hideMilliseconds: hideMilliseconds, hide000Milliseconds: true, hideISOTimeDivider: false });
    }

    /** Force this date to UTC offset */
    utc(): SmartDate {
        return new SmartDate(this.valueOf() + this.getTimezoneOffset() * 60 * 1000);
    }

    format(format = "dd/MM/yyyy"): string {
        return formatter(this.utc(), format);
    }

    static format(format = "dd/MM/yyyy"): string {
        return formatter(new SmartDate().utc(), format);
    }
}

export type RoundingModeType = "round" | "floor" | "ceil";

export class RoundingMode {
    public static readonly ROUND: RoundingModeType = "round";
    public static readonly FLOOR: RoundingModeType = "floor";
    public static readonly CEIL: RoundingModeType = "ceil";
}

class SmartNumber {
    public static round(num: number, mode: RoundingModeType = "round"): number {
        switch (mode) {
            case "floor":
            case "ceil":
            case "round":
                return Math[mode](num);
            default:
                return Math.round(num);
        }
    }
}
