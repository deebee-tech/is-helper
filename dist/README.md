# is-helper

Zero-dependency type-checking utilities for JavaScript and TypeScript. Every check works with `unknown` values and returns proper type guards where possible.

## Install

```bash
npm install @deebeetech/is-helper
```

## Usage

```typescript
import is from "@deebeetech/is-helper";
```

### Null, Undefined, and Friends

```typescript
is.null(null);        // true
is.null(undefined);   // false

is.undefined(undefined); // true
is.undefined(null);      // false

is.nil(null);       // true  — null OR undefined
is.nil(undefined);  // true
is.nil(0);          // false

is.defined(0);         // true  — anything that isn't null/undefined
is.defined(null);      // false

is.blank(null);        // true  — null, undefined, empty string, or whitespace
is.blank("");          // true
is.blank("   ");       // true
is.blank("hello");     // false
```

### Strings

```typescript
is.string("hello");    // true
is.string(42);         // false

is.string.empty("");       // true
is.string.empty("hi");     // false

is.string.whitespace("   ");   // true  — non-empty, all whitespace
is.string.whitespace("");      // false

is.string.blank("");       // true  — empty OR whitespace-only
is.string.blank("   ");   // true
is.string.blank("hi");    // false
```

### Numbers

Numeric strings like `"42"` and `"3.14"` are treated as numbers too (up to two decimal places).

```typescript
is.number(42);       // true
is.number("3.14");   // true
is.number("");       // false
is.number(null);     // false

is.number.positive(5);    // true
is.number.positive(-1);   // false
is.number.positive("10"); // true

is.number.integer(7);      // true
is.number.integer(3.5);    // false

is.number.positiveInteger(3);    // true
is.number.positiveInteger(-2);   // false
is.number.positiveInteger(1.5);  // false
```

### Booleans

Goes beyond `typeof` — recognizes `"true"`, `"false"`, `"y"`, `"n"`, `"yes"`, `"no"`, `"1"`, `"0"`, and the numbers `1` and `0`.

```typescript
is.boolean(true);     // true
is.boolean("yes");    // true
is.boolean("n");      // true
is.boolean(1);        // true
is.boolean("maybe");  // false
```

Use `is.boolean.value()` to extract the actual boolean:

```typescript
is.boolean.value("yes");   // true
is.boolean.value("n");     // false
is.boolean.value(0);       // false
is.boolean.value("true");  // true
```

### Arrays

Covers regular arrays and all typed arrays (`Float64Array`, `Uint8Array`, etc.).

```typescript
is.array([1, 2, 3]);            // true
is.array(new Uint8Array(4));     // true
is.array("not an array");       // false

is.array.empty([]);              // true
is.array.empty([1]);             // false

is.array.nonEmpty([1, 2]);       // true
is.array.nonEmpty([]);           // false
```

### Objects

Only plain `{}` objects — arrays, `null`, and functions don't count.

```typescript
is.object({ a: 1 });     // true
is.object([1, 2]);        // false
is.object(null);          // false

is.object.empty({});          // true
is.object.empty({ a: 1 });   // false

is.object.plain({});                        // true
is.object.plain(Object.create(null));       // true
is.object.plain(new (class Foo {}));        // false
```

### Functions

```typescript
is.fn(() => {});          // true
is.fn(console.log);       // true
is.fn("not a function");  // false
```

### Dates

```typescript
is.date(new Date());     // true
is.date("2024-01-01");   // false
```

### IPv4

```typescript
is.ipv4("192.168.1.1");     // true
is.ipv4("999.999.999.999"); // false
is.ipv4("not an ip");       // false
```

### Combinators

`is.any()` and `is.every()` let you compose checks into reusable validators.

```typescript
const isStringOrNumber = is.any(is.string, is.number);
isStringOrNumber("hello");  // true
isStringOrNumber(42);       // true
isStringOrNumber(null);     // false

const isPositiveInt = is.every(is.number.positive, is.number.integer);
isPositiveInt(5);     // true
isPositiveInt(-3);    // false
isPositiveInt(2.5);   // false
```

## TypeScript

Most checks double as type guards, so the compiler narrows types automatically:

```typescript
function greet(name: unknown) {
   if (is.string(name)) {
      console.log(name.toUpperCase()); // name is narrowed to string
   }
}
```

## License

MIT
