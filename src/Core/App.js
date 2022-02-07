import Container from './Container';
import Router from './Router';
import DB from './DB.js';
import {db} from '../../config.js';
import ValidatorFactory from './Validators/Factories/ValidatorFactory.js';
import ResponseToJsonMiddleware from '../Http/Middleware/ResponseToJsonMiddleware.js';

class App {
  static instance;

  constructor() {
    this.container = Container.getInstance();
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new App;
    }

    return this.instance;
  }

  prepare(request, response) {
    this.container.set('router', new Router(this));
    this.container.set('request', request);
    this.container.set('response', response);
    this.container.set('connection', new DB(db).syncDB());
    this.container.set('validatorFactory', ValidatorFactory.getInstance(this));
    this.container.set('defaultMiddlewares', [
      ResponseToJsonMiddleware
    ])
  }

  start(request, response) {
    this.prepare(request, response);

    return this.container.get('router').dispatch(request);
  }
}

export default App.getInstance();