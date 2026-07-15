# is-helper

<p>
  <a href="https://www.npmjs.com/package/@deebeetech/is-helper"><img alt="npm" src="https://img.shields.io/npm/v/@deebeetech/is-helper?color=cb3837&logo=npm"></a>
  <a href="https://jsr.io/@deebeetech/is-helper"><img alt="JSR" src="https://jsr.io/badges/@deebeetech/is-helper"></a>
  <a href="./LICENSE"><img alt="license" src="https://img.shields.io/npm/l/@deebeetech/is-helper?color=blue"></a>
</p>

Zero-dependency type-checking utilities for JavaScript and TypeScript.

Every check accepts an `unknown` value, **never throws**, and returns a real type guard wherever the
true branch has a TypeScript type to narrow to. Checks for built-in types brand-check the internal
slot rather than sniffing `Object.prototype.toString`, so they see through `Symbol.toStringTag`
spoofing and still recognize values that crossed a realm boundary (a worker, a `vm` context, an
iframe) — both of which defeat the usual `instanceof` and tag-string approaches.

Part of the [DeeBee](https://github.com/deebee-tech) ecosystem.

## Install

```bash
npm install @deebeetech/is-helper
```

```bash
deno add jsr:@deebeetech/is-helper
```

## Usage

```typescript
import is from '@deebeetech/is-helper';
```

### Null, undefined, and friends

```typescript
is.null(null); // true
is.undefined(undefined); // true

is.nil(null); // true  — null OR undefined
is.nil(undefined); // true
is.nil(0); // false

is.defined(0); // true  — narrows T to NonNullable<T>
is.defined(null); // false

is.nothing(null); // true  — null, undefined, empty string, or whitespace
is.nothing('   '); // true
is.nothing([]); // false — an empty array is not "nothing"; see is.empty
```

### `is.empty` — emptiness across every container

```typescript
is.empty(null); // true
is.empty('   '); // true  — blank strings count
is.empty([]); // true
is.empty({}); // true
is.empty(new Map()); // true
is.empty(new Set()); // true
is.empty(new Uint8Array(0)); // true

is.empty(0); // false — 0 is a value
is.empty(false); // false — so is false
is.empty(new Date()); // false — a Date is not an empty object
```

### Strings

```typescript
is.string('hello'); // true
is.string(42); // false

is.string.empty(''); // true
is.string.whitespace('   '); // true  — non-empty, all whitespace
is.string.blank('   '); // true  — empty OR whitespace-only
```

### Numbers

`is.number` is strictly `typeof`-based. For numeric **strings**, reach for `is.numeric`.

```typescript
is.number(42); // true
is.number('42'); // false — a string is not a number
is.number(NaN); // true  — NaN really is a number

is.number.finite(NaN); // false — excludes NaN and ±Infinity
is.number.nan('abc'); // false — does not coerce, unlike the global isNaN

is.number.positive(5); // true
is.number.negative(-1); // true
is.number.nonNegative(0); // true
is.number.integer(7); // true
is.number.positiveInteger(3); // true
is.number.safeInteger(2 ** 53); // false — beyond MAX_SAFE_INTEGER
```

`safeInteger` is the one to reach for wherever JavaScript numbers meet 64-bit database integer
columns.

### Numeric values

`is.numeric` is the coercive counterpart — a finite number, or a string that parses to one.

```typescript
is.numeric(42); // true
is.numeric('3.14159'); // true
is.numeric('1e-7'); // true
is.numeric('0x10'); // false — no hex
is.numeric(' 42 '); // false — no padding
is.numeric(''); // false

is.numeric.parse('3.14'); // 3.14
is.numeric.parse('abc'); // undefined — never NaN
```

`is.numeric` is deliberately **not** a type guard: a `string` may or may not be numeric, so narrowing
the false branch would be unsound. Use `is.numeric.parse` when you want a typed `number` out.

### Booleans

`is.boolean` is strictly `typeof`-based. For boolean-like strings and numbers use `.like`, and use
`.value` to extract the meaning.

```typescript
is.boolean(true); // true
is.boolean('yes'); // false — a string is not a boolean

is.boolean.like('yes'); // true  — 'true'/'false'/'y'/'n'/'yes'/'no'/'1'/'0'/1/0
is.boolean.like('maybe'); // false

is.boolean.value('yes'); // true
is.boolean.value('no'); // false
is.boolean.value('0'); // false
```

### Arrays

`is.array` is `Array.isArray` — a typed array is **not** an array (it has no `.push`, and its
`.filter` hands back another typed array). They live under `is.typedArray`.

```typescript
is.array([1, 2, 3]); // true
is.array(new Uint8Array(4)); // false — see is.typedArray

is.array.empty([]); // true
is.array.nonEmpty([1, 2]); // true — narrows to [T, ...T[]], so [0] is safe

is.array.of(is.string)(['a', 'b']); // true
is.array.of(is.string)(['a', 1]); // false

is.typedArray(new Uint8Array(4)); // true
is.typedArray(new DataView(buffer)); // false
```

### Objects

```typescript
is.object({ a: 1 }); // true — narrows to Record<string, unknown>
is.object([1, 2]); // false
is.object(new Map()); // false — Map has its own check

is.object.empty({}); // true
is.object.plain(Object.create(null)); // true
is.object.plain(new (class Foo {})()); // false — a class instance is not plain

is.object.of(is.number)({ a: 1, b: 2 }); // true
```

`is.objectLike` is the broad counterpart — any non-null `typeof === 'object'` value, **arrays and
built-ins included**. It is exactly the classic `value !== null && typeof value === 'object'` guard,
and it narrows to `Record<string, unknown>` so the `as` cast that guard always needed goes away:

```typescript
is.objectLike({ a: 1 }); // true
is.objectLike([1, 2, 3]); // true  — unlike is.object
is.objectLike(new Date()); // true  — unlike is.object
is.objectLike(null); // false
is.objectLike(() => {}); // false — a function is not typeof 'object'

const parsed: unknown = JSON.parse(input);
if (is.objectLike(parsed)) {
  for (const [k, v] of Object.entries(parsed)) {
    /* parsed is Record<string, unknown>, no cast */
  }
}
```

### Dates

```typescript
is.date(new Date()); // true
is.date(new Date('garbage')); // true  — an Invalid Date is still a Date

is.date.valid(new Date('garbage')); // false — this is the one you usually want
is.date.invalid(new Date('garbage')); // true
is.date.invalid('not a date'); // false — NOT the same as !valid
```

An Invalid Date's every getter returns `NaN` and its `toISOString()` throws, so `is.date.valid` is
almost always the check you actually mean.

### Errors

```typescript
is.error(new TypeError('bad')); // true — any subclass, cross-realm safe

is.error.message(new Error('boom')); // 'boom'
is.error.message('a string throw'); // 'a string throw'
is.error.message(null, 'unknown'); // 'unknown'
```

`is.error.message` never throws, which makes it safe to point at whatever a `catch` block hands you:

```typescript
try {
  await risky();
} catch (err) {
  logger.error(is.error.message(err, 'unknown failure'));
}
```

### Maps and sets

```typescript
is.map(new Map()); // true
is.map.empty(new Map()); // true
is.map.nonEmpty(new Map([['a', 1]])); // true

is.set(new Set()); // true
is.set.empty(new Set()); // true
is.set.nonEmpty(new Set([1])); // true
```

### Functions, promises, and protocols

```typescript
is.fn(() => {}); // true

is.promise(Promise.resolve()); // true
is.promise({ then() {} }); // false
is.promise.like({ then() {} }); // true  — thenable, which is what `await` cares about

is.iterable([1, 2]); // true
is.iterable('abc'); // true  — strings are iterable, per spec
is.asyncIterable(stream); // true
```

For "a collection, but not a string", compose: `is.all(is.iterable, is.not(is.string))`.

### Primitives

```typescript
is.symbol(Symbol('x')); // true
is.bigint(10n); // true
is.regexp(/x/); // true

is.primitive('a'); // true
is.primitive(10n); // true
is.primitive(null); // true
is.primitive(new Date()); // false
```

### Formats

```typescript
is.ipv4('192.168.1.1'); // true
is.uuid('01912d68-783e-7c3e-9c8e-5a1b2c3d4e5f'); // true — RFC 9562, v1–v8
is.email('sandy@example.com'); // true
```

### Combinators

`is.any`, `is.all`, and `is.not` compose checks into reusable validators — and, unlike most such
helpers, they **preserve narrowing**.

```typescript
const isStringOrNumber = is.any(is.string, is.number);
isStringOrNumber('hello'); // true

const isNonBlankString = is.all(is.string, is.not(is.string.blank));
isNonBlankString('hi'); // true
isNonBlankString('   '); // false
```

```typescript
function label(value: unknown) {
  if (isStringOrNumber(value)) {
    // value is narrowed to string | number — any() yields the UNION of what its guards prove
    return value.toString();
  }
}
```

`is.all` yields the **intersection**. A plain boolean-returning check (`is.ipv4`, `is.string.blank`)
contributes `unknown`, so it constrains at runtime without weakening the guards beside it.

`is.not` **widens** — `is.not(is.string.blank)` is true for `42`, `{}`, and `null`, since those are
all "not a blank string". Pair it with `is.all` to keep the type pinned down, as above.

### Guard factories

```typescript
const isDog = is.instanceOf(Dog);
const isStatus = is.oneOf('draft', 'live', 'archived');

isStatus('draft'); // true — narrows to 'draft' | 'live' | 'archived'
```

`is.instanceOf` is realm-**blind** by nature. For built-in types prefer the named checks
(`is.date`, `is.map`, …), which see across realms.

## TypeScript

Checks double as type guards, so the compiler narrows automatically:

```typescript
function greet(name: unknown) {
  if (is.string(name)) {
    console.log(name.toUpperCase()); // name is narrowed to string
  }
}
```

They also compose with `filter`, narrowing the array's element type:

```typescript
const values: unknown[] = [1, 'a', null, 'b'];
const strings: string[] = values.filter(is.string);
```

## Migrating from v3

v4 fixes four type guards that lied in their true branch — each one returned `true` for a value it
did not actually describe, so `tsc` stopped protecting you precisely because you reached for the
safety tool. The coercive behavior did not disappear; it moved somewhere honest.

| v3                           | v4                                                         |
| ---------------------------- | ---------------------------------------------------------- |
| `is.number('42')`            | `is.numeric('42')`                                         |
| `is.number.positive('10')`   | `const n = is.numeric.parse(x); n !== undefined && n > 0`  |
| `is.boolean('yes')`          | `is.boolean.like('yes')` — `is.boolean.value` is unchanged |
| `is.array(new Uint8Array())` | `is.typedArray(new Uint8Array())`                          |
| `is.array.empty(u8)`         | `is.empty(u8)`                                             |

Also worth knowing:

- **`is.number` used to cap numeric strings at two decimal places.** `is.number('3.14159')` was
  `false`, while `'.'`, `'-'`, and `'1.'` were all `true`. `is.numeric` gets all five right.
- **`is.number.positive(Infinity)` is now `false`.** The sign checks gate on finiteness.
- **`is.nothing` returns a plain `boolean`.** It claimed to narrow to `''`, but it also returns
  `true` for `'   '`, which is not `''`. "Blank string" has no TypeScript type. Use `is.nil` or
  `is.defined` when you need narrowing.
- **`is.nothing` no longer crashes when unbound.** In v3 it reached for `this`, so
  `is.any(is.nothing)`, `arr.filter(is.nothing)`, and `const { nothing } = is` all threw.
- **`is.defined` now narrows** to `NonNullable<T>` instead of returning a bare `boolean`.
- **`is.object` now narrows to `Record<string, unknown>`** instead of `object`, which permitted no
  property access at all.
- **`is.any` and `is.all` now preserve narrowing** instead of collapsing to `boolean`.

## License

MIT
