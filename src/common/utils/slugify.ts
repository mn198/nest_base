const toAscii = (word: string) => {
  word = word.toLowerCase();
  word = word.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
  word = word.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
  word = word.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
  word = word.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
  word = word.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
  word = word.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
  word = word.replace(/đ/g, 'd');
  word = word.replace(
    /!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g,
    ' ',
  );
  word = word.replace(/ + /g, ' ');
  word = word.trim();
  return word;
};

export const slugify = (pattern: string) => {
  let slug = toAscii(pattern);
  slug = slug
    .replace(/[^a-z0-9 -]/g, '') // remove invalid chars
    .replace(/\s+/g, '-') // collapse whitespace and replace by -
    .replace(/-+/g, '-');
  return slug;
};
