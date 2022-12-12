import React, { useEffect, useState } from "react";
import IProps from "src/IProps";
import images from "src/assets/images";
import styles from "./style";
import Header from "components/Header";
import { ImageBackground } from "react-native";
import { Button, FormControl, Input, ScrollView, WarningOutlineIcon } from "native-base";
import { regEmail } from "src/assets/static";
import { send_email_code } from "src/store/api";

function Password(props: IProps) {
  const [isCheck, setIsCheck] = useState<boolean>(false)
  const [email, setEmail] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const onChangeTextEmail = (text: string) => {
    setEmail(text)
  }

  const onPressNext = () => {
    setIsCheck(true)
    setIsLoading(true)
  }

  useEffect(() => {
    if (isLoading) {
      if (regEmail.test(email)) {
        send_email_code({ email: email, type: 'reset_passwd' }).then(res => {
          props.navigation.navigate('Verification', { data: { email }, type: 2 })
          setIsLoading(false)
        }).catch(() => {
          setIsLoading(false)
        })
      } else {
        setIsLoading(false)
      }
    }
  }, [isLoading, setIsLoading])

  return (
    <ImageBackground source={images.background1} style={styles.Login}>
      <Header title='Email verification' style={styles.header} titleStyle={styles.titleStyle} />
      <ImageBackground source={images.background2} style={styles.box} resizeMode='stretch'>
        <ScrollView showsVerticalScrollIndicator={false}>
          <FormControl isInvalid={isCheck ? !regEmail.test(email) : false} style={styles.FormControl}>
            <FormControl.Label>Email</FormControl.Label>
            <Input placeholder="Email" value={email} onChangeText={onChangeTextEmail} keyboardType='email-address' />
            <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
              Invalid Email!
            </FormControl.ErrorMessage>
          </FormControl>

          <Button style={styles.next} isLoading={isLoading} onPress={onPressNext}>Get verification code</Button>
        </ScrollView>
      </ImageBackground>
    </ImageBackground>
  )
}

export default Password;