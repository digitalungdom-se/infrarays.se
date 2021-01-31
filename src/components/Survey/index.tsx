import * as Yup from "yup";

import { Accordion, Button, Card, Spinner } from "react-bootstrap";
import { Form, Formik } from "formik";

import FormControl from "react-bootstrap/FormControl";
import FormGroup from "react-bootstrap/FormGroup";
import FormLabel from "react-bootstrap/FormLabel";
import Rating from "components/Rating";
import React from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

const validationSchema = Yup.object().shape({
  city: Yup.string(),
  school: Yup.string(),
  gender: Yup.string(),
  applicationPortal: Yup.number().required(),
  applicationProcess: Yup.number().required(),
  improvement: Yup.string(),
  informant: Yup.string(),
});

const StyledHeader = styled(Card.Header)`
  &.done {
    color: #155724;
    background-color: #d4edda;
    border-color: #c3e6cb;
  }

  &.done .btn {
    color: #155724;
  }
`;

type Gender = "MALE" | "FEMALE" | "OTHER" | "UNDISCLOSED";

export interface SurveyAnswers {
  city: string;
  school: string;
  gender: Gender;
  applicationPortal: number;
  applicationProcess: number;
  improvement: string;
  informant: string;
}

interface SurveyProps {
  survey?: SurveyAnswers;
  onSubmit: (
    surveyAnswers: SurveyAnswers,
    helpers: {
      setSubmitting: (isSubmitting: boolean) => void;
    }
  ) => Promise<void>;
}

const Survey = ({ survey, onSubmit }: SurveyProps) => {
  const { t } = useTranslation();

  const initialValues = {
    city: survey?.city || "",
    school: survey?.school || "",
    gender: survey?.gender || "select",
    applicationPortal: survey?.applicationPortal || 0,
    applicationProcess: survey?.applicationProcess || 0,
    improvement: survey?.improvement || "",
    informant: survey?.informant || "",
  };

  return (
    <Accordion defaultActiveKey="1" className={survey ? "done" : ""}>
      <Card>
        <StyledHeader className={survey ? "done" : ""}>
          <Accordion.Toggle eventKey="0" as={Button} variant="link">
            {t("Open (verb)")}
          </Accordion.Toggle>
        </StyledHeader>
        <Accordion.Collapse eventKey="0">
          <Card.Body>
            <Formik
              initialValues={initialValues}
              onSubmit={({ gender, ...values }, helpers) => {
                let processError,
                  portalError,
                  genderError = false;
                if (values.applicationProcess === 0) processError = true;
                if (values.applicationPortal === 0) portalError = true;
                if (gender === "select") genderError = true;
                if (processError || portalError || genderError) {
                  helpers.setErrors({
                    gender: genderError ? "Select an option" : undefined,
                    applicationPortal: portalError ? "required" : undefined,
                    applicationProcess: processError ? "required" : undefined,
                  });
                  helpers.setSubmitting(false);
                } else {
                  onSubmit(
                    {
                      ...values,
                      gender: gender as Gender,
                    },
                    helpers
                  ).then(() => helpers.setSubmitting(false));
                }
              }}
              validationSchema={validationSchema}
            >
              {({
                values,
                handleChange,
                setFieldValue,
                handleBlur,
                setFieldTouched,
                errors,
                isSubmitting,
              }) => (
                <Form>
                  <FormGroup controlId="form-city">
                    <FormLabel>{t("What city do you live in?")}</FormLabel>
                    <FormControl
                      value={values.city}
                      onChange={handleChange}
                      type="text"
                      name="city"
                      onBlur={handleBlur}
                      required
                    />
                  </FormGroup>
                  <FormGroup controlId="form-school">
                    <FormLabel>{t("Which school do you attend?")}</FormLabel>
                    <FormControl
                      value={values.school}
                      type="text"
                      name="school"
                      onChange={handleChange}
                      required
                    />
                  </FormGroup>
                  <FormGroup controlId="form-gender">
                    <FormLabel>{t("Gender")}</FormLabel>
                    <FormControl
                      value={values.gender}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      as="select"
                      name="gender"
                      isInvalid={Boolean(errors?.gender)}
                      required
                    >
                      <option value="select" disabled>
                        {t("Choose an option")}
                      </option>
                      <option value="MALE">{t("Male")}</option>
                      <option value="FEMALE">{t("Female")}</option>
                      <option value="OTHER">{t("Other")}</option>
                      <option value="UNDISCLOSED">
                        {t("Prefer not to disclose")}
                      </option>
                    </FormControl>
                    <FormControl.Feedback type="invalid">
                      {t("Please choose an option")}
                    </FormControl.Feedback>
                  </FormGroup>
                  <FormGroup controlId="form-city">
                    <FormLabel>
                      {t("What are your thoughts on the application process?")}
                    </FormLabel>
                    <FormControl
                      as="div"
                      isInvalid={Boolean(errors?.applicationProcess)}
                    >
                      <Rating
                        initialRating={values.applicationProcess}
                        onChange={(value) => {
                          setFieldValue("applicationProcess", value);
                          setFieldTouched("applicationProcess", true);
                        }}
                      />
                    </FormControl>
                    <FormControl.Feedback type="invalid">
                      {t("You need to set a score!")}
                    </FormControl.Feedback>
                  </FormGroup>
                  <FormGroup controlId="form-city">
                    <FormLabel>
                      {t("What are your thoughts on the application portal?")}
                    </FormLabel>
                    <FormControl
                      as="div"
                      isInvalid={Boolean(errors?.applicationPortal)}
                    >
                      <Rating
                        initialRating={values.applicationPortal}
                        onChange={(value) => {
                          setFieldValue("applicationPortal", value);
                          setFieldTouched("applicationPortal", true);
                        }}
                      />
                    </FormControl>
                    <FormControl.Feedback type="invalid">
                      {t("You need to set a score!")}
                    </FormControl.Feedback>
                  </FormGroup>
                  <FormGroup controlId="form-city">
                    <FormLabel>
                      {t("Improvements on application process and portal")}
                    </FormLabel>
                    <FormControl
                      value={values.improvement}
                      onChange={handleChange}
                      name="improvement"
                      as="textarea"
                      rows={3}
                      maxLength={10000}
                      required
                    />
                  </FormGroup>
                  <FormGroup controlId="form-city">
                    <FormLabel>{t("How did you hear about Rays?")}</FormLabel>
                    <FormControl
                      value={values.informant}
                      onChange={handleChange}
                      name="informant"
                      as="textarea"
                      rows={3}
                      maxLength={10000}
                      required
                    />
                  </FormGroup>
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting && <Spinner animation="border" size="sm" />}{" "}
                    {isSubmitting ? t("Saving answers") : t("Save answers")}
                  </Button>
                </Form>
              )}
            </Formik>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  );
};

export default Survey;
