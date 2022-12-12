import { StatusBar, StyleSheet } from "react-native";
import { start } from "src/router/MyNavigation";

const styles = StyleSheet.create({
  Message: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 18,
    paddingTop: 18 + (StatusBar.currentHeight || 0)
  },
  headerItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  numApply: {
    position: 'absolute',
    backgroundColor: 'red',
    color: '#fff',
    fontSize: 8,
    paddingHorizontal: 6,
    lineHeight: 14,
    textAlign: 'center',
    borderRadius: 7,
    right: 16,
    bottom: 12
  },
  box: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    overflow: 'hidden',
  },
  msgItem: {
    borderBottomColor: '#E0E0E0',
    borderBottomWidth: 1,
    paddingHorizontal: 18,
    paddingVertical: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  msgItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1
  },
  Groupimg: {
    width: 50,
    height: 50,
    marginRight: 8
  },
  avatarView: {
    width: 50,
    height: 50,
    overflow: 'hidden'
  },
  nameView: {
    marginLeft: 8,
    marginRight: 8,
    flex: 1
  },
  nameText: {
    textAlign: 'left'
  },
  bottomView: {
    height: start + 2
  }
})

export default styles;