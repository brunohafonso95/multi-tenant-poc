import { ArgsType, Field } from "@nestjs/graphql";
import { TenantCreateInput } from "./TenantCreateInput";

@ArgsType()
class CreateTenantArgs {
  @Field(() => TenantCreateInput, { nullable: false })
  data!: TenantCreateInput;
}

export { CreateTenantArgs };
