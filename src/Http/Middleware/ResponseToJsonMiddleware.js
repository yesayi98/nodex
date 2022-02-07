const ResponseToJsonMiddleware = async (request, next) => {
  let response = await next(request)
  console.log(response);
  if (!(response instanceof String)){
    response = JSON.stringify(response)
  }

  return response
}

export default ResponseToJsonMiddleware