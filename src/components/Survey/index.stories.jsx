import React from "react";
import Plate from "components/Plate";
import { Form, Button } from "react-bootstrap";
import MaskedInput from "react-maskedinput";
import Survey from "./index";

export default {
  title: "Survey",
  decorators: [
    (Story) => (
      <div style={{ padding: 50, background: "#f6f6f6" }}>
        <Plate>
          <Story />
        </Plate>
      </div>
    ),
  ],
};

export const withText = () => <Survey>Hey!</Survey>;

export const MaskedInputField = () => (
  <Form
    onSubmit={(e) => {
      e.preventDefault();
    }}
  >
    <Form.Group controlId="formPlaintextEmail">
      <Form.Label type="text">Birthdate</Form.Label>
      <Form.Control
        className="form-control"
        name="birhtdate"
        as={() => (
          <MaskedInput
            name="birthdate"
            className="form-control"
            mask="1111-11-11"
          />
        )}
      />
    </Form.Group>
    <Button type="submit">Submit</Button>
  </Form>
);
