import React from 'react'
import { browserHistory, Router } from 'react-router'
import { Provider } from 'react-redux'
import { IntlProvider, addLocaleData } from 'react-intl'
import PropTypes from 'prop-types'
import IWThemeProvider from './iwtheme-provider'

import ru from 'react-intl/locale-data/ru'
import en from 'react-intl/locale-data/en'
import de from 'react-intl/locale-data/de'
import zh from 'react-intl/locale-data/zh'

addLocaleData([...en, ...ru, ...de, ...zh])

class OptionsProvider extends React.Component {
  static propTypes = {
    children: PropTypes.node,
    options: PropTypes.object,
  };
  
  static contextTypes = {
    options: PropTypes.object
  };

  static childContextTypes = {
    options: PropTypes.object
  };

  getChildContext() {
    return {
      options: this.props.options
    };
  }

  render() {
    return React.Children.only(this.props.children);
  }
}


class App extends React.Component {
  static propTypes = {
    options: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired,
    routes: PropTypes.object.isRequired,
  }

  shouldComponentUpdate () {
    return false
  }

  render () {
    const {locale, messages} = this.props.options

    return (
      <Provider store={this.props.store}>
        <IntlProvider locale={locale} messages={messages}>
          <IWThemeProvider theme="alfa-on-white">
            <OptionsProvider options={this.props.options}>
              <div className="iwns__main-container">
                <Router history={browserHistory} children={this.props.routes} />
              </div>
            </OptionsProvider>
          </IWThemeProvider>
        </IntlProvider>
      </Provider>
    )
  }
}

export default App
