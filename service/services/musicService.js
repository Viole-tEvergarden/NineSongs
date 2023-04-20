const db = require('../services/index');
const util = require('util');
class MusicService {
  /**
  *  待完善 : 上传分为 有音乐基本信息的和没有的 这里处理没有的,
  * @param {} num
  * @return {void}
  */
  async addMusic({ songTitle, singer, album, coverImageId, musicFileId, lyricFileId }) {
    let connection;
    try {
      connection = await db.getConnection();
      const sql = 'INSERT INTO musiclist (songTitle, singer, album, coverImageId, musicFileId, lyricFileId) VALUES(?, ?, ?, ?, ?, ?)'
      const result = await connection.query(sql, [songTitle, singer, album, coverImageId, musicFileId, lyricFileId]);
      return result;
    } catch (error) {
      throw error;
    } finally {
      if (connection) {
        connection.release();
      }
    }
  };
  /**
  * 查询音乐列表
  * @param {} num
  * @return {void}
  */
  async findAllMusic() {
    let connection;
    try {
      connection = await db.getConnection();
      connection.query = util.promisify(connection.query);
      const sql = 'SELECT * FROM musiclist'
      const result = await connection.query(sql);
      return result;
    } catch (error) {
      throw error;
    } finally {
      if (connection) {
        connection.release();
      }
    }
  };
}
module.exports = new MusicService();