import React from "react";
import { render } from "@testing-library/react";
import App from "./App";

test('renders "Utvecklat av Digital Ungdom"', () => {
  const { getByText } = render(<App />);
  const element = getByText(/Logga in/i);
  expect(element).toBeInTheDocument();
});
