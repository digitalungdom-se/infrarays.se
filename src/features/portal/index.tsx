import ButtonGroup from "react-bootstrap/ButtonGroup";
import Center from "components/Center";
import Delete from "./Delete";
import Download from "./Download";
import FileChapters from "./FileChapters";
import Introduction from "./Introduction";
import Logo from "components/Logo";
import Logout from "./Logout";
import Progress from "./Progress";
import React from "react";
import RecommendationChapter from "./RecommendationChapter";
import StyledPlate from "components/Plate";
import SurveyChapter from "./SurveyChapter";

const Portal = (): React.ReactElement => {
  return (
    <Center>
      <StyledPlate>
        <Logo center />
        <Introduction />
        <Progress />
        <hr style={{ color: "#b8b8b8" }} />
        <div>
          <FileChapters />
          <SurveyChapter />
          <RecommendationChapter />
          <Progress />
          <div style={{ padding: "3rem 0" }}>
            <ButtonGroup>
              <Delete />
              <Logout />
            </ButtonGroup>
            <Download style={{ float: "right" }} />
          </div>
        </div>
      </StyledPlate>
    </Center>
  );
};

export default Portal;
