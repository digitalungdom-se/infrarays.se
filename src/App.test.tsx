import App from "./App";
import React from "react";
import { render } from "@testing-library/react";

test('renders "Digital Ungdom"', () => {
  const { getByText } = render(<App />);
  const element = getByText(/Digital Ungdom/i);
  expect(element).toBeInTheDocument();
});
