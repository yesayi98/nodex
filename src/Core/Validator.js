export default function Validator(request, rules) {
  const validated = {};
  const validatorFactory = this.container.get('validatorFactory');
  const errors = [];

  Object.entries(rules).map(([param, requirements]) => {
    requirements.map((requirement) => {
      let validatorParam;
      if(requirement.includes(':')){
        let chunks = requirement.split(':')

        validatorParam = chunks.pop();
        requirement = chunks.pop();
      }
      const validator = validatorFactory.getValidator(requirement)

      try {
        validated[param] = validator(param, request.params[param] ?? request.query[param], validatorParam)
      } catch (e) {
        errors.push(e.message)
      }
    })
  })

  if (errors.length) {
    throw new Error(JSON.stringify({message: errors.join('. ')}))
  }

  return validated;
}