import React from "react";
import { useFormik } from "formik";
import { Form, Alert, Button } from "react-bootstrap";
import StyledGroup from "components/StyledGroup";
import Center from "components/Center";
import Plate from "components/Plate";
import Logo from "components/Logo";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { adminSuccess, adminFailure } from "features/appSlice";
import { useHistory } from "react-router-dom";

const AdminLogin = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const history = useHistory();
  const {
    values,
    errors,
    isSubmitting,
    handleSubmit,
    handleChange,
  } = useFormik({
    initialValues: { username: "", password: "" },
    onSubmit: (val, { setErrors, setSubmitting }) => {
      fetch("/api/admin/login", {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(val),
      })
        .then((res) => res.json())
        .then((res) => {
          setSubmitting(false);
          if (res.type === "fail") {
            res.json = true;
            throw res;
          } else {
            dispatch(adminSuccess());
            history.push("/admin");
            return res;
          }
        })
        .catch((err) => {
          setSubmitting(false);
          dispatch(adminFailure());
          if (err.json) {
            if (err?.msg.message === "no user")
              return setErrors({ username: "no user" });
            if (err?.msg.message === "incorrect password")
              return setErrors({ password: "incorrect password" });
          } else setErrors({ other: "fetch error" });
          return err;
        });
    },
  });
  return (
    <Center maxWidth="360px">
      <Plate>
        <Logo center maxWidth="80%" />
        <h2 style={{ textAlign: "center", marginBottom: 40 }}>
          Admin Rays 2020
        </h2>
        <Form onSubmit={handleSubmit}>
          <StyledGroup>
            <Form.Control
              name="username"
              type="email"
              placeholder="E-mail"
              autoFocus
              isInvalid={Boolean(errors.username)}
              required
              value={values.username}
              onChange={handleChange}
            />
            <Form.Label>E-mail</Form.Label>
            <Form.Control.Feedback type="invalid">
              {t(errors.username)}
            </Form.Control.Feedback>
          </StyledGroup>
          <StyledGroup>
            <Form.Control
              name="password"
              type="password"
              placeholder={t("Password")}
              autoFocus
              isInvalid={Boolean(errors.password)}
              required
              value={values.password}
              onChange={handleChange}
            />
            <Form.Label>{t("Password")}</Form.Label>
            <Form.Control.Feedback type="invalid">
              {t(errors.password)}
            </Form.Control.Feedback>
          </StyledGroup>
          {errors.other && (
            <Alert variant="danger" style={{ textAlign: "center" }}>
              {t(errors.other)}
            </Alert>
          )}
          <Form.Group style={{ paddingTop: 40 }}>
            <Button
              size="lg"
              variant="custom"
              type="submit"
              style={{
                width: "100%",
              }}
              disabled={isSubmitting}
            >
              {isSubmitting ? t("Logging in") : t("Login")}
            </Button>
          </Form.Group>
        </Form>
      </Plate>
    </Center>
  );
};

export default AdminLogin;
