export function initUser({ props, state, storage, http }) {
  let authtype = 'Token'
  let token

  if (props.response.headers.authorization) {
    [authtype, token] = props.response.headers.authorization.split(' ', 2)
  } else {
    token = props.response.result.user.token
  }

  storage.set('jwtHeader', token)
  http.updateOptions({
    headers: {
      Authorization: authtype + ' ' + token,
    },
  })

  state.set('auth.authenticated', true)
  state.set('auth.currentUser.email', props.response.result.user.email)
  state.set('auth.currentUser.username', props.response.result.user.username)
  state.set('auth.currentUser.image', props.response.result.user.image || null)
  state.set('auth.currentUser.bio', props.response.result.user.bio || null)
}

export function removeUser({ state, storage, http }) {
  storage.remove('jwtHeader')
  http.updateOptions({
    headers: {
      Authorization: null,
    },
  })
  state.set('auth.authenticated', false)
  state.set('auth.currentUser.email', '')
  state.set('auth.currentUser.username', '')
}

export function resetLoginForm({ state }) {
  state.set(`auth.loginForm.user.email`, '')
  state.set(`auth.loginForm.user.password`, '')
  state.set(`errorMessages`, [])
}

export function resetSignUpForm({ state }) {
  state.set(`auth.registerForm.user.username`, '')
  state.set(`auth.registerForm.user.email`, '')
  state.set(`auth.registerForm.user.password`, '')
  state.set(`errorMessages`, [])
}
