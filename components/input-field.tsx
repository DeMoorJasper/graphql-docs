import React from 'react';

import { SchemaInputField } from '../utils/schema';
import Property from './property';
import FragmentLink from './FragmentLink';

export type Props = {
  inputField: SchemaInputField;
};

export default function InputField(props: Props) {
  let { inputField } = props;

  return (
    <div>
      <Property label="Name" value={inputField.name} />
      <Property
        label="Input Type"
        value={
          inputField.type.name && <FragmentLink field={inputField.type.name}>{inputField.type.label}</FragmentLink>
        }
      />
      <Property label="Default Value" value={inputField.defaultValue} />
    </div>
  );
}
