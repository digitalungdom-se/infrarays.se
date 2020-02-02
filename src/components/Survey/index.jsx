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
import { Trans, useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();
  return (
    <Accordion defaultActiveKey="1" className={done && 'done'}>
      <Card>
        <StyledHeader className={done ? 'done' : ''}>
          <Accordion.Toggle eventKey="0" as={Button} variant="link">
            {t('Open (verb)')}
          </Accordion.Toggle>
        </StyledHeader>
        <Accordion.Collapse eventKey="0">
          <Card.Body>
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
                <Form.Label>{t('What city do you live in?')}</Form.Label>
                <Form.Control
                  defaultValue={survey?.city}
                  type="text"
                  name="city"
                  required
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="form-school">
                <Form.Label>{t('Which school do you attend?')}</Form.Label>
                <Form.Control
                  defaultValue={survey?.school}
                  type="text"
                  name="school"
                  required
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="form-gender">
                <Form.Label>{t('Gender')}</Form.Label>
                <Form.Control
                  defaultValue={survey?.gender || 'select'}
                  as="select"
                  name="gender"
                  isInvalid={error?.gender}
                  required
                >
                  <option value="select" disabled>
                    {t('Choose an option')}
                  </option>
                  <option value="male">{t('Male')}</option>
                  <option value="female">{t('Woman')}</option>
                  <option value="other">{t('Other')}</option>
                  <option value="undisclosed">
                    {t('Prefer not to disclose')}
                  </option>
                </Form.Control>
                <Form.Control.Feedback type="invalid">
                  {t('Please choose an option')}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="form-city">
                <Form.Label>
                  {t('What are your thoughts on the application process?')}
                </Form.Label>
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
                  {t('You need to set a score!')}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="form-city">
                <Form.Label>
                  {t('What are your thoughts on the application portal?')}
                </Form.Label>
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
                  {t('You need to set a score!')}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="form-city">
                <Form.Label>
                  {t('Improvements on application process and portal')}
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
                <Form.Label>{t('How did you hear about Rays?')}</Form.Label>
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
                {loading ? t('Saving answers') : t('Save answers')}
              </Button>
            </Form>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  );
};
