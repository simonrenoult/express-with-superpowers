module.exports = (req, res, next) => {
  res.send = monkeyPatchResponseFunction(res.send);
  res.json = monkeyPatchResponseFunction(res.json);

  next();

  function monkeyPatchResponseFunction(responseFn) {
    return (...args) => {
      const body = args[0];
      const newBody = prettifyBoomError(body);
      responseFn.apply(res, [newBody, ...args.slice(1)]);
    };
  }

  function prettifyBoomError(body) {
    if (!body.isBoom) return body;

    return {
      ...body.output.payload,
      details: body.data || []
    };
  }
};
