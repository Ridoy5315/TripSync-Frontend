export type TRole = "SUPER_ADMIN" | "ADMIN" | "USER" | "DRIVER";

type ErrorSource = {
  path:string,
  message: string
}

export interface IData {
  err: {
     statusCode: number
  }
  errorSources: ErrorSource[]
  message: string
  stack: string
  success: boolean
}

export interface IErrorResponse {
  data: IData
  status: number
}