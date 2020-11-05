export interface BetaBaseResponse<T> {
  code: number;
  data: T;
  msg: string;
}
export interface BetaSuccessResponse<T> extends BetaBaseResponse<T> {
  success: true;
  data: T;
}
// @ts-ignore
export interface BetaFailedResponse extends BetaBaseResponse<null> {
  success: false;
  obj: null;
  data: null;
}

export type PageData<T> = {
  pageNo: number;

  pageSize: number;

  totalPages: number;

  totalRecords: number;

  list: T[];
};
