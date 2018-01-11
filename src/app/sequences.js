import { sequence } from 'cerebral'
import { props, state } from 'cerebral/tags'
import { set, when } from 'cerebral/operators'

import * as actions from './actions'
import * as factories from './factories'
import { fetchCurrentUser } from './modules/profile/sequences'

export const initialize = sequence('Initiate App', [
  actions.initApp,
  when(state`auth.authenticated`),
  {
    true: fetchCurrentUser,
    false: [],
  },
])

export const routeToHome = sequence('Route to home', [
  factories.routeTo('home'),
])

export const routeToPage = sequence('Route to page', [
  factories.routeTo(props`page`),
])

export const routeToArticle = sequence('Route to article', [
  factories.routeTo('article', { slug: props`slug` }),
])

export const routeToEditor = sequence('Route to editor', [
  factories.routeTo('editor', { slug: props`slug` }),
])

export const routeToProfile = sequence('Route to profile', [
  factories.routeTo('profile', {
    username: props`username`,
    favorites: props`favorites`,
  }),
])

export const changeField = sequence('Change field', [
  set(state`${props`path`}`, props`value`),
])
