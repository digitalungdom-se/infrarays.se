import React from "react";
import Rating from "components/Rating";
import { FormControl, Form, Button, Spinner } from "react-bootstrap";
import { Field, Formik } from "formik";
import { withTranslation } from "react-i18next";

const StarField = withTranslation()(({ name, t, isInvalid }) => (
  <Form.Group>
    <Form.Label style={{ display: "block" }}>{t(`${name}.title`)}</Form.Label>
    <Form.Control as="span" bsPrefix="null" isInvalid={isInvalid}>
      <Field name={name}>
        {({ field: { value }, form: { setFieldValue } }) => (
          <Rating
            initialRating={value}
            onChange={(newValue) => setFieldValue(name, newValue)}
          />
        )}
      </Field>
    </Form.Control>
    <Form.Control.Feedback type="invalid">
      {t("You need to set a score!")}
    </Form.Control.Feedback>
  </Form.Group>
));

const GradingModal = ({
  t,
  name,
  initialValues = {
    cv: 0,
    coverLetter: 0,
    essay: 0,
    grades: 0,
    recommendation: 0,
    overall: 0,
    comment: "",
  },
  onSubmit,
}) => (
  <Formik initialValues={initialValues} onSubmit={onSubmit}>
    {({ handleChange, values, handleSubmit, isSubmitting, errors }) => (
      <Form onSubmit={handleSubmit}>
        <h3>{name}</h3>
        <StarField name="cv" isInvalid={errors.cv} />
        <StarField name="coverLetter" isInvalid={errors.coverLetter} />
        <StarField name="essay" isInvalid={errors.essay} />
        <StarField name="grades" isInvalid={errors.grades} />
        <StarField name="recommendation" isInvalid={errors.recommendation} />
        <StarField name="overall" isInvalid={errors.overall} />
        <Form.Group>
          <Form.Label>{t("comment")}</Form.Label>
          <FormControl
            name="comment"
            as="textarea"
            type="text"
            value={values.comment}
            onChange={handleChange}
          />
        </Form.Group>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Spinner animation="border" size="sm" /> {t("Saving")}
            </>
          ) : (
            t("Save")
          )}
        </Button>
      </Form>
    )}
  </Formik>
);

export default withTranslation()(GradingModal);
