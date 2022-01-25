import ButtonGroup from "react-bootstrap/ButtonGroup";
import Center from "components/Center";
import { Chapter } from "types/chapters";
import Chapters from "./Chapters";
import Delete from "./Delete";
import Download from "./Download";
import Introduction from "./Introduction";
import Logo from "components/Logo";
import Logout from "./Logout";
import Progress from "./Progress";
import React from "react";
import StyledPlate from "components/Plate";
import config from "config/portal.json";

const chapters = config.chapters as Chapter[];

const Portal = (): React.ReactElement => {
  return (
    <Center>
      <StyledPlate>
        <Logo center />
        <Introduction />
        <Progress />
        <hr style={{ color: "#b8b8b8" }} />
        <div>
          <Chapters chapters={chapters} />
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
