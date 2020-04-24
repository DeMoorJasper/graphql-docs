import React from 'react';

import { SchemaField } from '../utils/schema';
import FieldDetails from './field-details';
import SubHeading from './sub-heading';

export type Props = {
  fields: Array<SchemaField>;
};

export default function Fields(props: Props) {
  let { fields } = props;

  if (!fields.length) {
    return null;
  }

  return (
    <div className="my-4">
      <SubHeading>Fields</SubHeading>
      <div>
        {props.fields.map(field => {
          return (
            <div className="border-b pt-4 pb-2">
              <FieldDetails field={field} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
