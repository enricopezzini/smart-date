export interface Period {
  start: Date,
  end: Date
}

export type Days = number;

export class ChronoUnit {
  public static readonly DAYS: ChronUnitType = "days";
  public static readonly DAY: ChronUnitType = "day";
  public static readonly MONTH: ChronUnitType = "month";
  public static readonly MONTHS: ChronUnitType = "months";
  public static readonly YEAR: ChronUnitType = "year";
  public static readonly YEARS: ChronUnitType = "years";
  public static readonly HOUR: ChronUnitType = "hour";
  public static readonly HOURS: ChronUnitType = "hours";
  public static readonly MINUTE: ChronUnitType = "minute";
  public static readonly MINUTES: ChronUnitType = "minutes";
  public static readonly SECOND: ChronUnitType = "second";
  public static readonly SECONDS: ChronUnitType = "seconds";
  public static readonly MILLISECOND: ChronUnitType = "millisecond";
  public static readonly MILLISECONDS: ChronUnitType = "milliseconds";
}

export class DayOfWeek {
  public static readonly MONDAY: DayOfWeekName = "MONDAY";
  public static readonly TUESDAY: DayOfWeekName = "TUESDAY";
  public static readonly WEDNESDAY: DayOfWeekName = "WEDNESDAY";
  public static readonly THURSDAY: DayOfWeekName = "THURSDAY";
  public static readonly FRIDAY: DayOfWeekName = "FRIDAY";
  public static readonly SATURDAY: DayOfWeekName = "SATURDAY";
  public static readonly SUNDAY: DayOfWeekName = "SUNDAY";

  /**
   * @param UTCOrder if true returns day of the week ordered with SUNDAY as array starter [0]
   */
  public static getOrderedDayOfWeekName(UTCOrder = false): DayOfWeekName[] {
    const daysOfWeek = [this.MONDAY, this.TUESDAY, this.WEDNESDAY, this.THURSDAY, this.FRIDAY, this.SATURDAY];
    if (UTCOrder) daysOfWeek.unshift(this.SUNDAY);
    else daysOfWeek.push(this.SUNDAY);
    return daysOfWeek;
  }
}

export type DayOfWeekName = "MONDAY" | "TUESDAY" | "WEDNESDAY" | "THURSDAY" | "FRIDAY" | "SATURDAY" | "SUNDAY";
export type ChronUnitType =
  "days"
  | "day"
  | "month"
  | "months"
  | "year"
  | "years"
  | "hour"
  | "hours"
  | "minute"
  | "minutes"
  | "second"
  | "seconds"
  | "millisecond"
  | "milliseconds";

interface DateTimeFormatterConfig {
  hideISOTimeDivider?: boolean;
  hide000Milliseconds?: boolean;
  hideMilliseconds?: boolean;
}

export class DateUtilities {
  public static readonly ONE_DAY_IN_MILLISECONDS: number = 1000 * 60 * 60 * 24;
  public static readonly ONE_HOUR_IN_MILLISECONDS: number = 1000 * 60 * 60;
  public static readonly ONE_MINUTE_IN_MILLISECONDS: number = 1000 * 60;
  public static readonly ONE_SECOND_IN_MILLISECONDS: number = 1000;
  public static readonly REGEX_ISO8601_DATETIME: RegExp = /([+-]?\d{4}(?!\d{2}\b))((-?)((0[1-9]|1[0-2])(\3([12]\d|0[1-9]|3[01]))?|W([0-4]\d|5[0-2])(-?[1-7])?|(00[1-9]|0[1-9]\d|[12]\d{2}|3([0-5]\d|6[1-6])))([T\s]((([01]\d|2[0-3])((:?)[0-5]\d)?|24:?00)([.,]\d+(?!:))?)?(\17[0-5]\d([.,]\d+)?)?([zZ]|([+-])([01]\d|2[0-3]):?([0-5]\d)?)?)?)?/;

