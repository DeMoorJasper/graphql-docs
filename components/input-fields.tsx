import React from 'react';

import { SchemaInputField } from '../utils/schema';
import Label from './label';
import InputField from './input-field';
import Card from './card';

export type Props = {
  inputFields: Array<SchemaInputField>;
};

export default function InputFields(props: Props) {
  let { inputFields } = props;

  if (!inputFields.length) {
    return null;
  }

  return (
    <div className="my-4">
      <Label>Input Fields</Label>
      <div className="mt-2 grid md:grid-cols-2 gap-6">
        {props.inputFields.map(inputField => {
          return (
            <Card>
              <InputField inputField={inputField} />
            </Card>
          );
        })}
      </div>
    </div>
  );
}
