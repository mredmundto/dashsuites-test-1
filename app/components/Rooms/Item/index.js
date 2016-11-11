import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text,
  View,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity
} from 'react-native';
import _ from 'lodash';
import { Actions } from 'react-native-router-flux';

class RoomDetail extends Component {
  onClick() {
    Actions.CreateReview();
  }
  convertTimeFormat(dateObject){

  }

  render() {
    if (!this.props.activeRoom) {
      return (
        <View>
          <Text style={styles.welcome}> please select a room</Text>
        </View>
			);
    }

    return (
      <ScrollView>
        {_.map(this.props.activeRoom, (value, key) => {
          if (key === 'image') {

          return (
           <Image
             key={key}
             style={{ width: 380, height: 200 }}
             
             // react native image does not support dynamic rendering via require (require is for rendering local images)
             // for Demo purpose, we hardcode source to support demo without the internet            
             source={require('../../../../resources/images/1.jpg')}

             // we will use this for live app 
             //source={{uri: value}}
           />
            );
          }
          return <Text style={styles.content} key={key}> {key} : {value} </Text>;

        })}

        <TouchableOpacity
          style={styles.button}
          onPress={() => this.onClick()}
        >
          <Text style={styles.buttonText}> Submit a review </Text>
        </TouchableOpacity>

        <Text style={styles.content}>
          All reviews
        </Text>

        {this.props.reviews.map(review => {
            if (review.room === this.props.activeRoom.number){
              return (
                <Text key={review.time}> 
                  {review.time.toString()}
                  - Rating {review.rating}
                </Text>
              );
            }
        })}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  button: {
    backgroundColor: '#1976d2',
    height:50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    fontSize:20,
    color: 'white'
  },
  welcome: {
    fontSize: 25,
    margin: 5,
  },
  content: {
    fontSize: 20,
    margin: 5,
  },
});

function mapStateToProps(state) {
  return {
    rooms: state.rooms,
    activeRoom: state.activeRoom,
    reviews: state.reviews,
  };
}

export default connect(mapStateToProps)(RoomDetail);
