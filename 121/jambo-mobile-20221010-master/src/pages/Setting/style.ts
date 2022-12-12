import { Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get('screen')

const styles = StyleSheet.create({
  Setting: {
    flex: 1,
  },
  title: {
    color: '#fff'
  },
  box: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    overflow: 'hidden',
  },
  itembutton1: {
    paddingHorizontal: 30,
    paddingVertical: 22,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text1: {
    color: '#4B4B4B',
    fontSize: 16
  }
})

export default styles;