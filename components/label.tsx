import React from 'react';

export type Props = {
  children: string;
}

export default function Label(props: Props) {
  return <div className="font-bold text-sm text-gray-500 uppercase">
    {props.children}
  </div>
}