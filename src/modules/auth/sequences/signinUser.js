import { sequence } from 'cerebral'
import { state } from 'cerebral/tags'
import { set, when } from 'cerebral/operators'
import { httpPost } from '@cerebral/http/operators'
import { redirectToSignal } from '@cerebral/router/operators'

import showValidationError from '../factories/showValidationError'
import initUser from '../actions/initUser'

export default sequence('Sign-in user', [
  set(state`auth.loginFormIsLoading`, true),
  httpPost('/users/login', state`auth.loginForm`),
  {
    success: [
      set(state`auth.loginForm.user.email`, ''),
      set(state`auth.loginForm.user.password`, ''),
      set(state`app.errorMessages`, []),
      initUser,
      set(state`auth.loginFormIsLoading`, false),
      when(state`app.lastVisited`),
      {
        true: redirectToSignal('app.pageRouted', {
          page: state`app.lastVisited`,
        }),
        false: redirectToSignal('app.homeRouted'),
      },
    ],
    error: [
      set(state`auth.loginForm.user.password`, ''),
      set(state`auth.loginFormIsLoading`, false),
      showValidationError('Could not log-in!'),
    ],
  },
])