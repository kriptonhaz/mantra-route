export interface ICompany {
  id: string;
  name: string;
  pic: string;
  phone: string;
  email: string;
  address: string;
  is_active: number;
  vendor: string;
  create_date: string;
  update_date: string;
  delete_date: string;
}

export interface IGetCompanyResponse {
  code: number;
  data: ICompany[];
  message: string;
  meta: number;
  status: number;
}
