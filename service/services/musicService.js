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