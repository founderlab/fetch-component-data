# Small util functions for Frameworkstein


fetchComponentData
------------------

Call Component.fetchData on a list of React Components.

Used to tie in the data loading story for Frameworkstein.

This fetchData method of each container is called whenever it's mounted.

Used in `fl-server-utils` and `fl-react-utils`


observeStore
------------
Added observeStore, a function that will call a callback whenever a selected piece
of a redux store changes. 

Useful for e.g. adding an access token header to all requests after a user logs in:

```javascript
observeStore(store, store => store.auth.get('accessToken'), accessToken => {
  requestModifier.setHeader({authorization: `Bearer ${accessToken}`})
})

```
