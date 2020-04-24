import React from 'react';
import { GetServerSideProps } from 'next';
import { fetchGraphQLSchema } from '../utils/schema';

export type Props = {
  schema: any;
};

const Page = (props: Props) => {
  console.log(props);

  return <div>This is a page...</div>;
};

export const getServerSideProps: GetServerSideProps = async context => {
  let schema = await fetchGraphQLSchema('https://api.deversbox.com/graphql');

  return {
    props: {
      schema
    }
  };
};

export default Page;
