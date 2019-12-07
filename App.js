import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
} from 'react-native/Libraries/NewAppScreen';
import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import Movies from './components/Movies';
import Moviedetails from './components/Moviedetails';
import Mymovies from './components/Mymovies';
import {Icon} from 'react-native-elements';

class App extends Component {
  render() {
    return <Container />;
  }
}
const MoviesStack = createStackNavigator({
  Movies: Movies,
  Moviedetails: Moviedetails,
});
const MyMoviesStack = createStackNavigator({
  Mymovies: Mymovies,
});

const Container = createAppContainer(
  createBottomTabNavigator(
    {
      Movies: MoviesStack,
      Mymovies: MyMoviesStack,
    },
    {
      defaultNavigationOptions: ({navigation}) => ({
        tabBarIcon: ({focused, horizontal, tintColor}) => {
          const {routeName} = navigation.state;
          let iconName;
          if (routeName === 'Movies') {
            iconName = 'ios-film';
          } else if (routeName === 'Mymovies') {
            iconName = 'ios-folder';
          }
          return (
            <Icon type="ionicon" name={iconName} size={25} color={tintColor} />
          );
        },
      }),
      tabBarOptions: {
        activeTintColor: '#C605FF',
        inactiveTintColor: '#F3F2F3',
        labelStyle: {
          fontSize: 14,
          fontWeight: 'bold',
        },
        style: {
          backgroundColor: '#C4BBDE',
        },
      },
    },
  ),
);

export default App;
