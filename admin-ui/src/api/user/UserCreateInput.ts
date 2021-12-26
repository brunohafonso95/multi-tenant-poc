import { TenantWhereUniqueInput } from "../tenant/TenantWhereUniqueInput";

export type UserCreateInput = {
  firstName?: string | null;
  lastName?: string | null;
  password: string;
  roles: Array<string>;
  tenant?: TenantWhereUniqueInput;
  username: string;
};
