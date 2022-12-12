import React from "react";
import IProps from "src/IProps";
import images from "src/assets/images";
import styles from "./style";
import Title from "components/Title";
import FeatherIcon from 'react-native-vector-icons/Feather';
import { ImageBackground } from "react-native";
import { Text, Input, FormControl, WarningOutlineIcon, Pressable, Icon, Link, View, Button, ScrollView } from "native-base";
import { useAppDispatch, useAppSelector } from "src/store/hooks";
import { clearSkey, getSkeyAsync, selectSkey } from "src/store/skey/skeySlice";
import { regEmail } from "src/assets/static";
import { login } from "src/store/api";
import { CommonActions } from "@react-navigation/native";
import { setMyInfo } from "src/store/myInfo/myInfoSlice";

function LoginScreen(props: IProps) {
  const dispatch = useAppDispatch();
  const newSkey = useAppSelector(selectSkey);
  const [show, setShow] = React.useState<boolean>(false)
  const [email, setEmail] = React.useState<string>('')
  const [passwd, setPasswd] = React.useState<string>('')
  const [isCheck, setIsCheck] = React.useState<boolean>(false)
  const [isLoading, setIsLoading] = React.useState<boolean>(false)

  const onChangeTextEmail = (text: string) => {
    setEmail(text)
  }

  const onChangeTextPasswd = (text: string) => {
    setPasswd(text)
  }

  const onPressLogIn = () => {
    setIsLoading(true)
    if (regEmail.test(email) && passwd) {
      dispatch(getSkeyAsync())
    } else {
      setIsCheck(true)
      setIsLoading(false)
    }
  }

  const onPressSign = () => {
    props.navigation.navigate('Sign')
  }

  React.useEffect(() => {
    if (newSkey && props.navigation.getState().index === 0) {
      login({ email, passwd }).then(res => {
        setIsLoading(false)
        dispatch(setMyInfo({ ...res.data, accesscount: 1 }))
        props.navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: 'HomePage' }],
          }),
        );
      }).catch(() => {
        setIsLoading(false)
        dispatch(clearSkey())
      })
    }
  }, [newSkey])

  const onPressForgotPassword = () => {
    props.navigation.navigate('Password')
  }

  return (
    <ImageBackground source={images.background1} style={styles.Login}>
      <ImageBackground source={images.background2} style={styles.box} resizeMode='stretch'>
        <ScrollView contentContainerStyle={styles.boxScroll} showsVerticalScrollIndicator={false}>
          <View>
            <Title title="Let's get started" size='xl' style={styles.title} />
            <Text style={styles.tip1} size='sm'>Log in to continue</Text>

            <FormControl isInvalid={isCheck ? !regEmail.test(email) : false} style={styles.FormControl}>
              <Input placeholder="Email" value={email} onChangeText={onChangeTextEmail} keyboardType='email-address' />
              <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                {
                  email ?
                    'Your email was entered incorrectly!' :
                    'Please enter your email!'
                }
              </FormControl.ErrorMessage>
            </FormControl>

            <FormControl isInvalid={isCheck ? !passwd : false} style={styles.FormControl}>
              <Input
                onChangeText={onChangeTextPasswd}
                value={passwd}
                placeholder="Password"
                type={show ? "text" : "password"}
                InputRightElement={
                  <Pressable onPress={() => setShow(!show)}>
                    <Icon as={<FeatherIcon name={show ? "eye-off" : "eye"} />} size={5} mr="2" color="muted.400" />
                  </Pressable>
                }
              />
              <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                Please enter your password!
              </FormControl.ErrorMessage>
            </FormControl>

            <View style={styles.box1}>
              <Link onPress={onPressForgotPassword} _text={{ color: '#4B4B4B', fontSize: 'sm' }}>
                Forgot Password?
              </Link>
            </View>

            <Button style={styles.login} onPress={onPressLogIn} isLoading={isLoading} spinnerPlacement="start">Log in</Button>
          </View>

          <View style={styles.footer}>
            <Text fontSize='sm' color='#4B4B4B'>
              Don’t have an account?
            </Text>
            <Text style={{ textDecorationLine: 'underline' }} fontSize='sm' color='#4B4B4B' onPress={onPressSign}>
              Sign up
            </Text>
          </View>
        </ScrollView>
      </ImageBackground>
    </ImageBackground>
  )
}

export default LoginScreen;