  public static min(...values: (Date | string)[]) {
    const instantList: number[] = values.map((input: Date | string) => {
      const date: Date = typeof input === "string" ? new Date(input) : input;
      return date.getTime();
    });
    const minInstant: number = Math.min(...instantList);
    return new Date(minInstant);
  }

  public static max(...values: (Date | string)[]) {
    const instantList: number[] = values.map((input: Date | string) => {
      const date: Date = typeof input === "string" ? new Date(input) : input;
      return date.getTime();
    });
    const minInstant: number = Math.max(...instantList);
    return new Date(minInstant);
  }

  public static isValidDateTime(value: string) {
    const date: Date = new Date(value);
    return !isNaN(date.getTime()) && DateUtilities.REGEX_ISO8601_DATETIME.test(value);
  }

  /**
   *
   * @param input1
   * @param input2
   * @param unit
   * @return 1 {@link input1} is bigger, {@link input2} is smaller
   * || 0 {@link input1} === {@link input2}
   * || -1 {@link input1} is smaller, {@link input2} is bigger
   */
  public static compare(input1: Date | string = new Date(), input2: Date | string = new Date(), unit: ChronUnitType = ChronoUnit.MILLISECOND): -1 | 0 | 1 {
    const firstDate: Date = typeof input1 === "string" ? new Date(input1) : input1;
    const secondDate: Date = typeof input2 === "string" ? new Date(input2) : input2;
    switch (unit) {
      case "year":
      case "years":
        return firstDate.getUTCFullYear() > secondDate.getUTCFullYear() ? 1 : firstDate.getUTCFullYear() === secondDate.getUTCFullYear() ? 0 : -1;
      case "month":
      case "months" :
        return firstDate.getUTCFullYear() > secondDate.getUTCFullYear() ? 1 : firstDate.getUTCFullYear() === secondDate.getUTCFullYear() ?
          (firstDate.getUTCMonth() > secondDate.getUTCMonth() ? 1 : firstDate.getUTCMonth() === secondDate.getUTCMonth() ? 0 : -1)
          : -1;
      case "day":
      case "days":
        return firstDate.getUTCFullYear() > secondDate.getUTCFullYear() ? 1 : firstDate.getUTCFullYear() === secondDate.getUTCFullYear() ?
          (firstDate.getUTCMonth() > secondDate.getUTCMonth() ? 1 : firstDate.getUTCMonth() === secondDate.getUTCMonth() ?
            (firstDate.getUTCDate() > secondDate.getUTCDate() ? 1 : firstDate.getUTCDate() === secondDate.getUTCDate() ? 0 : -1)
            : -1)
          : -1;
      case "hour":
      case "hours" :
        return firstDate.getUTCFullYear() > secondDate.getUTCFullYear() ? 1 : firstDate.getUTCFullYear() === secondDate.getUTCFullYear() ?
          (firstDate.getUTCMonth() > secondDate.getUTCMonth() ? 1 : firstDate.getUTCMonth() === secondDate.getUTCMonth() ?
            (firstDate.getUTCDate() > secondDate.getUTCDate() ? 1 : firstDate.getUTCDate() === secondDate.getUTCDate() ?
              (firstDate.getUTCHours() > secondDate.getUTCHours() ? 1 : firstDate.getUTCHours() === secondDate.getUTCHours() ? 0 : -1)
              : -1)
            : -1)
          : -1;
      case "minute":
      case "minutes" :
        return firstDate.getUTCFullYear() > secondDate.getUTCFullYear() ? 1 : firstDate.getUTCFullYear() === secondDate.getUTCFullYear() ?
          (firstDate.getUTCMonth() > secondDate.getUTCMonth() ? 1 : firstDate.getUTCMonth() === secondDate.getUTCMonth() ?
            (firstDate.getUTCDate() > secondDate.getUTCDate() ? 1 : firstDate.getUTCDate() === secondDate.getUTCDate() ?
              (firstDate.getUTCHours() > secondDate.getUTCHours() ? 1 : firstDate.getUTCHours() === secondDate.getUTCHours() ?
                (firstDate.getUTCMinutes() > secondDate.getUTCMinutes() ? 1 : firstDate.getUTCMinutes() === secondDate.getUTCMinutes() ? 0 : -1)
                : -1)
              : -1)
            : -1)
          : -1;
      case "second":
      case "seconds" :
        return firstDate.getUTCFullYear() > secondDate.getUTCFullYear() ? 1 : firstDate.getUTCFullYear() === secondDate.getUTCFullYear() ?
          (firstDate.getUTCMonth() > secondDate.getUTCMonth() ? 1 : firstDate.getUTCMonth() === secondDate.getUTCMonth() ?
            (firstDate.getUTCDate() > secondDate.getUTCDate() ? 1 : firstDate.getUTCDate() === secondDate.getUTCDate() ?
              (firstDate.getUTCHours() > secondDate.getUTCHours() ? 1 : firstDate.getUTCHours() === secondDate.getUTCHours() ?
                (firstDate.getUTCMinutes() > secondDate.getUTCMinutes() ? 1 : firstDate.getUTCMinutes() === secondDate.getUTCMinutes() ?
                  (firstDate.getUTCSeconds() > secondDate.getUTCSeconds() ? 1 : firstDate.getUTCSeconds() === secondDate.getUTCSeconds() ? 0 : -1)
                  : -1)
                : -1)
              : -1)
            : -1)
          : -1;
      case "millisecond":
      case "milliseconds" :
      default:
        return firstDate.getUTCFullYear() > secondDate.getUTCFullYear() ? 1 : firstDate.getUTCFullYear() === secondDate.getUTCFullYear() ?
          (firstDate.getUTCMonth() > secondDate.getUTCMonth() ? 1 : firstDate.getUTCMonth() === secondDate.getUTCMonth() ?
            (firstDate.getUTCDate() > secondDate.getUTCDate() ? 1 : firstDate.getUTCDate() === secondDate.getUTCDate() ?
              (firstDate.getUTCHours() > secondDate.getUTCHours() ? 1 : firstDate.getUTCHours() === secondDate.getUTCHours() ?
                (firstDate.getUTCMinutes() > secondDate.getUTCMinutes() ? 1 : firstDate.getUTCMinutes() === secondDate.getUTCMinutes() ?
                  (firstDate.getUTCSeconds() > secondDate.getUTCSeconds() ? 1 : firstDate.getUTCSeconds() === secondDate.getUTCSeconds() ?
                    (firstDate.getUTCMilliseconds() > secondDate.getUTCMilliseconds() ? 1 : firstDate.getUTCMilliseconds() === secondDate.getUTCMilliseconds() ? 0 : -1)
                    : -1)
                  : -1)
                : -1)
              : -1)
            : -1)
          : -1;
    }
  }

