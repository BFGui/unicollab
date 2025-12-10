function onNoMatchHandler(request, response) {
  const publicErrorObject = new MethodNotAllowedError();
  response.status(publicErrorObject.statusCode).json(publicErrorObject);
}

function onErrorHandler(error, request, response) {
  const publicErrorObject = new MethodNotAllowedError({
    statusCode: error.statusCode,
    cause: error,
  });
  console.error(publicErrorObject);

  response.status(publicErrorObject.statusCode).json(publicErrorObject);
}

const controller = {
  onErrorHandler,
  onNoMatchHandler,
};

export default controller;
