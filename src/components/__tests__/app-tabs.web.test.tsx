import React from 'react';
import * as ReactNative from 'react-native';
import { render, screen } from '@testing-library/react-native';

import AppTabs, { CustomTabList, TabButton } from '../app-tabs.web';

jest.mock('expo-router/ui', () => {
  const { View } = require('react-native');
  return {
    Tabs: ({ children }: { children: React.ReactNode }) => <View testID="web-tabs">{children}</View>,
    TabSlot: () => <View testID="tab-slot" />,
    TabList: ({ children }: { children: React.ReactNode }) => <View>{children}</View>,
    TabTrigger: ({ children }: { children: React.ReactNode }) => <View>{children}</View>,
  };
});

jest.mock('expo-symbols', () => {
  const { View } = require('react-native');
  return {
    SymbolView: () => <View testID="symbol-view" />,
  };
});

jest.mock('../external-link', () => {
  const { View } = require('react-native');
  return {
    ExternalLink: ({ children }: { children: React.ReactNode }) => <View>{children}</View>,
  };
});

describe('AppTabs (web)', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('renders web AppTabs with Home, Explore, and Docs links', async () => {
    jest.spyOn(ReactNative, 'useColorScheme').mockReturnValue('light');

    await render(<AppTabs />);

    expect(screen.getByTestId('web-tabs')).toBeTruthy();
    expect(screen.getByText('Expo Starter')).toBeTruthy();
    expect(screen.getByText('Home')).toBeTruthy();
    expect(screen.getByText('Explore')).toBeTruthy();
    expect(screen.getByText('Docs')).toBeTruthy();
  });

  it('renders CustomTabList in dark mode', async () => {
    jest.spyOn(ReactNative, 'useColorScheme').mockReturnValue('dark');

    await render(<CustomTabList />);

    expect(screen.getByText('Expo Starter')).toBeTruthy();
  });

  it('renders TabButton in focused and unfocused states', async () => {
    const { rerender } = await render(<TabButton isFocused>Focused Tab</TabButton>);
    expect(screen.getByText('Focused Tab')).toBeTruthy();

    await rerender(<TabButton isFocused={false}>Unfocused Tab</TabButton>);
    expect(screen.getByText('Unfocused Tab')).toBeTruthy();
  });
});

