import { Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get('screen')

const styles = StyleSheet.create({
  EditInfo: {
    flex: 1,
  },
  title2: {
    color: '#fff'
  },
  box1: {
    paddingVertical: 28
  },
  box1_1: {
    width: 258,
    height: 258,
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 20,
    flexDirection: 'column',
    justifyContent: 'space-around'
  },
  title1: {
    color: '#4B4B4B'
  },
  text1: {
    color: '#4B4B4B',
    fontSize: 12
  },
  box: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    overflow: 'hidden',
    paddingHorizontal: 38,
  },
  boxScroll: {
    paddingTop: 38
  },
  FormControl: {
    marginBottom: 18
  },
  dateView: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  interval: {
    width: 12
  },
  dateinput: {
    textAlign: 'center'
  },
  Finish: {
    marginBottom: 58
  }
})

export default styles;