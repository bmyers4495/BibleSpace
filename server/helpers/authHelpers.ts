export const isValidEmail = (email: string) => {
  const re = /^[a-zA-z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/ 
  return re.test(email)
}

export const isValidPassword = (password: string) => {
  if (password.length < 8 || password.length > 64) {
    return false
  }
  return true
}

export const isValidUsername = (username: string) => {
  if (username.length < 3 || username.length > 32) {
    return false
  }
  return true
}
