import React from 'react';
import Label from './label';

export type Props = {
  label: string;
  value: string | React.ReactNode | React.ReactNodeArray | null;
};

export default function Property(props: Props) {
  let { label, value } = props;

  if (!value) {
    return null;
  } else {
    return (
      <div className="mb-2">
        <Label>{label}</Label>
        <div>{value}</div>
      </div>
    );
  }
}
