import { UserWhereUniqueInput } from "../user/UserWhereUniqueInput";

export type TenantUpdateInput = {
  deletedAt?: Date | null;
  users?: UserWhereUniqueInput | null;
};
