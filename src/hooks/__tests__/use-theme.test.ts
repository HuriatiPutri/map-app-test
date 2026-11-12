import * as ReactNative from 'react-native';
import { renderHook } from '@testing-library/react-native';

import { Colors } from '@/constants/theme';
import { useTheme } from '../use-theme';

describe('useTheme', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('returns Colors.light when color scheme is light', async () => {
    jest.spyOn(ReactNative, 'useColorScheme').mockReturnValue('light');

    const { result } = await renderHook(() => useTheme());

    expect(result.current).toEqual(Colors.light);
  });

  it('returns Colors.dark when color scheme is dark', async () => {
    jest.spyOn(ReactNative, 'useColorScheme').mockReturnValue('dark');

    const { result } = await renderHook(() => useTheme());

    expect(result.current).toEqual(Colors.dark);
  });

  it('defaults to Colors.light when color scheme is null/unspecified', async () => {
    jest.spyOn(ReactNative, 'useColorScheme').mockReturnValue(null);

    const { result } = await renderHook(() => useTheme());

    expect(result.current).toEqual(Colors.light);
  });
});

