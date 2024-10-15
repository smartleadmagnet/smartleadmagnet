import { format, formatDistanceToNow, isBefore, parseISO, subWeeks } from "date-fns";
import * as React from "react";

type Options = {
  format: string;
  loading?: string;
  relative?: boolean;
  prefix?: string;
  suffix?: string;
};

export const useFormattedDate = (date: Date | string, options: Options) => {
  const { relative = false, format: dateFormat, loading, prefix = "", suffix = "" } = options;

  const [formattedDate, setFormattedDate] = React.useState<string | null>(loading ?? null);

  React.useEffect(() => {
    let dateToFormat = typeof date === "string" ? parseISO(date) : date;

    if (relative) {
      // Check if the date is more than a week ago
      if (isBefore(dateToFormat, subWeeks(new Date(), 1))) {
        setFormattedDate(`on ${format(dateToFormat, dateFormat)}`);
      } else {
        // Use formatDistanceToNow for relative time
        const relativeTime = formatDistanceToNow(dateToFormat, { addSuffix: true });
        setFormattedDate(relativeTime);
      }
      return;
    }

    // Format the date using date-fns format function
    setFormattedDate(`${prefix}${format(dateToFormat, dateFormat)}${suffix}`);
  }, [date, dateFormat, prefix, relative, suffix]);

  return formattedDate;
};
