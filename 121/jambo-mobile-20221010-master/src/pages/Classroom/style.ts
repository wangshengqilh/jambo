import { Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get('screen')

const styles = StyleSheet.create({
  Classroom: {
    flex: 1
  },
  page: {
    color: '#fff',
    fontSize: 12
  },
  box: {
    flex: 1,
  },
  itemChildText: {
    color: '#fff',
    paddingHorizontal: 18
  },
  text1: {
    fontSize: 12,
    color: '#ddd',
    paddingHorizontal: 28
  },
  text2: {
    color: '#FFA800',
    textAlign: 'left',
    paddingHorizontal: 28,
    fontSize: 24
  },
  box1: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 28,
    marginBottom: 18
  },
  webView1: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#000'
  },
  webView2: {
    height: width * 0.563,
    width: width,
    marginTop: 12,
    backgroundColor: '#000'
  },
  sponsor: {
    width: 84,
    height: 28,
    marginRight: 6
  },
  imgDialog: {
    width: 114,
    height: 46
  },
  NextExam: {
    marginVertical: 18,
    marginHorizontal: 28
  },
  hyperlinks: {
    marginVertical: 14,
    color: '#009DCE'
  },

  Discipline: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  title: {
    color: '#FFFFFF'
  },
  box11: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  diamond: {
    width: 65,
    height: 65,
    marginRight: 4
  },
  title1: {
    color: '#fff',
    fontSize: 64
  },
  content: {
    paddingHorizontal: 18,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  text11: {
    fontSize: 16,
    color: '#FFA800'
  },
  text22: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center'
  },
  next: {
    width: '100%'
  },
  img: {
    width: width - 36,
    height: width - 36,
  }
})

export default styles;