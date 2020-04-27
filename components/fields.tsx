import React from 'react';

import { SchemaField } from '../utils/schema';
import FragmentLink from './fragment-link';
import Label from './label';

export type Props = {
  fields: Array<SchemaField>;
};

export default function Fields(props: Props) {
  let { fields } = props;

  if (!fields.length) {
    return null;
  }

  return (
    <div>
      <Label>Properties</Label>
      <div className="rounded bg-gray-200 px-4 py-2 overflow-x-auto">
        <div>
          <div>{'{'}</div>
          {Object.values(fields).map(val => {
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
