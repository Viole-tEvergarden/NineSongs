// 文件插入 files 表
const db = require('../services/index');
const util = require('util');
const load = require('audio-loader')
const id3 = require('node-id3');
const fs = require('fs');
const path = require('path');
const myUtils = require('../utils/typeJudgment');
const _path = path;
class FileService {
  insertFile = async ({ filename, path, mimetype }) => {
    let connection;
    try {
      let duration = null; //音乐时长
      if (myUtils.isMusic(mimetype)) {
        // 如果类型是音乐获取时长
        let res = await load(path);
        duration = +res.duration.toFixed(2); //时长

        const { title, artist, unsynchronisedLyrics, image, album } = id3.read(path); //其他信息
        
        const Lyric = unsynchronisedLyrics?.text;
        const _image = image?.imageBuffer;
        
        // 存储音乐文件中的图片
        const imagePath = _path.join(__dirname, `../uploads/image/`, `${title}.jpg`); //图片存储路径
        let imgUrl = '';//图片相对静态文件目录的地址
        if (_image){
          imgUrl = `/image/${title}.jpg`
          fs.writeFile(imagePath, _image, (err) => {
            if (err) throw err;
            console.log('图片成功保存, 路径:', imagePath);
          });
        } 
        

        

        // 连接数据库 并插入数据
        connection = await db.getConnection();
        connection.query = util.promisify(connection.query);
        const sql = 'INSERT INTO musiclist SET ?'
        const result = await connection.query(sql, { title, path, artist, mimetype, duration, Lyric, image: imgUrl, album });

        result.code = '00000';
        result.msg = '上传成功';
        // 判断文件中是否含有歌词与封面图 提示用户
        if (!Lyric) {
          result.code = '00005';
          result.msg = '该音乐文件中不包含歌词文件';
        }
        if (!image) {
          result.code = '00005';
          result.msg = '该音乐文件中不包含歌曲封面';
        }
        return result;
      } else { //非音乐类型
        connection = await db.getConnection();
        connection.query = util.promisify(connection.query);
        const sql = 'INSERT INTO files SET ?'
        const result = await connection.query(sql, { filename, path, mimetype });
        return result;
      }

    } catch (error) {
      throw error;
    } finally {
      if (connection) {
        connection.release();
      }
    }
  };
}
module.exports = new FileService();