import React from 'react';

import { SchemaInputField } from '../utils/schema';
import Label from './label';
import FragmentLink from './fragment-link';
import FieldsObject from './fields-object';

export type Props = {
  inputFields: Array<SchemaInputField>;
};

export default function InputObject(props: Props) {
  let { inputFields } = props;

  if (!inputFields.length) {
    return null;
  }

  return (
    <div>
      <Label>Input Format</Label>
      <div className="rounded bg-gray-200 px-4 py-2 overflow-x-auto">
        <FieldsObject fields={inputFields} />{' '}
      </div>
    </div>
  );
}
