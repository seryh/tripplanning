import React, { Component } from 'react'
import PropTypes from 'prop-types'
 
import TabItem from 'arui-feather/tab-item'
import Tabs from 'arui-feather/tabs'
import {intlShape} from 'react-intl'
import { urlClean, urlUpdate } from 'modules/utils'
import cn from './cn'
import _ from 'lodash'


@cn('iwns-nav')
export class Nav extends Component {
  
  static contextTypes = {
    intl: intlShape,
    store:  PropTypes.object,
    router:  PropTypes.object,
    options: PropTypes.object
  }
  
  render (cn) {
    const {
      router,
      options,
      intl,
      store
    } = this.context

    const {
      basePath
    } = options

    const {
      location,
    } = store.getState()

    return (
      <Tabs
        ariaLabel="navigation"
        className={cn('menu')}>
        <TabItem url={basePath}
                 onClick={ (e) => {
                   e.preventDefault()
                   router.push(urlUpdate(null, params => _.pick(params, ['lang']), basePath))
          }}
          
          checked={ location.pathname == basePath  }>
          Routes
        </TabItem>
        
        <TabItem url={`$(basePath)/report`}
                 onClick={ (e) => {
                   e.preventDefault()
                   router.push(urlUpdate(null, params => _.pick(params, ['lang']),
                                         `${urlClean(location.pathname)}/report`))
          } }
          checked={ location.pathname == `${urlClean(basePath)}/report` }>
          Report
        </TabItem>

        
      </Tabs>
    )
  }
}


export default Nav
