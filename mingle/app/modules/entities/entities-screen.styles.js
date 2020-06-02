import { StyleSheet } from 'react-native'

import { ApplicationStyles, Colors } from '../../shared/themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1,
    padding: 20,
  },
  centerText: {
    textAlign: 'center',
  },
  button: {
    height: 45,
    backgroundColor: Colors.sun,
    borderColor: Colors.sun,
    borderWidth: 1,
    borderRadius: 3,
    margin: 15,
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
  wrapper: {
    flex: 1,
    alignItems: 'center',
  },
  textButton: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
    fontWeight: '600',
  },
})
