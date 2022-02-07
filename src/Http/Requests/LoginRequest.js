export default function LoginRequest() {
  return {
    email: ['email', 'max:255', 'required', 'exists:users'],
    password: ['string', 'required', 'min:6']
  }
}