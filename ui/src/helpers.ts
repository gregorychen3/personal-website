import { format } from "date-fns";

export const getDateDisplay = (dateString: string) => format(new Date(dateString), "M/dd/y");
