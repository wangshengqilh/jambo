import { Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get('screen')

const styles = StyleSheet.create({
  Sign: {
    flex: 1,
    flexDirection: 'column-reverse'
  },
  box: {
    height: '76%',
    backgroundColor: '#fff',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    overflow: 'hidden',
    paddingHorizontal: 32,
  },
  title: {
    marginTop: 38,
    textAlign: 'left'
  },
  tip1: {
    marginBottom: 52
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
  box1: {
    paddingBottom: 38
  },
  checkbox: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  text1: {
    color: '#4B4B4B',
    fontSize: 10,
    marginLeft: 6,
    width: width - 64 - 40 - 6,
  },
  next: {
    marginTop: 28
  },
  tip3: {
    textDecorationLine: 'underline'
  },
})

export default styles;