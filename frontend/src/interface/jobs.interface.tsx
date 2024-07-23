export interface GetJobRequestType {
  code: number;
  data: [];
  message: string;
  meta: {
    Page: number;
    DataOffset: number;
    PerPage: number;
    TotalData: number;
    TotalPage: number;
    TotalSum: number;
  };
  status: number;
}
