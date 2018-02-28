// ------------------------------------
// Constants
// ------------------------------------
import {
  ADD_CITY,
  RM_CITY,
  EDIT_CITY, 

  ADD_AGENT, 
  RM_AGENT,  
  EDIT_AGENT,
  ROUTES_CITY_SELECT,
  ROUTES_CITY_CANGE,
} from '../constants'

import _ from 'lodash'
import moment from 'moment'
import { rand } from 'modules/utils'
import store from 'store2'

// ------------------------------------
// State
// ------------------------------------

const defAgent = {
  uniqId: 0,
  name: '',
  theme: '',
  dateStart: '', // ДД.ММ.ГГГГ
  dateEnd: ''
}

const defCity = {
  id: 0,
  name: '',
  agents: [],
  dateStart: '', // ДД.ММ.ГГГГ
  dateEnd: ''
}

const defFinderOptions =  {
  selectItem: null,
  value: '',
}

const defaultState = {
  /* Активный выбранный город */
  citySelectItem: defFinderOptions,

  /* Добавленные маршруты */
  cities: [],

  /* Выпадающий список */
  citiesList: [
    { id: 1, value: 'Москва'},
    { id: 2, value: 'Санкт-Петербург'},
    { id: 3, value: 'Новосибирск'},
    { id: 4, value: 'Екатеринбург'},
    { id: 5, value: 'Нижний Новгород'},
    { id: 6, value: 'Казань'},
    { id: 7, value: 'Челябинск'},
    { id: 8, value: 'Омск'},
    { id: 9, value: 'Самара'},
    { id: 10, value: 'Ростов-на-Дону'},
    { id: 11, value: 'Уфа'},
    { id: 12, value: 'Красноярск'},
    { id: 13, value: 'Пермь'},
    { id: 14, value: 'Воронеж'},
    { id: 15, value: 'Волгоград'},
  ]
}

const savedState = store.get('appSavedState')

const initialState = savedState
      ? {...defaultState, ...savedState}
      : defaultState


// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [ROUTES_CITY_SELECT]: (state, action) => {
    const citySelectItem = {
      ...state.citySelectItem,
      selectItem: action.payload,
      value: action.payload.value
    }
    
    return { ...state, citySelectItem }
  },

  [ROUTES_CITY_CANGE]: (state, action) => {
    return { ...state,
             citySelectItem: {
               ...state.citySelectItem,
               selectItem: null,
               value: action.payload,
             } }
  },
  
  [ADD_CITY]: (state, action) => {
    
    const newCity = {...defCity,
                     agents: [],
                     ...action.payload,
                     uniqId: rand(state.cities.length+1)}
    
    const cities = [...state.cities, newCity]
    
    return { ...state,
             cities,
             citySelectItem: defFinderOptions}
  },

  [RM_CITY]: (state, action) => {
    const uniqId = action.payload

    const cities = _.filter(state.cities, city =>
                                city.uniqId !== uniqId)

    return { ...state, cities }
  },

  [EDIT_CITY]: (state, action) => {
    return state
  },

  /* Добавит пустого агента в город */
  [ADD_AGENT]: (state, action) => {
    
    const cityUniqId = action.payload
    const city = _.find(state.cities, city =>
                        city.uniqId == cityUniqId)

    city.agents.push({...defAgent, uniqId: rand(city.agents.length+1)})
    
    const cities = [...state.cities]
    
    return { ...state, cities }
  },

  [RM_AGENT]: (state, action) => {
    const {
      agentUniqId,
      cityUniqId
    } = action.payload
    
    const city = _.find(state.cities, city =>
                        city.uniqId == cityUniqId)

    const agents = _.filter(city.agents, agent =>
                            agent.uniqId !== agentUniqId)

    

    city.agents = agents
    
    const cities = [...state.cities]
    
    return { ...state, cities }
  },

  [EDIT_AGENT]: (state, action) => {
    const {
      agentUniqId,
      cityUniqId
    } = action.payload.key
    
    let city = _.find(state.cities, city =>
                        city.uniqId == cityUniqId)

    let agent = _.find(city.agents, agent =>
                            agent.uniqId == agentUniqId)

    
    _.merge(agent, action.payload.data)
    
    const cities = [...state.cities]

    if (_.has(action.payload.data, 'dateStart') ) {
      const agentsSort = _.sortBy([...city.agents], ({dateStart}) => {
        return moment(dateStart, 'DD.MM.YYYY').toDate()
      })

      city.dateStart = agentsSort[0].dateStart
      
      return { ...state, cities }
    }

    if (_.has(action.payload.data, 'dateEnd')) {
      const agentsSort = _.sortBy([...city.agents], ({dateEnd}) => {
        return moment(dateEnd, 'DD.MM.YYYY').toDate()
      })

      city.dateEnd = agentsSort[agentsSort.length-1].dateEnd
      
      return { ...state, cities }
    }


    return { ...state, cities }
  },
}

// ------------------------------------
// Reducer
// ------------------------------------

export default function(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
