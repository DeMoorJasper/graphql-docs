import React from 'react';

import Label from './label';
import { SchemaField, SchemaMap } from '../utils/schema';
import FragmentLink from './fragment-link';
import FieldsObject from './fields-object';

export type Props = {
  field: SchemaField;
  schema: SchemaMap;
};

export default function FieldQueryExample(props: Props) {
  let { field, schema } = props;

  let queryArguments = null;
  if (field.inputFields && field.inputFields.length) {
    queryArguments = Object.values(field.inputFields).map((inputField, i) => {
      return (
        <span>
          {inputField.name}: <FragmentLink field={inputField.type.name || ''}>{inputField.type.label}</FragmentLink>
          {i < field.inputFields.length - 1 ? ', ' : ''}
        </span>
      );
    });
  }

  let responseType = field.type.kind;
  let returnValue = null;
  if (responseType === 'OBJECT') {
    if (!field.type.name) {
      returnValue = 'Unknown Type';
    } else {
      let typeValue = schema.types[field.type.name];
      returnValue = (
        <React.Fragment>
          <span> </span>
          <FieldsObject fields={Object.values(typeValue.fields)} />
        </React.Fragment>
      );
    }
  } else {
    returnValue = (
      <React.Fragment>
        <span>:</span>
        <span className="ml-2">
          <FragmentLink field={field.type.name || ''}>{field.type.label}</FragmentLink>
        </span>
      </React.Fragment>
    );
  }

  return (
    <div>
      <Label>Example</Label>
      <div className="mt-1 mb-2 text-gray-900 text-sm">
        Note: This Example is pseudo-code and cannot be used directly as a query, but is a good guideline into what you
        can use inside your query as arguments and properties.
      </div>
      <div className="rounded bg-gray-200 px-4 py-2 overflow-x-auto">
        {field.name}
        {queryArguments ? (
          <React.Fragment>
            <span>(</span>
            {queryArguments}
            <span>)</span>
          </React.Fragment>
        ) : (
          ''
        )}
        {returnValue}
      </div>
    </div>
  );
}
