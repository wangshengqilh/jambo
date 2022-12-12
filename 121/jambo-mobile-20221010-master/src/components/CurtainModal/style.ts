import { Dimensions, StyleSheet } from "react-native";

const { width, height } = Dimensions.get('screen')

const styles = StyleSheet.create({
  Home: {
    flex: 1,
  },
  headerView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 14,
    height: 56,
    width: width,
    marginLeft: -4,
    // backgroundColor: theme.colors.background
  },
  headerLeft: {
    flex: 1,
    borderRadius: 19
  },
  searchInput: {
    height: 38,
    lineHeight: 32,
    marginTop: -6,
  },
  searchIcon: {
    marginTop: 16
  },
  headerRight: {
    width: 38,
    height: 38,
    borderRadius: 19,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 16
  },

  CarouselHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 42,
    paddingHorizontal: 14
  },
  CarouselHeaderLeft: {
    // color: theme.colors.primary,
    fontSize: 16
  },
  CarouselHeaderRight: {
    // color: theme.colors.primary,
    fontSize: 15
  },

  MyCarouselItemBox: {
    // backgroundColor: theme.colors.background,
    height: height / 2,
  },
  MyCarouselItem: {
    flex: 1,
    paddingHorizontal: 14,
    paddingVertical: 14,
    flexDirection: 'column',
    justifyContent: 'space-between',
    position: 'relative'
  },
  MyCarouselItemUp: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  MyCarouselItemUpLeft: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  MyCarouselItemUpLeftTextView: {
    flexDirection: 'column',
    marginLeft: 10
  },
  MyCarouselItemUpLeftText1: {
    fontSize: 14,
    color: '#0A1F44'
  },
  MyCarouselItemUpLeftText2: {
    fontSize: 13,
    color: '#4E586E'
  },
  MyCarouselItemLive: {
    width: 52,
    height: 18,
    borderRadius: 9,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 72,
    left: 14
  },
  MyCarouselItemLiveText: {
    fontSize: 12,
    marginLeft: 4
  },
  MyCarouselItemDown: {
    flexDirection: 'column'
  },
  MyCarouselItemDownMonitor: {
    width: 158,
    height: 34,
    borderRadius: 17,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  MyCarouselItemDownMonitorText: {
    fontSize: 16,
    marginLeft: 10
  },
  MyCarouselItemDownTopic: {
    fontSize: 16,
    color: '#F54B64',
    // fontWeight: 'bold',
    marginTop: 24
  },
  MyCarouselItemDownTopicIntroduction: {
    fontSize: 15
  },
  MyCarouselItemDownBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  MyCarouselItemDownBottomLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  MyCarouselItemDownBottomLeftChip: {
    borderWidth: 0,
    backgroundColor: 'rgba(0,0,0,0)'
  },

  avatarItem: {
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatarItemView: {
    width: 62,
    height: 62,
    borderRadius: 31,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative'
  },
  avatarItemViewPointView: {
    position: 'absolute',
    width: 12,
    height: 12,
    right: 3,
    bottom: 3,
    borderRadius: 6,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarItemViewPoint: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#7ED321'
  },
  avatarItemText: {
    fontSize: 12,
    marginTop: 6
  },

  UpcomingBox: {
    flex: 1
  },
  UpcomingBoxButton: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
    flexDirection: 'column',
    justifyContent: 'flex-end'
  },
  UpcomingBoxButtonFooter: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  UpcomingBoxButtonFooterAvatarView: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#FF2D55',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 5
  },

  Brands: {
    flex: 1,
    flexDirection: 'column'
  },
  BrandsImage: {
    width: '100%',
    height: 136,
    borderRadius: 8
  },
  UpcomingBoxButtonFooterTrending: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6
  },
  UpcomingBoxButtonFooterTrendingAvatarView: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#FF2D55',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 5
  },

  ForYou: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10
  },
  ForYouItem: {
    borderRadius: 8,
    overflow: 'hidden',
    marginHorizontal: 4,
    marginVertical: 4,
    position: 'relative'
  },
  ForYouItemOne: {
    width: ((width - 20) / 5) * 2 - 8,
    height: ((width - 20) / 5) * 2 - 8
  },
  ForYouItemRightView: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    width: ((width - 20) / 5) * 3,
  },
  ForYouItemTwo: {
    width: (width - 20) / 5 - 8,
    height: (width - 20) / 5 - 8
  },
  ForYouItemMask: {
    position: 'absolute',
    width: (width - 20) / 5 - 8,
    height: (width - 20) / 5 - 8,
    backgroundColor: 'rgba(0,0,0,0.6)',
    top: 0,
    left: 0,
    justifyContent: 'center',
    alignItems: 'center'
  },
  ForYouItemMaskText: {
    fontSize: 17
  },

  Modal: {
    flex: 1,
    flexDirection: 'column',
  },
  ModalClose: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.2)'
  },
  ModalContent: {
    backgroundColor: '#fff',
    paddingHorizontal: 14,
    paddingVertical: 14,
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14
  },
  ModalContentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 26
  },
  ModalContentHeaderText1: {
    color: '#000',
    fontSize: 17,
    // fontWeight: 'bold'
  },
  ModalContentHeaderText2: {
    fontSize: 15,
    color: 'rgba(0,0,0,0.5)',
    textDecorationLine: 'underline'
  },
  ModalContentHeaderText3: {
    fontSize: 15,
    // color: theme.colors.primary,
    textDecorationLine: 'underline'
  },
  ModalContentButton: {
    width: '100%',
    height: 44,
    marginBottom: 26
  }
})

export default styles;