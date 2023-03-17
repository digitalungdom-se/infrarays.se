import { Button, Form, FormControl, FormGroup, Spinner } from "react-bootstrap";
import { Field, FieldProps, Formik } from "formik";
import { WithTranslation, withTranslation } from "react-i18next";
import portalConfig from "config/portal.json";

// import Rating from "components/Rating";
import React from "react";
import { GradingQuestionConfig } from "types/grade";

interface StarFieldProps extends WithTranslation {
  name: string;
  label?: string;
  isInvalid?: boolean;
}

// const StarField = withTranslation()(
//   ({ name, t, isInvalid, label }: StarFieldProps) => (
//     <Form.Group>
//       <Form.Label style={{ display: "block", fontWeight: "bold" }}>
//         {label || t(`${name}.title`)}
//       </Form.Label>
//       <Form.Control as="span" bsPrefix="null" isInvalid={isInvalid}>
//         <Field name={name}>
//           {({ field: { value }, form: { setFieldValue } }: FieldProps) => (
//             <Rating
//               initialRating={value}
//               onChange={(newValue) => setFieldValue(name, newValue)}
//             />
//           )}
//         </Field>
//       </Form.Control>
//       <Form.Control.Feedback type="invalid">
//         {t("You need to set a score!")}
//       </Form.Control.Feedback>
//       <hr />
//     </Form.Group>
//   )
// );

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
  // The promise can return anything or nothing, but it should be resolved
  onSubmit?: (values: GradeFormValues) => Promise<any>;
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
      // const errors: Partial<Record<NumericalGradeField, string>> = {};
      // const fields: NumericalGradeField[] = [
      //   "cv",
      //   "coverLetter",
      //   "essays",
      //   "grades",
      //   "recommendations",
      // ];
      // fields.forEach((key: NumericalGradeField) => {
      //   if (values[key] === 0) errors[key] = "required";
      // });
      // if (Object.keys(errors).length) {
      //   setErrors(errors);
      //   setSubmitting(false);
      //   return;
      // }
      if (onSubmit) onSubmit(values).then(() => setSubmitting(false));
    }}
  >
    {({ handleChange, values, handleSubmit, isSubmitting, errors }) => (
      <Form onSubmit={handleSubmit}>
        <h3>{name}</h3>
        {(portalConfig.grading as GradingQuestionConfig[]).map((question) => (
          <FormGroup key={question.id}>
            <Form.Label style={{ display: "block", fontWeight: "bold" }}>
              {t(`grading.${question.id}.label`)}
            </Form.Label>{" "}
            {question.type === "TEXT" && (
              <FormControl
                name={question.id}
                as="textarea"
                type="text"
                value={values.comment}
                onChange={handleChange}
                maxLength={8192}
              />
            )}
            {question.type === "RANGE" && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  maxWidth: 300,
                }}
              >
                {/* <span className="text-secondary">
                  {t(`grading.${question.id}.low`)}
                </span> */}
                {[...Array(question.max - question.min + 1)].map((_, i) => (
                  <Form.Check
                    key={question.id + i}
                    inline
                    name={question.id}
                    type="radio"
                    label={question.min + i}
                    value={question.min + i}
                    defaultChecked={
                      question.max + i ===
                      values[question.id as NumericalGradeField]
                    }
                    onChange={handleChange}
                    required
                  />
                ))}
                {/* <span className="text-secondary">
                  {t(`grading.${question.id}.high`)}
                </span> */}
              </div>
            )}
          </FormGroup>
        ))}
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
