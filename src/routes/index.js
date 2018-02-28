// We only need to import the modules necessary for initial render
import PageLayout from '../layouts/PageLayout/PageLayout'
import Report from './Report'
import Routes from './Routes'

/*  Note: Instead of using JSX, we recommend using react-router
    PlainRoute objects to build route definitions.   */

export const createRoutes = (store) => {
  return {
    path: store.options.basePath,
    component   : PageLayout,
    indexRoute  : Routes(store, true),
    childRoutes : [
      Report(store),
    ]
  }}

export default createRoutes
