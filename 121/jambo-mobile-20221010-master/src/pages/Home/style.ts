import { Dimensions, StatusBar, StyleSheet } from "react-native";
import { start } from "src/router/MyNavigation";

const { width, height } = Dimensions.get('screen')

const styles = StyleSheet.create({
  Home: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    paddingHorizontal: 14
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 18,
    position: 'relative'
  },
  title: {
    textAlign: 'left',
    marginLeft: 9,
    color: '#fff',
    width: width - 173
  },
  rightbuttonview: {
    position: 'absolute',
    top: 18,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center'
  },
  Card: {
    borderRadius: 15,
    overflow: 'hidden',
    position: 'relative',
    marginBottom: 14,
    height: (width - 24) * 0.49
  },
  CardAngle: {
    position: 'absolute',
    top: 0,
    left: 0,
    padding: 8,
    overflow: 'hidden',
    borderBottomRightRadius: 15,
    flexDirection: 'row',
    alignItems: 'center'
  },
  CardImg: {
    width: 20,
    height: 20,
    marginRight: 4
  },
  CardTitle: {
    color: '#4B4B4B'
  },
  JamboAcademy: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    flex: 1,
  },
  JamboAcademyContent: {
    marginRight: 2,
    flex: 1,
    flexDirection: 'column'
  },
  JamboAcademyContenttop: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingBottom: 12,
    flex: 1
  },
  JamboAcademyContenttopTitle: {
    fontSize: 26,
    color: '#4B4B4B',
    marginRight: 22
  },
  JamboAcademyContenttopright: {
    flex: 1,
    position: 'relative',
    height: 66,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  next: {
    position: 'absolute',
    top: -30,
    fontSize: 11,
    lineHeight: 36,
    color: '#666',
    fontWeight: 'bold',
  },
  JamboAcademyContenttoprightTitle: {
    fontSize: 16,
    color: '#4B4B4B',
  },
  JamboAcademyContentbottom: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  JamboAcademyContentbottomimg: {
    width: 45,
    height: 45,
    marginRight: 12
  },
  JamboAcademyContentbottomimgText1: {
    fontSize: 10,
    color: '#4B4B4B',
    textAlign: 'left'
  },
  JamboAcademyContentbottomimgText2: {
    fontSize: 8,
    color: '#909090'
  },
  JamboCredit: {
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  JamboCreditlefttitle1: {
    fontSize: 12,
    color: '#4B4B4B'
  },
  JamboRewards: {
    padding: 12,
    flex: 1
  },
  JamboRewardsTop: {
    flexDirection: 'row-reverse'
  },
  JamboRewardsTopText: {
    fontSize: 12,
    color: '#4B4B4B'
  },
  JamboRewardsBottom: {
    flex: 1,
    flexDirection: 'row',
    paddingTop: 12,
    justifyContent: 'space-between',
  },
  JamboRewardsBottomBox1: {
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'space-between',
    flex: 1,
    paddingBottom: 8
  },
  JamboRewardsBottomBox2: {
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  JamboRewardsBottomBoxText1: {
    fontSize: 16,
    color: '#4B4B4B',
    textAlign: 'left'
  },
  JamboRewardsBottomBoxText2: {
    fontSize: 10,
    color: '#4B4B4B'
  },
  JamboRewardsBottomBoxText3: {
    fontSize: 26,
    color: '#4B4B4B'
  },
  JamboRewardsBottomBox2Bottom: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  JamboRewardsBottomBox2BottomImg: {
    width: 28,
    height: 28
  },
  JamboRewardsBottomBoxText4: {
    fontSize: 15,
    color: '#4B4B4B'
  },
  modalView: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.2)'
  },
  modalContent: {
    width: width * 0.9,
    height: height * 0.78,
    borderRadius: 50,
    paddingVertical: 24,
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  tip1Img: {
    width: width * 0.9 - 48,
    height: (width * 0.9 - 48) * 0.35,
  },
  aboutJamboRewards: {
    fontSize: 14,
    color: '#4B4B4B',
    marginVertical: 24
  },
  modalText: {
    color: '#4B4B4B',
    fontSize: 12,
    marginBottom: 18
  },
  pointView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18
  },
  point: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#B1B1B1',
    marginHorizontal: 2
  },
  NextModal: {
    width: '80%'
  },
  bottomView: {
    height: start + 2
  }
})

export default styles;