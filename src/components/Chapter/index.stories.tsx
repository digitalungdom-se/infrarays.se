import Chapter from "./index";
import React from "react";

export default {
  title: "Chapter",
};

export const withText = (): React.ReactElement => (
  <Chapter
    title="Personligt brev"
    subtitle="Max 600 ord"
    description={
      "Vi som arrangerar Rays vill lära känna dig som ansöker så bra som möjligt." +
      "I ditt personliga brev vill vi därför att du kortfattat berättar om dina intressen och varför du söker till Rays." +
      "För oss är det intressant att höra varifrån din passion för naturvetenskap kommer och hur dina tidigare erfarenheter har påverkat dig. "
    }
  />
);
