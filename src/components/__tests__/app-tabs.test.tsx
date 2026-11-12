import React from 'react';
import * as ReactNative from 'react-native';
import { render, screen } from '@testing-library/react-native';

import AppTabs from '../app-tabs';

jest.mock('expo-router/native-tabs', () => {
  const { Text, View } = require('react-native');
  const Trigger = ({ children, name }: { children: React.ReactNode; name: string }) => (
    <View testID={`tab-trigger-${name}`}>{children}</View>
  );
  Trigger.Label = ({ children }: { children: React.ReactNode }) => <Text>{children}</Text>;
  Trigger.Icon = () => <View testID="tab-trigger-icon" />;

  const NativeTabs = ({ children }: { children: React.ReactNode }) => (
    <View testID="native-tabs">{children}</View>
  );
  NativeTabs.Trigger = Trigger;

  return { NativeTabs };
});

describe('AppTabs (native)', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('renders Home and Explore tabs in light mode', async () => {
    jest.spyOn(ReactNative, 'useColorScheme').mockReturnValue('light');

    await render(<AppTabs />);

    expect(screen.getByTestId('native-tabs')).toBeTruthy();
    expect(screen.getByText('Home')).toBeTruthy();
    expect(screen.getByText('Explore')).toBeTruthy();
  });

  it('renders Home and Explore tabs in dark mode', async () => {
    jest.spyOn(ReactNative, 'useColorScheme').mockReturnValue('dark');

    await render(<AppTabs />);

    expect(screen.getByTestId('native-tabs')).toBeTruthy();
    expect(screen.getByText('Home')).toBeTruthy();
    expect(screen.getByText('Explore')).toBeTruthy();
  });
});

