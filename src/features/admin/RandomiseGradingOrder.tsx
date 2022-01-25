import { Button, Spinner } from "react-bootstrap";
import React, { useState } from "react";

import { randomiseOrder } from "api/admin";
import { toast } from "react-toastify";
import { updateGradingOrder } from "./adminSlice";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

const RandomiseOrder = (): React.ReactElement => {
  const dispatch = useDispatch();
  const [randomising, setRandomising] = useState<boolean>(false);
  const { t } = useTranslation();
  return (
    <Button
      variant="success"
      onClick={() => {
        setRandomising(true);
        randomiseOrder()
          .then((res) => {
            setRandomising(false);
            dispatch(updateGradingOrder(res));
          })
          .catch(() => {
            setRandomising(false);
            toast.error("Ett fel uppstod!", {
              autoClose: false,
            });
          });
      }}
      disabled={randomising}
    >
      {randomising ? (
        <span>
          <Spinner animation="border" size="sm" />
          {t("Randomising")}
        </span>
      ) : (
        t("Randomise")
      )}
    </Button>
  );
};

export default RandomiseOrder;
