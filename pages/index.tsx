import React from 'react';
import { GetServerSideProps } from 'next';

import { fetchGraphQLSchema, SchemaMap } from '../utils/schema';
import SideBar from '../components/sidebar';
import DetailView from '../components/detail-view';

export type SelectedValue = { type: string; field: string };

export type Props = {
  schema: SchemaMap | null;
  endpoint: string | null;
  selectedValue: SelectedValue;
};

const Documentation = (props: { schema: SchemaMap; selectedValue: SelectedValue }) => {
  let { schema, selectedValue } = props;

  return (
    <div className="flex h-full">
      <div className="max-w-xs w-1/4">
        <SideBar schema={schema} selectedValue={selectedValue} />
      </div>
      <div className="w-full">
        <DetailView schema={schema} selectedValue={selectedValue} />
      </div>
    </div>
  );
};

const Page = (props: Props) => {
  let { schema, endpoint, selectedValue } = props;

  if (schema) {
    return <Documentation schema={schema} selectedValue={selectedValue} />;
  } else {
    return <div>Provide an api endpoint in the query parameters</div>;
  }
};

export const getServerSideProps: GetServerSideProps = async context => {
  let endpoint: string | null =
    context.query.endpoint && !Array.isArray(context.query.endpoint) ? context.query.endpoint : null;
  if (!endpoint) {
    return {
      props: {
        schema: null,
        selectedValue: null,
        endpoint
      }
    };
  } else {
    let schema = await fetchGraphQLSchema(endpoint);
    let selectedValue = {
      type: context.query.type || 'queries',
      field: context.query.field || Object.keys(schema.types[schema.queries].fields)[0]
    };

    return {
      props: {
        schema,
        endpoint,
        selectedValue
      }
    };
  }
};

export default Page;
