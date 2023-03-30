/*
 * @Author: zhangxiaobo9794 2067838947@qq.com
 * @Date: 2023-03-22 17:34:27
 * @LastEditors: zhangxiaobo9794
 * @LastEditTime: 2023-03-30 13:20:35
 * @FilePath: \view\src\global.d.ts
 * @Description: 
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
 */
// 联想词列表
interface associativeWord {
  text: string;
  key?: string;
}
// 歌单列表
interface SongSheet {
  singularTitle: string;
  id: string;
  author: string;
  describe: string;
  coverImage: string;
}
// 歌曲
interface Song {
  songTitle: string;
  singer: string;
  album: string;
  duration: string;
  id: string;
  imgUrl?: string,
  operation?: string 
}
type SongFiled = 'songTitle' | 'singer' | 'album' | 'duration' | 'id' | 'imgUrl'|'operation';
//歌曲表格参数
interface Column {
  prop: SongFiled;
  title: string;
  flex: string; // 不要带分号
  isA?: boolean; // 是否需要指定为 a 链接
}