import React from 'react';
import { Text } from 'react-native';
import { fireEvent, render, screen } from '@testing-library/react-native';

import { Collapsible } from '../collapsible';

jest.mock('expo-symbols', () => {
  const { View } = require('react-native');
  return {
    SymbolView: () => <View testID="symbol-view" />,
  };
});

describe('Collapsible', () => {
  it('renders title and keeps content hidden initially', async () => {
    await render(
      <Collapsible title="Section Title">
        <Text>Hidden Content</Text>
      </Collapsible>
    );

    expect(screen.getByText('Section Title')).toBeTruthy();
    expect(screen.queryByText('Hidden Content')).toBeNull();
  });

  it('toggles content visibility when title is pressed', async () => {
    await render(
      <Collapsible title="Section Title">
        <Text>Toggle Content</Text>
      </Collapsible>
    );

    await fireEvent.press(screen.getByText('Section Title'));
    expect(screen.getByText('Toggle Content')).toBeTruthy();

    await fireEvent.press(screen.getByText('Section Title'));
    expect(screen.queryByText('Toggle Content')).toBeNull();
  });
});

