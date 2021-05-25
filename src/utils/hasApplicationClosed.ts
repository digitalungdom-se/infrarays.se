import { deadline } from "config/portal.json";

const hasApplicationClosed = (): boolean => deadline < Date.now();

export default hasApplicationClosed;
