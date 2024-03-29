"use client";

import { DateRange, Range } from "react-date-range";

import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

interface CalenderProps {
  range: Range;
  onChange: (item: any) => void;
  disabledDates: Date[];
}

const Calendar: React.FC<CalenderProps> = ({
  range,
  onChange,
  disabledDates,
}) => {
  return (
    <DateRange
      rangeColors={["#000"]}
      onChange={(item: any) => onChange(item)}
      moveRangeOnFirstSelection={false}
      ranges={[range]}
      showDateDisplay={false}
      disabledDates={disabledDates}
      minDate={new Date()}
    />
  );
};

export default Calendar;
