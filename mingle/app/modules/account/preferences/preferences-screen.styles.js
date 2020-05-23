import { StyleSheet } from 'react-native'

import { ApplicationStyles, Colors } from '../../../shared/themes'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1,
    paddingTop: 50,
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
    margin: 8,
  },
})
