export default function PrimitiveTypeValidator(name, value) {
  if (typeof value !== this.type){
    throw new Error(`${name} should be in "${this.type}" type`);
  }

  return new Promise(resolve => resolve(value));
}