import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  AreaCode: {
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
  scrollView: {
    paddingHorizontal: 18,
    backgroundColor: '#E1FDFF',
    paddingVertical: 18
  },
  item: {
    paddingHorizontal: 8,
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomColor: '#eee',
    borderBottomWidth: 1
  },
})

export default styles;