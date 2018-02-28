import React, { Component } from 'react'
// import { IndexLink, Link } from 'react-router'
import PropTypes from 'prop-types'
import cn from '../../components/cn'

@cn('iwns')
export class PageLayout extends Component {
  render (cn) {
    return (
      <div className={ cn('container') }>
        <div className={ cn('layout-viewport') }>
          {this.props.children}
        </div>
      </div>
    )
  }
}

PageLayout.propTypes = {
  children: PropTypes.node,
}

export default PageLayout
