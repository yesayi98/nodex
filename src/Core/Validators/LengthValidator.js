export default function LengthValidator(name, value, param) {
  if (this.type === 'min' && value?.length < param) {
    throw new Error(`${name} length should be more than ${param}`);
  }
  if (this.type === 'max' && value?.length > param) {
    throw new Error(`${name} length should be less than ${param}`);
  }

  return value;
}