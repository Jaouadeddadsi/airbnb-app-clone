"use client";

import { DateRange } from "react-date-range";

import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

interface CalenderProps {
  range: {
    startDate: Date;
    endDate: Date;
    key: string;
  }[];
  onChange: (item: any) => void;
}

const Calendar: React.FC<CalenderProps> = ({ range, onChange }) => {
  return (
    <DateRange
      rangeColors={["#000"]}
      onChange={(item: any) => onChange(item)}
      moveRangeOnFirstSelection={false}
      ranges={range}
      showDateDisplay={false}
    />
  );
};

export default Calendar;
