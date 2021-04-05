import "bootstrap/dist/css/bootstrap.min.css";

import CustomThemeProvider from "./../src/components/CustomThemeProvider";
import { I18nextProvider } from "react-i18next";
import i18n from "../src/i18n";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  layout: "centered",
};

export const decorators = [
  (Story) => (
    <CustomThemeProvider>
      <Story />
    </CustomThemeProvider>
  ),
  (story) => <I18nextProvider i18n={i18n}>{story()}</I18nextProvider>,
];
