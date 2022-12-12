import { Dimensions, StatusBar, StyleSheet } from "react-native";
import { start } from "src/router/MyNavigation";

const { width } = Dimensions.get('screen')

const styles = StyleSheet.create({
  Credits: {
    flex: 1,
    paddingBottom: start + 2
  },
  header: {
    paddingHorizontal: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: (StatusBar.currentHeight || 0) + 8,
    paddingBottom: 8
  },
  img1: {
    width: 128,
    height: 67
  },
  content: {
    width: width - 36,
    marginLeft: 18,
    borderRadius: 50,
    paddingHorizontal: 18,
    paddingVertical: 32,
    marginTop: 32
  },
  title1: {
    fontSize: 22,
    color: '#4B4B4B',
    textAlign: 'left'
  },
  title2: {
    fontSize: 32,
    color: '#4B4B4B',
    textAlign: 'left'
  },
  title3: {
    fontSize: 20,
    color: '#4B4B4B',
  }
})

export default styles;