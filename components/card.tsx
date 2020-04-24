import React from 'react';

export type Props = {
  children?: React.ReactNode | React.ReactNodeArray;
};

export default function Card(props: Props) {
  let { children } = props;

  return <div className="rounded p-2 bg-gray-100 border shadow">{children}</div>;
}