  /**
   * TODO refactor using {@link formatAsDateTime} with proper configurations
   * This should return date formatted as valid ISO 8601 date (format: yyyy-mm-dd)
   * in the UTC timezone
   * @param input
   */
  public static formatAsDate(input: Date | string = new Date()): string {
    const date: Date = typeof input === "string" ? new Date(input) : input;
    return date.toISOString().split("T")[0];
  }

  /**
   * This should return date formatted as Month{@link separator}Day{@link separator}separator*Year with or without leading zero (format: 02/12/2022 | 2/13/2022)
   * @param input
   * @param separator
   * @param leadingZero
   * @deprecated
   */
  public static formatAsDDMMYY(input: Date | string = new Date(), separator = "/", leadingZero = false): string {
    const date: Date = typeof input === "string" ? new Date(input) : input;
    return (leadingZero ? ("0" + date.getDate()).slice(-2) : date.getDate().toString()) + separator
      + (leadingZero ? ("0" + (date.getMonth() + 1)).slice(-2) : (date.getMonth() + 1).toString()) + separator
      + date.getFullYear();
  }

  /**
   * This should return date formatted as Month{@link separator}Day{@link separator}separator*Year with or without leading zero (format: 02/12/2022 | 2/13/2022)
   * @param input
   * @param separator
   * @param leadingZero
   * @deprecated
   */
  public static formatAsMMDDYY(input: Date | string = new Date(), separator = "/", leadingZero = false): string {
    const date: Date = typeof input === "string" ? new Date(input) : input;
    return (leadingZero ? ("0" + (date.getMonth() + 1)).slice(-2) : (date.getMonth() + 1).toString()) + separator
      + (leadingZero ? ("0" + date.getDate()).slice(-2) : date.getDate().toString()) + separator
      + date.getFullYear();
  }

