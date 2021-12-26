import { ArgsType, Field } from "@nestjs/graphql";
import { TenantWhereUniqueInput } from "./TenantWhereUniqueInput";
import { TenantUpdateInput } from "./TenantUpdateInput";

@ArgsType()
class UpdateTenantArgs {
  @Field(() => TenantWhereUniqueInput, { nullable: false })
  where!: TenantWhereUniqueInput;
  @Field(() => TenantUpdateInput, { nullable: false })
  data!: TenantUpdateInput;
}

export { UpdateTenantArgs };
