import { DateTimeNullableFilter } from "../../util/DateTimeNullableFilter";
import { StringFilter } from "../../util/StringFilter";
import { UserWhereUniqueInput } from "../user/UserWhereUniqueInput";

export type TenantWhereInput = {
  deletedAt?: DateTimeNullableFilter;
  id?: StringFilter;
  users?: UserWhereUniqueInput;
};
