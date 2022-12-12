import React, { useEffect, useState } from "react";
import IProps from "src/IProps";
import images from "src/assets/images";
import styles from "./style";
import Header from "components/Header";
import FeatherIcon from 'react-native-vector-icons/Feather';
import { ImageBackground } from "react-native";
import { Button, FormControl, Icon, Input, Pressable, ScrollView, useToast, WarningOutlineIcon } from "native-base";
import { regPassword } from "src/assets/static";
import { reset_passwd } from "src/store/api";
import { logOut } from "src/router/customNavigation";
import { CommonActions } from "@react-navigation/native";

interface IPassword {
  email: string, passwd: string, passwdAgin: string
}
// type: 2|3   2忘记密码 3修改密码
function Edit(props: IProps) {
  const toast = useToast()
  const [isCheck, setIsCheck] = useState<boolean>(false)
  const [show, setShow] = React.useState<boolean>(false)
  const [show1, setShow1] = React.useState<boolean>(false)
  const [params, setParams] = useState<IPassword>({
    email: props.route.params.email,
    passwd: '',
    passwdAgin: ''
  })
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const onPressNext = () => {
    setIsCheck(true)
    setIsLoading(true)
  }

  useEffect(() => {
    if (isLoading) {
      if (regPassword.test(params.passwd) && params.passwd === params.passwdAgin) {
        reset_passwd(params).then(res => {
          toast.show({ description: res.msg })
          if (props.route.params.type === 2) {
            logOut()
          } else {
            props.navigation.dispatch((state: any) => {
              const routes = [...state.routes.slice(0, -2)]
              return CommonActions.reset({
                ...state,
                routes,
                index: routes.length - 1,
              });
            })
          }
        })
      } else {
        setIsLoading(false)
      }
    }
  }, [isLoading, setIsLoading])

  const onChangeTextPasswd = (text: string) => {
    setParams(p => {
      return { ...p, passwd: text }
    })
  }

  const onChangeTextPasswdAgin = (text: string) => {
    setParams(p => {
      return { ...p, passwdAgin: text }
    })
  }

  return (
    <ImageBackground source={images.background1} style={styles.Login}>
      <Header title={props.route.params.type === 2 ? 'Forgot Password' : 'Changing a Password'} style={styles.header} titleStyle={styles.titleStyle} />
      <ImageBackground source={images.background2} style={styles.box} resizeMode='stretch'>
        <ScrollView showsVerticalScrollIndicator={false}>
          <FormControl isInvalid={isCheck ? !regPassword.test(params.passwd) : false} style={styles.FormControl}>
            <FormControl.Label>Password</FormControl.Label>
            <Input
              onChangeText={onChangeTextPasswd}
              value={params.passwd}
              placeholder="Password"
              type={show ? "text" : "password"}
              InputRightElement={
                <Pressable onPress={() => setShow(!show)}>
                  <Icon as={<FeatherIcon name={show ? "eye-off" : "eye"} />} size={5} mr="2" color="muted.400" />
                </Pressable>
              }
            />
            <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />} style={styles.tip}>
              Password should use 8 or more characters with a mix of letters and numbers.
            </FormControl.ErrorMessage>
          </FormControl>

          <FormControl isInvalid={isCheck ? !(params.passwd === params.passwdAgin) : false} style={styles.FormControl}>
            <FormControl.Label>Confirm Password</FormControl.Label>
            <Input
              onChangeText={onChangeTextPasswdAgin}
              value={params.passwdAgin}
              placeholder="Confirm Password"
              type={show1 ? "text" : "password"}
              InputRightElement={
                <Pressable onPress={() => setShow1(!show1)}>
                  <Icon as={<FeatherIcon name={show1 ? "eye-off" : "eye"} />} size={5} mr="2" color="muted.400" />
                </Pressable>
              }
            />
            <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
              The two passwords are different!
            </FormControl.ErrorMessage>
          </FormControl>

          <Button style={styles.next} isLoading={isLoading} onPress={onPressNext}>Submit</Button>
        </ScrollView>
      </ImageBackground>
    </ImageBackground>
  )
}

export default Edit;