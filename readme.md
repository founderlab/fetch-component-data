# fetch-component-data
Data fetching helper and Redux middlware for React components in Frameworkstein apps

fetchComponentData
------------------

Call Component.fetchData on a list of React Components.

Used to tie in the data loading story for Frameworkstein.


fetchComponentDataMiddleware
------------------

Redux middleware to ensure container components get a chance to load their data when they're mounted.
Detects `redux-router` route change actions and calls fetchComponentData with the component of the route that is being navigated to.

```
// MyPage.js
import React from 'react'

export default class MyPage extends React.Component {

  // Middleware will call this method on each route change
  // The store is provided, we can get the current state of the router from it via redux-router
  // We'll also need its dispatch method to dipatch actions from here
  // The callback argument provided here is used on the server to determine if a page has loaded successfully (if doing server side rendering)
  static fetchData({store, action}, callback) {

    // As is the current action if we're transitioning between routes. 'action.payload' contains the props for the route we're transitioning to. Here for example we're getting router.params.id from it
    const {router} = store.getState()
    const id = ((action && action.payload && action.payload.params) || router.params).id

    // Our 'loadMyPageContent' action takes a callback, which is automatically called when the request resolves. We'll look at how that works below
    store.dispatch(loadMyPageContent((err, action) => {

      // We can return an error if something went wrong
      if (err) return callback(err)

      // Or a status code for other things if we want to be specific, here it's a 404 if the content isn't found
      if (!action.res) return callback(null, {status: 404})

      // No arguments means everything loaded just fine
      callback()
    }))
  }

  // ...rest of the component goes below

  render() {
    // ...etc
  }
}
```
