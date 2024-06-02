export type PaginationRequestType = {
  limit?: number;
  page?: number;
};

export type MetaPaginationType = {
  totalRecords: number;
  totalPages: number;
  currentPage: number;
};

export type MetaPaginationResponseType = {
  Page: number;
  DataOffset: number;
  PerPage: number;
  TotalData: number;
  TotalPage: number;
  TotalSum: number;
};
