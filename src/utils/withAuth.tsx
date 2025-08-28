import { useGetOwnInfoQuery } from "@/redux/features/user/user.api"
import type { TRole } from "@/types";
import type { ComponentType } from "react";
import { Navigate } from "react-router-dom";

export const withAuth = (Component: ComponentType, requiredRole?: TRole) => {
     return function AuthWrapper () {
          const {data, isLoading} = useGetOwnInfoQuery(undefined);

          if(!isLoading && !data?.data?.email){
               return <Navigate to="signin"></Navigate>
          }

          if(requiredRole && !isLoading && requiredRole !== data?.data?.role){
               return <Navigate to="/unauthorized"></Navigate>
          }

          return <Component></Component>

     }
}