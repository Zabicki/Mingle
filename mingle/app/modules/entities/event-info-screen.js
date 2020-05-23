import React, { Component } from 'react'
import { TextInput, Text, View, SafeAreaView, Image, ScrollView, TouchableHighlight, FlatList, List, ListItem, Alert} from "react-native";
import styles from './event-info-screen.styles'

//export default
class EventInfoScreen extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      eventName: "Football match",
      date: "25-05-2020",
      location: "Cracow",
      description: "Do you like playing football? Join us! We're going to organize a match on Monday.",
      participants: [
        {
          name: 'Amy Farha',
          avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
          age: '21',
        },
        {
          name: 'Chris Jackson',
          avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
          age: '29',
        },
        {
          name: 'Patrick Wilson',
          avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
          age: '22',
        },
        {
          name: 'Ann Rikke',
          avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
          age: '19',
        },
        {
          name: 'Rick Mars',
          avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
          age: '25',
        },
        
      ]
    }
  }

  renderSeparator = () => {  
    return (  
        <View  
            style={{  
                height: 1,  
                width: "100%",  
                backgroundColor: "#000",  
            }}  
        />  
    );  
};

renderItem(item) {
  return (
    <TouchableHighlight onPress={this.getListViewItem.bind(this, item)}>      
      <View style={styles.row}>
        <View style={styles.profileImage}>
          <Image source={require("../../shared/images/photo.png")} style={styles.image} resizeMode="center"></Image>
        </View>           
        <Text style={styles.item} >{item.name}</Text>
        <Text style={styles.item}>{item.age}</Text>
      </View>
  </TouchableHighlight> 
  )
}

getListViewItem = (item) => {  
    Alert.alert(item.name);  
    //go to user profile
}  

  render() {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.title}>
          <Text style={styles.eventNameText}>
            {this.state.eventName}
          </Text>
        </View>
        <View style={styles.row}>
          <View style={styles.wrapper}>
            <Text style={styles.text}>
              {this.state.date}
            </Text>
          </View>
          <View style={styles.wrapper}>
            <Text style={styles.text}>
              {this.state.location}
            </Text>
          </View>
        </View>
        <View style={styles.descriptionSection}>
          <Text multiline={true} style={styles.textDescription}>
            {this.state.description}
          </Text>
        </View>
        <View style={styles.title}>
          <Text style={styles.text}>
            {'Participants'}
          </Text>
        </View>
        <View style={styles.list}>
          <FlatList  
                    data={this.state.participants}  
                    renderItem={({ item }) => this.renderItem(item)} 
                    ItemSeparatorComponent={this.renderSeparator}  
                />  
        </View>   
      </View>
    );
  }
}



export default EventInfoScreen