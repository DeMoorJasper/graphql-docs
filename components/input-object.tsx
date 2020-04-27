import React from 'react';

import { SchemaInputField } from '../utils/schema';
import Label from './label';
import FragmentLink from './fragment-link';

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
        <div>
          <div>{'{'}</div>
          {inputFields.map(val => {
            return (
              <div className="ml-6">
                {val.name}:{' '}
                <FragmentLink field={val.type.name || ''}>
                  {val.type.label} {val.defaultValue ? ` = ${val.defaultValue}` : ''}
                </FragmentLink>
              </div>
            );
          })}
          <div>{'}'}</div>
        </div>
      </div>
    </div>
  );
}
