import React from 'react';
import { render, screen } from '@testing-library/react-native';

import { ThemedText } from '../themed-text';

describe('ThemedText', () => {
  it('renders text with default props', async () => {
    await render(<ThemedText>Hello Map Lite</ThemedText>);

    expect(screen.getByText('Hello Map Lite')).toBeTruthy();
  });

  it('renders text with custom type and themeColor', async () => {
    await render(
      <ThemedText type="title" themeColor="textSecondary">
        Custom Title
      </ThemedText>
    );

    expect(screen.getByText('Custom Title')).toBeTruthy();
  });
});
