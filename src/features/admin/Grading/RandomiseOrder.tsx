import { Button, Spinner } from "react-bootstrap";
import React, { useState } from "react";

import axios from "axios";
import { toast } from "react-toastify";
import { updateGradingOrder } from "../adminSlice";
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
        axios
          .post("/admin/grading/randomise")
          .then((res) => {
            setRandomising(false);
            dispatch(updateGradingOrder(res.data));
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
