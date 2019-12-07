import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Modal,
  FlatList,
  ScrollView,
  Button,
  Alert,
} from 'react-native';
import {Icon, Input, Image} from 'react-native-elements';
import Styles from './AppStyle';
import DatePicker from 'react-native-datepicker';
import ImagePicker from 'react-native-image-picker';
import {formatDate} from '../utilities/tools';
const placeHolder2 = require('.././assets/images/placeHolder2.png');
import {RenderMovieItem} from './RenderMovieItem';
import {generateUID} from '../utilities/tools';

class Mymovies extends Component {
  static navigationOptions = {
    title: 'My Movies App',
    headerStyle: Styles.header,
  };
  state = {
    movies: [],
    showModal: false,
    title: '',
    release_date: '',
    imageURL: '',
    overview: '',
    id: '',
    oneColumn: true,
  };
  toggleModal = () => {
    this.setState({showModal: !this.state.showModal});
  };
  resetForm = () => {
    this.setState({
      overview: '',
      title: '',
      release_date: '',
      imageURL: '',
      id: '',
    });
  };
  handleTextChange = e => {
    this.setState(() => ({
      ...this.state,
      [e.name]: e.target.value,
    }));
  };
  handleSubmit = () => {
    const {title, overview, release_date, imageURL, oneColumn} = this.state;
    const id = generateUID();
    const newMovie = {title, overview, release_date, imageURL, id, oneColumn};
    this.setState(
      () => ({
        ...this.state,
        movies: this.state.movies.concat(newMovie),
      }),
      () => {
        this.toggleModal();
      },
    );
  };
  checkFileSize = filesize => {
    if (filesize / 1000000 > 5) {
      //I think this is a good practice dealing with images online
      Alert.alert('Error.., Image can not be more Than 5MB');
      return true;
    }
  };
  pickAFile = () => {
    const options = {
      quality: 0.6,
      title: '',
      // customButtons: [
      //   { name: 'pdf', title: localizeString('FinanceApply.documents') },
      // ],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
      cancelButtonTitle: 'Cancel',
      takePhotoButtonTitle: 'Take a Photo',
      chooseFromLibraryButtonTitle: 'Choose from Gallery',
      mediaType: 'photo',
    };
    ImagePicker.showImagePicker(options, async response => {
      let item = {};
      if (response.error) {
        Alert.alert(response.error);
      } else if (!response.didCancel) {
        if (this.checkFileSize(response.fileSize)) {
          return;
        }
        item = {
          ...item,
          imageURL: response.uri,
          type: 'image',
          picked: true,
        };
      }
      if (item.picked) {
        this.setState({
          imageURL: item.imageURL,
        });
      }
    });
  };
  validateInputs = () => {
    return (
      this.state.title === '' ||
      this.state.overview === '' ||
      this.state.release_date === ''
    );
  };

  render() {
    return (
      <View style={Styles.centerContent}>
        <TouchableOpacity
          style={Styles.addNewIcon}
          onPress={() => {
            this.toggleModal();
          }}>
          <View>
            <Icon
              name="add-circle-outline"
              type="ioicon"
              size={50}
              color="#C605FF"
            />
          </View>
        </TouchableOpacity>
        {this.state.movies.length > 0 ? (
          <FlatList
            horizontal={false}
            data={this.state.movies}
            // renderItem={RenderMovieItem}
            renderItem={({item}) => <RenderMovieItem item={item} />}
            keyExtractor={item => item.id.toString()}
          />
        ) : (
          <Text>{'Yo Dont have any Movies'}</Text>
        )}
        <Modal
          animationType={'slide'}
          transparent={false}
          visible={this.state.showModal}>
          <ScrollView contentContainerStyle={Styles.modal}>
            <View style={(Styles.centerContent, {height: 300, marginTop: 60})}>
              <Image
                source={
                  this.state.imageURL !== ''
                    ? {uri: this.state.imageURL}
                    : placeHolder2
                }
                style={Styles.imagePreview}
              />
              <TouchableOpacity style={Styles.addNewIcon}>
                <Icon
                  raised
                  name="camera"
                  type="font-awesome"
                  color="#C605FF"
                  onPress={() => this.pickAFile()}
                />
              </TouchableOpacity>
            </View>
            <Input
              placeholder="Movie Name"
              leftIcon={{type: 'font-awesome', name: 'film', color: '#C605FF'}}
              inputStyle={Styles.padding10}
              onChangeText={title => this.setState({title})}
              value={this.state.title}
              errorMessage={this.state.authorErrMess}
            />
            <Input
              placeholder="Brief Description of the Movie"
              leftIcon={{type: 'font-awesome', name: 'info', color: '#C605FF'}}
              inputStyle={Styles.padding10}
              multiline={true}
              onChangeText={overview => this.setState({overview})}
              value={this.state.overview}
              errorMessage={this.state.commentErrMess}
            />
            <View style={Styles.margin20}>
              <Text style={Styles.formLabel}>Release Date</Text>
              <DatePicker
                date={this.state.release_date}
                format="YYYY-MM-DD"
                mode="date"
                placeholder="Select Date"
                maxDate={formatDate(new Date())}
                confirmBtnText="Confirm"
                style={Styles.datePicker}
                cancelBtnText="Cancel"
                containerStyle={Styles.pickerContainer}
                customStyles={{
                  dateIcon: {
                    position: 'absolute',
                    left: 20,
                    top: 4,
                    marginLeft: 0,
                    marginRight: 20,
                  },
                  dateInput: {
                    marginLeft: 10,
                  },
                }}
                onDateChange={date => {
                  this.setState({release_date: date});
                }}
              />
            </View>

            <View style={Styles.margin20}>
              <Button
                disabled={this.validateInputs()}
                title="Submit"
                onPress={() => {
                  this.handleSubmit();
                  this.resetForm();
                }}
                color="#512DA8"
              />
            </View>

            <View style={Styles.margin20}>
              <Button
                onPress={() => {
                  this.toggleModal();
                  // this.resetForm();
                }}
                title="Cancel"
                color="#512DA8"
              />
            </View>
          </ScrollView>
        </Modal>
      </View>
    );
  }
}

export default Mymovies;
