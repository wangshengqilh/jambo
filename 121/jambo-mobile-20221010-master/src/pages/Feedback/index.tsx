import React from "react";
import IProps from "src/IProps";
import images from "src/assets/images";
import styles from "./style";
import Header from "components/Header";
import AntDesignIcon from 'react-native-vector-icons/AntDesign'
import LinearGradient from "react-native-linear-gradient";
import Upload from "components/Upload";
import { Alert, ImageBackground } from "react-native";
import { Button, Image, Pressable, Text, TextArea, View } from "native-base";
import { user_feedback } from "src/store/api";

function Feedback(props: IProps) {
  const [visible, setVisible] = React.useState<boolean>(false)
  const [params, setParams] = React.useState<{ content: string, imgs: string[] }>({ content: '', imgs: [] })

  const onPressSubmit = () => {
    user_feedback(params).then(res => {
      setParams({ content: '', imgs: [] })
      Alert.alert(
        "Thank you!",
        "We have received your feedback and will address it as soon as possible. Should any further information be required we will reach out to you on JamboChat. Thank you for your contribution towards building a better Jambo!",
        [
          {
            text: "Close",
            onPress: () => props.navigation.goBack(),
            style: "cancel"
          }
        ]
      )
    }).catch(err => {
      if (err.state === 5) {
        Alert.alert(
          "Oops!",
          "Wow sounds like you have a lot to say! One of our team members will reach out to you to start a chat, we appreciate your enthusiasm in helping us build a better Jambo!",
          [
            {
              text: "Close",
              onPress: () => props.navigation.goBack(),
              style: "cancel"
            }
          ]
        )
      }
    })
  }

  return (
    <ImageBackground source={images.background1} style={styles.Feedback}>
      <Header title="Feedback Form" titleStyle={styles.title} />

      <ImageBackground source={images.background2} style={styles.box} resizeMode='stretch'>
        <View style={styles.box1}>
          <Text style={styles.text1}>Feedback</Text>
          <Text style={styles.text1}>{params.content.length}/200</Text>
        </View>
        <TextArea
          maxLength={200}
          placeholder="Describe your issue using at least 10 characters so that we can help troubleshoot your issue more quickly."
          autoCompleteType={undefined}
          h={160}
          value={params.content}
          onChangeText={text => {
            setParams(p => {
              return { content: text, imgs: p.imgs }
            })
          }}
        />
        <View style={styles.box1}>
          <Text style={styles.text1}>Screenshots(Optional)</Text>
          <Text style={styles.text1}>{params.imgs.length}/4</Text>
        </View>
        <View style={styles.box2}>
          {
            params.imgs.map((item, index) =>
              <Pressable style={styles.box3} key={index} onPress={() => {
                setParams(p => {
                  const arr = p.imgs
                  arr.splice(index, 1)
                  return { content: p.content, imgs: arr }
                })
              }}>
                <Image style={styles.img} source={{ uri: item }} />
                <LinearGradient
                  start={{ x: 0.5, y: 0 }}
                  end={{ x: 0.5, y: 1 }}
                  colors={['rgba(255, 255, 255, 0)', 'rgba(255, 0, 0, 0.5)']}
                  style={styles.bask}
                >
                  <AntDesignIcon name="delete" style={styles.icon1} />
                </LinearGradient>
              </Pressable>
            )
          }
          {
            params.imgs.length < 4 ?
              <Pressable style={styles.box3} onPress={() => setVisible(true)}>
                <AntDesignIcon name="plus" style={styles.icon} />
              </Pressable> :
              null
          }
        </View>
        <Button isDisabled={params.content.length <= 10} onPress={onPressSubmit} style={styles.submit}>Submit</Button>
      </ImageBackground>

      <Upload
        visible={visible}
        mediaType='photo'
        callback={(data: string[]) => setParams(p => {
          return { content: p.content, imgs: [...p.imgs, data[0]] }
        })}
        closeModal={() => setVisible(false)}
      />
    </ImageBackground>
  )
}

export default Feedback;