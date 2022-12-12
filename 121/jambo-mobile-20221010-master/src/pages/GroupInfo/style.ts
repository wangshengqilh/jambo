import { Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get('screen')

const styles = StyleSheet.create({
  GroupInfo: {
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
  MembersList: {
    padding: 9,
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    overflow: 'hidden'
  },
  memberItem: {
    flexDirection: 'column',
    alignItems: 'center',
    width: (width - 108) / 5,
    margin: 9,
    overflow: 'hidden'
  },
  username: {
    fontSize: 8,
    color: '#4B4B4B',
    marginTop: 4
  },
  closeicon: {
    position: 'absolute',
    top: 0,
    right: 0
  },
  seemore: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text1: {
    marginVertical: 6,
    fontSize: 12,
    color: '#999',
    marginRight: 8
  },
  boxbutton: {
    padding: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  rightBox: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  text2: {
    color: '#4B4B4B',
    fontSize: 14,
  },
  text3: {
    fontSize: 12,
    color: '#4B4B4B',
    marginRight: 8
  },
  text4: {
    color: '#4B4B4B',
    fontSize: 12,
    padding: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    marginHorizontal: 18,
    marginBottom: 15,
    minHeight: 128,
  },
  text5: {
    color: '#E0E0E0',
    fontSize: 12,
  },
  text6: {
    color: '#EB1D36',
    fontSize: 14,
  },
  groupListView: {
    height: '78%'
  },
})

export default styles;