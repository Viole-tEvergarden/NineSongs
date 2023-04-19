const db = require('../services/index');
class MusicService {
  async addMusic({ songTitle, singer, album, coverImageId, musicFileId, lyricFileId }) {
    let connection;
    try {
      connection = await db.getConnection();

      const sql = 'INSERT INTO musicInfoList (songTitle, singer, album, coverImageId, musicFileId, lyricFileId) VALUES(?, ?, ?, ?, ?, ?)'
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
}
module.exports = new MusicService();

  // 新增歌曲
  //  async addMusic(connection, { songTitle, singer, album, coverImageId, musicFileId, lyricFileId }){
  //   return new Promise((resolve, reject) => {
  //     const sql = 'INSERT INTO musicInfoList (songTitle, singer, album, coverImageId, musicFileId, lyricFileId) VALUES(?, ?, ?, ?, ?, ?)'
  //     connection.query(sql, [songTitle, singer, album, coverImageId, musicFileId, lyricFileId], (error, results) => {
  //       connection.release()
  //       console.log(error);
  //       if (error) {
  //         reject(error);
  //         return;
  //       }
  //       resolve(results);
  //     });
  //   })
  // };