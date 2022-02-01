import EmailValidator from '../EmailValidator.js';
import ContainsValidator from '../ContainsValidator.js';
import LengthValidator from '../LengthValidator.js';
import RequireValidator from '../RequireValidator.js';
import PrimitiveTypeValidator from '../PrimitiveTypeValidator.js';
import UniqueValidator from '../UniqueValidator.js';

export default class ValidatorFactory {
  #validators;

  constructor(app) {
    this.app = app;
    this.#validators = [];

    this.use('string', PrimitiveTypeValidator.bind({
      type: 'string'
    }));
    this.use('number', PrimitiveTypeValidator.bind({
      type: 'number'
    }));
    this.use('boolean', PrimitiveTypeValidator.bind({
      type: 'boolean'
    }));
    this.use('max', LengthValidator.bind({
      type: 'max'
    }));
    this.use('min', LengthValidator.bind({
      type: 'min'
    }));
    this.use('email', EmailValidator);
    this.use('required', RequireValidator);
    this.use('contains', ContainsValidator);
    this.use('unique', UniqueValidator.bind({
      connection: this.app.container.get('connection')
    }));
  }

  static getInstance(app) {
    if (!this.validatorInstance) {
      this.validatorInstance = new ValidatorFactory(app);
    }

    return this.validatorInstance;
  }

  use(key, validator) {
    this.#validators.push({
      key,
      validator
    });
  }

  getValidator(validatorKey) {
    return this.#validators.find(({key}) => {
      return validatorKey === key;
    }).validator;
  }
}