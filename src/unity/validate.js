const validatePassword = function isValidPassword(password) {
    // Ít nhất 8 ký tự, chỉ chứa chữ cái và chữ số
    const passwordRegex = /^[A-Za-z\d]{8,}$/;
    return passwordRegex.test(password);
  };
  
  const validateEmail = function isValidEmail(email) {
    // Biểu thức chính quy kiểm tra địa chỉ email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  export {validatePassword, validateEmail}