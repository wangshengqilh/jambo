import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  MyCarousel: {
    alignItems: 'center',
    position: 'relative',
  },
  flatList: {
    overflow: 'visible',
  },
  LiveRoomItemBox: {
    overflow: 'hidden'
  },
  moreBanner1: {
    backgroundColor: 'rgba(0,0,0,0)',
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    zIndex: 999
  },
  moreBanner2: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0)',
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    zIndex: 999
  }
})

export default styles;