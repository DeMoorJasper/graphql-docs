import React from 'react';

import { SchemaMap } from '../utils/schema';
import { SelectedValue } from '../pages/index';
import Heading from './heading';
import FieldDetails from './field-details';
import TypeDetails from './type-details';

export type Props = {
  schema: SchemaMap;
  selectedValue: SelectedValue;
};

export default function DetailView(props: Props) {
  let { schema, selectedValue } = props;

  let details = null;
  if (selectedValue.type !== 'types') {
    // @ts-ignore
    let typeRoot: string = schema[selectedValue.type];
    // @ts-ignore
    let field = schema.types[typeRoot].fields[selectedValue.field];

    details = <FieldDetails field={field} />;
  } else {
    let type = schema.types[selectedValue.field];

    details = <TypeDetails type={type} />;
  }

  return (
    <div className="px-8 py-4">
      <Heading>
        <span className="capitalize">{selectedValue.type}</span> / {selectedValue.field}
      </Heading>
      <div>{details}</div>
    </div>
  );
}
