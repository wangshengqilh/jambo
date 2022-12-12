import { Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get('screen')

const styles = StyleSheet.create({
  AddNewFriend: {
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
  ListHeaderComponent: {
    padding: 18,
    flexDirection: 'column'
  },
  headerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 18
  },
  country: {
    height: 46,
    borderRadius: 9,
    backgroundColor: '#EFF2F4',
    paddingHorizontal: 12,
    justifyContent: 'center'
  },
  countrytext: {
    lineHeight: 28,
    fontSize: 12,
  },
  button: {
    width: (width - (18 * 4)) / 3
  },
  searchtitle: {
    fontSize: 12
  },
  itemchildren: {
    padding: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: '#eee',
    borderBottomWidth: 1
  },
  itemchildrenleft: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  namebox: {
    flexDirection: 'column',
    marginLeft: 8
  },
  text1: {
    textAlign: 'left',
    fontSize: 14,
    color: '#4B4B4B',
    maxWidth: width - 148
  },
  text2: {
    fontSize: 12,
    color: '#4B4B4B'
  }
})

export default styles;