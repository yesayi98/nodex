const RegisterRequest = () => {
  return {
    name: ['string', 'max:255', 'min:3', 'required'],
    lastname: ['string', 'max:255', 'min:3', 'required'],
    email: ['email', 'max:255', 'required', 'unique:users'],
    password: ['string', 'required', 'min:6']
  }
}

export default RegisterRequest