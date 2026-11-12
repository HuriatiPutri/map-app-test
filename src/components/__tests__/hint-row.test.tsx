import React from 'react';
import { render, screen } from '@testing-library/react-native';

import { HintRow } from '../hint-row';

describe('HintRow', () => {
  it('renders with default title and hint', async () => {
    await render(<HintRow />);

    expect(screen.getByText('Try editing')).toBeTruthy();
    expect(screen.getByText('app/index.tsx')).toBeTruthy();
  });

  it('renders with custom title and hint', async () => {
    await render(<HintRow title="Custom Title" hint="Custom Hint" />);

    expect(screen.getByText('Custom Title')).toBeTruthy();
    expect(screen.getByText('Custom Hint')).toBeTruthy();
  });
});

