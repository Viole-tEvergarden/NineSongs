// 主题
type theme = 'dark' | 'light' | null;

/**
   * 分页查询参数
   */
interface PageQuery {
  pageNum: number;
  pageSize: number;
}
/**
   * 分页响应对象
   */
interface PageResult<T> {
  /**
   * 数据列表
   */
  list: T;
  /**
   * 数据总数
   */
  total: number;
}