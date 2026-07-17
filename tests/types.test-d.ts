import { expectTypeOf } from 'vitest';
import is from '../src';
import type { AnyFn, CheckFn, Guard, Guarded, GuardedAll, Is, Primitive, TypedArray } from '../src';

expectTypeOf(is).toMatchTypeOf<Is>();

const maybe: unknown = 'x';

if (is.string(maybe)) {
  expectTypeOf(maybe).toEqualTypeOf<string>();
}

if (is.number(maybe)) {
  expectTypeOf(maybe).toEqualTypeOf<number>();
}

if (is.number.positive(maybe)) {
  expectTypeOf(maybe).toEqualTypeOf<number>();
}

if (is.boolean(maybe)) {
  expectTypeOf(maybe).toEqualTypeOf<boolean>();
}

if (is.null(maybe)) {
  expectTypeOf(maybe).toEqualTypeOf<null>();
}

if (is.undefined(maybe)) {
  expectTypeOf(maybe).toEqualTypeOf<undefined>();
}

if (is.nil(maybe)) {
  expectTypeOf(maybe).toEqualTypeOf<null | undefined>();
}

const definedValue: string | null | undefined = 'x';

if (is.defined(definedValue)) {
  expectTypeOf(definedValue).toEqualTypeOf<string>();
}

const values: unknown[] = [];

if (is.array(values)) {
  expectTypeOf(values).toEqualTypeOf<unknown[]>();
}

if (is.array.nonEmpty(values)) {
  expectTypeOf(values).toEqualTypeOf<[unknown, ...unknown[]]>();
  expectTypeOf(values[0]).toEqualTypeOf<unknown>();
}

if (is.string.nonEmpty(maybe)) {
  expectTypeOf(maybe).toEqualTypeOf<string>();
}

if (is.object(maybe)) {
  expectTypeOf(maybe).toEqualTypeOf<Record<string, unknown>>();
}

if (is.object.plain(maybe)) {
  expectTypeOf(maybe).toEqualTypeOf<Record<string | number | symbol, unknown>>();
}

if (is.object.nonEmpty(maybe)) {
  expectTypeOf(maybe).toEqualTypeOf<Record<string, unknown>>();
}

if (is.map(maybe)) {
  expectTypeOf(maybe).toEqualTypeOf<Map<unknown, unknown>>();
}

if (is.map.empty(maybe)) {
  expectTypeOf(maybe).toEqualTypeOf<Map<unknown, unknown>>();
}

if (is.map.nonEmpty(maybe)) {
  expectTypeOf(maybe).toEqualTypeOf<Map<unknown, unknown>>();
}

if (is.set.empty(maybe)) {
  expectTypeOf(maybe).toEqualTypeOf<Set<unknown>>();
}

if (is.date(maybe)) {
  expectTypeOf(maybe).toEqualTypeOf<Date>();
}

if (is.error(maybe)) {
  expectTypeOf(maybe).toEqualTypeOf<Error>();
}

if (is.promise(maybe)) {
  expectTypeOf(maybe).toEqualTypeOf<Promise<unknown>>();
}

if (is.regexp(maybe)) {
  expectTypeOf(maybe).toEqualTypeOf<RegExp>();
}

if (is.symbol(maybe)) {
  expectTypeOf(maybe).toEqualTypeOf<symbol>();
}

if (is.bigint(maybe)) {
  expectTypeOf(maybe).toEqualTypeOf<bigint>();
}

if (is.primitive(maybe)) {
  expectTypeOf(maybe).toEqualTypeOf<Primitive>();
}

if (is.iterable(maybe)) {
  expectTypeOf(maybe).toEqualTypeOf<Iterable<unknown>>();
}

if (is.asyncIterable(maybe)) {
  expectTypeOf(maybe).toEqualTypeOf<AsyncIterable<unknown>>();
}

if (is.typedArray(maybe)) {
  expectTypeOf(maybe).toEqualTypeOf<TypedArray>();
}

if (is.arrayBuffer(maybe)) {
  expectTypeOf(maybe).toEqualTypeOf<ArrayBuffer>();
}

if (is.dataView(maybe)) {
  expectTypeOf(maybe).toEqualTypeOf<DataView>();
}

if (is.weakMap(maybe)) {
  expectTypeOf(maybe).toEqualTypeOf<WeakMap<object, unknown>>();
}

if (is.weakSet(maybe)) {
  expectTypeOf(maybe).toEqualTypeOf<WeakSet<object>>();
}

const stringOrNumber = is.any(is.string, is.number);

if (stringOrNumber(maybe)) {
  expectTypeOf(maybe).toEqualTypeOf<string | number>();
}

const nonBlank = is.all(is.string, is.not(is.string.blank));

if (nonBlank(maybe)) {
  expectTypeOf(maybe).toEqualTypeOf<string>();
}

class Dog {
  bark = true;
}

const isDog = is.instanceOf(Dog);

if (isDog(maybe)) {
  expectTypeOf(maybe).toEqualTypeOf<Dog>();
}

const isStatus = is.oneOf('draft', 'live');

if (isStatus(maybe)) {
  expectTypeOf(maybe).toEqualTypeOf<'draft' | 'live'>();
}

expectTypeOf(is.assert(maybe, is.string)).toEqualTypeOf<string>();

const maybeFn: unknown = () => 1;

if (is.fn(maybeFn)) {
  expectTypeOf(maybeFn).toEqualTypeOf<AnyFn>();
}

expectTypeOf<Float16Array>().toExtend<TypedArray>();
expectTypeOf<string>().toExtend<Primitive>();
expectTypeOf<Guarded<typeof is.string>>().toEqualTypeOf<string>();
expectTypeOf<Guarded<CheckFn>>().toEqualTypeOf<unknown>();
expectTypeOf<GuardedAll<[typeof is.string]>>().toEqualTypeOf<string>();
expectTypeOf<Guard<string>>().toEqualTypeOf<(value: unknown) => value is string>();

// @ts-expect-error — is.string must not claim to narrow to number
const _badGuard: (value: unknown) => value is number = is.string;
void _badGuard;
