import React from 'react';
import { connect } from 'react-redux';
import { Alert, Row, Form } from 'react-bootstrap';
import { Field, formValueSelector, InjectedFormProps, reduxForm } from 'redux-form'
import RateTypeInput, { RateType } from './RateTypeInput/RateTypeInput';
import ExcludeTaxInput from './ExcludeTaxInput/ExcludeTaxInput';
import AmountInput from './AmountInput/AmountInput';
import { formName } from './formName';
import { numberWithSpaces } from '../../utils/format';

const taxPercent = 13;

interface FormData {
  rateType?: RateType,
  excludeTax?: boolean,
  amount?: number,
  isAmountChanged?: boolean
}

export const formDataDefaults = {
  rateType: RateType.RATE_MONTHLY,
  excludeTax: true,
  amount: 40000,
  isAmountChanged: false,
}

const SalaryForm = ({ handleSubmit, rateType = formDataDefaults.rateType, excludeTax = formDataDefaults.excludeTax, amount = formDataDefaults.amount }: FormData & InjectedFormProps) => {
  const isMinimalRateType = rateType === RateType.RATE_MINIMAL;
  const isMonthlyRateType = rateType === RateType.RATE_MONTHLY;
  
  const taxModifier = (1 - taxPercent / 100);
  const employeeCost = Math.round(excludeTax ? amount / taxModifier : amount);
  const salary = Math.round(excludeTax ? amount : amount * taxModifier);
  const taxValue = employeeCost - salary;
  
  return (
    <Form className={`${formName}-form`} onSubmit={handleSubmit}>
      <Field name='rateType' component={RateTypeInput} />
      {!isMinimalRateType && <>
        <Field name='excludeTax' component={ExcludeTaxInput} />
        <Field name='amount' component={AmountInput} />
      </>}
      {isMonthlyRateType && amount > 0 && <Row>
        <Alert className='mt-4 p-4' variant='warning'><>
          <p><b>{numberWithSpaces(salary)} ₽</b> сотрудник будет получать на руки</p>
          <p><b>{numberWithSpaces(taxValue)} ₽</b> НДФЛ, 13% от оклада</p>
          <p className='mb-0'><b>{numberWithSpaces(employeeCost)} ₽</b> за сотрудника в месяц</p></>
        </Alert>
      </Row>}
    </Form>
  );
};

const SalaryFormWithReduxForm = reduxForm<FormData>({
  form: 'salary',
  initialValues: formDataDefaults
})(SalaryForm);

const selector = formValueSelector(formName);
function MapStateToProps(state: any): FormData {
  return selector(state, 'rateType', 'excludeTax', 'amount');
}
const ConnectedSalaryForm = connect<FormData>(MapStateToProps)(SalaryFormWithReduxForm);

export default ConnectedSalaryForm;