import CustomThemeProvider from "./../src/components/CustomThemeProvider";

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
];
