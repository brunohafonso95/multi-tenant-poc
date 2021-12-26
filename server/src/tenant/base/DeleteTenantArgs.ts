import { ArgsType, Field } from "@nestjs/graphql";
import { TenantWhereUniqueInput } from "./TenantWhereUniqueInput";

@ArgsType()
class DeleteTenantArgs {
  @Field(() => TenantWhereUniqueInput, { nullable: false })
  where!: TenantWhereUniqueInput;
}

export { DeleteTenantArgs };
