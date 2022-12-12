import { Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get('screen')

const styles = StyleSheet.create({
  Discipline: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  title: {
    color: '#FFFFFF'
  },
  box1: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  diamond: {
    width: 65,
    height: 65,
    marginRight: 4
  },
  title1: {
    color: '#fff',
    fontSize: 64
  },
  content: {
    paddingHorizontal: 18,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  text1: {
    fontSize: 16,
    color: '#FFA800'
  },
  text2: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center'
  },
  next: {
    width: '100%'
  },
  img: {
    width: width - 36,
    height: width - 36,
    marginLeft: 18,
  }
})

export default styles;