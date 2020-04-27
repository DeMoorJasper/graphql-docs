import { request } from 'graphql-request';
import LRUCache from 'lru-cache';

const schemaQuery = `
query IntrospectionQuery {
  __schema {
    queryType {
      name
    }
    mutationType {
      name
    }
    subscriptionType {
      name
    }
    types {
      ...FullType
    }
  }
}

fragment FullType on __Type {
  kind
  name
  description
  fields(includeDeprecated: true) {
    name
    description
    args {
      ...InputValue
    }
    type {
      ...TypeRef
    }
    isDeprecated
    deprecationReason
  }
  inputFields {
    ...InputValue
  }
  enumValues(includeDeprecated: true) {
    name
    description
    isDeprecated
    deprecationReason
  }
}

fragment InputValue on __InputValue {
  name
  description
  type {
    ...TypeRef
  }
  defaultValue
}

fragment TypeRef on __Type {
  name
  kind
  ofType {
    name
    kind
    ofType {
      name
      kind
      ofType {
        name
        kind
        ofType {
          name
          kind
          ofType {
            name
            kind
          }
        }
      }
    }
  }
}
`;

export type RawTypeRefType = {
  kind: string;
  name: string | null;
  ofType: RawTypeRefType | null;
};

export type RawInputValueType = {
  name: string;
  description: string | null;
  type: RawTypeRefType;
  defaultValue: string;
};

export type RawEnumValue = {
  name: string;
  description: string | null;
  isDeprecated: boolean;
  deprecationReason: string;
};

export type RawFieldType = {
  name: string;
  description: string | null;
  args: Array<RawInputValueType> | null;
  type: RawTypeRefType;
  isDeprecated: boolean;
  deprecationReason: string | null;
};

export type RawFullType = {
  kind: string;
  name: string;
  description: string | null;
  fields: Array<RawFieldType> | null;
  inputFields: Array<RawInputValueType> | null;
  enumValues: Array<RawEnumValue> | null;
};

export type RawSchema = {
  __schema: {
    queryType: {
      name: string;
    };
    mutationType: {
      name: string;
    };
    subscriptionType: {
      name: string | null;
    } | null;
    types: Array<RawFullType>;
  };
};

export type SchemaType = {
  kind: string;
  description: string | null;
  fields: Array<RawFieldType> | null;
  inputFields: Array<RawInputValueType> | null;
  enumValues: Array<RawEnumValue> | null;
};

export type SchemaValueType = {
  name: string | null;
  label: string;
  kind: string;
};

export type SchemaInputField = {
  name: string;
  type: SchemaValueType;
  description: string | null;
  defaultValue: string | null;
};

export type SchemaField = {
  name: string;
  type: SchemaValueType;
  description: string | null;
  defaultValue: string | null;
  isDeprecated: boolean;
  deprecationReason: string | null;
  inputFields: Array<SchemaInputField>;
};

export type SchemaMapType = {
  name: string;
  kind: string;
  description: string | null;
  enumValues: { [key: string]: RawEnumValue };
  inputFields: { [key: string]: SchemaInputField };
  fields: { [key: string]: SchemaField };
};

export type SchemaMap = {
  queries: string;
  mutations: string;
  subscriptions: string | null;
  types: {
    [key: string]: SchemaMapType;
  };
};

function createTypeLabel(type: RawTypeRefType | null): string {
  if (!type) {
    return '';
  }

  if (type.name) {
    return type.name;
  }

  switch (type.kind) {
    case 'NON_NULL':
      return `${createTypeLabel(type.ofType)}!`;
    case 'LIST':
      return `[${createTypeLabel(type.ofType)}]`;
    default:
      return '';
  }
}

function getRootType(type: RawTypeRefType) {
  let name = null;
  let currentType: RawTypeRefType = type;

  while (name == null) {
    name = currentType.name;
    if (!!currentType.ofType) {
      currentType = currentType.ofType;
    } else {
      break;
    }
  }

  return {
    name,
    kind: currentType.kind,
    label: createTypeLabel(type)
  };
}

function mapInputValues(inputValue: RawInputValueType) {
  return {
    name: inputValue.name,
    type: getRootType(inputValue.type),
    description: inputValue.description,
    defaultValue: inputValue.defaultValue
  };
}

function createSchemaMap(rawSchema: RawSchema): SchemaMap {
  let types: {
    [key: string]: any;
  } = {};

  for (let type of rawSchema.__schema.types) {
    types[type.name] = {
      name: type.name,
      kind: type.kind,
      description: type.description,
      enumValues: type.enumValues
        ? type.enumValues.reduce((acc, curr) => {
            // @ts-ignore
            acc[curr.name] = curr;
            return acc;
          }, {})
        : {},
      fields: type.fields
        ? type.fields
            .map(field => {
              return {
                name: field.name,
                type: getRootType(field.type),
                description: field.description,
                isDeprecated: field.isDeprecated,
                deprecationReason: field.deprecationReason,
                inputFields: field.args ? field.args.map(mapInputValues) : []
              };
            })
            .reduce((acc, curr) => {
              // @ts-ignore
              acc[curr.name] = curr;
              return acc;
            }, {})
        : {},
      inputFields: type.inputFields
        ? type.inputFields.map(mapInputValues).reduce((acc, curr) => {
            // @ts-ignore
            acc[curr.name] = curr;
            return acc;
          }, {})
        : {}
    };
  }

  return {
    queries: rawSchema.__schema.queryType.name,
    mutations: rawSchema.__schema.mutationType.name,
    subscriptions: rawSchema.__schema.subscriptionType ? rawSchema.__schema.subscriptionType.name : null,
    types
  };
}

const schemaCache = new LRUCache<string, SchemaMap>({
  max: 100,
  maxAge: 1000 * 60 * 60
});

export async function fetchGraphQLSchema(endpoint: string): Promise<SchemaMap> {
  if (schemaCache.has(endpoint)) {
    // @ts-ignore
    return schemaCache.get(endpoint);
  }

  let data = await request(endpoint, schemaQuery);
  let schema = createSchemaMap(data);
  schemaCache.set(endpoint, schema);
  return schema;
}
