import moment from "moment";

const hasApplicationClosed = (): boolean =>
  moment.utc().month(2).endOf("month").diff(Date.now()) < 0;

export default hasApplicationClosed;
