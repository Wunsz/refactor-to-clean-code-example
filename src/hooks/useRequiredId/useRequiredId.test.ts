import { renderHook } from '@testing-library/react';

import useRequiredId from './useRequiredId';

describe('hooks / useRequiredId', () => {
  it('should use generated ID if no ID was passed in', () => {
    const { result } = renderHook(() => useRequiredId());

    expect(result.current).not.toBeNull();
    expect(result.current).not.toBeUndefined();
  });

  it('should use generated ID if undefined was passed as ID', () => {
    const { result } = renderHook(() => useRequiredId(undefined));

    expect(result.current).not.toBeNull();
    expect(result.current).not.toBeUndefined();
  });

  it('should use passed ID if it is a string', () => {
    const { result } = renderHook(() => useRequiredId('someId'));

    expect(result.current).toBe('someId');
  });
});
