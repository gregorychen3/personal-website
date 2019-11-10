import moment from "moment";

export const getDateDisplay = (dateString: string) =>
  moment(dateString).format("M/D/YYYY");
