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
    color: "#AEB5BC", 
    fontSize: 18,
    padding: 0  
  },
  textLocation: {
    color: "#AEB5BC", 
    fontSize: 18,
    padding: 0  
  },
  textLocationEdit: {
    color: "#AEB5BC", 
    fontSize: 18,
    padding: 0,
    borderColor: '#AEB5BC',
    borderWidth: 1,
    borderRadius: 10, 
  },
  buttonSection: {
    marginTop: 10,
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
    paddingBottom: Metrics.baseMargin,
    backgroundColor: 'white',
  },
  body: {
    backgroundColor: 'white',
  },
  button: {
    flex: 1,
    height: 40,
    width: 115,
    padding: 6,
    backgroundColor: Colors.sun,
    borderColor: Colors.sun,
    borderWidth: 1,
    borderRadius: 3,
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
    alignSelf: 'center',
  },
  textDescription: {
    width: 350,
    height: 110,
    fontSize: 18,
    color: "#AEB5BC",    
  },
  textDescriptionEdit: {
    width: 350,
    height: 110,
    fontSize: 18,
    color: "#AEB5BC",
    borderColor: '#AEB5BC',
    borderWidth: 1,
    borderRadius: 10,
  },
  editPhoto: {
    alignItems: 'center',
    marginTop: 20,
    padding: 0,
  },
  profileImageEdit: {
    marginTop: 10,
    alignSelf: "center",
    width: 200,
    height: 200,
    borderRadius: 100,
    overflow: "hidden"
  },
  description: {
    height: 150,
    alignItems: 'center',
  },
})
