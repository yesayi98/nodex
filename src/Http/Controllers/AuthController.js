import Controller from './Controller';
import {User} from '../../Models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'

export default class AuthController extends Controller {
  async login(request) {
    const {email, password} = request.validated;
    const user = await User.findOne({where: {email}});
    if (!user) {
      throw new Error('No user');
    }

    const verified = bcrypt.compareSync(password, user.password);

    if (!verified) {
      throw new Error('passwords not match')
    }

    const accessToken = jwt.sign({
      user: user.id,
    }, process.env.APP_SECRET, { expiresIn: process.env.TOKENS_EXPIRES_IN })

    return { accessToken };
  }

  async register(request) {
    const data = request.validated;

    const user = await User.create(data);

    return user;
  }

  me() {

  }

  refresh() {

  }
}