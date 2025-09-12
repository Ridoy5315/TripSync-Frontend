import type { ComponentType } from "react";

export type TRole = "SUPER_ADMIN" | "ADMIN" | "USER" | "DRIVER";

type ErrorSource = {
  path: string;
  message: string;
};

export interface IData {
  err: {
    statusCode: number;
  };
  errorSources: ErrorSource[];
  message: string;
  stack: string;
  success: boolean;
}

export interface IErrorResponse {
  data: IData;
  status: number;
}

export interface IResError {
  error: IErrorResponse
}

export interface ISidebarItem {
  title: string;
  url?: string;
  component?: ComponentType;
  items?: {
    title: string;
    url: string;
    component: ComponentType;
  }[];
}

export interface IGetDriverParams {
  page?: number;
  driverApprovalStatus?: string;
  searchTerm?: string;
}

interface IDriverAuth {
  provider: string;
  providerId: string;
}

export interface IUser {
  _id?: string;
  name: string;
  email: string;
  monthlyCancelLimit?: number;
  isDeleted?: boolean;
  isActive?: "ACTIVE" | "INACTIVE" | "BLOCKED";
  isVerified?: boolean;
  role?: TRole;
  auths?: IDriverAuth[];
  createdAt?: string; // string ISO date
  updatedAt?: string; // string ISO date
  phone?: string;
  address?: string;
  dateOfBirth?: string; // YYYY-MM-DD
  gender?: "MALE" | "FEMALE";
  rides?: string[];
  isOnTrip?: boolean;
  picture?: string;
  emergencyContact?: string[];
  cancellationResetDate?: string;
}

export interface ILocation {
  type: "Point";
  coordinates: [number, number]; // [longitude, latitude]
}

export interface IDriverDocuments {
  _id: string;
  approvalStatus: "PENDING" | "APPROVED" | "REJECTED";
  availabilityStatus: "ONLINE" | "OFFLINE" | "ON_TRIP";
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  rating: number;
  totalIncome: number;
  vehicleInfo: string;
  location: ILocation;
  driverInformation: string;
}

interface IDriversCount {
  count: number;
}

export interface IVehicleInformation {
  _id: string;
  brand?: string;
  color?: string;
  createdAt?: string;
  licensePlate?: string;
  manufacturingYear?: number;
  model?: string;
  owner?: string;
  updatedAt?: string;
}

interface IVehicleInfo {
  vehicleInformation: IVehicleInformation;
}

export interface IDriverDoc {
  driverDocuments: IDriverDocuments[];
  driversCount: IDriversCount[];
  vehicleInfo: IVehicleInfo[];
}

export interface IPaginatedDrivers {
  data: IUser[];
  driverDoc: IDriverDoc[];
  meta: {
    limit: number;
    page: number;
    total: number;
    totalPage: number;
  };
}

export interface IDriverDocument {
  _id: string;
  approvalStatus?: "PENDING" | "APPROVED" | "REJECTED";
  availabilityStatus?: "ONLINE" | "OFFLINE" | "ON_TRIP";
  createdAt?: string; // ISO date string
  updatedAt?: string; // ISO date string
  rating?: number;
  totalIncome?: number;
  vehicleInfo?: string;
  location?: ILocation;
  driverInformation?: IUser;
}

export interface IGetDriverResponse {
  highestEarningDriver: IDriverDocument;
  highestRatingDriver: IDriverDocument;
  lowestEarningDriver: IDriverDocument;
  lowestRatingDriver: IDriverDocument;
  totalApprovedDriver: number;
  totalCurrentOfflineDriver: number;
  totalCurrentOnTripDriver: number;
  totalCurrentOnlineDriver: number;
  totalDriver: IPaginatedDrivers;
  totalPendingDriver: number;
  totalRejectedDriver: number;
}

export interface IRide {
  _id: string,
  pickupLocation?: ILocation,
  destinationLocation?: ILocation,
  distance?: string,
  originalFare?: number,
  rideRequestAt?: string,
  rideRequestAction?: string,
  rideProgressStatus?: string
}
