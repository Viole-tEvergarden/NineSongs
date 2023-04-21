
const { implementSql } = require('./implementSql.js');
class MusicService {
  /**
  *  待完善 : 上传分为 有音乐基本信息的和没有的 这里处理没有的,
  * @param {} num
  * @return {void}
  */
  async addMusic({ songTitle, singer, album, coverImageId, musicFileId, lyricFileId }) {
    // let connection;
    // try {
    //   connection = await db.getConnection();
    //   const sql = 'INSERT INTO musiclist (songTitle, singer, album, coverImageId, musicFileId, lyricFileId) VALUES(?, ?, ?, ?, ?, ?)'
    //   const result = await connection.query(sql, [songTitle, singer, album, coverImageId, musicFileId, lyricFileId]);
    //   return result;
    // } catch (error) {
    //   throw error;
    // } finally {
    //   if (connection) {
    //     connection.release();
    //   }
    // }
  };
  /**
  * 分页查询音乐列表
  * @param {} num
  * @return {void}
  */
  async findWhichPageMusic({pageNum,pageSize}) {
    const limit = (pageNum - 1) * pageSize;
    const sql = 'SELECT * FROM musiclist LIMIT ? OFFSET ?'  
    const result = await implementSql(sql, [+pageSize,limit ]);
    return result;
  };
  // 查询音乐列表总数
  async getSum(){
    const sql = 'SELECT COUNT(*) FROM musiclist';
    const result = await implementSql(sql);
    return result[0]['COUNT(*)'];
  }
}
module.exports = new MusicService();