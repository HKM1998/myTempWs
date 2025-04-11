/**
 * 이메일 형식 확인 함수
 * @param {string} email
 * @returns boolean
 */
const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};
