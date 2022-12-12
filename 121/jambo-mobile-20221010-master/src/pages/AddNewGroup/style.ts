import { Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get('screen')

const styles = StyleSheet.create({
  AddNewGroup: {
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
    position: 'relative'
  },
  ListHeaderComponent: {
    padding: 18,
    flexDirection: 'column'
  },
  title1: {
    color: '#B5B7CA',
    fontSize: 14,
    textAlign: 'left',
    marginTop: 8,
    marginBottom: 18
  },
  itemChildrenMember: {
    flexDirection: 'column',
    alignItems: 'center',
    position: 'relative'
  },
  title2: {
    fontSize: 8,
    color: '#4B4B4B'
  },
  closeicon: {
    position: 'absolute',
    top: 0,
    right: 0
  },
  headerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 18
  },
  button: {
    width: (width - (18 * 4)) / 3,
    marginRight: 18
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
    alignItems: 'center',
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
  },
  createbutton: {
    position: 'absolute',
    bottom: 18,
    left: 18,
    right: 18
  }
})

export default styles;