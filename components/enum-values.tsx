import React from 'react';

import { RawEnumValue } from '../utils/schema';
import SubHeading from './sub-heading';
import Property from './property';

export type Props = {
  enumValues: Array<RawEnumValue>;
};

export default function EnumValues(props: Props) {
  let { enumValues } = props;

  if (!enumValues.length) {
    return null;
  }

  return (
    <div className="my-4">
      <SubHeading>Enum Values</SubHeading>
      <div>
        {props.enumValues.map(enumValue => {
          return (
            <div className="border-b pt-4 pb-2">
              <Property label="Name" value={enumValue.name} />
              <Property label="Description" value={enumValue.description} />
              {enumValue.isDeprecated && (
                <Property label="Deprecated" value={enumValue.deprecationReason || 'Deprecated'} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
