# Is Helper

This is a collection of static helpers that encapsulate basic "determining"
functions that are run all the time in JavaScript. Some of these have at one
point or another been in the Node engine itself but have moved in and out
depending on versioning.

For example...this is quite common:

```typescript
if (value === undefined or value === null)
```

The is-helper provides the functionality:

```typescript
import IsHelper from "@deebeetech/is-helper"

if (IsHelper.isNullOrUndefined(value))
```

The is-helper also adds functionality to certain things like:

```typescript
import IsHelper from "@deebeetech/is-helper"

if (IsHelper.isBoolean(value))
```

This will not only check if the value is boolean, but will also check if the
value is a number equal to 0 for false or 1 for true. It will also check if the
value is a string and equal to anything that would be considered "truthy"
("Y/N", "true/false", etc.)

For a full list of functions, see the [jsr.io documentation](https://jsr.io/@wdeebeetech/is-helper/doc/~/IsHelper)
