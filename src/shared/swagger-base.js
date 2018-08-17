module.exports = ({ description, name, version }) => ({
  mergeSwaggers(swaggerList) {
    return {
      swagger: "2.0",
      info: {
        version,
        title: name,
        description
      },
      basePath: "/",
      schemes: ["http"],
      consumes: ["application/json"],
      produces: ["application/json"],
      paths: swaggerList.reduce((prev, cur) => ({ ...prev, ...cur }), {})
    };
  }
});
