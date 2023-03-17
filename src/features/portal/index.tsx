import ButtonGroup from "react-bootstrap/ButtonGroup";
import { Chapter } from "types/chapters";
import Chapters from "./Chapters";
import Delete from "./Delete";
import Download from "./Download";
import Introduction from "./Introduction";
import Logout from "./Logout";
import Progress from "./Progress";
import React from "react";
import config from "config/portal.json";
import Image from "next/image";
import LoginBanner from "components/LoginBanner";
import { useGetIsAuthenticated } from "hooks/auth";

const chapters = config.chapters as Chapter[];

const Portal = (): React.ReactElement => {
  const isAuthenticated = useGetIsAuthenticated();

  return (
    <>
      <div className="w-max-sm relative h-24 my-12">
        <Image src="/rays.png" layout="fill" objectFit="contain" alt="Logo" />
      </div>
      <Introduction />
      <Progress />
      <hr style={{ color: "#b8b8b8" }} />
      <div>
        <Chapters chapters={chapters} />
        {isAuthenticated && (
          <>
            <Progress />
            <div className="py-3">
              <ButtonGroup>
                <Delete />
                <Logout />
              </ButtonGroup>
              <Download className="float-right" />
            </div>
          </>
        )}
      </div>
      {!isAuthenticated && <LoginBanner />}
    </>
  );
};

export default Portal;
