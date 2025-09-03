import type { ComponentType } from "react";

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

export interface ISidebarItem {
  title: string,
  url?: string,
  component?: ComponentType,
  items?: {
    title: string;
    url: string;
    component: ComponentType;
  }[];
}