  /**
   * This should return date formatted as valid ISO 8601 date-time (format: yyyy-mm-ddThh-mm-ss<offset>)
   * @param input
   * @param config
   */
  public static formatAsDateTime(input: Date = new Date(), config: DateTimeFormatterConfig = {
    hideISOTimeDivider: false,
    hide000Milliseconds: false,
    hideMilliseconds: true
  }): string {
    const date: Date = typeof input === "string" ? new Date(input) : input;
    let ISODate: string = date.toISOString();
    if (!config) config = {};
    if (config.hideISOTimeDivider) ISODate = ISODate.replace(/T/g, "");
    if (config.hide000Milliseconds) ISODate = ISODate.replace(/\.000/g, "");
    if (config.hideMilliseconds) ISODate = ISODate.replace(/\.\d\d\d(?=Z)/g, "");
    return ISODate;
  }

  public static getFlooredDaysFromMilliseconds(milliseconds: number): Days {
    return Math.floor(milliseconds / DateUtilities.ONE_DAY_IN_MILLISECONDS);
  }

  public static getLastYearMonths(): Period[] {
    // const lastYearMonths: Period[] = [];
    // const today: Date = new Date();
    // let cursor: Date = new Date(today.setFullYear(today.getFullYear() - 1, today.getMonth(), 1));
    // for (let i = 0; i < 12; i++) {
    // 	const start: Date = cursor;
    // 	const end: Date = new Date(today.setFullYear(today.getFullYear(), today.getMonth() + 1, 1));
    // 	const period: Period = {
    // 		end: end,
    // 		start: start
    // 	};
    // 	lastYearMonths.push(period);
    // 	cursor = new Date(end.setMonth(end.getMonth()));
    // }
    // return lastYearMonths;
    const response: Period[] = [];
    let today: Date = new Date();
    today = new Date(today.setFullYear(today.getFullYear() - 1, today.getMonth() + 1, 1));
    for (let i = 0; i < 12; i++) {
      const start = new Date(today.toISOString().split("T")[0]);
      const end = new Date(today.setFullYear(today.getFullYear(), today.getMonth() + 1, 0));
      const t: Period = {
        start: start,
        end: new Date(end.toISOString().split("T")[0])
      };
      response.push(t);
      today = new Date(end.setDate(end.getDate() + 1));
    }
    return response;
  }

  /**
   * Doesn't change input instance, since another {@link Date} is constructed from {@link input}
   * @param date
   * @param quantity
   * @param measureUnit
   */
  public static subtract(date: Date, quantity: number, measureUnit: ChronUnitType): Date {
    return this.add(date, -quantity, measureUnit);
  }

