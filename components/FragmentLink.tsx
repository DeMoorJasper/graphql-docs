import React from 'react';
import { useRouter } from 'next/router';
import { stringify } from 'querystring';

export type Props = {
  field: string;
  type?: string;
  endpoint?: string;
  children: React.ReactNode | React.ReactNodeArray;
};

export default function FragmentLink(props: Props) {
  let { type = 'types', field, endpoint, children } = props;
  let { query } = useRouter();

  let newQuery: any = { ...query, type, field };
  if (endpoint) {
    newQuery.endpoint = endpoint;
  }

  return (
    <a href={`/?${stringify(newQuery)}`} className="text-blue-600 hover:text-blue-800 hover:underline">
      {children}
    </a>
  );
}
