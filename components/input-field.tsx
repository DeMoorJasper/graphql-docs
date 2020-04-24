import React from 'react';

import { SchemaInputField } from '../utils/schema';
import Label from './label';
import Property from './property';

export type Props = {
  inputField: SchemaInputField;
};

export default function InputField(props: Props) {
  let { inputField } = props;

  return (
    <div>
      <Property label="Name" value={inputField.name} />
      <Property label="Input Type" value={inputField.type.label} />
      <Property label="Default Value" value={inputField.defaultValue} />
    </div>
  );
}
