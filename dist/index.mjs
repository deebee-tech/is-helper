//#region src/index.ts
function buildIsArray() {
	const check = (value) => {
		if (value === null || value === void 0) return false;
		return Array.isArray(value) || value instanceof Float64Array || value instanceof Float32Array || value instanceof Int8Array || value instanceof Int16Array || value instanceof Int32Array || value instanceof Uint8Array || value instanceof Uint16Array || value instanceof Uint32Array || value instanceof Uint8ClampedArray || value instanceof BigInt64Array || value instanceof BigUint64Array;
	};
	check.empty = (value) => {
		return check(value) && value.length === 0;
	};
	check.nonEmpty = (value) => {
		return check(value) && value.length > 0;
	};
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
	const isStringCheck = (value) => typeof value === "string";
	const isBlankString = (value) => isStringCheck(value) && (value.length === 0 || value.length > 0 && !/\S/.test(value));
	const check = (value) => {
		if (value === null || value === void 0) return false;
		if (typeof value === "number") return true;
		if (typeof value !== "string") return false;
		if (isBlankString(value)) return false;
		return /^-{0,1}\d*\.{0,1}\d{0,2}$/.test(String(value));
	};
	check.positive = (value) => {
		if (!check(value)) return false;
		return Number(value) > 0;
	};
	check.integer = (value) => {
		if (!check(value)) return false;
		return Number.isInteger(Number.parseFloat(value.toString()));
	};
	check.positiveInteger = (value) => {
		if (!check.integer(value)) return false;
		return Number(value) > 0;
	};
	return check;
}
function buildIsBoolean() {
	const check = (value) => {
		if (value === null || value === void 0) return false;
		if (typeof value === "boolean") return true;
		if (typeof value === "string") {
			const lower = value.toLowerCase();
			return lower === "true" || lower === "false" || lower === "y" || lower === "n" || lower === "yes" || lower === "no" || value === "1" || value === "0";
		}
		return value === 1 || value === 0;
	};
	check.value = (val) => {
		if (!check(val)) return false;
		const v = val;
		if (typeof v === "boolean") return v;
		if (typeof v === "string") {
			const lower = v.toLowerCase();
			return lower === "true" || lower === "y" || lower === "yes" || lower === "1";
		}
		return v === 1;
	};
	return check;
}
function buildIsObject() {
	const isFn = (value) => typeof value === "function";
	const check = (value) => {
		return value !== null && value !== void 0 && typeof value === "object" && !isFn(value) && Object.prototype.toString.call(value) === "[object Object]";
	};
	check.empty = (value) => {
		return check(value) && Object.keys(value).length === 0;
	};
	check.plain = (value) => {
		if (!check(value)) return false;
		const prototype = Object.getPrototypeOf(value);
		return prototype === null || prototype === Object.getPrototypeOf({});
	};
	return check;
}
const isArray = buildIsArray();
const isString = buildIsString();
/**
* A collection of "is"-style type-checking helpers.
*
* Each method accepts an `unknown` value and returns a boolean (or type guard).
* Sub-namespaces like `is.string`, `is.number`, `is.array`, etc. provide
* additional specialized checks.
*
* @example
* ```ts
* import is from "@deebeetech/is-helper";
*
* is.string("hello");         // true
* is.number.positive(5);      // true
* is.array.nonEmpty([1, 2]);  // true
* is.boolean.value("yes");    // true
* ```
*/
const is = {
	null: (value) => value === null,
	undefined: (value) => typeof value === "undefined" || value === void 0,
	nil(value) {
		return value === null || value === void 0;
	},
	defined(value) {
		return value !== null && value !== void 0;
	},
	blank(value) {
		return this.nil(value) || isString.blank(value);
	},
	array: isArray,
	string: isString,
	number: buildIsNumber(),
	boolean: buildIsBoolean(),
	object: buildIsObject(),
	fn: (value) => typeof value === "function",
	date: (value) => Object.prototype.toString.call(value) === "[object Date]",
	ipv4(value) {
		if (typeof value !== "string") return false;
		return /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(value);
	},
	any(...checks) {
		return (value) => checks.some((check) => check(value));
	},
	every(...checks) {
		return (value) => checks.every((check) => check(value));
	}
};
//#endregion
export { is as default };

//# sourceMappingURL=index.mjs.map