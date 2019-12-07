import {StyleSheet} from 'react-native';

const Styles = StyleSheet.create({
  modal: {
    paddingTop: 20,
    paddingBottom: 20,
    justifyContent: 'center',
    margin: 20,
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 20,
  },
  title: {
    fontSize: 13,
    height: 45,
    marginRight: 4,
    marginLeft: 4,
  },
  margin20: {
    marginTop: 20,
    marginBottom: 20,
  },
  addNewIcon: {
    position: 'absolute',
    bottom: 15,
    right: 20,
    alignSelf: 'flex-end',
    zIndex: 999,
  },
  padding10: {
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  header: {
    backgroundColor: '#9A83CF',
  },
  formLabel: {
    fontSize: 18,
    marginLeft: 20,
    //flex: 1,
  },
  height250: {
    height: 250,
  },
  imagePreview: {
    width: '100%',
    height: '90%',
  },
  datePicker: {
    width: '95%',
    marginTop: 10,
    marginLeft: 10,
  },
  pickerContainer: {
    width: 300,
  },
  release_date: {
    color: '#C605FF',
    paddingRight: 10,
    paddingLeft: 10,
    paddingTop: 5,
    paddingBottom: 5,
    fontSize: 12,
    justifyContent: 'center',
  },
  overview: {
    marginBottom: 0,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  releaseDateContainer: {
    backgroundColor: '#C4BBDE',
    alignItems: 'center',
    marginBottom: 15,
  },
});
export default Styles;
