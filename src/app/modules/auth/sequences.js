import { sequence } from 'cerebral'
import { state, resolveObject } from 'cerebral/tags'
import { set, when } from 'cerebral/operators'
import { httpPost, httpPut } from '@cerebral/http/operators'
import { redirectToSignal } from '@cerebral/router/operators'

import * as actions from './actions'
import * as factories from './factories'

export const registerUser = sequence('Register new user', [
  set(state`auth.registerFormIsLoading`, true),
  httpPost('/users', state`auth.registerForm`),
  {
    success: [
      actions.resetSignUpForm,
      actions.initUser,
      when(state`lastVisited`),
      {
        true: redirectToSignal(
          'pageRouted',
          resolveObject({
            page: state`lastVisited`,
          })
        ),
        false: redirectToSignal('homeRouted'),
      },
    ],
    error: [
      set(state`auth.registerForm.user.password`, ''),
      factories.showValidationError('Could not register!'),
    ],
  },
  set(state`auth.registerFormIsLoading`, false),
])

export const signinUser = sequence('Sign-in user', [
  set(state`auth.loginFormIsLoading`, true),
  httpPost('/users/login', state`auth.loginForm`),
  {
    success: [
      actions.resetLoginForm,
      actions.initUser,
      when(state`lastVisited`),
      {
        true: redirectToSignal(
          'pageRouted',
          resolveObject({
            page: state`lastVisited`,
          })
        ),
        false: redirectToSignal('homeRouted'),
      },
    ],
    error: [
      set(state`auth.loginForm.user.password`, ''),
      factories.showValidationError('Could not log-in!'),
    ],
  },
  set(state`auth.loginFormIsLoading`, false),
])

export const logoutUser = sequence('Log user out', [
  set(state`auth.loginFormIsLoading`, false),
  actions.removeUser,
  redirectToSignal('homeRouted'),
])

export const changeSettings = sequence('Change settings', [
  set(state`auth.settingsFormIsLoading`, true),
  httpPut('/user', state`auth.settingsForm`),
  {
    success: [
      set(state`auth.settingsForm.user.image`, ''),
      set(state`auth.settingsForm.user.username`, ''),
      set(state`auth.settingsForm.user.bio`, ''),
      set(state`auth.settingsForm.user.email`, ''),
      set(state`auth.settingsForm.user.password`, ''),
      set(state`errorMessages`, []),
      set(state`auth.settingsFormIsLoading`, false),
      redirectToSignal('homeRouted'),
    ],
    error: [
      set(state`auth.settingsForm.user.password`, ''),
      set(state`auth.settingsFormIsLoading`, false),
      factories.showValidationError('Could not change settings!'),
    ],
  },
])
