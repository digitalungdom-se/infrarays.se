import "./signup.css";

import { Form, Formik } from "formik";
import FormControl, { FormControlProps } from "react-bootstrap/FormControl";
import { Link, useHistory } from "react-router-dom";
import MaskedInput, { MaskedInputProps } from "react-maskedinput";
import { Trans, WithTranslation, withTranslation } from "react-i18next";

import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Center from "components/Center";
import FormCheck from "react-bootstrap/FormCheck";
import FormGroup from "react-bootstrap/FormGroup";
import FormLabel from "react-bootstrap/FormLabel";
import Logo from "components/Logo";
import Plate from "components/Plate";
import React from "react";
import Spinner from "react-bootstrap/Spinner";
import StyledGroup from "components/StyledGroup";
import hasApplicationClosed from "utils/hasApplicationClosed";
import moment from "moment";
import { register } from "api/register";
import sendLoginCodeAndShowCode from "api/sendLoginCode";
import useShowCode from "utils/showCode";

type MaskedFieldProps = Omit<FormControlProps, "size"> &
  Omit<MaskedInputProps, "mask" | "name">;

const MaskedField = (props: MaskedFieldProps) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <MaskedInput {...props} name="birthdate" mask="1111-11-11" />
);

const Register: React.FC<WithTranslation> = ({ t }) => {
  const { push } = useHistory();
  const showCode = useShowCode();
  const closed = hasApplicationClosed();
  return (
    <Center maxWidth="850px">
      <Plate>
        <Logo center />
        <h1>{t("Register here")}</h1>
        <Formik
          initialValues={{
            birthdate: "",
            firstName: "",
            lastName: "",
            finnish: "",
            email: "",
            dummy: "",
          }}
          onSubmit={(
            { email, firstName, lastName, birthdate, finnish },
            { setSubmitting, setErrors }
          ) => {
            if (finnish.length === 0) {
              setErrors({ finnish: "choose an option" });
              setSubmitting(false);
              return;
            }
            if (moment(birthdate).isValid() === false) {
              setErrors({ birthdate: "invalid date" });
              setSubmitting(false);
              return;
            }
            setSubmitting(true);
            const form = {
              email,
              firstName,
              lastName,
              birthdate,
              finnish: finnish === "Yes",
            };
            register(form)
              .then(() => {
                sendLoginCodeAndShowCode(email).then((code) => {
                  push(`/login/${btoa(email)}`);
                  code && showCode(code);
                });
              })
              .catch((error) => {
                setSubmitting(false);
                if (error.general) setErrors({ dummy: error.general.message });
                else setErrors(error.params);
              });
          }}
        >
          {({ values, errors, isSubmitting, handleChange, handleSubmit }) => (
            <Form
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-around",
                width: "100%",
              }}
              onSubmit={handleSubmit}
            >
              <StyledGroup className="inputbox" controlId="form-firstname">
                <FormControl
                  autoFocus
                  required
                  type="text"
                  placeholder={t("First name")}
                  name="firstName"
                  onChange={handleChange}
                  value={values.firstName}
                />
                <FormLabel>{t("First name")}</FormLabel>
              </StyledGroup>
              <StyledGroup className="inputbox" controlId="form-lastname">
                <FormControl
                  required
                  type="text"
                  placeholder={t("Surname")}
                  name="lastName"
                  onChange={handleChange}
                  value={values.lastName}
                />
                <FormLabel>{t("Surname")}</FormLabel>
              </StyledGroup>
              <StyledGroup className="inputbox" controlId="form-email">
                <FormControl
                  isInvalid={Boolean(errors.email)}
                  required
                  type="email"
                  placeholder="E-mail"
                  name="email"
                  onChange={handleChange}
                  value={values.email}
                />
                <FormLabel>E-mail</FormLabel>
                <FormControl.Feedback type="invalid">
                  {errors.email && t(errors.email)}
                </FormControl.Feedback>
              </StyledGroup>
              <StyledGroup className="inputbox" controlId="form-birthdate">
                <FormControl
                  as={MaskedField}
                  required
                  type="text"
                  placeholder={t("Date of birth")}
                  isInvalid={Boolean(errors.birthdate)}
                  onChange={handleChange}
                />
                <FormLabel>{t("Date of birth")}</FormLabel>
                <FormControl.Feedback type="invalid">
                  {errors.birthdate && t(errors.birthdate)}
                </FormControl.Feedback>
              </StyledGroup>
              <FormGroup controlId="form-finland" className="inputbox">
                <FormControl
                  as="div"
                  style={{
                    height: 50,
                    paddingTop: 2,
                  }}
                  isInvalid={Boolean(errors.finnish)}
                  onChange={handleChange}
                >
                  <FormLabel
                    style={{
                      display: "block",
                      fontSize: 12,
                      marginBottom: "0rem",
                      color: "#777",
                    }}
                  >
                    {t("Applying through Finland")}
                  </FormLabel>
                  <FormCheck
                    custom
                    inline
                    label="Ja"
                    value="Yes"
                    type="radio"
                    id="custom-inline-radio-1"
                    name="finnish"
                  />
                  <FormCheck
                    custom
                    inline
                    label="Nej"
                    value="No"
                    type="radio"
                    id="custom-inline-radio-2"
                    name="finnish"
                  />
                </FormControl>
                <FormControl.Feedback type="invalid">
                  {errors.finnish && t(errors.finnish)}
                </FormControl.Feedback>
              </FormGroup>
              <div
                style={{
                  display: "block",
                  marginTop: 30,
                  marginBottom: 30,
                  fontSize: "0.8rem",
                  width: "100%",
                  maxWidth: 300,
                }}
              >
                <Trans i18nKey="TOS">
                  By creating an account you accept how we handle your data.
                  <Link to="/gdpr"> Read more.</Link>
                </Trans>
              </div>
              {errors.dummy && (
                <Alert
                  style={{ width: "50%", margin: "10px 25%" }}
                  variant="danger"
                >
                  {t(errors.dummy)}
                </Alert>
              )}
              <Button
                size="lg"
                type="submit"
                variant="custom"
                style={{ minWidth: 300, width: "50%", margin: "0 25%" }}
                disabled={isSubmitting || closed}
              >
                {closed ? (
                  t("Application has closed")
                ) : isSubmitting ? (
                  <>
                    <Spinner
                      animation="border"
                      style={{ width: "1.5rem", height: "1.5rem" }}
                    />
                    {t("Registering")}
                  </>
                ) : (
                  t("Register")
                )}
              </Button>
              <div style={{ paddingTop: 20, textAlign: "center" }}>
                <Trans i18nKey="Have account?">
                  Already have an account?
                  <Link to="/login">Login here!</Link>
                </Trans>
              </div>
            </Form>
          )}
        </Formik>
      </Plate>
    </Center>
  );
};

export default withTranslation()(Register);
