import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as apollo from "apollo-server-express";
import * as nestAccessControl from "nest-access-control";
import { GqlDefaultAuthGuard } from "../../auth/gqlDefaultAuth.guard";
import * as gqlACGuard from "../../auth/gqlAC.guard";
import * as gqlUserRoles from "../../auth/gqlUserRoles.decorator";
import * as abacUtil from "../../auth/abac.util";
import { isRecordNotFoundError } from "../../prisma.util";
import { MetaQueryPayload } from "../../util/MetaQueryPayload";
import { CreateTenantArgs } from "./CreateTenantArgs";
import { UpdateTenantArgs } from "./UpdateTenantArgs";
import { DeleteTenantArgs } from "./DeleteTenantArgs";
import { TenantFindManyArgs } from "./TenantFindManyArgs";
import { TenantFindUniqueArgs } from "./TenantFindUniqueArgs";
import { Tenant } from "./Tenant";
import { User } from "../../user/base/User";
import { TenantService } from "../tenant.service";

@graphql.Resolver(() => Tenant)
@common.UseGuards(GqlDefaultAuthGuard, gqlACGuard.GqlACGuard)
export class TenantResolverBase {
  constructor(
    protected readonly service: TenantService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @graphql.Query(() => MetaQueryPayload)
  @nestAccessControl.UseRoles({
    resource: "Tenant",
    action: "read",
    possession: "any",
  })
  async _tenantsMeta(
    @graphql.Args() args: TenantFindManyArgs
  ): Promise<MetaQueryPayload> {
    const results = await this.service.count({
      ...args,
      skip: undefined,
      take: undefined,
    });
    return {
      count: results,
    };
  }

  @graphql.Query(() => [Tenant])
  @nestAccessControl.UseRoles({
    resource: "Tenant",
    action: "read",
    possession: "any",
  })
  async tenants(
    @graphql.Args() args: TenantFindManyArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Tenant[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Tenant",
    });
    const results = await this.service.findMany(args);
    return results.map((result) => permission.filter(result));
  }

  @graphql.Query(() => Tenant, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Tenant",
    action: "read",
    possession: "own",
  })
  async tenant(
    @graphql.Args() args: TenantFindUniqueArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Tenant | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "Tenant",
    });
    const result = await this.service.findOne(args);
    if (result === null) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.Mutation(() => Tenant)
  @nestAccessControl.UseRoles({
    resource: "Tenant",
    action: "create",
    possession: "any",
  })
  async createTenant(
    @graphql.Args() args: CreateTenantArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Tenant> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "Tenant",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(
      permission,
      args.data
    );
    if (invalidAttributes.length) {
      const properties = invalidAttributes
        .map((attribute: string) => JSON.stringify(attribute))
        .join(", ");
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new apollo.ApolloError(
        `providing the properties: ${properties} on ${"Tenant"} creation is forbidden for roles: ${roles}`
      );
    }
    // @ts-ignore
    return await this.service.create({
      ...args,
      data: {
        ...args.data,

        users: args.data.users
          ? {
              connect: args.data.users,
            }
          : undefined,
      },
    });
  }

  @graphql.Mutation(() => Tenant)
  @nestAccessControl.UseRoles({
    resource: "Tenant",
    action: "update",
    possession: "any",
  })
  async updateTenant(
    @graphql.Args() args: UpdateTenantArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Tenant | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "Tenant",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(
      permission,
      args.data
    );
    if (invalidAttributes.length) {
      const properties = invalidAttributes
        .map((attribute: string) => JSON.stringify(attribute))
        .join(", ");
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new apollo.ApolloError(
        `providing the properties: ${properties} on ${"Tenant"} update is forbidden for roles: ${roles}`
      );
    }
    try {
      // @ts-ignore
      return await this.service.update({
        ...args,
        data: {
          ...args.data,

          users: args.data.users
            ? {
                connect: args.data.users,
              }
            : undefined,
        },
      });
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new apollo.ApolloError(
          `No resource was found for ${JSON.stringify(args.where)}`
        );
      }
      throw error;
    }
  }

  @graphql.Mutation(() => Tenant)
  @nestAccessControl.UseRoles({
    resource: "Tenant",
    action: "delete",
    possession: "any",
  })
  async deleteTenant(
    @graphql.Args() args: DeleteTenantArgs
  ): Promise<Tenant | null> {
    try {
      // @ts-ignore
      return await this.service.delete(args);
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new apollo.ApolloError(
          `No resource was found for ${JSON.stringify(args.where)}`
        );
      }
      throw error;
    }
  }

  @graphql.ResolveField(() => User, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Tenant",
    action: "read",
    possession: "any",
  })
  async users(
    @graphql.Parent() parent: Tenant,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<User | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "User",
    });
    const result = await this.service.getUsers(parent.id);

    if (!result) {
      return null;
    }
    return permission.filter(result);
  }
}
