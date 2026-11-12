import React from 'react';
import * as ReactNative from 'react-native';
import { render, screen } from '@testing-library/react-native';
import { version } from 'expo/package.json';

import { WebBadge } from '../web-badge';

jest.mock('expo-image', () => {
  const { View } = require('react-native');
  return {
    Image: ({ source }: { source: unknown }) => (
      <View testID="badge-image" accessibilityHint={String(source)} />
    ),
  };
});

describe('WebBadge', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('renders version and light badge image when colorScheme is light', async () => {
    jest.spyOn(ReactNative, 'useColorScheme').mockReturnValue('light');

    await render(<WebBadge />);

    expect(screen.getByText(`v${version}`)).toBeTruthy();
    expect(screen.getByTestId('badge-image')).toBeTruthy();
  });

  it('renders version and dark badge image when colorScheme is dark', async () => {
    jest.spyOn(ReactNative, 'useColorScheme').mockReturnValue('dark');

    await render(<WebBadge />);

    expect(screen.getByText(`v${version}`)).toBeTruthy();
    expect(screen.getByTestId('badge-image')).toBeTruthy();
  });
});

