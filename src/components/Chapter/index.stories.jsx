import Chapter from "./index";
import Plate from "components/Plate";
import React from "react";
import { UploadHook } from "components/portal/Upload/index.stories";

export default {
  title: "Chapter",
  decorators: [
    (Story) => (
      <div style={{ background: "#f6f6f6", padding: 50 }}>
        <Plate>
          <Story />
        </Plate>
      </div>
    ),
  ],
};

export const withText = () => (
  <Chapter
    title="Personligt brev"
    subtitle="Max 600 ord"
    description={
      "Vi som arrangerar Rays vill lära känna dig som ansöker så bra som möjligt." +
      "I ditt personliga brev vill vi därför att du kortfattat berättar om dina intressen och varför du söker till Rays." +
      "För oss är det intressant att höra varifrån din passion för naturvetenskap kommer och hur dina tidigare erfarenheter har påverkat dig. "
    }
    upload={<UploadHook title="Ladda upp personligt brev" />}
  />
);
