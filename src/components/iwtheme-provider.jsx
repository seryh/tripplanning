import ThemeProvider from 'arui-feather/theme-provider'
import Type from 'prop-types'

export class IWThemeProvider extends ThemeProvider {
  static propTypes = {
    /** Дочерний элемент `ThemeProvider` */
    children: Type.node,
    /** Дополнительный класс */
    className: Type.string,
    /** Тема компонента */
    theme: Type.oneOf(['alfa-on-white','iway'])
  };
}


export default IWThemeProvider
