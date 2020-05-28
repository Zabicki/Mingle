import { StyleSheet } from 'react-native'

import { Metrics, ApplicationStyles, Colors } from '../../../shared/themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1,
    backgroundColor: "#FFF"
  },
  textName: {
    color: Colors.sun,
    fontSize: 36,
    fontWeight: "200",
    padding: 5
    
  },
  textAge: {
    fontWeight: "bold",
    color: Colors.greyDark, 
    fontSize: 20,
    padding: 0  
  },
  textLocation: {
    color: Colors.greyDark, 
    fontSize: 20,
    padding: 0  
  },
  buttonSection: {
    padding: 20,
    alignItems: 'center',
  },
  scrollView: {
    paddingBottom: Metrics.baseMargin,
    backgroundColor: 'white',
  },
  infoContainer: {
    alignSelf: "center",
    alignItems: "center",
    margin: 5,
  },
  image: {
    flex: 1,
    height: undefined,
    width: undefined
  },
  profileImage: {
    marginTop: 48,
    alignSelf: "center",
    width: 200,
    height: 200,
    borderRadius: 100,
    overflow: "hidden"
  },
  scrollView: {
    paddingBottom: Metrics.doubleBaseMargin,
    backgroundColor: 'white',
    marginBottom: 10,
  },
  body: {
    backgroundColor: 'white',
  },
  button: {
    flex: 1,
    height: 40,
    padding: 6,
    backgroundColor: Colors.sun,
    borderColor: Colors.sun,
    borderWidth: 1,
    borderRadius: 3,
    justifyContent: 'center',
    alignSelf: 'stretch',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
    alignSelf: 'center',
  },
  textDescription: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.snow,
  },
  description: {
    height: 100,
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 5,
    marginTop: 15,
    padding: 10,
    borderRadius: 10,
    elevation: 5,
    borderRadius: 5,
    shadowColor: 'black',
    flexDirection: 'row',
    backgroundColor: Colors.greyDark,
    alignItems: 'center',
    justifyContent: 'center',
  },

})
