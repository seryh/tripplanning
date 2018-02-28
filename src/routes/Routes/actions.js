import {
  ROUTES_CITY_SELECT,
  ROUTES_CITY_CANGE,
  ADD_CITY,
  RM_CITY,
  ADD_AGENT,
  RM_AGENT,
  EDIT_AGENT,
} from '../../constants'

import _ from 'lodash'
import { delay, urlClean, urlUpdate } from 'modules/utils'
import { browserHistory } from 'react-router'
import store from 'store2'


/**
 * Set city to Autocompete input
 * @param {Object} cityItem
 * @param {String} cityItem.name
 * @param {id}     cityItem.id
 * @return {Object} dispatch
 */
export const setCityAction = (cityItem) => (dispatch, getState) => {
  return dispatch({ type: ROUTES_CITY_SELECT, payload: cityItem})
}


/**
* @param {String} value
* @return {Object} dispatch
*/
export const changeCityValueAction = (value) => (dispatch, getState) => {
  return dispatch({ type: ROUTES_CITY_CANGE, payload: value})
}

/**
* @param {Integer} id
* @return {undefined}
*/
export const rmCityAction = (id) => (dispatch, getState) => {
  dispatch({ type: RM_CITY, payload: id})

  store.set('appSavedState', getState().app)
}

/**
 * Set city to Autocompete input
 * @param {Object} cityItem
 * @param {String} cityItem.name
 * @param {id}     cityItem.id
 * @return {undefined}
 */
export const addCityAction = (city) => (dispatch, getState) => {
  if (!city || !city.name)
    return
    
  dispatch({ type: ADD_CITY, payload: city})

  store.set('appSavedState', getState().app)
}

/**
* @param {Integer} cityId
* @return {undefined}
*/
export const addAgentAction = (cityId) => (dispatch, getState) => {
  dispatch({ type: ADD_AGENT, payload: cityId})

  store.set('appSavedState', getState().app)
}

/**
* @param {Object} key
* @param {Integer} key.agentUniqId
* @param {Integer} key.cityUniqId
* @return {undefined}
*/
export const rmAgentAction = ({agentUniqId, cityUniqId}) => (dispatch, getState) => {
  dispatch({ type: RM_AGENT, payload: {
    agentUniqId, cityUniqId
  }})

  store.set('appSavedState', getState().app)
}


/**
* @param {Object} key
* @param {Integer} key.agentUniqId
* @param {Integer} key.cityUniqId
* @param {Object} data
* @return {undefined}
*/
export const editAgentAction = (
  {agentUniqId, cityUniqId},
  data
) => (dispatch, getState) => {
  
  dispatch({ type: EDIT_AGENT, payload: {
    key: {agentUniqId, cityUniqId},
    data
  }})
  
  // TODO: для прод версии сохранять через setTimeout
  // с накоплением задержанных операций в пул и очисткой
  // устаревших операций
  store.set('appSavedState', getState().app)
}
