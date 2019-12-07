import React, {Component} from 'react';
import {FlatList, Text, ScrollView} from 'react-native';
import {Overlay} from 'react-native-elements';
import {fetchData} from '../utilities/api';
import {Loading} from './Loading';
import Styles from './AppStyle';
import {RenderMovieItem} from './RenderMovieItem';

class Movies extends Component {
  static navigationOptions = {
    title: 'My Movies App',
    headerStyle: Styles.header,
  };
  state = {
    moviesArray: [],
    total_pages: 0,
    page: 0,
    loading: true,
    warning: false,
  };
  componentDidMount() {
    this.fetchMovies(1);
  }
  fetchMovies = page => {
    this.setState({loading: true});
    fetchData(page)
      .then(response => {
        const movieArray = response.results;
        this.setState(() => ({
          moviesArray: [...this.state.moviesArray, ...movieArray],
          page: response.page,
          total_pages: response.total_pages,
          loading: false,
        }));
        console.log('movies array here ', this.state.moviesArray);
      })
      .catch(error => {
        this.setState({loading: false, warning: true});
      });
  };
  isCloseToBottom({layoutMeasurement, contentOffset, contentSize}) {
    return (
      layoutMeasurement.height + contentOffset.y >= contentSize.height - 50
    );
  }
  hasMore = (page, totalPages) => {
    console.log('checkHasmore', page, totalPages);
    return Number(page) < Number(totalPages);
  };
  showOverlay = () => {
    if (this.state.warning) {
      setTimeout(() => {
        this.setState({warning: false});
      }, 3000);
      return true;
    } else {
      return false;
    }
  };

  render() {
    let {page, total_pages, loading} = this.state;
    return (
      <ScrollView
        onScroll={({nativeEvent}) => {
          if (
            this.isCloseToBottom(nativeEvent) &&
            this.hasMore(page, total_pages) &&
            !loading
          ) {
            this.fetchMovies(page + 1);
          }
        }}
        scrollEventThrottle={400}>
        <Overlay
          overlayBackgroundColor="rgba(196, 187, 222, .7)"
          windowBackgroundColor="rgba(0, 0, 0,0)"
          isVisible={this.showOverlay()}
          width={'90%'}
          height={40}>
          <Text>{'Error fetching data!..,please check connection'}</Text>
        </Overlay>
        <FlatList
          horizontal={false}
          data={this.state.moviesArray}
          renderItem={({item}) => <RenderMovieItem item={item} />}
          numColumns={2}
          keyExtractor={item => item.id.toString()}
        />
        {loading && <Loading />}
      </ScrollView>
    );
  }
}

export default Movies;
