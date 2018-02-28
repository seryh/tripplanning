import _ from 'lodash'
import Cookies from 'universal-cookie'
import { browserHistory } from 'react-router'
import qs from 'qs'

export const cookies = new Cookies()

// очистка url От слеша в конце foo/bar/ => foo/bar
export const urlClean = url => url.slice(-1) === '/' ? url.slice(0, -1) : url

export const urlParamsClean = url => url.slice(0,1) === '?' ? url.slice(1, url.length) : url

/**
 * Возвращает новый URL дополненный параметрами
 * @param params {Object} - параметры который будут прокинуты в GET
 * @param updateCb {Function} - функция обработчик текущих параметров из GET
 * @param path {String} - новый url для редиректа, если не передан берется текущий
 * @return path {String} - новый сформированный url с параметрами
 */
export const urlUpdate = (params = null, updateCb = s => s, path = null) => {
  const location = browserHistory.getCurrentLocation()
  
  path = path ? path : location.pathname

  // если уже есть GET параметры
  if (location.search) {
    const s = urlParamsClean(location.search)

    // если переданы новые, обновляем текущие и добавляем существующие
    if (params) {
      // текущие параметры пропущеные через внешний фильтр
      let qParams = updateCb(qs.parse(s), qs, s)
      return `${path}?${qs.stringify({...qParams, ...params})}`
    }

    // если нет переданных просто пропускаем текущие через фильтр
    return `${path}?${qs.stringify(updateCb(qs.parse(s), qs, s))}`
  }

  return `${path}?${qs.stringify(params)}`
}

/**
 * Выполнить с задежкой, аналог setTimeout на промисах
 * @param {int} ms - время в миллисикундах
 * @return promise
 */
export const delay = (ms = 0) => {
  let promiseCancel

  let promise = new Promise((resolve, reject) => {
    let timeoutId = setTimeout(resolve, ms)
    promiseCancel = () => clearTimeout(timeoutId)
    return promiseCancel
  })

  promise.cancel = () =>
    promiseCancel()

  return promise
}


export const noop = _ => {}
export const toInt = str => parseInt(str, 10)
export const rand = (add=0) => _.random(1, 9999999)+add

let lastId = 0;
export const genId = (prefix = 'el') => `${prefix}${lastId++}`


/**
 * Принимает код валюты, возвращает символ,
 * например USD->$
 * @param {String} currencyCode
 * @returns {String}
 */
export const getCurrencyLabel = currencyCode => {
  switch (currencyCode) {
  case "RUB":
    return '&#8381;';
  case "USD":
    return '&#36;';
  case "EUR":
    return '&euro;';
  case "GBP":
    return '&pound;';
  case "CNY":
    return '&#65509;';
  default:
    return currencyCode;
  }
}
