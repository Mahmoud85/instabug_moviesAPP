import React from 'react';
import {View, TouchableOpacity, Text, Dimensions} from 'react-native';
import {Card} from 'react-native-elements';
const placeHolder = require('.././assets/images/placeHolder.jpg');
const placeHolder2 = require('.././assets/images/placeHolder2.png');
import Styles from './AppStyle';

export const RenderMovieItem = ({item}) => {
  const imageBaseURL = 'https://image.tmdb.org/t/p/w500/';
  const {width} = Dimensions.get('window');
  const {oneColumn} = item;
  const itemWidth = !oneColumn ? (width - 10) / 2 : width - 10;
  return (
    <TouchableOpacity key={item.id}>
      <View style={{width: itemWidth}}>
        <Card
          containerStyle={!oneColumn ? {minHeight: 560} : {minHeight: 450}}
          title={
            item.title.length > 30
              ? item.title.substring(0, 30 - 3) + '...'
              : item.title
          }
          titleStyle={Styles.title}
          image={
            item.poster_path
              ? {uri: `${imageBaseURL + item.poster_path}`}
              : item.imageURL
              ? {uri: `${item.imageURL}`}
              : oneColumn
              ? placeHolder2
              : placeHolder
          }
          imageStyle={Styles.height250}>
          <View style={Styles.releaseDateContainer}>
            <Text style={Styles.release_date}>
              {'Release Date '}
              {`${item.release_date}`}
            </Text>
          </View>
          {!oneColumn ? (
            <View style={Styles.overview}>
              <Text>
                {item.overview.length > 140
                  ? item.overview.substring(0, 140 - 3) + '...'
                  : item.overview}
              </Text>
            </View>
          ) : (
            <View style={Styles.overview}>
              <Text>{item.overview}</Text>
            </View>
          )}
        </Card>
      </View>
    </TouchableOpacity>

    //todo upon click take the user to details page
  );
};
