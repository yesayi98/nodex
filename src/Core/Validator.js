export default function Validator(request, rules) {
  const validated = {}
  const validatorFactory = this.container.get('validatorFactory');
  const promises = [];

  Object.entries(rules).map(([param, requirements]) => {
    requirements.map((requirement) => {
      let validatorParam;
      if(requirement.includes(':')){
        let chunks = requirement.split(':')

        validatorParam = chunks.pop();
        requirement = chunks.pop();
      }
      const validator = validatorFactory.getValidator(requirement)

      promises.push(validator(param, request.params[param] ?? request.query[param], validatorParam));
    })
  })

  return Promise.all(promises).then((validatedParams) => {
    validatedParams = validatedParams.filter((v, i, a) => a.indexOf(v) === i)

    Object.entries(rules).map(([param], index) => (validated[param] = validatedParams[index]))

    return validated
  }).catch((reason) => {
    throw new Error(reason)
  })
}