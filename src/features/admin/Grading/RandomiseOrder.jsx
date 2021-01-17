import React, { useState } from "react";
import { updateGradingOrder } from "features/appSlice";
import { useDispatch } from "react-redux";
import { Button, Spinner } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

const RandomiseOrder = () => {
  const dispatch = useDispatch();
  const [loggingOut, setLogout] = useState(false);
  const { t } = useTranslation();
  return (
    <Button
      variant="success"
      onClick={() => {
        setLogout(true);
        fetch("/api/admin/randomise_grading_order", {
          method: "post",
        })
          .then((res) => res.json())
          .then((res) => {
            setLogout(false);
            if (res.type === "success") {
              dispatch(updateGradingOrder(res.gradingOrder));
            }
          })
          .catch(() => {
            setLogout(false);
            toast.error("Ett fel uppstod!", {
              autoClose: false,
            });
          });
      }}
      disabled={loggingOut}
    >
      {loggingOut ? (
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
