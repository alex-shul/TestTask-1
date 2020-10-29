import * as React from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import { RateType } from '../RateTypeInput/RateTypeInput';
import { WrappedFieldProps } from 'redux-form/lib/Field';
import { change, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { formName } from '../formName';
import { formDataDefaults } from '../SalaryForm';
import { numberWithSpaces, sanitizeNumericInput } from '../../../utils/format';

const AmountLabel: { [key in RateType]: string } = {
  [RateType.RATE_MONTHLY]: '₽',
  [RateType.RATE_MINIMAL]: '₽',
  [RateType.RATE_DAILY]: '₽ в день',
  [RateType.RATE_HOURLY]: '₽ в час',
}

interface AmountInputProps {
  isAmountChanged?: boolean,
  rateType?: RateType,
  dispatch: Dispatch
}

const AmountInput = ({ input: { value, onChange }, rateType = formDataDefaults.rateType, isAmountChanged = formDataDefaults.isAmountChanged, dispatch }: WrappedFieldProps & AmountInputProps) => {
  return (
    <Form.Group as={Row} className='mb-0' style={{ marginLeft: '1.2rem' }} controlId='salary-form__amount'>
      <Col xs='auto' className='p-0'>
        <Form.Control
          type='text'
          maxLength={7}
          value={numberWithSpaces(value)}
          onChange={({ target: { value } }) => {
            if (!isAmountChanged) {
              dispatch(change(formName, 'isAmountChanged', true));
            }
            onChange(sanitizeNumericInput(value));
          }}
          placeholder='0'
        />
      </Col>
      <Form.Label column xs='auto' className='pl-2'>{AmountLabel[rateType]}</Form.Label>
    </Form.Group>
  );
};

const selector = formValueSelector(formName);
const ConnectedAmountInput = connect(state => {
  return {
    rateType: selector(state, 'rateType'),
    isAmountChanged: selector(state, 'isAmountChanged'),
  }
})(AmountInput);

export default ConnectedAmountInput;