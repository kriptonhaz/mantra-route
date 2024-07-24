export interface GetJobRequestParamsType {
  companyId: string;
  page: number;
  per_page: number;
}

export interface IJobItem {
  company: string;
  create_date: string;
  delete_date: string;
  generated_month: string;
  id: string;
  is_process: number;
  output_file: string;
  process_date: string;
  recounting_api: boolean;
  resynchronize_distance: boolean;
  update_date: string;
}
export interface GetJobResponseType {
  code: number;
  data: IJobItem[];
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
