import React from 'react';

import { SchemaField } from '../utils/schema';
import Label from './label';
import FieldsObject from './fields-object';

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
        <FieldsObject fields={fields} />
      </div>
    </div>
  );
}
