import portal from "config/portal.json";

const hasApplicationClosed = (): boolean => portal.deadline < Date.now();

export default hasApplicationClosed;
