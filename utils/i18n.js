export const t = (lang='en') => {
  const en = {
    appTitle: 'LeMemo — Discord Notes',
    signUp: 'Sign Up', signIn: 'Sign In', logout:'Log out',
    discordId:'Discord User ID', username:'Display name', password:'Password',
    passcode:'Passcode to view notes', createAccount:'Create an account',
    enterPasscode:'Enter passcode to view notes', save:'Save', newNote:'New note', unlock:'Unlock'
  }
  const vi = {
    appTitle: 'LeMemo — Ghi chú Discord',
    signUp: 'Đăng ký', signIn: 'Đăng nhập', logout:'Đăng xuất',
    discordId:'Discord User ID', username:'Tên hiển thị', password:'Mật khẩu',
    passcode:'Mã khóa để xem ghi chú', createAccount:'Tạo tài khoản',
    enterPasscode:'Nhập mã để xem ghi chú', save:'Lưu', newNote:'Ghi chú mới', unlock:'Mở khóa'
  }
  return lang==='vi'?vi:en
}
