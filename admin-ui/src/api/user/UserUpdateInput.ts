import { TenantWhereUniqueInput } from "../tenant/TenantWhereUniqueInput";

export type UserUpdateInput = {
  firstName?: string | null;
  lastName?: string | null;
  password?: string;
  roles?: Array<string>;
  tenant?: TenantWhereUniqueInput;
  username?: string;
};
