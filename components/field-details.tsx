import React from 'react';

import { SchemaField } from '../utils/schema';
import Property from './property';
import Arguments from './arguments';
import FragmentLink from './FragmentLink';

export type Props = {
  field: SchemaField;
  showExample?: boolean;
};

export default function FieldDetails(props: Props) {
  let { field, showExample = false } = props;

  return (
    <div>
      <div className="grid md:grid-cols-2">
        <Property label="Name" value={field.name} />
        <Property
          label="Return Type"
          value={field.type.name && <FragmentLink field={field.type.name}>{field.type.label}</FragmentLink>}
        />
        <Property label="Default Value" value={field.defaultValue} />
        <Property label="Description" value={field.description} />
        {field.isDeprecated && <Property label="Deprecated" value={field.deprecationReason || 'Deprecated'} />}
      </div>
      <Arguments inputFields={field.inputFields} />
    </div>
  );
}
