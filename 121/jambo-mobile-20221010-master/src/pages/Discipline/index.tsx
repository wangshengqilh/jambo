import React from "react";
import GradientButton from "components/GradientButton";
import Header from "components/Header";
import Title from "components/Title";
import images from "src/assets/images";
import IProps from "src/IProps";
import styles from "./style";
import { Center, Image, Text, View } from "native-base";
import { ImageBackground } from "react-native";
import { CommonActions } from "@react-navigation/native";

/**
 * 
 * @param props sid
 *  考试得分以及规则介绍
 */
function Discipline(props: IProps) {

  const onPressNext = () => {
    props.navigation.dispatch((state: any) => {
      const routes = [...state.routes.slice(0, -1), { name: 'Examination', params: { sid: props.route.params.sid } }]
      return CommonActions.reset({
        ...state,
        routes,
        index: routes.length - 1,
      });
    })
  }

  return (
    <ImageBackground source={images.background1} style={styles.Discipline}>
      <Header />

      <Center style={styles.content}>
        <Title title='TAKE QUIZ AND EARN' style={styles.title} />
        <View style={styles.box1}>
          <Image source={images.diamond} alt='tip' style={styles.diamond} />
          <Title title='10' style={styles.title1} />
        </View>
        <Text style={styles.text1}>Reminder:</Text>
        <Text style={styles.text2}><Text style={styles.text1}>Score 9</Text> or higher to move on to the next lesson! Didn’t make it this time? No problem, you can take the quiz again <Text style={styles.text1}>after 24 hours.</Text></Text>
        <GradientButton containerStyle={styles.next} onPress={onPressNext}>Let’s Quiz</GradientButton>
      </Center>

      <Image source={images.Lion} alt='Lion' style={styles.img} />
    </ImageBackground>
  )
}

export default Discipline;