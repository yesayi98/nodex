export default function RequireValidator(name, value) {
  if (
    !value ||
    (value instanceof Array && !value?.length) ||
    (value instanceof Object && !value?.keys().length)
  ){
    throw new Error(`${name} is required`);
  }

  return new Promise(resolve => resolve(value));
}