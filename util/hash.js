const bcrypt = require('bcrypt');
hash = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}

compare=async (password,hasedPassword)=>{
  return await bcrypt.compare(password,hasedPassword)
}

module.exports = {
    hash: hash,
    compare:compare
}