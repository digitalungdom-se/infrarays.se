import React, { useState } from 'react';
import { Accordion, Card, Button, Form, FormControl } from 'react-bootstrap';
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

export default ({ survey, onSubmit = () => {} }) => {
  const [process, setProcess] = useState(survey?.applicationProcess);
  const [portal, setPortal] = useState(survey?.applicationPortal);
  return (
    <Accordion defaultActiveKey="1">
      <h3 className="col-xs-12 col-md-4">Formulär</h3>
      <Card>
        <Card.Header>
          <Accordion.Toggle eventKey="0" as={Button} variant="link">
            Öppna
          </Accordion.Toggle>
        </Card.Header>
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
                onSubmit({
                  city,
                  school,
                  improvement,
                  informant,
                  gender,
                  applicationPortal: portal,
                  applicationProcess: process
                });
              }}
            >
              <Form.Group controlId="form-city">
                <Form.Label>Vilken stad bor du i?</Form.Label>
                <Form.Control
                  defaultValue={survey?.city}
                  type="text"
                  name="city"
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="form-school">
                <Form.Label>Vilken skola går du på?</Form.Label>
                <Form.Control
                  defaultValue={survey?.school}
                  type="text"
                  name="school"
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="form-gender">
                <Form.Label>Gender</Form.Label>
                <Form.Control
                  defaultValue={survey?.gender}
                  as="select"
                  name="gender"
                >
                  <option>male</option>
                  <option>female</option>
                  <option>other</option>
                  <option>undisclosed</option>
                </Form.Control>
              </Form.Group>
              <Form.Group controlId="form-city">
                <Form.Label>Vad tycker du om ansökningsprocessen?</Form.Label>
                <FormControl as="div">
                  <Rating
                    initialRating={process}
                    onChange={value => {
                      console.log(value);
                      setProcess(value);
                    }}
                    emptySymbol={<Icon className="empty icon" icon={faStar} />}
                    fullSymbol={<Icon className="full icon" icon={faStar} />}
                  />
                </FormControl>
              </Form.Group>
              <Form.Group controlId="form-city">
                <Form.Label>Vad tycker du om ansökningsportalen?</Form.Label>
                <FormControl as="div">
                  <Rating
                    initialRating={portal}
                    onChange={value => setPortal(value)}
                    emptySymbol={<Icon className="empty icon" icon={faStar} />}
                    fullSymbol={<Icon className="full icon" icon={faStar} />}
                    name="portal"
                  />
                </FormControl>
              </Form.Group>
              <Form.Group controlId="form-city">
                <Form.Label>Improvement</Form.Label>
                <Form.Control
                  defaultValue={survey?.improvement}
                  name="improvement"
                  as="textarea"
                  rows={3}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="form-city">
                <Form.Label>Hur hörde du talas om Rays?</Form.Label>
                <Form.Control
                  defaultValue={survey?.informant}
                  name="informant"
                  as="textarea"
                  rows={3}
                ></Form.Control>
              </Form.Group>
              <Button type="submit">Submit</Button>
            </Form>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  );
};