  /**
   * Doesn't change input instance, since another {@link Date} is constructed from {@link input}
   * @param input
   * @param unit
   * @param measureUnit {@link input} with {@link unit} added as a {@link measureUnit}
   */
  public static add(input: Date | string, unit: number, measureUnit: ChronUnitType): Date {
    const date: Date = typeof input === "string" ? new Date(input) : input;
    const clonedDate: Date = new Date(date);
    switch (measureUnit) {
      case "day":
      case "days":
        clonedDate.setUTCDate(clonedDate.getUTCDate() + unit);
        break;
      case "month":
      case "months":
        clonedDate.setUTCMonth(clonedDate.getUTCMonth() + unit);
        break;
      case "year":
      case "years":
        clonedDate.setUTCFullYear(clonedDate.getUTCFullYear() + unit);
        break;
      case "hour":
      case "hours":
        clonedDate.setUTCHours(clonedDate.getUTCHours() + unit);
        break;
      case "minute":
      case "minutes":
        clonedDate.setUTCMinutes(clonedDate.getUTCMinutes() + unit);
        break;
      case "second":
      case "seconds":
        clonedDate.setUTCSeconds(clonedDate.getUTCSeconds() + unit);
        break;
      case "millisecond":
      case "milliseconds":
        clonedDate.setUTCMilliseconds(clonedDate.getUTCMilliseconds() + unit);
        break;
      default:
        return clonedDate;
    }
    return clonedDate;
  }

  /**
   * @param first
   * @param second
   * @param measureUnit
   */
  public static difference(first: Date | string, second: Date | string, measureUnit: Omit<ChronUnitType, "months" & "month">): number {
    /** Trick to skip checks for unsupported {@link ChronoUnit.MONTH} and {@link ChronoUnit.YEAR} **/
    const allSupportedMeasureUnit: ChronUnitType = measureUnit as ChronUnitType;
    if (DateUtilities.compare(first, second, allSupportedMeasureUnit) === 0) return 0;
    const firstDate: Date = typeof first === "string" ? new Date(first) : first;
    const secondDate: Date = typeof second === "string" ? new Date(second) : second;
    const biggerDate: Date = DateUtilities.compare(firstDate, secondDate, allSupportedMeasureUnit) > 0 ? firstDate : secondDate;
    const smallerDate: Date = DateUtilities.compare(firstDate, secondDate, allSupportedMeasureUnit) < 0 ? firstDate : secondDate;
    const difference: number = biggerDate.getTime() - smallerDate.getTime();
    switch (allSupportedMeasureUnit) {
      case "day":
      case "days":
        return difference / DateUtilities.ONE_DAY_IN_MILLISECONDS;
      case "hour":
      case "hours":
        return difference / DateUtilities.ONE_HOUR_IN_MILLISECONDS;
      case "minute":
      case "minutes":
        return difference / DateUtilities.ONE_MINUTE_IN_MILLISECONDS;
      case "second":
      case "seconds":
        return difference / DateUtilities.ONE_SECOND_IN_MILLISECONDS;
      case "millisecond":
      case "milliseconds":
      default:
        return difference;
    }
  }

  public static atStartOfDay(input: Date | string = new Date()): Date {
    const date: Date = typeof input === "string" ? new Date(input) : input;
    if (!date) return date;
    date.setUTCMilliseconds(0);
    date.setUTCSeconds(0);
    date.setUTCMinutes(0);
    date.setUTCHours(0);
    return date;
  }

  public static atEndOfDay(input: Date | string = new Date()): Date {
    const date: Date = typeof input === "string" ? new Date(input) : input;
    if (!date) return date;
    date.setUTCMilliseconds(0);
    date.setUTCSeconds(59);
    date.setUTCMinutes(59);
    date.setUTCHours(23);
    return date;
  }

