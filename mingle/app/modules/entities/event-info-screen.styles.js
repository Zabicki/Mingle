import { StyleSheet } from 'react-native'

import { Metrics, ApplicationStyles, Colors } from '../../shared/themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  mainContainer:{
    padding: 10
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
  button: {
    height: 40,
    width: 170,
    padding: 6,
    backgroundColor: Colors.sun,
    borderColor: Colors.sun,
    borderWidth: 1,
    borderRadius: 3,
    justifyContent: 'center',
  },
  textButton: {
    textAlign: 'center',
    color: 'white',
    fontWeight: '600',
  },
  row: {
    paddingBottom: Metrics.doubleBaseMargin,
    paddingHorizontal: Metrics.doubleBaseMargin,
    flexDirection: 'row',
    height: 70,
    alignItems: 'center',
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
    color: Colors.sun,
    marginTop: 15,
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
    fontWeight: '400',
    color: Colors.greyDark,
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
}

})
