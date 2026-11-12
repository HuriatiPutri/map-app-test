import React from 'react';
import { Platform } from 'react-native';
import { fireEvent, render, screen } from '@testing-library/react-native';

import TabTwoScreen from '@/app/explore';

jest.mock('react-native-safe-area-context', () => ({
  useSafeAreaInsets: () => ({ top: 10, bottom: 20, left: 0, right: 0 }),
}));

jest.mock('expo-image', () => {
  const { View } = require('react-native');
  return {
    Image: () => <View testID="expo-image" />,
  };
});

jest.mock('expo-symbols', () => {
  const { View } = require('react-native');
  return {
    SymbolView: () => <View testID="symbol-view" />,
  };
});

jest.mock('@/components/external-link', () => {
  const { View } = require('react-native');
  return {
    ExternalLink: ({ children }: { children: React.ReactNode }) => <View>{children}</View>,
  };
});

jest.mock('@/components/web-badge', () => {
  const { Text } = require('react-native');
  return {
    WebBadge: () => <Text>WebBadge</Text>,
  };
});

describe('TabTwoScreen (explore)', () => {
  const originalOS = Platform.OS;

  afterEach(() => {
    Platform.OS = originalOS;
  });

  it('renders explore screen sections and collapsible titles', async () => {
    Platform.OS = 'ios';

    await render(<TabTwoScreen />);

    expect(screen.getByText('Explore')).toBeTruthy();
    expect(screen.getByText(/This starter app includes example/)).toBeTruthy();
    expect(screen.getByText('Expo documentation')).toBeTruthy();
    expect(screen.getByText('File-based routing')).toBeTruthy();
    expect(screen.getByText('Android, iOS, and web support')).toBeTruthy();
    expect(screen.getByText('Images')).toBeTruthy();
    expect(screen.getByText('Light and dark mode components')).toBeTruthy();
    expect(screen.getByText('Animations')).toBeTruthy();
    expect(screen.queryByText('WebBadge')).toBeNull();
  });

  it('expands collapsible section when pressed', async () => {
    await render(<TabTwoScreen />);

    await fireEvent.press(screen.getByText('File-based routing'));

    expect(screen.getByText(/This app has two screens:/)).toBeTruthy();
  });

  it('renders WebBadge when Platform.OS is web', async () => {
    Platform.OS = 'web';

    await render(<TabTwoScreen />);

    expect(screen.getByText('WebBadge')).toBeTruthy();
  });
});
