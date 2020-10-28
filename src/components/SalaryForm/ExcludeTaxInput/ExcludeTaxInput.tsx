import * as React from 'react';
import { Form, Row } from "react-bootstrap";
import './ExcludeTaxInput.sass';
import { WrappedFieldProps } from "redux-form/lib/Field";
import PropTypes from "prop-types";

const ExcludeTaxInput = ({ input: { value, onChange } }: WrappedFieldProps) => {
  return (
    <Form.Group as={Row} className='mb-0 ml-2'>
      <Form.Label className='contain-tax__label small pl-0 pr-0' column xs='auto' htmlFor='contain-tax'>
        <span className='contain-tax__label-off'>Указать с НДФЛ</span>
        <Form.Check
          checked={value}
          onChange={() => onChange(!value)}
          name='contain-tax'
          inline
          type='switch'
          id='contain-tax'
        />
        <span className='contain-tax__label-on'>Без НДФЛ</span>
      </Form.Label>
    </Form.Group>
  );
};

ExcludeTaxInput.propTypes = {
  input: PropTypes.shape({
    value: PropTypes.bool,
    onChange: PropTypes.func.isRequired
  })
};

export default ExcludeTaxInput;