  public static areSame(first: Date | string, second: Date | string, unit: ChronUnitType): boolean {
    if (!first || !second) return false;
    const firstDate: Date = typeof first === "string" ? new Date(first) : first;
    const secondDate: Date = typeof second === "string" ? new Date(second) : second;
    switch (unit) {
      case "year":
      case "years":
        return firstDate.getUTCFullYear() === secondDate.getUTCFullYear();
      case "month":
      case "months" :
        return firstDate.getUTCFullYear() === secondDate.getUTCFullYear()
          && firstDate.getUTCMonth() === secondDate.getUTCMonth();
      case "day":
      case "days":
        return firstDate.getUTCDate() === secondDate.getUTCDate()
          && firstDate.getUTCMonth() === secondDate.getUTCMonth()
          && firstDate.getUTCFullYear() === secondDate.getUTCFullYear();
      case "hour":
      case "hours" :
        return firstDate.getUTCHours() === secondDate.getUTCHours()
          && firstDate.getUTCDate() === secondDate.getUTCDate()
          && firstDate.getUTCMonth() === secondDate.getUTCMonth()
          && firstDate.getUTCFullYear() === secondDate.getUTCFullYear();
      case "minute":
      case "minutes" :
        return firstDate.getUTCMinutes() === secondDate.getUTCMinutes()
          && firstDate.getUTCHours() === secondDate.getUTCHours()
          && firstDate.getUTCDate() === secondDate.getUTCDate()
          && firstDate.getUTCMonth() === secondDate.getUTCMonth()
          && firstDate.getUTCFullYear() === secondDate.getUTCFullYear();
      case "second":
      case "seconds" :
        return firstDate.getUTCSeconds() === secondDate.getUTCSeconds()
          && firstDate.getUTCMinutes() === secondDate.getUTCMinutes()
          && firstDate.getUTCHours() === secondDate.getUTCHours()
          && firstDate.getUTCDate() === secondDate.getUTCDate()
          && firstDate.getUTCMonth() === secondDate.getUTCMonth()
          && firstDate.getUTCFullYear() === secondDate.getUTCFullYear();
      case "millisecond":
      case "milliseconds" :
      default:
        return firstDate.getUTCMilliseconds() === secondDate.getUTCMilliseconds()
          && firstDate.getUTCSeconds() === secondDate.getUTCSeconds()
          && firstDate.getUTCMinutes() === secondDate.getUTCMinutes()
          && firstDate.getUTCHours() === secondDate.getUTCHours()
          && firstDate.getUTCDate() === secondDate.getUTCDate()
          && firstDate.getUTCMonth() === secondDate.getUTCMonth()
          && firstDate.getUTCFullYear() === secondDate.getUTCFullYear();
    }
  }

  public static getNextOccurrence(dayOfWeek: DayOfWeekName, date: Date | string = new Date()): Date {
    const d: Date = new Date(date);
    const indexDayOfWeek: number = DayOfWeek.getOrderedDayOfWeekName(true).indexOf(dayOfWeek);
    if (indexDayOfWeek - d.getUTCDay() === 0)
      return DateUtilities.add(d, 7, ChronoUnit.DAYS);
    d.setDate(d.getUTCDate() + (7 + indexDayOfWeek - d.getUTCDay()) % 7);
    return d;
  }

  public static getNextDayOfWeek(nextDays = 1, date: Date | string = new Date()): DayOfWeekName {
    const d: Date = new Date(date);
    if (nextDays === 0)
      return DayOfWeek.getOrderedDayOfWeekName(true)[d.getUTCDay()];
    const indexDayOfWeek: number = DateUtilities.add(d, nextDays, ChronoUnit.DAYS).getUTCDay();
    return DayOfWeek.getOrderedDayOfWeekName(true)[indexDayOfWeek];
  }

  public static isWithin(when: Date | string = new Date(), from: Date | string, to: Date | string, unit: ChronUnitType): boolean {
    if (!when || !from || !to) return false;
    const firstDate: Date = typeof from === "string" ? new Date(from) : from;
    const secondDate: Date = typeof to === "string" ? new Date(to) : to;
    const interestedDate: Date = typeof when === "string" ? new Date(when) : when;
    return DateUtilities.compare(firstDate, interestedDate, unit) <= 0 && DateUtilities.compare(secondDate, interestedDate, unit) >= 0;
  }
}
