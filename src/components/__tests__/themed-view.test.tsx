import React from 'react';
import { Text } from 'react-native';
import { render, screen } from '@testing-library/react-native';

import { ThemedView } from '../themed-view';

describe('ThemedView', () => {
  it('renders children with default background type', async () => {
    await render(
      <ThemedView testID="themed-view">
        <Text>Content</Text>
      </ThemedView>
    );

    expect(screen.getByTestId('themed-view')).toBeTruthy();
    expect(screen.getByText('Content')).toBeTruthy();
  });

  it('renders with custom theme type', async () => {
    await render(
      <ThemedView testID="themed-view-custom" type="backgroundElement">
        <Text>Custom Background</Text>
      </ThemedView>
    );

    expect(screen.getByTestId('themed-view-custom')).toBeTruthy();
    expect(screen.getByText('Custom Background')).toBeTruthy();
  });
});

