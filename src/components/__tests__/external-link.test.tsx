import React from 'react';
import { Text } from 'react-native';
import { fireEvent, render, screen } from '@testing-library/react-native';
import { openBrowserAsync, WebBrowserPresentationStyle } from 'expo-web-browser';

import { ExternalLink } from '../external-link';

jest.mock('expo-web-browser', () => ({
  openBrowserAsync: jest.fn(() => Promise.resolve()),
  WebBrowserPresentationStyle: {
    AUTOMATIC: 'automatic',
  },
}));

const mockPreventDefault = jest.fn();

jest.mock('expo-router', () => {
  const { Pressable } = require('react-native');
  return {
    Link: ({
      children,
      onPress,
      href,
      target,
    }: {
      children: React.ReactNode;
      href: string;
      target?: string;
      onPress?: (e: { preventDefault: () => void }) => void;
    }) => (
      <Pressable
        testID="external-link"
        accessibilityLabel={`${href}-${target}`}
        onPress={() => onPress?.({ preventDefault: mockPreventDefault })}>
        {children}
      </Pressable>
    ),
  };
});

describe('ExternalLink', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders link with target="_blank" and opens in-app browser when pressed on native', async () => {
    await render(
      <ExternalLink href="https://docs.expo.dev">
        <Text>Open Docs</Text>
      </ExternalLink>
    );

    expect(screen.getByText('Open Docs')).toBeTruthy();
    expect(screen.getByLabelText('https://docs.expo.dev-_blank')).toBeTruthy();

    await fireEvent.press(screen.getByTestId('external-link'));

    expect(mockPreventDefault).toHaveBeenCalled();
    expect(openBrowserAsync).toHaveBeenCalledWith('https://docs.expo.dev', {
      presentationStyle: WebBrowserPresentationStyle.AUTOMATIC,
    });
  });
});
