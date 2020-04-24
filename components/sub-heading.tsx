import React from 'react';

export type Props = {
  children: React.ReactNode | React.ReactNodeArray;
};

export default function SubHeading(props: Props) {
  return <h2 className="text-gray-900 text-lg font-bold border-b py-1">{props.children}</h2>;
}
