import { Tab } from '@headlessui/react';
import { useContext, useState } from 'react';
import { useUserInfo } from 'data/UserInfo';
import CoreSettings from 'components/Settings/CoreSettings';
import UserSettings from 'components/Settings/UserSettings';
import { SettingsContext } from 'data/SettingsContext';

const SettingsPage = () => {
  const { tabIndex, setTabIndex, selectUser } = useContext(SettingsContext);

  const tabList = [
    {
      title: 'General',
      content: <CoreSettings />,
    },
    {
      title: 'Users',
      content: <UserSettings />,
    },
  ];

  return (
    // used to possibly center the content
    <div className="gutter-stable relative flex h-full w-full flex-row justify-center overflow-y-auto px-4 pt-8 pb-10 @container">
      <div className="flex h-fit min-h-full w-full grow flex-col items-start gap-2">
        <div className="flex min-w-0 flex-row items-center gap-4">
          <h1 className="dashboard-instance-heading">Core Settings</h1>
        </div>
        <Tab.Group
          selectedIndex={tabIndex}
          onChange={(i) => {
            setTabIndex(i);
            if (i !== 1) {
              selectUser(undefined);
            }
          }}
        >
          <Tab.List className="mb-6 flex w-full flex-row flex-wrap items-center gap-4 border-b-2 border-gray-700">
            {tabList.map((tab) => (
              <Tab
                key={tab.title}
                className={({ selected }) =>
                  `text-medium font-semibold tracking-tight focus-visible:outline-none ${
                    selected
                      ? 'border-b-2 border-blue-200 text-blue-200'
                      : 'mb-0.5 text-gray-500'
                  }`
                }
              >
                {tab.title}
              </Tab>
            ))}
          </Tab.List>
          <Tab.Panels className="flex w-full grow flex-row items-stretch">
            {tabList.map((tab) => (
              <Tab.Panel
                className="flex w-full flex-col gap-16 focus:outline-none"
                key={tab.title}
              >
                {tab.content}
              </Tab.Panel>
            ))}
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );
};

export default SettingsPage;
