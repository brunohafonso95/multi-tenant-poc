import { StringNullableFilter } from "../../util/StringNullableFilter";
import { StringFilter } from "../../util/StringFilter";
import { TenantWhereUniqueInput } from "../tenant/TenantWhereUniqueInput";

export type UserWhereInput = {
  firstName?: StringNullableFilter;
  id?: StringFilter;
  lastName?: StringNullableFilter;
  tenant?: TenantWhereUniqueInput;
  username?: StringFilter;
};
