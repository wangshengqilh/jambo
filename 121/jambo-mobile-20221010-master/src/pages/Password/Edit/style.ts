import { Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get('screen')

const styles = StyleSheet.create({
  Login: {
    flex: 1,
    flexDirection: 'column-reverse'
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  titleStyle: {
    color: '#fff'
  },
  box: {
    height: '76%',
    backgroundColor: '#fff',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    overflow: 'hidden',
    paddingHorizontal: 38,
    paddingVertical: 38
  },
  FormControl: {
    marginBottom: 18
  },
  tip: {
    width: width - 38 - 38 - 14
  },
  next: {
    marginVertical: 38
  }
})

export default styles;