//#region src/index.ts
/**
* @module
*
* Zero-dependency type-checking utilities for JavaScript and TypeScript.
* Every check accepts an `unknown` value, never throws, and returns a proper
* type guard wherever the true branch has a TypeScript type to narrow to.
*
* @example
* ```ts
* import is from '@deebeetech/is-helper';
*
* is.string('hello'); // true
* is.number(42);      // true
* is.nil(null);       // true
* ```
*/
/**
* Every reflection primitive below is wrapped, because every one of them throws on a revoked Proxy,
* and the trapping ones additionally throw on a Proxy with a hostile handler. A value arriving at a
* type check is by definition untrusted; a check that throws instead of answering is a check that
* moved the crash rather than preventing it. These are the library's floor: `never throws` is a
* promise the module doc makes, so it is kept here once rather than at forty call sites.
*/
const objectTag = (value) => {
	try {
		return Object.prototype.toString.call(value);
	} catch {
		return "";
	}
};
const isArraySafe = (value) => {
	try {
		return Array.isArray(value);
	} catch {
		return false;
	}
};
/** The count of own enumerable keys, or `undefined` if the value refuses to be inspected. */
const ownKeyCount = (value) => {
	try {
		return Object.keys(value).length;
	} catch {
		return;
	}
};
/**
* `Object.prototype.toString` is not a brand check — `{ [Symbol.toStringTag]: 'Date' }` tags as
* `[object Date]`. These pristine accessors, captured at module load, are. Invoking one against a
* value succeeds only if the value carries the matching internal slot, which is realm-independent
* (so values from a vm, worker, or iframe pass) and unforgeable (so tag spoofs fail).
*/
const dateGetTime = Date.prototype.getTime;
const regExpSource = Object.getOwnPropertyDescriptor(RegExp.prototype, "source")?.get;
const mapSize = Object.getOwnPropertyDescriptor(Map.prototype, "size")?.get;
const setSize = Object.getOwnPropertyDescriptor(Set.prototype, "size")?.get;
const typedArrayTag = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(Int8Array.prototype), Symbol.toStringTag)?.get;
const hasBrand = (getter, value) => {
	if (typeof getter !== "function") return false;
	try {
		getter.call(value);
		return true;
	} catch {
		return false;
	}
};
const brandedSize = (getter, value) => {
	if (typeof getter !== "function") return void 0;
	try {
		return getter.call(value);
	} catch {
		return;
	}
};
/**
* Hoisted to module scope so `nothing` and `empty` never reach for `this`. An unbound `is.nothing`
* passed to `is.any` — or destructured, or handed to `Array.prototype.filter` — would otherwise
* throw in strict-mode ESM.
*/
const isNil = (value) => value === null || value === void 0;
function buildIsArray() {
	const check = (value) => isArraySafe(value);
	check.empty = (value) => check(value) && value.length === 0;
	check.nonEmpty = ((value) => check(value) && value.length > 0);
	check.of = ((itemCheck) => (value) => {
		if (!check(value)) return false;
		for (let i = 0; i < value.length; i++) if (!itemCheck(value[i])) return false;
		return true;
	});
	return check;
}
function buildIsString() {
	const check = (value) => typeof value === "string";
	check.empty = (value) => check(value) && value.length === 0;
	check.whitespace = (value) => check(value) && value.length > 0 && !/\S/.test(value);
	check.blank = (value) => check.empty(value) || check.whitespace(value);
	return check;
}
function buildIsNumber() {
	const check = (value) => typeof value === "number";
	check.finite = (value) => typeof value === "number" && Number.isFinite(value);
	check.nan = (value) => typeof value === "number" && Number.isNaN(value);
	check.positive = (value) => check.finite(value) && value > 0;
	check.negative = (value) => check.finite(value) && value < 0;
	check.nonNegative = (value) => check.finite(value) && value >= 0;
	check.integer = (value) => Number.isInteger(value);
	check.positiveInteger = (value) => check.integer(value) && value > 0;
	check.safeInteger = (value) => Number.isSafeInteger(value);
	return check;
}
/**
* Shape validation only. `Number.isFinite` still does the magnitude check afterwards: `'1e999'`
* matches this pattern but overflows to `Infinity`.
*/
const NUMERIC_STRING = /^[+-]?(?:\d+\.?\d*|\.\d+)(?:[eE][+-]?\d+)?$/;
function buildIsNumeric() {
	const check = (value) => {
		if (typeof value === "number") return Number.isFinite(value);
		if (typeof value !== "string") return false;
		if (!NUMERIC_STRING.test(value)) return false;
		return Number.isFinite(Number(value));
	};
	check.parse = (value) => check(value) ? Number(value) : void 0;
	return check;
}
function buildIsBoolean() {
	const check = (value) => typeof value === "boolean";
	check.like = (value) => {
		if (typeof value === "boolean") return true;
		if (typeof value === "string") {
			const lower = value.toLowerCase();
			return lower === "true" || lower === "false" || lower === "y" || lower === "n" || lower === "yes" || lower === "no" || value === "1" || value === "0";
		}
		return value === 1 || value === 0;
	};
	check.value = (value) => {
		if (!check.like(value)) return false;
		if (typeof value === "boolean") return value;
		if (typeof value === "string") {
			const lower = value.toLowerCase();
			return lower === "true" || lower === "y" || lower === "yes" || lower === "1";
		}
		return value === 1;
	};
	return check;
}
function buildIsObject() {
	const check = (value) => value !== null && typeof value === "object" && objectTag(value) === "[object Object]";
	check.empty = (value) => check(value) && ownKeyCount(value) === 0;
	check.plain = (value) => {
		if (!check(value)) return false;
		try {
			const prototype = Object.getPrototypeOf(value);
			return prototype === null || prototype === Object.prototype;
		} catch {
			return false;
		}
	};
	check.of = ((valueCheck) => (value) => {
		if (!check(value)) return false;
		try {
			for (const key of Object.keys(value)) if (!valueCheck(value[key])) return false;
		} catch {
			return false;
		}
		return true;
	});
	return check;
}
function buildIsDate() {
	const check = (value) => hasBrand(dateGetTime, value);
	check.valid = (value) => check(value) && !Number.isNaN(dateGetTime.call(value));
	check.invalid = (value) => check(value) && Number.isNaN(dateGetTime.call(value));
	return check;
}
function buildIsError() {
	/**
	* `instanceof` first: it is the fast path, and it catches `DOMException` (which inherits from
	* Error but carries its own tag). The tag check then catches cross-realm errors, which
	* `instanceof` misses. The two miss disjoint sets, so the union is correct.
	*/
	const check = (value) => {
		try {
			if (value instanceof Error) return true;
		} catch {
			return false;
		}
		if (objectTag(value) !== "[object Error]") return false;
		try {
			return !(Symbol.toStringTag in value);
		} catch {
			return false;
		}
	};
	check.message = (value, fallback = "") => {
		if (isNil(value)) return fallback;
		try {
			if (check(value)) {
				const message = value.message;
				return typeof message === "string" ? message : fallback;
			}
			return String(value);
		} catch {
			return fallback;
		}
	};
	return check;
}
function buildIsMap() {
	const check = (value) => brandedSize(mapSize, value) !== void 0;
	check.empty = (value) => brandedSize(mapSize, value) === 0;
	check.nonEmpty = (value) => {
		const size = brandedSize(mapSize, value);
		return size !== void 0 && size > 0;
	};
	return check;
}
function buildIsSet() {
	const check = (value) => brandedSize(setSize, value) !== void 0;
	check.empty = (value) => brandedSize(setSize, value) === 0;
	check.nonEmpty = (value) => {
		const size = brandedSize(setSize, value);
		return size !== void 0 && size > 0;
	};
	return check;
}
function buildIsPromise() {
	const objectLike = (value) => value !== null && (typeof value === "object" || typeof value === "function");
	const hasThen = (value) => {
		try {
			return typeof value.then === "function";
		} catch {
			return false;
		}
	};
	const check = (value) => objectLike(value) && objectTag(value) === "[object Promise]" && hasThen(value);
	check.like = (value) => objectLike(value) && hasThen(value);
	return check;
}
const isArray = buildIsArray();
const isString = buildIsString();
const isNumber = buildIsNumber();
const isNumeric = buildIsNumeric();
const isBoolean = buildIsBoolean();
const isObject = buildIsObject();
const isDate = buildIsDate();
const isError = buildIsError();
const isMap = buildIsMap();
const isSet = buildIsSet();
const isPromise = buildIsPromise();
const isTypedArray = (value) => typedArrayTag !== void 0 && typedArrayTag.call(value) !== void 0;
const IPV4 = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const EMAIL = /^[^\s@]+@[^\s@.]+(?:\.[^\s@.]+)+$/;
/**
* A collection of "is"-style type-checking helpers.
*
* Each method accepts an `unknown` value and returns a boolean, or a type guard where the true
* branch has a type to narrow to. Sub-namespaces like `is.string`, `is.number`, and `is.array`
* provide additional specialized checks.
*
* @example
* ```ts
* import is from '@deebeetech/is-helper';
*
* is.string('hello');         // true
* is.number.positive(5);      // true
* is.array.nonEmpty([1, 2]);  // true
* is.boolean.like('yes');     // true
* ```
*/
const is = {
	null: (value) => value === null,
	undefined: (value) => value === void 0,
	nil: isNil,
	defined(value) {
		return value !== null && value !== void 0;
	},
	nothing(value) {
		return isNil(value) || isString.blank(value);
	},
	empty(value) {
		if (isNil(value)) return true;
		if (isString(value)) return isString.blank(value);
		if (isArray(value)) return value.length === 0;
		if (isTypedArray(value)) return value.length === 0;
		if (isMap(value) || isSet(value)) return value.size === 0;
		if (isObject(value)) return ownKeyCount(value) === 0;
		return false;
	},
	array: isArray,
	typedArray: isTypedArray,
	string: isString,
	number: isNumber,
	numeric: isNumeric,
	boolean: isBoolean,
	object: isObject,
	date: isDate,
	error: isError,
	map: isMap,
	set: isSet,
	promise: isPromise,
	fn: (value) => typeof value === "function",
	regexp: (value) => objectTag(value) === "[object RegExp]" && hasBrand(regExpSource, value),
	symbol: (value) => typeof value === "symbol",
	bigint: (value) => typeof value === "bigint",
	primitive(value) {
		return value === null || value === void 0 || typeof value !== "object" && typeof value !== "function" && typeof value !== "undefined";
	},
	iterable(value) {
		if (isNil(value)) return false;
		try {
			return typeof value[Symbol.iterator] === "function";
		} catch {
			return false;
		}
	},
	asyncIterable(value) {
		if (isNil(value)) return false;
		try {
			return typeof value[Symbol.asyncIterator] === "function";
		} catch {
			return false;
		}
	},
	ipv4(value) {
		if (typeof value !== "string") return false;
		return IPV4.test(value);
	},
	uuid(value) {
		if (typeof value !== "string") return false;
		return UUID.test(value);
	},
	email(value) {
		if (typeof value !== "string") return false;
		return EMAIL.test(value);
	},
	instanceOf(ctor) {
		if (typeof ctor !== "function") throw new TypeError("is.instanceOf() expects a constructor");
		return (value) => {
			try {
				return value instanceof ctor;
			} catch {
				return false;
			}
		};
	},
	oneOf(...values) {
		return ((value) => values.includes(value));
	},
	any(...checks) {
		return ((value) => checks.some((check) => check(value)));
	},
	all(...checks) {
		return ((value) => checks.every((check) => check(value)));
	},
	not(check) {
		return (value) => !check(value);
	}
};
//#endregion
export { is as default };

//# sourceMappingURL=index.mjs.map