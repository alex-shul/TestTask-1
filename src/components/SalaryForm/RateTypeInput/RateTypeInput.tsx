import React from 'react';
import { Col, Form, Row } from "react-bootstrap";
import Tips from "../../Tips/Tips";
import { WrappedFieldProps } from "redux-form/lib/Field";
import { change, formValueSelector } from "redux-form";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { formName } from "../formName";

export enum RateType {
  RATE_MONTHLY,
  RATE_MINIMAL,
  RATE_DAILY,
  RATE_HOURLY
}

const RateLabel: { [key in RateType]: string } = {
  [RateType.RATE_MONTHLY]: 'Оклад за месяц',
  [RateType.RATE_MINIMAL]: 'МРОТ',
  [RateType.RATE_DAILY]: 'Оплата за день',
  [RateType.RATE_HOURLY]: 'Оплата за час',
}

const defaultAmountByRateType: { [key in RateType]: number } = {
  [RateType.RATE_MONTHLY]: 40000,
  [RateType.RATE_MINIMAL]: 20000,
  [RateType.RATE_DAILY]: 1500,
  [RateType.RATE_HOURLY]: 400,
}

interface RateTypeInputProps {
  isAmountChanged?: boolean,
  dispatch: Dispatch
}

const RateTypeInput = ({ input: { value, onChange }, isAmountChanged, dispatch }: WrappedFieldProps & RateTypeInputProps) => {
  return (
    <Form.Group className='mb-0' controlId='salary-form__rate-type'>
      <Form.Label className='small left-edge'>Сумма</Form.Label>
      {Object.values(RateType)
        .filter(k => typeof RateType[k as any] === 'string')
        .map((t, i) => <Row key={i}>
          <Col xs='auto' className={'pr-0'}>
            <Form.Check
              checked={t === value}
              onChange={() => {
                onChange(t);
                if (!isAmountChanged) {
                  dispatch(change(formName, 'amount', defaultAmountByRateType[t as RateType]));
                }
              }}
              name='rate-type'
              className='mb-1'
              type='radio'
              id={`rate-type__${t}`}
              value={t}
              label={RateLabel[t as RateType]}
            />
          </Col>
          {t === RateType.RATE_MINIMAL && <Col xs='auto' className={'p-0'}>
            <Tips message='МРОТ — минимальный размер оплаты труда. Разный для разных регионов.' />
          </Col>}
        </Row>)
      }
    </Form.Group>
  );
};

const selector = formValueSelector(formName);
const ConnectedRateTypeInput = connect(state => {
  return {
    isAmountChanged: selector(state, 'isAmountChanged'),
  }
})(RateTypeInput);

export default ConnectedRateTypeInput;