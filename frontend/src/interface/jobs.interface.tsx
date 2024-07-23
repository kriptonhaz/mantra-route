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

export interface PostCreateJobsType {
  company: string;
  generated_month: string;
  resynchronize_distance: boolean;
  recounting_api: boolean;
}
