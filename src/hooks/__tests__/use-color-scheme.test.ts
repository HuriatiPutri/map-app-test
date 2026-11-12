import * as ReactNative from 'react-native';
import { renderHook } from '@testing-library/react-native';

import { useColorScheme } from '../use-color-scheme';

describe('useColorScheme (native)', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('re-exports useColorScheme from react-native and returns current scheme', async () => {
    jest.spyOn(ReactNative, 'useColorScheme').mockReturnValue('dark');

    const { result } = await renderHook(() => useColorScheme());

    expect(result.current).toBe('dark');
  });
});

