import IndexController from './src/Http/Controllers/IndexController.js';
import AuthController from './src/Http/Controllers/AuthController.js';
import RegisterRequest from './src/Http/Requests/RegisterRequest.js';
import AuthMiddleware from './src/Http/Middleware/AuthMiddleware.js';
import LoginRequest from './src/Http/Requests/LoginRequest.js';

export default [
    {
        method: 'GET',
        path: '/',
        controller: IndexController,
        middleware: AuthMiddleware,
        action: 'index'
    },
    {
        method: 'POST',
        path: '/register',
        controller: AuthController,
        validator: RegisterRequest,
        action: 'register'
    },
    {
        method: 'POST',
        path: '/login',
        controller: AuthController,
        validator: LoginRequest,
        action: 'login'
    }
]