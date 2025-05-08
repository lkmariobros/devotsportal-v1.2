/**
 * DateRange type definition
 * This is a replacement for the DateRange type from react-day-picker v9,
 * which doesn't export this type directly.
 */
export interface DateRange {
  from: Date;
  to?: Date;
}
