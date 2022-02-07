const AuthMiddleware = async (request, next) => {
  return await next(request);
}

export default AuthMiddleware