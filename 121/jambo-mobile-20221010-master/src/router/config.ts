import { IRoutes } from "./type";
import images from "src/assets/images";

import Guide from "src/pages/Guide";
import LoginScreen from "src/pages/Login";
import Home from "src/pages/Home";
import Academy from "src/pages/Academy";
import Message from "src/pages/Message";
import Achievement from "src/pages/Achievement";
import Credits from "src/pages/Credits";
import Password from "src/pages/Password";
import Sign from "src/pages/Sign";
import AreaCode from "src/pages/AreaCode";
import Verification from "src/pages/Verification";
import Notifications from "src/pages/Notifications";
import UserInfo from "src/pages/UserInfo";
import EditInfo from "src/pages/EditInfo";
import Ranking from "src/pages/Ranking";
import Classroom from "src/pages/Classroom";
// import Discipline from "src/pages/Discipline";
import Examination from "src/pages/Examination";
import Score from "src/pages/Score";
import Groups from "src/pages/Groups";
import Chat from "src/pages/Chat";
import GroupInfo from "src/pages/GroupInfo";
import ChatHistory from "src/pages/ChatHistory";
import AddNewFriend from "src/pages/AddNewFriend";
import ApplyAdd from "src/pages/ApplyAdd";
import AddNewGroup from "src/pages/AddNewGroup";
import Apply from "src/pages/Apply";
import Setting from "src/pages/Setting";
import PolicyAgreement from "src/pages/PolicyAgreement";
import FriendInfo from "src/pages/FriendInfo";
import Edit from "src/pages/Password/Edit";
import Web from "src/pages/Academy/web";
import Feedback from "src/pages/Feedback";

const routes: IRoutes[] = [
  {
    url: 'HomePage',
    initialRouteName: 'Home',
    children: [
      {
        url: 'Home',
        component: Home,
        options: {
          icon: images.MyInfo,
          activeIcon: images.MyInfoActive
        }
      },
      {
        url: 'Academy',
        component: Academy,
        options: {
          icon: images.Academy,
          activeIcon: images.AcademyActive
        }
      },
      {
        url: 'Message',
        component: Message,
        options: {
          icon: images.Message,
          activeIcon: images.MessageActive
        }
      },
      {
        url: 'Achievement',
        component: Achievement,
        options: {
          icon: images.Achievement,
          activeIcon: images.AchievementActive
        }
      },
      {
        url: 'Credits',
        component: Credits,
        options: {
          icon: images.Credits,
          activeIcon: images.CreditsActive
        }
      }
    ],
    desc: '程序首页'
  },
  {
    url: 'Setting',
    component: Setting,
  },
  {
    url: 'Web',
    component: Web,
  },
  {
    url: 'Feedback',
    component: Feedback
  },
  {
    url: 'Guide',
    component: Guide,
  },
  {
    url: 'Login',
    component: LoginScreen,
  },
  {
    url: 'Password',
    component: Password,
  },
  {
    url: 'EditPassword',
    component: Edit
  },
  {
    url: 'Sign',
    component: Sign,
  },
  {
    url: 'AreaCode',
    component: AreaCode,
  },
  {
    url: 'Verification',
    component: Verification,
  },
  {
    url: 'Notifications',
    component: Notifications
  },
  {
    url: 'UserInfo',
    component: UserInfo
  },
  {
    url: 'EditInfo',
    component: EditInfo
  },
  {
    url: 'Ranking',
    component: Ranking
  },
  {
    url: 'Classroom',
    component: Classroom
  },
  // {
  //   url: 'Discipline',
  //   component: Discipline
  // },
  {
    url: 'Examination',
    component: Examination
  },
  {
    url: 'Score',
    component: Score
  },
  {
    url: 'Groups',
    component: Groups
  },
  {
    url: 'Chat',
    component: Chat
  },
  {
    url: 'GroupInfo',
    component: GroupInfo
  },
  {
    url: 'ChatHistory',
    component: ChatHistory
  },
  {
    url: 'AddNewFriend',
    component: AddNewFriend
  },
  {
    url: 'ApplyAdd',
    component: ApplyAdd
  },
  {
    url: 'AddNewGroup',
    component: AddNewGroup
  },
  {
    url: 'Apply',
    component: Apply
  },
  {
    url: 'PolicyAgreement',
    component: PolicyAgreement
  },
  {
    url: 'FriendInfo',
    component: FriendInfo
  }
];

export default routes;