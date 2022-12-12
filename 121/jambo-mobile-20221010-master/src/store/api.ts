import forge from 'node-forge'
import { md5_Str } from "src/assets/static";
import { ISignUp } from "src/pages/Sign";
import { post } from "./request";
import { IEditInfo } from "src/pages/EditInfo";
import { IParams } from 'src/tool/deviceInformation';

// 获取skey
export function getSkey() {
  const ts = new Date().getTime()
  let md5 = forge.md.md5.create();
  md5.update(`${ts}${md5_Str}`);
  const sign = md5.digest().toHex();
  const obj = {
    ts,
    sign: sign
  }
  return post('/get_access.php', obj)
}
// 登录
export function login(params: { email: string, passwd: string }) {
  return post('/login2.php', params)
}
// 注册
export function app_registe(params: ISignUp) {
  return post('/app_register.php', params)
}
// 获取国家地区编码
export function country_list() {
  return post('/get_country.php')
}
// 发送邮箱验证码
export function send_email_code(params: { email: string, type?: any }) {
  return post('/send_email_code.php', params)
}
// 忘记密码
export function reset_passwd(params: { email: string, passwd?: string, email_code?: string }) {
  return post('/reset_passwd.php', params)
}
// 首页
export function user_index() {
  return post('/user_index.php')
}
// 身份认证
export function modify_idcard(params: { idcard: string, code: string }) {
  return post('/modify_idcard.php', params)
}
// 上传文件
export function uploadFile(params: { base64_code: string, file_ext: string }) {
  return post('/upload.php', params)
}
// 获取个人信息
export function info() {
  return post('/info.php')
}
// 试卷列表
export function testPaper() {
  return post('/test_paper_list.php')
}
// 通知列表
export function notification_message(params: { page: number }) {
  return post('/notification_message.php', params)
}
// 删除通知
export function delete_notification(id: string) {
  return post('/delete_notification.php', { id })
}
// 修改个人信息
export function user_info_update(params: IEditInfo) {
  return post('/user_info_update.php', params)
}
// 分数总排行榜
export function score_ranking(params: { page: number }) {
  return post('/score_ranking.php', params)
}
// 试卷得分排行榜
export function respondent_list(params: { page: number, sid: string }) {
  return post('/respondent_list.php', params)
}
// 获取试卷详情
export function paper_one(params: { sid: string }) {
  return post('/paper_one.php', params)
}
// 获取试题
export function get_one_question(params: { sid: string }) {
  return post('/get_one_question.php', params)
}
// 查看试卷的视频已看完
export function finish_watch_video(params: { sid: string }) {
  return post('/finish_watch_video.php', params)
}
// 提交答案
export function answerApi(params: { sid: string, answer_arr: { qid: string, answer?: string | number }[] }) {
  return post('/answer.php', params)
}
// 朋友列表
export function my_friends_list(params?: { friend_name: string }) {
  return post('/my_friends_list.php', params)
}
// 群列表
export function my_group_list() {
  return post('/my_group_list.php')
}
// 最新消息
export function msg_list() {
  return post('/msg_list.php')
}
// 最新消息详情
export function msg_detail_list(params: { type: 0 | 1, type_id: string }) {
  return post('/msg_detail_list.php', params)
}
// 群聊详情
export function group_detail(params: { group_id: string }) {
  return post('/group_detail.php', params)
}
// 发送消息
export function send_msg(params: { type: 0 | 1, type_id: string, msg: string, msg_type: 0 | 1 /**消息类型    0 文本  1 图片 */ }) {
  return post('/send_msg.php', params)
}
// 群成员列表
export function group_members_list(params: { group_id: string }) {
  return post('/group_members_list.php', params)
}
// 踢出群
export function group_kick_out(params: { group_id: string, user_id: string }) {
  return post('/group_kick_out.php', params)
}
// 群信息修改
export function group_update(params: { group_id: string, title?: string, content?: string }) {
  return post('/group_update.php', params)
}
// 退出群
export function exit_group(params: { group_id: string }) {
  return post('/exit_group.php', params)
}
// 解散群
export function group_dissolution(params: { group_id: string }) {
  return post('/group_dissolution.php', params)
}
// 拉人进群
export function group_invitation(params: { uids: string[], group_id: string }) {
  return post('/group_invitation.php', params)
}
// 获取成就
export function get_medal(friend_id?: string) {
  return post('/get_medal.php', { friend_id })
}
// 查找朋友
export function search_friend(params: { page: number, country_id?: string, distance?: number, type: 1 | 2 /** 1国家搜索 2距离搜索 */ }) {
  return post('/search_friend.php', params)
}
// 精准查找朋友
export function accurate_search(params: { email: string }) {
  return post('/accurate_search.php', params)
}
// 添加朋友
export function apply_friend(params: { friend_id: string, friend_remarks: string, content: string }) {
  return post('/apply_friend.php', params)
}
// 创建群组
export function create_group(params: { uids: string[], title: string }) {
  return post('/create_group.php', params)
}
// 删除朋友
export function delete_friend(params: { friend_id: string }) {
  return post('/delete_friend.php', params)
}
// 同意添加朋友
export function agree_friend(params: { friend_id: string, friend_remarks?: string }) {
  return post('/agree_friend.php', params)
}
// 任务列表
export function task_list() {
  return post('/task_list.php')
}
// 领取奖励
export function get_score(task_id: string) {
  return post('/get_score.php', { task_id })
}
// 得分
export function user_reputation() {
  return post('/user_reputation.php')
}
// 使用时间
export function user_usetime(params: { use_time1: number, use_time2: number, use_time3: number }) { // 全部应用/学院/信誉
  return post('/user_usetime.php', params)
}
// 手机硬件数据
export function user_equipment(params: IParams) {
  return post('/user_equipment.php', params)
}
// 反馈
export function user_feedback(params: { content: string, imgs: string[] }) {
  return post('/user_feedback.php', params)
}
// // 获取新闻
// export function get_journalism() {
//   return post('/get_journalism.php')
// }