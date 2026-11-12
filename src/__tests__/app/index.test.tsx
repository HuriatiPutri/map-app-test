import React from 'react';
import { Platform } from 'react-native';
import { render, screen } from '@testing-library/react-native';
import * as Device from 'expo-device';

import HomeScreen from '@/app/index';

jest.mock('expo-device', () => ({
  isDevice: false,
}));

jest.mock('react-native-safe-area-context', () => {
  const { View } = require('react-native');
  return {
    SafeAreaView: ({ children, style }: { children: React.ReactNode; style?: unknown }) => (
      <View style={style as object}>{children}</View>
    ),
  };
});

jest.mock('@/components/animated-icon', () => {
  const { Text } = require('react-native');
  return {
    AnimatedIcon: () => <Text>AnimatedIcon</Text>,
  };
});

jest.mock('@/components/web-badge', () => {
  const { Text } = require('react-native');
  return {
    WebBadge: () => <Text>WebBadge</Text>,
  };
});

describe('HomeScreen (index)', () => {
  const originalOS = Platform.OS;

  afterEach(() => {
    Platform.OS = originalOS;
    (Device as { isDevice: boolean }).isDevice = false;
  });

  it('renders main content and iOS simulator dev menu hint', async () => {
    Platform.OS = 'ios';
    (Device as { isDevice: boolean }).isDevice = false;

    await render(<HomeScreen />);

    expect(screen.getByText(/Welcome to\s+Expo/)).toBeTruthy();
    expect(screen.getByText('get started')).toBeTruthy();
    expect(screen.getByText('Try editing')).toBeTruthy();
    expect(screen.getByText('src/app/index.tsx')).toBeTruthy();
    expect(screen.getByText('Fresh start')).toBeTruthy();
    expect(screen.getByText('npm run reset-project')).toBeTruthy();
    expect(screen.getByText('cmd+d')).toBeTruthy();
    expect(screen.queryByText('WebBadge')).toBeNull();
  });

  it('renders Android emulator dev menu hint', async () => {
    Platform.OS = 'android';
    (Device as { isDevice: boolean }).isDevice = false;

    await render(<HomeScreen />);

    expect(screen.getByText('cmd+m (or ctrl+m)')).toBeTruthy();
  });

  it('renders physical device dev menu hint when Device.isDevice is true', async () => {
    Platform.OS = 'ios';
    (Device as { isDevice: boolean }).isDevice = true;

    await render(<HomeScreen />);

    expect(screen.getByText(/shake device or press/)).toBeTruthy();
  });

  it('renders web dev menu hint and WebBadge on web platform', async () => {
    Platform.OS = 'web';

    await render(<HomeScreen />);

    expect(screen.getByText('use browser devtools')).toBeTruthy();
    expect(screen.getByText('WebBadge')).toBeTruthy();
  });
});
