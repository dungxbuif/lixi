const bcrypt = require('bcryptjs');

export const saltAndHashPassword = (password: string) => {
  const salt = bcrypt.genSaltSync(10);
  const pwHash = bcrypt.hashSync(password, salt);
  return {
    salt,
    pwHash
  };
};
