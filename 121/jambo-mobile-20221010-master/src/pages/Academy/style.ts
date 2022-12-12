import { Dimensions, StatusBar, StyleSheet } from "react-native";
import { start } from "src/router/MyNavigation";

const { width } = Dimensions.get('screen')

const styles = StyleSheet.create({
  Academy: {
    flex: 1,
    flexDirection: 'column-reverse'
  },
  Academy1: {
    flex: 1,
    paddingTop: StatusBar.currentHeight
  },
  box: {
    height: '90%',
    backgroundColor: '#fff',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    overflow: 'hidden',
    paddingHorizontal: 38,
    paddingVertical: 38,
  },
  title: {
    fontSize: 30,
    color: '#1F0867',
    marginBottom: 24
  },
  title1: {
    fontSize: 30,
    color: '#1F0867',
    marginBottom: 36,
    textAlign: 'left'
  },
  text1: {
    marginBottom: 24,
    color: '#4B4B4B',
    textAlign: 'center'
  },
  text1_1: {
    textDecorationLine: 'underline'
  },
  text11: {
    marginBottom: 36,
    color: '#4B4B4B',
  },
  FormControl: {
    marginVertical: 18
  },
  box1: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingHorizontal: 14
  },
  box2: {
    paddingHorizontal: 14
  },
  title2: {
    color: '#fff',
    fontSize: 24,
    textAlign: 'left'
  },
  title3: {
    color: '#fff',
    fontSize: 32,
    textAlign: 'left'
  },
  box2_1: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 16
  },
  text3: {
    color: '#FFFFFF',
    marginRight: 28
  },
  box3: {
    backgroundColor: '#fff',
    paddingTop: 28
  },
  box3_1: {
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    position: 'relative',
    elevation: 6,
    paddingVertical: 14,
    marginHorizontal: 14,
  },
  box3_1_1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 14,
    paddingTop: 24,
    borderBottomColor: '#B5B7CA',
    borderBottomWidth: 1,
    paddingHorizontal: 14,
    marginBottom: 14
  },
  box3_1_1_title: {
    fontSize: 20,
    color: '#4B4B4B'
  },
  box3_1_2: {
    paddingHorizontal: 14
  },
  box3_1_2_text: {
    color: '#4B4B4B',
    marginBottom: 14
  },
  startLesson: {
    marginTop: 14
  },
  box3_1_1_title1: {
    position: 'absolute',
    top: -15,
    left: 24,
    backgroundColor: '#210878',
    color: '#fff',
    paddingHorizontal: 18,
    paddingVertical: 6,
    fontSize: 12,
    borderRadius: 15
  },
  box3_title: {
    color: '#4B4B4B',
    textAlign: 'left',
    marginTop: 14,
    marginBottom: 14,
    paddingHorizontal: 14
  },
  box3_2: {
    paddingHorizontal: 7,
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: 804,
    height: 186,
  },
  box3_2_1: {
    width: 144,
    height: 79,
    borderRadius: 10,
    overflow: 'hidden',
    margin: 7,
    position: 'relative',
    elevation: 3,
  },
  score: {
    position: 'absolute',
    width: 72,
    height: 72,
    transform: [{ rotate: '-38deg' }],
    justifyContent: 'center',
    alignItems: 'center',
    top: 12,
    right: -8,
    opacity: 0.6
  },
  scoreText: {
    color: '#f47b62'
  },
  box3_2_1_1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  box3_2_1_title: {
    position: 'absolute',
    top: 0,
    left: 0,
    borderTopLeftRadius: 10,
    borderBottomRightRadius: 10,
    backgroundColor: '#210878',
    color: '#fff',
    fontSize: 10,
    paddingHorizontal: 10,
  },
  box3_2_1_time: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    fontSize: 8,
    paddingHorizontal: 10,
    lineHeight: 24
  },
  box3_2_1_title1: {
    color: '#4B4B4B',
    fontSize: 14
  },
  bottomView: {
    height: start + 2
  }
})

export default styles;