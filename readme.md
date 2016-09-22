# Data loading stuff

fetchComponentData
------------------

Call Component.fetchData on a list of React Components.

Used to tie in the data loading story for Frameworkstein.


fetchComponentDataMiddleware
------------------

Redux middleware to ensure container components get a chance to load their data when they're mounted.
Detects `redux-router` route change actions and calls fetchComponentData with the component of the route that is being navigated to.

```
