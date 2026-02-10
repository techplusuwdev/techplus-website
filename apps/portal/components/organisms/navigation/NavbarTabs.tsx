'use client';

import React from 'react';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Button from '@mui/material/Button';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/contexts/AuthContext';

interface NavbarTabsProps {
  currentTab: number;
  setCurrentTab: (value: number) => void;
  tabOrientation: 'horizontal' | 'vertical';
  tabClassname?: string;
  tabItemContainerStyle?: React.CSSProperties;
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function NavbarTabs({
  currentTab,
  setCurrentTab,
  tabOrientation,
}: NavbarTabsProps) {
  const router = useRouter();
  const { userRole } = useAuth();
  const isAdmin = userRole === 'admin';

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
    const routes = isAdmin 
      ? ['/', '/initiatives', '/impact', '/resources', '/team', '/calendar', '/admin']
      : ['/', '/initiatives', '/impact', '/resources', '/team', '/calendar'];
    if (routes[newValue]) {
      router.push(routes[newValue]);
    }
  };

  const tabClasses =
    tabOrientation === 'vertical'
      ? 'min-w-[300px] min-h-[75px] text-lg font-medium normal-case leading-[27px]'
      : 'text-lg font-medium normal-case leading-[27px]';

  return (
    <Tabs
      value={currentTab}
      onChange={handleTabChange}
      orientation={tabOrientation}
      sx={{
        '& .MuiTabs-indicator': { display: 'none' }, // Hide default indicator
        '& .MuiTab-root': {
          color: '#60A5FA', // All tabs are blue
          minWidth: 'auto',
          padding: '12px 24px',
          position: 'relative',
          '&:hover': {
            '&::after': {
              content: '""',
              position: 'absolute',
              bottom: 0,
              left: '50%',
              transform: 'translateX(-50%)',
              width: '60%',
              height: '2px',
              backgroundColor: '#76a36d', // Green indicator on hover
            },
          },
          '&.Mui-selected': {
            color: '#60A5FA', // Active tab stays blue
            '&::after': {
              content: '""',
              position: 'absolute',
              bottom: 0,
              left: '50%',
              transform: 'translateX(-50%)',
              width: '60%',
              height: '2px',
              backgroundColor: '#76a36d', // Green indicator for active tab
            },
          },
        },
      }}
    >
      <Tab
        label="Home"
        {...a11yProps(0)}
        className={tabClasses}
      />
      <Tab
        label="Initiatives"
        {...a11yProps(1)}
        className={tabClasses}
      />
      <Tab
        label="Impact"
        {...a11yProps(2)}
        className={tabClasses}
      />
      <Tab
        label="Resources"
        {...a11yProps(3)}
        className={tabClasses}
      />
      <Tab
        label="Team"
        {...a11yProps(4)}
        className={tabClasses}
      />
      <Tab
        label="Calendar"
        {...a11yProps(5)}
        className={tabClasses}
      />
      {isAdmin && (
        <Tab
          label="Admin"
          {...a11yProps(6)}
          className={tabClasses}
        />
      )}
    </Tabs>
  );
}
