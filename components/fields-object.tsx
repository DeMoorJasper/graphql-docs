import React from 'react';

import { SchemaField, SchemaInputField } from '../utils/schema';
import FragmentLink from './fragment-link';

export type Props = {
  fields: Array<SchemaField | SchemaInputField>;
};

export default function FieldsObject(props: Props) {
  let { fields } = props;

  if (!fields.length) {
    return null;
  }

  return (
    <React.Fragment>
      <span>{'{'}</span>
      {fields.map(f => {
        // @ts-ignore
        let deprecationReason: string | null = f.deprecationReason || null;

        return (
          <div className="ml-4">
            {f.description && <div className="text-gray-600">// {f.description}</div>}
            {deprecationReason && <div className="text-orange-500 font-medium">// Deprecated: {deprecationReason}</div>}
            <div>
              {f.name}: <FragmentLink field={f.type.name || ''}>{f.type.label}</FragmentLink>
            </div>
          </div>
        );
      })}
      <div>{'}'}</div>
    </React.Fragment>
  );
}
