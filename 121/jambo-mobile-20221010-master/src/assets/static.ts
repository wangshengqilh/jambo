export const md5_Str = 'tJJ@SMqCPc8VAW4Q';                                          // 加密参数

export const baseUrl = 'https://www.jambo.academy';                                    // baseUrl
export const ResponseState = {                                                      // 网络交互状态码 
  NotLoggedIn: 30001,
  success: 1
};
export const regEmail = /^[.a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;       // 邮箱正则表达式
export const regPassword = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘'，。、]{8,30}$/;          // 密码
export const regNumber = /^[0-9]+$/; //数字校验

// 数据库存储名称
export const skey = 'skey';
export const myInfo = 'myInfo';
export const AnswerRecord = 'answers';
export const messages = 'messages';
export const friends = 'friends';
export const group = 'group';
export const MessageLogging = 'MessageLogging';
export const apply = 'apply';
export const notice = 'notice';
export const channelId = 'jambo-message-channel';

// 注册协议
export const TermsOfService = 'https://jambo-1.gitbook.io/jambo-terms-of-use';
// 隐私政策
export const Policy = 'https://jambo-1.gitbook.io/jambo-private-policy';