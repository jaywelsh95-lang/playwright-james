export const credentials = {
  standardUser: {
    username: 'standard_user',
    password: 'secret_sauce'
  },
  lockedOutUser: {
    username: 'locked_out_user',
    password: 'secret_sauce'
  },
  problemUser: {
    username: 'problem_user',
    password: 'secret_sauce'
  },
  performanceGlitchUser: {
    username: 'performance_glitch_user',
    password: 'secret_sauce'
  }
} as const;

export const invalidCredentials = {
  invalidUsername: {
    username: 'invalid_user',
    password: 'secret_sauce'  // valid password
  },
  invalidPassword: {
    username: 'standard_user',  // valid username
    password: 'wrong_password'
  },
  bothInvalid: {
    username: 'invalid_user',
    password: 'wrong_password'
  }
} as const;