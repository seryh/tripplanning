import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Label from 'arui-feather/label'
import { delay, urlUpdate } from 'modules/utils'
import _ from 'lodash'
import cn from 'components/cn'
import Button from 'arui-feather/button'
import Input from 'arui-feather/input'
import CalendarInput from 'arui-feather/calendar-input'

// TODO: на большом количестве элементов
// есть проблема с производительностью, вызванная - CalendarInput
// так как на каждый экземпляр agent создается по 2 CalendarInput
// для решения нужно создавать CalendarInput динамически например по клику на input.

@cn('agent-component')
export class Agents extends Component {
  static propTypes = {
    rmCityAction: PropTypes.func,
    addAgentAction: PropTypes.func,
    rmAgentAction: PropTypes.func,
    editAgentAction: PropTypes.func,
    city: PropTypes.object
  };

  static defaultProps = {
    rmCityAction: () => null,
    addAgentAction: () => null,
    rmAgentAction: () => null,
    editAgentAction: () => null,
    city: {
      name: '',
      agents: []
    },
  };
  
  render(cn) {

    const {
      rmCityAction,
      addAgentAction,
      rmAgentAction,
      editAgentAction,
      city,
    } = this.props

    const {
      id,
      uniqId,
      agents,
      name
    } = city
    
    return agents.length > 0 ? (
      <table className={cn()}>
        <thead>
          <tr>
            <td style={{width: '50px'}}></td>
            <td>Контрагенты</td>
            <td>Тема встречи</td>
            <td>Дата начала</td>
            <td>Дата окончания</td>
          </tr>
        </thead>

        <tbody>
          {agents.map( (agent, i) => (
            <tr key={i}>
              <td><Button onClick={() => rmAgentAction({
                    agentUniqId: agent.uniqId,
                    cityUniqId: uniqId
                  })}
                  size='s'>X</Button></td>
              <td><Input onChange={ (name) => editAgentAction(
                    {agentUniqId: agent.uniqId, cityUniqId: uniqId},
                    {name}
                  )}
                  value={agent.name}
                  size='s'/></td>
              <td><Input onChange={ (theme) => editAgentAction(
                    {agentUniqId: agent.uniqId, cityUniqId: uniqId},
                    {theme}
                  )}
                  value={agent.theme}
                  size='s'/></td>
              <td><CalendarInput onChange={ (dateStart) => editAgentAction(
                    {agentUniqId: agent.uniqId, cityUniqId: uniqId},
                    {dateStart}
                  )}
                  value={agent.dateStart}
                  placeholder='ДД.ММ.ГГГГ'
                  size='s'/></td>
              <td><CalendarInput onChange={ (dateEnd) => editAgentAction(
                    {agentUniqId: agent.uniqId, cityUniqId: uniqId},
                    {dateEnd}
                  )}
                  value={agent.dateEnd}
                  placeholder='ДД.ММ.ГГГГ'
                  size='s'/></td>
            </tr>
          ))}
      </tbody>
      </table>
    ) : null
  }
}

export default Agents
