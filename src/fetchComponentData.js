import _ from 'lodash' // eslint-disable-line
import Queue from 'queue-async'

const defaults = {
  parallelism: 1,
}

export default function fetchComponentData(options, callback) {
  const {store, components, action, parallelism} = _.defaults(options, defaults)
  const result = {}
  const queue = new Queue(parallelism)

  components.forEach(_Component => {
    if (!_Component) return
    const Component = _Component.WrappedComponent || _Component
    if (!Component.fetchData) return
    queue.defer(callback => Component.fetchData({store, action}, (err, res) => {
      if (res) _.extend(result, res)
      callback(err)
    }))
  })

  queue.await(err => {
    if (callback) callback(err, result)
  })
}
