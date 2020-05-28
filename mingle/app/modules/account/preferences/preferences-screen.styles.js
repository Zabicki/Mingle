import { StyleSheet } from 'react-native'

import { ApplicationStyles, Colors } from '../../../shared/themes'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1,
    paddingTop: 50,
    padding: 20,
  },
  title: {
    marginBottom: 20,
    alignSelf: "center",
    fontSize: 30,
    fontWeight: 'bold',
    color: Colors.greyDark,
  },
  checkboxContainer: {
    flexDirection: "row",
    marginBottom: 20,
    marginLeft: 150,
  },
  checkbox: {
    alignSelf: "center",
  },
  label: {
    color: Colors.greyDark,
    fontSize: 16,
    margin: 8,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
    alignSelf: 'center',
  },
  button: {
    height: 45,
    backgroundColor: Colors.sun,
    borderColor: Colors.sun,
    borderWidth: 1,
    borderRadius: 3,
    marginBottom: 10,
    justifyContent: 'center',
    alignSelf: 'stretch',
  },
  buttonSection: {
    marginTop: 10,
  },
})
