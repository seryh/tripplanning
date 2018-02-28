import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Label from 'arui-feather/label'
import { delay, urlUpdate } from 'modules/utils'
import _ from 'lodash'
import cn from 'components/cn'
import Button from 'arui-feather/button'
import InputAutocomplete from 'arui-feather/input-autocomplete'
import { Cities } from './Cities'
import {intlShape, FormattedMessage} from 'react-intl'
import {Nav} from 'components/nav'
import '../styles.scss'

export const getFilteredOptions = (list, mask) => {
  if (!mask) return list
  return _.filter(list ,({ value }) => {
    mask = _.lowerCase(mask)
    value = _.lowerCase(value)
    
    return value !== mask && value.indexOf(mask) !== -1
  })
}


@cn('routes-container')
export class Routes extends Component {
  static propTypes = {
    rmCityAction: PropTypes.func,
    addAgentAction: PropTypes.func,
    rmAgentAction: PropTypes.func,
    editAgentAction: PropTypes.func,
    cities: PropTypes.array
  };

  static defaultProps = {
    rmCityAction: () => null,
    addAgentAction: () => null,
    rmAgentAction: () => null,
    editAgentAction: () => null,
    cities: []
  };
  
  static contextTypes = {
    intl: intlShape,
    options: PropTypes.object
  };

  render (cn) {

    const {
      setCityAction,
      changeCityValueAction,
      addCityAction,
      rmCityAction,
      addAgentAction,
      rmAgentAction,
      editAgentAction,
      
      cities,
      citiesList,
      citySelectItem,
    } = this.props
    
    return (
      <div className={cn()}>

        <Nav/>
        
        <Cities {...this.props}></Cities>
        
        <div className={cn('select-city-container')}>
            <InputAutocomplete
               size='m'
               clear={ true }
               updateValueOnItemSelect={ false }
               value={ _.get(citySelectItem, 'value', '') }
               onChange={ (value) => changeCityValueAction(value) }
               onItemSelect={ (item) => setCityAction(item) }
               label='Город'
               options={ getFilteredOptions(citiesList, _.get(citySelectItem, 'value', '')) }
            />
            
            <Button
              size='m'
              className={cn('button')}
              onClick={() => addCityAction({
                name: _.get(citySelectItem, 'selectItem.value'),
                id: _.get(citySelectItem, 'selectItem.id')
              })}>
              Добавить город
            </Button>
        
        </div>
        
      </div>
    )
  }
}

export default Routes
