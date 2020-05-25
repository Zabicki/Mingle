import './app/config'
import {INITIALIZING, registerScreensAndStartApp} from './app/navigation/layouts'
import {Navigation} from 'react-native-navigation';

// this registers the screens and starts the react-native-navigation process
registerScreensAndStartApp()

Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot({
    root: {
      component: {
        name: INITIALIZING
      }
    },
  });
});
