export default function ContainsValidator(name, value, param) {
  if (value.includes(param)) {
    throw new Error(`${name} is not valid email`);
  }

  return value;
}