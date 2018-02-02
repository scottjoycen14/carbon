import Morph from 'morphmorph'

let createHistory
let history
if (typeof window !== 'undefined') {
  createHistory = require('history').createBrowserHistory
  history = createHistory()
}

const mapper = new Morph()

const mappings = [
  'bg:backgroundColor',
  't:theme',
  'l:language',
  'ds:dropShadow',
  'wc:windowControls',
  'wa:widthAdjustment',
  'pv:paddingVertical',
  'ph:paddingHorizontal',
  'ln:lineNumbers',
  'code:code'
]

const reverseMappings = mappings.map(field =>
  field
    .split(':')
    .reverse()
    .join(':')
)

const serializeState = state => {
  const stateString = encodeURIComponent(JSON.stringify(state))

  return typeof window !== 'undefined'
    ? btoa(stateString)
    : Buffer.from(stateString).toString('base64')
}

const deserializeState = serializedState => {
  let stateString
  if (typeof window !== 'undefined') {
    stateString = atob(serializedState)
  } else {
    stateString = Buffer.from(serializedState, 'base64').toString()
  }

  return JSON.parse(decodeURIComponent(stateString))
}

const keysToQuery = keys =>
  `?${Object.keys(keys)
    .map(key => `${key}=${keys[key]}`)
    .join('&')}`

export const getQueryStringState = query =>
  query.state ? deserializeState(query.state) : mapper.map(mappings, query)
export const updateQueryString = state =>
  history.replace({
    search: encodeURI(keysToQuery({ state: serializeState(state) }))
  })
