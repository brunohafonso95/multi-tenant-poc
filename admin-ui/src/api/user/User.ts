import { Tenant } from "../tenant/Tenant";

export type User = {
  createdAt: Date;
  firstName: string | null;
  id: string;
  lastName: string | null;
  roles: Array<string>;
  tenant?: Tenant;
  updatedAt: Date;
  username: string;
};
