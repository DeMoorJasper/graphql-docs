import React from 'react';

export type Props = {
  children: React.ReactNode | Array<React.ReactNode>;
};

export default function Heading(props: Props) {
  let { children } = props;

  return (
    <div className="mb-8">
      <h1 className="text-gray-700 text-2xl font-bold">{children}</h1>
      <div className="h-1 w-16 bg-blue-500" />
    </div>
  );
}
