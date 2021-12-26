import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as nestAccessControl from "nest-access-control";
import { GqlDefaultAuthGuard } from "../auth/gqlDefaultAuth.guard";
import * as gqlACGuard from "../auth/gqlAC.guard";
import { TenantResolverBase } from "./base/tenant.resolver.base";
import { Tenant } from "./base/Tenant";
import { TenantService } from "./tenant.service";

@graphql.Resolver(() => Tenant)
@common.UseGuards(GqlDefaultAuthGuard, gqlACGuard.GqlACGuard)
export class TenantResolver extends TenantResolverBase {
  constructor(
    protected readonly service: TenantService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
