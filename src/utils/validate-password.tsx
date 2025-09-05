const minLength = (value: string) => {
  return value.length >= 6 || 'A senha deve ter pelo menos 6 caracteres.';
}

const hasSpecialChar = (value: string) => {
  return /[!@#$%^&*(),.?":{}|<>]/.test(value) || 'A senha precisa de um caractere especial.';
}

const confirmPassword = (password: string, confirmPassword: string) => {
  return password === confirmPassword || 'As senhas não correspondem.';
}

export { minLength, hasSpecialChar, confirmPassword }
