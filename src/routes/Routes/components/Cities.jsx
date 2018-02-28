import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Label from 'arui-feather/label'
import { delay, urlUpdate } from 'modules/utils'
import _ from 'lodash'
import cn from 'components/cn'
import Button from 'arui-feather/button'
import { Agents } from './Agents'

export class TrCity extends Component {
  static propTypes = {
    rmCityAction: PropTypes.func,
    addAgentAction: PropTypes.func,
    rmAgentAction: PropTypes.func,
    city: PropTypes.object
  };

  static defaultProps = {
    rmCityAction: () => null,
    addAgentAction: () => null,
    rmAgentAction: () => null,
    city: {
      name: '',
      agents: []
    },
  };

  render() {

    const {
      rmCityAction,
      addAgentAction,
      city,
    } = this.props

    const {
      id,
      uniqId,
      agents,
      name,
      dateStart,
      dateEnd
    } = city

    return (
      <tr >
        <td style={{width: '100px'}}>
          <Button onClick={() => rmCityAction(uniqId)} size='s'>X</Button>
        </td>
        <td style={{width: '300px'}}>{name}</td>
        <td style={{width: '300px'}} colSpan="2">
          <span style={{fontSize: '28px'}}>{dateStart} - {dateEnd}</span>
          
          <div style={{width: '100%'}}>
            <Agents {...this.props} />
            <Button
              onClick={ () => addAgentAction(uniqId)}
              size='s'>
              Добавить новую встречу
            </Button>
          </div>
        </td>
      </tr>
    )
  }
}


@cn('city-component')
export class Cities extends Component {
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

  render(cn) {
    const {
      rmCityAction,
      addAgentAction,
      rmAgentAction,
      editAgentAction,
      cities,
    } = this.props
    
    return (
      <div  className={cn()}>
        <table>
          <thead>
            <tr>
              <td style={{width: '100px'}}></td>
              <td style={{width: '300px'}}>Город</td>
              <td style={{width: '300px'}}>Дата начала - Дата окончания</td>
              <td style={{}}></td>
            </tr>
          </thead>
          <tbody>
          {cities.map( (city, i) => (
              <TrCity
                key={i}
                rmCityAction={rmCityAction}
                addAgentAction={addAgentAction}
                rmAgentAction={rmAgentAction}
                editAgentAction={editAgentAction}
                city={city}></TrCity>) )}
          </tbody>
        </table>
      </div>
    )
  }
}

export default Cities
