'use strict'

const compileText = (text, config) => {
  Object.keys(config).forEach(key => {
    text = text.replace(`{{${key}}}`, config[key])
  });
  return text;
};


module.exports = {
  compileText
}