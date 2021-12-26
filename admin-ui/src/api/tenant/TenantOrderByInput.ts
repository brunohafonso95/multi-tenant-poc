import { SortOrder } from "../../util/SortOrder";

export type TenantOrderByInput = {
  createdAt?: SortOrder;
  deletedAt?: SortOrder;
  id?: SortOrder;
  updatedAt?: SortOrder;
  usersId?: SortOrder;
};
