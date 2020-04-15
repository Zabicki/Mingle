import { StyleSheet } from 'react-native'

import { ApplicationStyles, Colors } from '../../../shared/themes'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1,
    padding: 20,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
    alignSelf: 'center',
  },
  button: {
    height: 40,
    backgroundColor: Colors.sun,
    borderColor: Colors.sun,
    borderWidth: 1,
    borderRadius: 3,
    alignSelf: 'stretch',
    marginBottom: 20,
    justifyContent: 'center',
  },
  buttonSection: {
    marginTop: 10,
    alignItems: 'center',
  },
})
