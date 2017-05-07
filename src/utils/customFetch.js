import fetch from 'isomorphic-fetch'

// This takes care of resolving response to json
// and rejects anything above 300 status code
// Thus making it easier for use fromPromise (mobx-utils)
export default function customFetch(url, options) {
  if (options == null) options = {}
  if (options.credentials == null) options.credentials = 'same-origin'
  return fetch(url, options).then(function(response) {
    if (response.status >= 200 && response.status < 300) {
      // return Promise.resolve(response)
      return response.json()
    } else {
      var error = new Error(response.statusText || response.status)
      error.response = response
      return Promise.reject(error)
    }
  }).then((res) => Promise.resolve(res))
}
