//#region src/index.d.ts
interface IsArray {
  <T = unknown>(value: unknown): value is T[];
  empty(value: unknown): boolean;
  nonEmpty(value: unknown): value is unknown[];
}
interface IsString {
  (value: unknown): value is string;
  empty(value: unknown): boolean;
  whitespace(value: unknown): boolean;
  blank(value: unknown): boolean;
}
interface IsNumber {
  (value: unknown): value is number;
  positive(value: unknown): value is number;
  integer(value: unknown): value is number;
  positiveInteger(value: unknown): value is number;
}
interface IsBoolean {
  (value: unknown): value is boolean;
  value(value: unknown): boolean;
}
interface IsObject {
  (value: unknown): value is object;
  empty(value: unknown): boolean;
  plain<T = unknown>(value: unknown): value is Record<string | number | symbol, T>;
}
type CheckFn = (value: unknown) => boolean;
interface Is {
  null(value: unknown): value is null;
  undefined(value: unknown): value is undefined;
  nil(value: unknown): value is null | undefined;
  defined(value: unknown): boolean;
  blank(value: unknown): value is null | undefined | "";
  array: IsArray;
  string: IsString;
  number: IsNumber;
  boolean: IsBoolean;
  object: IsObject;
  fn(value: unknown): value is Function;
  date(value: unknown): value is Date;
  ipv4(value: unknown): boolean;
  any(...checks: CheckFn[]): CheckFn;
  every(...checks: CheckFn[]): CheckFn;
}
declare const is: Is;
//#endregion
export { is as default };
//# sourceMappingURL=index.d.mts.map