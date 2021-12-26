import { TenantWhereInput } from "./TenantWhereInput";
import { TenantOrderByInput } from "./TenantOrderByInput";

export type TenantFindManyArgs = {
  where?: TenantWhereInput;
  orderBy?: TenantOrderByInput;
  skip?: number;
  take?: number;
};
