import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react-native';
import * as SplashScreen from 'expo-splash-screen';

import { AnimatedIcon, AnimatedSplashOverlay } from '../animated-icon';

jest.mock('expo-splash-screen', () => ({
  hideAsync: jest.fn(() => Promise.resolve()),
}));

jest.mock('expo-image', () => {
  const { View } = require('react-native');
  return {
    Image: () => <View testID="expo-image" />,
  };
});

describe('AnimatedIcon & AnimatedSplashOverlay (native)', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders AnimatedIcon with images', async () => {
    await render(<AnimatedIcon />);

    expect(screen.getAllByTestId('expo-image')).toHaveLength(2);
  });

  it('renders AnimatedSplashOverlay and calls SplashScreen.hideAsync on layout', async () => {
    await render(<AnimatedSplashOverlay />);

    const image = screen.getByTestId('expo-image');
    expect(image).toBeTruthy();

    expect(image.parent).toBeTruthy();
    await fireEvent(image.parent!, 'layout');

    await waitFor(() => {
      expect(SplashScreen.hideAsync).toHaveBeenCalled();
    });
  });
});
