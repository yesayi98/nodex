import Controller from './Controller';

export default class IndexController extends Controller{
    index(request) {
        const response = this.response();
        response.write('shun')
    }
}