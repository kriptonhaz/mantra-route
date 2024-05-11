export type PaginationRequestType = {
  limit?: number;
  page?: number;
};

export type MetaPaginationType = {
  totalRecords: number;
  totalPages: number;
  currentPage: number;
};
