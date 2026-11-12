import React from 'react';
import { render, screen } from '@testing-library/react-native';

import { ThemedText } from '../themed-text';

describe('ThemedText', () => {
  it('renders text correctly', async () => {
    await render(<ThemedText>Hello Map Lite</ThemedText>);

    expect(screen.getByText('Hello Map Lite')).toBeTruthy();
  });
});
