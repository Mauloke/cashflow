import React from 'react';
import { Navigation } from 'react-native-navigation';
import {Provider} from 'react-redux';
import configureStore from '../store/configureStore'
import theme from '../theme';

import AuthScreen from './Auth/Auth';
import AccountScreen from './Account/AccountScreen';
import AccountModalScreen from './Account/ModalAccount';
import WelcomeScreen from './Welcome/WelcomeScreen';
import SideDrawer from './SideDrawer/SideDrawer';
import CategoryScreen from './Category/CategoryScreen'
import CategoryModalScreen from './Category/ModalCategory'
import TransactionScreen from './Transaction/TransactionScreen'
import AddTransactionScreen from './Transaction/AddTransactionScreen'
import BukaBuku from './Transaction/BukaBuku'
import ModalAkun from './Transaction/ModalAkun'
import ModalKategori from './Transaction/ModalKategori'
import ModalBukaBuku from './Transaction/ModalBukaBuku'
import HealthScreen from './HealthCheck/HealthScreen';
import HealthResult from './HealthCheck/HealthResult';

const store = configureStore();

export function registerScreens(){
Navigation.registerComponent('GROW.AuthScreen', 
() => (props) =>
<Provider store={store}>
  <AuthScreen {...props} />
</Provider>,
() => AuthScreen)

Navigation.registerComponent('GROW.SideDrawer', 
() => (props) =>
<Provider store={store}>
  <SideDrawer {...props} />
</Provider>,
() => SideDrawer)

Navigation.registerComponent('GROW.AccountScreen',
() => (props) =>
<Provider store={store}>
  <AccountScreen {...props} />
</Provider>,
() => AccountScreen)

Navigation.registerComponent('GROW.WelcomeScreen',
() => (props) =>
<Provider store={store}>
  <WelcomeScreen {...props} />
</Provider>,
() => WelcomeScreen)


Navigation.registerComponent('GROW.AccountModalScreen',
() => (props) =>
<Provider store={store}>
  <AccountModalScreen {...props} />
</Provider>,
() => AccountModalScreen)


Navigation.registerComponent('GROW.CategoryScreen',
() => (props) =>
<Provider store={store}>
  <CategoryScreen {...props} />
</Provider>,
() => CategoryScreen)

Navigation.registerComponent('GROW.CategoryModalScreen',
() => (props) =>
<Provider store={store}>
  <CategoryModalScreen {...props} />
</Provider>,
() => CategoryModalScreen)

Navigation.registerComponent('GROW.TransactionScreen',
() => (props) =>
<Provider store={store}>
  <TransactionScreen {...props} />
</Provider>,
() => TransactionScreen)

Navigation.registerComponent('GROW.AddTransactionScreen',
() => (props) =>
<Provider store={store}>
  <AddTransactionScreen {...props} />
</Provider>,
() => AddTransactionScreen)

Navigation.registerComponent('GROW.BukaBuku',
() => (props) =>
<Provider store={store}>
  <BukaBuku {...props} />
</Provider>,
() => BukaBuku)

Navigation.registerComponent('GROW.ModalBukaBuku',
() => (props) =>
<Provider store={store}>
  <ModalBukaBuku {...props} />
</Provider>,
() => ModalBukaBuku)

Navigation.registerComponent('GROW.ModalAkun',
() => (props) =>
<Provider store={store}>
  <ModalAkun {...props} />
</Provider>,
() => ModalAkun)

Navigation.registerComponent('GROW.ModalKategori',
() => (props) =>
<Provider store={store}>
  <ModalKategori {...props} />
</Provider>,
() => ModalKategori)

Navigation.registerComponent('GROW.HealthScreen',
() => (props) =>
<Provider store={store}>
  <HealthScreen {...props} />
</Provider>,
() => HealthScreen)

Navigation.registerComponent('GROW.HealthResult',
() => (props) =>
<Provider store={store}>
  <HealthResult {...props} />
</Provider>,
() => HealthResult)


}



export function screenOptions(){
    Navigation.setDefaultOptions({
        statusBar: {
          backgroundColor: theme.COLORS.THEME
        },
        topBar: {
          title: {
            color: 'black'
          },
          backButton: {
            color: 'black'
          },
          background: {
            color: 'white'
          }
        },
        bottomTab: {
          fontSize: 14,
          selectedFontSize: 14
        },
        modal:{
          modalPresentationStyle: 'overCurrentContext',
            layout: {
              backgroundColor: 'transparent'
            }
        }
      });
}