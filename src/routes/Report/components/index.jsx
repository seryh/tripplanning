import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { delay, urlClean, urlUpdate } from 'modules/utils'
import _ from 'lodash'
import cn from 'components/cn'
import {intlShape, FormattedMessage } from 'react-intl'
import { Nav } from 'components/nav'
import Textarea from 'arui-feather/textarea'
import '../styles.scss'

@cn('report-component')
export class Report extends Component {
  static contextTypes = {
    intl: intlShape,
    options: PropTypes.object,
  }
  
  render (cn) {

    const {
      cities,
    } = this.props

    const data = JSON.stringify(cities, undefined, 4)
    
    return (
      <div className={cn()}>
        <Nav />

        <Textarea
          width='available'
          value={data}
          />
        
      </div>
    )
  }
}

export default Report
