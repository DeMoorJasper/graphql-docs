import React from 'react';

import { SchemaMapType } from '../utils/schema';
import Property from './property';
import InputFields from './input-fields';
import Fields from './fields';
import EnumValues from './enum-values';

export type Props = {
  type: SchemaMapType;
};

export default function FieldDetails(props: Props) {
  let { type } = props;

  return (
    <div>
      <Property label="Name" value={type.name} />
      <Property label="Kind" value={type.kind} />
      <Property label="Description" value={type.description} />
      <Fields fields={Object.values(type.fields)} />
      <InputFields inputFields={Object.values(type.inputFields)} />
      <EnumValues enumValues={Object.values(type.enumValues)} />
    </div>
  );
}
