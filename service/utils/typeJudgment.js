module.exports = {
  // 判断是否为音乐类型
  isMusic: (mimetype) => {
    const audioMimeTypes = ['audio/mpeg'];
    return audioMimeTypes.includes(mimetype);
  },
  /**
  * this.判断是否为图片类型
  * @param {string } mimetype
  * @return {boolean}
  */
 isPicture: (mimetype) =>{
   return ['image/png', 'image/jpeg', 'image/gif', 'image/bmp'].includes(mimetype);
 }
};