import { StyleSheet } from 'react-native'

import { Colors, Metrics } from '../../shared/themes'

export default StyleSheet.create({
  contentContainer: {
    justifyContent: 'center',
  },
  container: {
    paddingTop: 70,
    backgroundColor: Colors.snow,
  },
  form: {
    backgroundColor: Colors.grey,
    margin: 15,
    paddingTop: 10,
    borderRadius: 10,
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 8,
    elevation: 5,
  },
  row: {
    paddingVertical: Metrics.doubleBaseMargin,
    paddingHorizontal: 20,
  },
  rowLabel: {
    fontSize: 18,
    fontFamily: 'verdana',
    fontWeight: 'bold',
    color: Colors.sun,
  },
  textInput: {
    height: 40,
    color: Colors.coal,
  },
  textInputReadonly: {
    height: 40,
    color: Colors.steel,
  },
  loginRow: {
    paddingBottom: Metrics.doubleBaseMargin,
    paddingHorizontal: Metrics.doubleBaseMargin,
    flexDirection: 'row',
  },
  loginButtonWrapper: {
    flex: 1,
  },
  loginButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: Colors.savanna,
    backgroundColor: Colors.sun,
    padding: 6,
  },
  loginText: {
    textAlign: 'center',
    color: Colors.silver,
  },
  topLogo: {
    alignSelf: 'center',
    resizeMode: 'contain',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
    alignSelf: 'center',
  },
  button: {
    height: 40,
    width: 350,
    backgroundColor: Colors.sun,
    borderColor: Colors.sun,
    borderWidth: 1,
    borderRadius: 3,
    marginBottom: 20,
    justifyContent: 'center',
  },
  buttonSection: {
    marginTop: 10,
    alignItems: 'center',
  },
})
