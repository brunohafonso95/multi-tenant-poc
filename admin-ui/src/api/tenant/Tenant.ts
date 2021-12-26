import { User } from "../user/User";

export type Tenant = {
  createdAt: Date;
  deletedAt: Date | null;
  id: string;
  updatedAt: Date;
  users?: User | null;
};
