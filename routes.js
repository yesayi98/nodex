import IndexController from './src/Http/Controllers/IndexController.js';
import AuthController from './src/Http/Controllers/AuthController.js';
import RegisterRequest from './src/Http/Requests/RegisterRequest.js';
import AuthMiddleware from './src/Http/Middleware/AuthMiddleware.js';

export default [
    {
        method: 'GET',
        path: '/',
        controller: IndexController,
        action: 'index'
    },
    {
        method: 'POST',
        path: '/register',
        controller: AuthController,
        validator: RegisterRequest,
        middleware: AuthMiddleware,
        action: 'register'
    }
]