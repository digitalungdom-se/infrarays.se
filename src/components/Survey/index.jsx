import React, { useState } from 'react';
import {
  Accordion,
  Card,
  Button,
  Form,
  FormControl,
  Spinner
} from 'react-bootstrap';
import Rating from 'react-rating';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';

const Icon = styled(FontAwesomeIcon)`
  &.full {
    color: ${props => props.theme.brand || 'gold'};
  }
  &.empty {
    color: gray;
  }
`;

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

export default ({ loading, done, survey, onSubmit = () => {} }) => {
  const [process, setProcess] = useState(survey?.applicationProcess);
  const [error, setError] = useState();
  const [portal, setPortal] = useState(survey?.applicationPortal);
  return (
    <Accordion defaultActiveKey="1" className={done && 'done'}>
      <Card>
        <StyledHeader className={done ? 'done' : ''}>
          <Accordion.Toggle eventKey="0" as={Button} variant="link">
            Öppna
          </Accordion.Toggle>
        </StyledHeader>
        <Accordion.Collapse eventKey="0">
          <Card.Body>
            <p>
              Vi som arrangerar Rays vill veta varifrån du kommer, på vilken
              gymnasieskola du studerar, hur du hört talas om Rays samt vad du
              tycker om ansökningsprocessen. Allt detta för att vi ska kunna bli
              ännu bättre på att marknadsföra oss samt utveckla
              ansökningprocessen. Fyll därför i formuläret nedan och klicka på
              skicka för att spara ditt svar.
            </p>
            <Form
              onSubmit={e => {
                e.preventDefault();
                const city = e.target.city.value;
                const school = e.target.school.value;
                const improvement = e.target.improvement.value;
                const informant = e.target.informant.value;
                const gender = e.target.gender.value;
                const isError = {};
                if (gender === 'select') {
                  isError.gender = true;
                }
                if (portal === undefined) {
                  isError.portal = true;
                }
                if (process === undefined) {
                  isError.process = true;
                }
                if (Object.keys(isError).length) {
                  setError(isError);
                } else {
                  setError(null);
                  onSubmit({
                    city,
                    school,
                    improvement,
                    informant,
                    gender,
                    applicationPortal: portal,
                    applicationProcess: process
                  });
                }
              }}
            >
              <Form.Group controlId="form-city">
                <Form.Label>Vilken stad bor du i?</Form.Label>
                <Form.Control
                  defaultValue={survey?.city}
                  type="text"
                  name="city"
                  required
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="form-school">
                <Form.Label>Vilken skola går du på?</Form.Label>
                <Form.Control
                  defaultValue={survey?.school}
                  type="text"
                  name="school"
                  required
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="form-gender">
                <Form.Label>Kön</Form.Label>
                <Form.Control
                  defaultValue={survey?.gender || 'select'}
                  as="select"
                  name="gender"
                  isInvalid={error?.gender}
                  required
                >
                  <option value="select" disabled>
                    Välj ett alternativ
                  </option>
                  <option value="male">Man</option>
                  <option value="female">Kvinna</option>
                  <option value="other">Annat</option>
                  <option value="undisclosed">Vill ej uppge</option>
                </Form.Control>
                <Form.Control.Feedback type="invalid">
                  Välj ett alternativ!
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="form-city">
                <Form.Label>Vad tycker du om ansökningsprocessen?</Form.Label>
                <FormControl as="div" isInvalid={error?.process}>
                  <Rating
                    initialRating={process}
                    onChange={value => {
                      setProcess(value);
                    }}
                    emptySymbol={<Icon className="empty icon" icon={faStar} />}
                    fullSymbol={<Icon className="full icon" icon={faStar} />}
                  />
                </FormControl>
                <Form.Control.Feedback type="invalid">
                  Du måste betygsätta!
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="form-city">
                <Form.Label>Vad tycker du om ansökningsportalen?</Form.Label>
                <FormControl as="div" isInvalid={error?.portal}>
                  <Rating
                    initialRating={portal}
                    onChange={value => setPortal(value)}
                    emptySymbol={<Icon className="empty icon" icon={faStar} />}
                    fullSymbol={<Icon className="full icon" icon={faStar} />}
                    name="portal"
                  />
                </FormControl>
                <Form.Control.Feedback type="invalid">
                  Du måste betygsätta!
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="form-city">
                <Form.Label>
                  Hur kan ansökningsprocessen och portalen förbättras?
                </Form.Label>
                <Form.Control
                  defaultValue={survey?.improvement}
                  name="improvement"
                  as="textarea"
                  rows={3}
                  maxLength="10000"
                  required
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="form-city">
                <Form.Label>Hur hörde du talas om Rays?</Form.Label>
                <Form.Control
                  defaultValue={survey?.informant}
                  name="informant"
                  as="textarea"
                  rows={3}
                  maxLength="10000"
                  required
                ></Form.Control>
              </Form.Group>
              <Button type="submit" disabled={loading}>
                {loading && <Spinner animation="border" size="sm" />}{' '}
                {loading ? 'Sparar svar' : 'Spara svar'}
              </Button>
            </Form>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  );
};
