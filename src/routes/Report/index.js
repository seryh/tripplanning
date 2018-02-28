import { injectReducer } from 'store/reducers'
import { connect } from 'react-redux'
import * as actions from './actions'
import View from './components/index'

const mapDispatchToProps = {
  ...actions,
}

const mapStateToProps = (state) => ({
  ...state.app,
})

const Container = connect(mapStateToProps, mapDispatchToProps)(View)

export default (store, noPath = false) => ({
  path: '**report',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      cb(null, Container)
    }, 'Report')
  }
})
