import { ArgsType, Field } from "@nestjs/graphql";
import { TenantWhereUniqueInput } from "./TenantWhereUniqueInput";

@ArgsType()
class TenantFindUniqueArgs {
  @Field(() => TenantWhereUniqueInput, { nullable: false })
  where!: TenantWhereUniqueInput;
}

export { TenantFindUniqueArgs };
