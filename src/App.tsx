import React from 'react';
import './App.sass';
import { Container, Row, Col } from 'react-bootstrap';
import SalaryForm from './components/SalaryForm/SalaryForm';

function App() {
  return (
    <Container className={'app'}>
      <Row>
        <Col>
          <SalaryForm />
        </Col>
      </Row>
    </Container>
  );
}

export default App;
