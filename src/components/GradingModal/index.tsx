import { Button, Form, FormControl, Spinner } from "react-bootstrap";
import { Field, FieldProps, Formik } from "formik";
import { WithTranslation, withTranslation } from "react-i18next";

import Rating from "components/Rating";
import React from "react";

interface StarFieldProps extends WithTranslation {
  name: string;
  label?: string;
  isInvalid?: boolean;
}

const StarField = withTranslation()(
  ({ name, t, isInvalid, label }: StarFieldProps) => (
    <Form.Group>
      <Form.Label style={{ display: "block", fontWeight: "bold" }}>
        {label || t(`${name}.title`)}
      </Form.Label>
      <Form.Control as="span" bsPrefix="null" isInvalid={isInvalid}>
        <Field name={name}>
          {({ field: { value }, form: { setFieldValue } }: FieldProps) => (
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
      <hr />
    </Form.Group>
  )
);

type NumericalGradeField =
  | "cv"
  | "coverLetter"
  | "essays"
  | "grades"
  | "recommendations"
  | "overall";

export type GradeFormValues = Record<NumericalGradeField, number> & {
  comment: string;
};

interface GradingModalProps extends WithTranslation {
  name?: string;
  initialValues?: GradeFormValues;
  onSubmit?: (values: GradeFormValues) => Promise<void>;
}

const GradingModal: React.FC<GradingModalProps> = ({
  t,
  name,
  initialValues = {
    cv: 0,
    coverLetter: 0,
    essays: 0,
    grades: 0,
    recommendations: 0,
    overall: 0,
    comment: "",
  },
  onSubmit,
}) => (
  <Formik
    initialValues={initialValues}
    onSubmit={(values, { setSubmitting, setErrors }) => {
      setSubmitting(true);
      const errors: Partial<Record<NumericalGradeField, string>> = {};
      const fields: NumericalGradeField[] = [
        "cv",
        "coverLetter",
        "essays",
        "grades",
        "recommendations",
      ];
      fields.forEach((key: NumericalGradeField) => {
        if (values[key] === 0) errors[key] = "required";
      });
      if (Object.keys(errors).length) {
        setErrors(errors);
        setSubmitting(false);
        return;
      }
      if (onSubmit) onSubmit(values).then(() => setSubmitting(false));
    }}
  >
    {({ handleChange, values, handleSubmit, isSubmitting, errors }) => (
      <Form onSubmit={handleSubmit}>
        <h3>{name}</h3>
        <StarField
          name="cv"
          label={t("CV.title")}
          isInvalid={Boolean(errors.cv)}
        />
        <StarField
          name="coverLetter"
          label={t("COVER_LETTER.title")}
          isInvalid={Boolean(errors.coverLetter)}
        />
        <StarField
          name="essays"
          label={t("ESSAY.title")}
          isInvalid={Boolean(errors.essays)}
        />
        <StarField
          name="grades"
          label={t("GRADES.title")}
          isInvalid={Boolean(errors.grades)}
        />
        <StarField
          name="recommendations"
          label={t("RECOMMENDATION_LETTER.title")}
          isInvalid={Boolean(errors.recommendations)}
        />
        <StarField
          name="overall"
          isInvalid={Boolean(errors.overall)}
          label={t("overall")}
        />
        <Form.Group>
          <Form.Label>{t("comment")}</Form.Label>
          <FormControl
            name="comment"
            as="textarea"
            type="text"
            value={values.comment}
            onChange={handleChange}
            maxLength={255}
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
