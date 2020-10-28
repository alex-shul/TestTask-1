import * as React from 'react';
import { Form, Row } from "react-bootstrap";
import './ExcludeTaxInput.sass';
import { WrappedFieldProps } from "redux-form/lib/Field";
import PropTypes from "prop-types";

const ExcludeTaxInput = ({ input: { value, onChange } }: WrappedFieldProps) => {
  return (
    <Form.Group as={Row} className='mb-0 ml-2'>
      <Form.Label className='exclude-tax__label small pl-0 pr-0' column xs='auto' htmlFor='exclude-tax'>
        <span className={'exclude-tax__label-off' + (!value ? ' active' : '')}>Указать с НДФЛ</span>
        <Form.Check
          checked={value}
          onChange={() => onChange(!value)}
          name='exclude-tax'
          inline
          type='switch'
          id='exclude-tax'
        />
        <span className={'exclude-tax__label-on' + (value ? ' active' : '')}>Без НДФЛ</span>
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
