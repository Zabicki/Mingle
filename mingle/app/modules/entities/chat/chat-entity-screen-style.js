import { StyleSheet } from 'react-native'

import { ApplicationStyles, Metrics, Colors } from '../../../shared/themes'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container:{
    padding: 20
  },
  eventNameText: {
    textAlign: 'center',
    fontSize: 28,
    fontWeight: '700',
    color: Colors.greyDark,
    marginTop: 15,
  },
  title: {
    alignItems: "center",
  },
  textDescription: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.snow,
  },
  description: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.snow,
  },
  row: {
    paddingBottom: Metrics.doubleBaseMargin,
    paddingHorizontal: Metrics.doubleBaseMargin,
    flexDirection: 'row',
    height: 70,
    alignItems: 'center',
    flex: 1,
    backgroundColor: Colors.sun,
    marginVertical: Metrics.baseMargin,
  },
  itemName: {
    padding: 10,
    fontSize: 18,
    height: 44,
    fontWeight: 'bold',
    color: Colors.snow,
  },
  descriptionSection: {
    height: 200,
    marginLeft: 15,
    marginRight: 15,
    margin: 10,
    padding: 10,
    paddingBottom: 30,
    borderRadius: 10,
    elevation: 5,
    shadowColor: 'black',
    flexDirection: 'row',
    backgroundColor: Colors.greyDark,

    justifyContent: 'center',
  },
  wrapper: {
    flex: 1,
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '700',
    color: Colors.snow,
    marginTop: 15,
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
    fontWeight: '400',
    color: Colors.snow,
  },
  image: {
    alignSelf: "center",
    width: 60,
    height: 60,
    borderRadius: 30,
    overflow: "hidden"

  },
  list: {
    margin: 15,
    height: 180,
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
})
