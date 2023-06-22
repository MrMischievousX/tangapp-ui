interface String {
  toCapitalize(): string;
  toOnlyNumbers(): string;
}

String.prototype.toCapitalize = function () {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

// String.prototype.toOnlyNumbers = function () {
//   return this.replace(/\D/g, '');
// };
