import { UserWhereUniqueInput } from "../user/UserWhereUniqueInput";

export type TenantCreateInput = {
  deletedAt?: Date | null;
  users?: UserWhereUniqueInput | null;
};
