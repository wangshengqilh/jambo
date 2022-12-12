import { NativeStackNavigationOptions } from "@react-navigation/native-stack";
import { DefaultNavigatorOptions, NavigationState, ParamListBase, PartialState, Route, TabNavigationState, TabRouterOptions } from "@react-navigation/native";
import { ImageSourcePropType, StyleProp, ViewStyle } from "react-native";

export type Urls =
  'Login' |
  'Guide' |
  'HomePage' |
  'Home' |
  'MyInfo' |
  'Academy' |
  'Web' |
  'Feedback' |
  'Message' |
  'Achievement' |
  'Credits' |
  'Setting' |
  'Password' |
  'EditPassword' |
  'Sign' |
  'AreaCode' |
  'Verification' |
  'Notifications' |
  'UserInfo' |
  'EditInfo' |
  'Ranking' |
  'Classroom' |
  // 'Discipline' |
  'Examination' |
  'Score' |
  'Groups' |
  'Chat' |
  'GroupInfo' |
  'ChatHistory' |
  'AddNewFriend' |
  'ApplyAdd' |
  'AddNewGroup' |
  'Apply' |
  'PolicyAgreement' |
  'FriendInfo';

export type IRoutes = {
  url: Urls;
  component?: any;
  options?: NativeStackNavigationOptions | TabNavigationOptions;
  children?: IRoutes[];
  initialRouteName?: string;
  desc?: string;
  icon?: string;
  text?: string;
};


export type ResetState = PartialState<NavigationState> | NavigationState | (Omit<NavigationState, 'routes'> & {
  routes: Omit<Route<string>, 'key'>[];
})

// Props accepted by the view
export type TabNavigationConfig = {
  contentStyle?: StyleProp<ViewStyle>;
  tabBarStyle?: StyleProp<ViewStyle>;
  tabBarButtonStyle?: StyleProp<ViewStyle>
};

// Supported screen options
export type TabNavigationOptions = {
  title?: string;
  icon: ImageSourcePropType;
  activeIcon: ImageSourcePropType;
};

// Map of event name and the type of data (in event.data)
//
// canPreventDefault: true adds the defaultPrevented property to the
// emitted events.
export type TabNavigationEventMap = {
  tabPress: {
    data: { isAlreadyFocused: boolean };
    canPreventDefault: true;
  };
};

// The props accepted by the component is a combination of 3 things
export type Props = DefaultNavigatorOptions<
  ParamListBase,
  TabNavigationState<ParamListBase>,
  TabNavigationOptions,
  TabNavigationEventMap
> &
  TabRouterOptions &
  TabNavigationConfig;