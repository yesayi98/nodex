import Controller from './Controller';
import {User} from '../../Models/User.js';
export default class AuthController extends Controller{
  login(request) {

  }

  async register(request) {
    const data = request.validated;

    // const connection = await this.getConnection();
    // await connection.sync();
    const user = await User.create(data);

    return JSON.stringify(user)
  }

  me() {

  }

  refresh() {

  }
}