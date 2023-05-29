const { default: en } = require('./en');
const { default: id } = require('./id');

const selectedLang = 'id';

const langPack = {
  id: id,
  en: en,
};

const Lang = langPack[selectedLang];

export default Lang;
