import { Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get('screen')

const styles = StyleSheet.create({
  Score: {
    flex: 1,
    backgroundColor: '#fff'
  },
  ScoreBox: {
    paddingHorizontal: 26
  },
  text1: {
    fontSize: 18,
    color: '#4B4B4B',
    lineHeight: 27,
    marginTop: 32
  },
  text2: {
    fontSize: 55,
    marginBottom: 24
  },
  text3: {
    fontSize: 20,
    color: '#4B4B4B',
    lineHeight: 30,
  },
  text4: {
    color: '#4B4B4B',
    textAlign: 'center'
  },
  button: {
    width: '100%',
    marginTop: 32
  }
})

export default styles;