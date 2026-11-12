import React from 'react';
import { render, screen } from '@testing-library/react-native';

import { AnimatedIcon, AnimatedSplashOverlay } from '../animated-icon.web';

jest.mock('expo-image', () => {
  const { View } = require('react-native');
  return {
    Image: () => <View testID="expo-image-web" />,
  };
});

jest.mock('react-native-reanimated', () => {
  const { View } = require('react-native');
  return {
    __esModule: true,
    default: {
      View: ({ children, style }: { children?: React.ReactNode; style?: unknown }) => (
        <View style={style as object}>{children}</View>
      ),
    },
    Keyframe: class {
      duration() {
        return {};
      }
    },
    Easing: {
      elastic: () => jest.fn(),
    },
  };
});

describe('AnimatedIcon & AnimatedSplashOverlay (web)', () => {
  it('returns null for AnimatedSplashOverlay on web', async () => {
    const { toJSON } = await render(<AnimatedSplashOverlay />);

    expect(toJSON()).toBeNull();
  });

  it('renders AnimatedIcon on web', async () => {
    await render(<AnimatedIcon />);

    expect(screen.getAllByTestId('expo-image-web')).toHaveLength(2);
  });
});
