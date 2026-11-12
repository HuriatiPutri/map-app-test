import React from 'react';
import * as ReactNative from 'react-native';
import { render, screen } from '@testing-library/react-native';
import * as SplashScreen from 'expo-splash-screen';

import TabLayout from '@/app/_layout';

jest.mock('expo-splash-screen', () => ({
  preventAutoHideAsync: jest.fn(),
  hideAsync: jest.fn(() => Promise.resolve()),
}));

jest.mock('expo-router', () => {
  const { View } = require('react-native');
  return {
    DarkTheme: { dark: true },
    DefaultTheme: { dark: false },
    ThemeProvider: ({
      children,
      value,
    }: {
      children: React.ReactNode;
      value: { dark: boolean };
    }) => <View testID={value.dark ? 'theme-dark' : 'theme-light'}>{children}</View>,
  };
});

jest.mock('@/components/animated-icon', () => {
  const { Text } = require('react-native');
  return {
    AnimatedSplashOverlay: () => <Text>AnimatedSplashOverlay</Text>,
  };
});

jest.mock('@/components/app-tabs', () => {
  const { Text } = require('react-native');
  const MockAppTabs = () => <Text>AppTabs</Text>;
  return MockAppTabs;
});

describe('TabLayout (_layout)', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('calls SplashScreen.preventAutoHideAsync on module load', () => {
    expect(SplashScreen.preventAutoHideAsync).toHaveBeenCalled();
  });

  it('renders with DefaultTheme when colorScheme is light', async () => {
    jest.spyOn(ReactNative, 'useColorScheme').mockReturnValue('light');

    await render(<TabLayout />);

    expect(screen.getByTestId('theme-light')).toBeTruthy();
    expect(screen.getByText('AnimatedSplashOverlay')).toBeTruthy();
    expect(screen.getByText('AppTabs')).toBeTruthy();
  });

  it('renders with DarkTheme when colorScheme is dark', async () => {
    jest.spyOn(ReactNative, 'useColorScheme').mockReturnValue('dark');

    await render(<TabLayout />);

    expect(screen.getByTestId('theme-dark')).toBeTruthy();
    expect(screen.getByText('AnimatedSplashOverlay')).toBeTruthy();
    expect(screen.getByText('AppTabs')).toBeTruthy();
  });
});
