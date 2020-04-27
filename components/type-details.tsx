import React from 'react';

import { SchemaMapType } from '../utils/schema';
import Property from './property';
import Arguments from './arguments';
import Fields from './fields';
import EnumValues from './enum-values';
import InputObject from './input-object';

export type Props = {
  type: SchemaMapType;
};

export default function FieldDetails(props: Props) {
  let { type } = props;

  let isInput = type.kind === 'INPUT_OBJECT';
  return (
    <div>
      <Property label="Name" value={type.name} />
      <Property label="Kind" value={<span className="capitalize">{type.kind.replace(/_/g, ' ').toLowerCase()}</span>} />
      <Property label="Description" value={type.description} />
      {isInput ? (
        <InputObject inputFields={Object.values(type.inputFields)} />
      ) : (
        <React.Fragment>
          <Fields fields={Object.values(type.fields)} />
          <Arguments inputFields={Object.values(type.inputFields)} />
        </React.Fragment>
      )}
      <EnumValues enumValues={Object.values(type.enumValues)} />
    </div>
  );
}
