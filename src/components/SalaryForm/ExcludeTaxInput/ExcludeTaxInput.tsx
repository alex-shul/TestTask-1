import * as React from 'react';
import { Form, Row } from 'react-bootstrap';
import './ExcludeTaxInput.sass';
import { WrappedFieldProps } from 'redux-form/lib/Field';

const ExcludeTaxInput = ({ input: { value, onChange } }: WrappedFieldProps) => {
  return (
    <Form.Group as={Row} className='mb-0' style={{ marginLeft: '1.2rem' }}>
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

export default ExcludeTaxInput;
