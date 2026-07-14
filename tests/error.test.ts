import { describe, expect, it } from 'vitest';
import is from '../src';

describe('is.error', () => {
  describe('true test cases', () => {
    it('should return true for an Error', () => {
      expect(is.error(new Error('boom'))).toBe(true);
    });

    it('should return true for a TypeError', () => {
      expect(is.error(new TypeError('bad type'))).toBe(true);
    });

    it('should return true for a RangeError', () => {
      expect(is.error(new RangeError('out of range'))).toBe(true);
    });

    it('should return true for a custom Error subclass', () => {
      class AppError extends Error {}

      expect(is.error(new AppError('custom'))).toBe(true);
    });

    it('should return true for an AggregateError', () => {
      expect(is.error(new AggregateError([], 'all failed'))).toBe(true);
    });
  });

  describe('false test cases', () => {
    it('should return false for a string', () => {
      expect(is.error('boom')).toBe(false);
    });

    it('should return false for an object with a message property', () => {
      expect(is.error({ message: 'boom' })).toBe(false);
    });

    it('should return false for a null', () => {
      expect(is.error(null)).toBe(false);
    });

    it('should return false for an undefined', () => {
      expect(is.error(undefined)).toBe(false);
    });

    it('should return false for an array', () => {
      expect(is.error([])).toBe(false);
    });
  });
});

describe('is.error.message', () => {
  it('should return the message of an Error', () => {
    expect(is.error.message(new Error('boom'))).toBe('boom');
  });

  it('should return the message of an Error subclass', () => {
    expect(is.error.message(new TypeError('bad type'))).toBe('bad type');
  });

  it('should stringify a non-Error throw', () => {
    expect(is.error.message('a string throw')).toBe('a string throw');
  });

  it('should stringify a number throw', () => {
    expect(is.error.message(42)).toBe('42');
  });

  it('should return the fallback for a null', () => {
    expect(is.error.message(null, 'unknown')).toBe('unknown');
  });

  it('should return the fallback for an undefined', () => {
    expect(is.error.message(undefined, 'unknown')).toBe('unknown');
  });

  it('should return an empty string as the default fallback', () => {
    expect(is.error.message(null)).toBe('');
  });

  it('should return the fallback for a value that cannot be stringified', () => {
    expect(is.error.message(Object.create(null), 'unknown')).toBe('unknown');
  });

  it('should return the fallback for a value whose toString throws', () => {
    const hostile = {
      toString() {
        throw new Error('hostile');
      },
    };

    expect(is.error.message(hostile, 'unknown')).toBe('unknown');
  });

  it('should return the fallback for an Error whose message is not a string', () => {
    const weird = new Error('boom');
    Object.defineProperty(weird, 'message', { value: 42 });

    expect(is.error.message(weird, 'unknown')).toBe('unknown');
  });

  it('should return an empty string for an Error with no message', () => {
    expect(is.error.message(new Error())).toBe('');
  });
});
