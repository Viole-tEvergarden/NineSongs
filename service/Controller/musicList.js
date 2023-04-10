const musicService = require("../services/musicService");

// 此控制器处理 GET 请求
// 获取推荐列表
exports.getMusicRecommendList = async (req, res, next) => {
  try {
    const musicList = await musicService.getMusicRecommendList();
    res.json(musicList);
  } catch (error) {
    res.json({ code: 0, message: "操作失败", data: error })
    next(error);
  }
};