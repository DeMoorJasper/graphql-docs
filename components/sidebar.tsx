import React from 'react';
import classNames from 'classnames';

import { SchemaMap } from '../utils/schema';
import Label from './label';
import FragmentLink from './FragmentLink';

export type Props = {
  schema: SchemaMap;
  selectedValue: { type: string; field: string };
};

const getKeys = (obj: { [key: string]: any }) => {
  return Object.keys(obj).sort((a, b) => a.localeCompare(b));
};

export default function SideBar(props: Props) {
  let { schema, selectedValue } = props;
  let [selectedTab, setSelectedTab] = React.useState(selectedValue.type);
  let shownTypes: Array<string> = React.useMemo(() => {
    switch (selectedTab) {
      case 'queries':
        return getKeys(schema.types[schema.queries].fields);
      case 'mutations':
        return getKeys(schema.types[schema.mutations].fields);
      case 'subscriptions':
        if (schema.subscriptions) {
          return getKeys(schema.types[schema.subscriptions].fields).sort((a, b) => a.localeCompare(b));
        } else {
          return [];
        }
      default:
        return getKeys(schema.types).filter(k => {
          return (
            !!k && !k.startsWith('__') && k !== schema.queries && k !== schema.mutations && k !== schema.subscriptions
          );
        });
    }
  }, [selectedTab]);

  let tabs = ['types', 'queries', 'mutations'];
  if (schema.subscriptions) {
    tabs.push('subscriptions');
  }

  return (
    <div className="w-full min-h-screen overflow-x-auto overflow-y-hidden h-full border-r">
      <div className="flex bg-blue-200">
        {tabs.map(tab => (
          <div
            className={classNames('p-2 cursor-pointer capitalize font-medium', {
              'bg-blue-400 text-white': tab === selectedTab,
              'hover:bg-blue-600 hover:text-white': tab !== selectedTab
            })}
            onClick={() => setSelectedTab(tab)}
            key={tab}
          >
            {tab}
          </div>
        ))}
      </div>
      <ul className="w-full h-full list-none p-2">
        <li className="p-2">
          <Label>{selectedTab}</Label>
        </li>
        {shownTypes.map(type => {
          return (
            <li
              className={classNames('font-medium cursor-pointer text-gray-600 hover:text-gray-900', {
                'bg-blue-100 rounded': selectedValue.field === type
              })}
              key={type}
            >
              <FragmentLink type={selectedTab} field={type}>
                <div className="px-2 py-1 w-full">{type}</div>
              </FragmentLink>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
