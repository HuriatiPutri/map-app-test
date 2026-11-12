import React from 'react';
import * as ReactNative from 'react-native';
import { renderHook } from '@testing-library/react-native';

import { useColorScheme } from '../use-color-scheme.web';

describe('useColorScheme (web)', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('returns the react-native colorScheme after hydration', async () => {
    jest.spyOn(ReactNative, 'useColorScheme').mockReturnValue('dark');

    const { result } = await renderHook(() => useColorScheme());

    expect(result.current).toBe('dark');
  });

  it('returns "light" before hydration completes', async () => {
    jest.spyOn(ReactNative, 'useColorScheme').mockReturnValue('dark');
    jest.spyOn(React, 'useEffect').mockImplementation(() => {});

    const { result } = await renderHook(() => useColorScheme());

    expect(result.current).toBe('light');
  });
});

