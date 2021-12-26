import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestMorgan from "nest-morgan";
import * as nestAccessControl from "nest-access-control";
import * as defaultAuthGuard from "../../auth/defaultAuth.guard";
import * as abacUtil from "../../auth/abac.util";
import { isRecordNotFoundError } from "../../prisma.util";
import * as errors from "../../errors";
import { Request } from "express";
import { plainToClass } from "class-transformer";
import { TenantService } from "../tenant.service";
import { TenantCreateInput } from "./TenantCreateInput";
import { TenantWhereInput } from "./TenantWhereInput";
import { TenantWhereUniqueInput } from "./TenantWhereUniqueInput";
import { TenantFindManyArgs } from "./TenantFindManyArgs";
import { TenantUpdateInput } from "./TenantUpdateInput";
import { Tenant } from "./Tenant";
@swagger.ApiBearerAuth()
export class TenantControllerBase {
  constructor(
    protected readonly service: TenantService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(
    defaultAuthGuard.DefaultAuthGuard,
    nestAccessControl.ACGuard
  )
  @common.Post()
  @nestAccessControl.UseRoles({
    resource: "Tenant",
    action: "create",
    possession: "any",
  })
  @swagger.ApiCreatedResponse({ type: Tenant })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async create(
    @common.Body() data: TenantCreateInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<Tenant> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "Tenant",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const properties = invalidAttributes
        .map((attribute: string) => JSON.stringify(attribute))
        .join(", ");
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new errors.ForbiddenException(
        `providing the properties: ${properties} on ${"Tenant"} creation is forbidden for roles: ${roles}`
      );
    }
    return await this.service.create({
      data: {
        ...data,

        users: data.users
          ? {
              connect: data.users,
            }
          : undefined,
      },
      select: {
        createdAt: true,
        deletedAt: true,
        id: true,
        updatedAt: true,

        users: {
          select: {
            id: true,
          },
        },
      },
    });
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(
    defaultAuthGuard.DefaultAuthGuard,
    nestAccessControl.ACGuard
  )
  @common.Get()
  @nestAccessControl.UseRoles({
    resource: "Tenant",
    action: "read",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: [Tenant] })
  @swagger.ApiForbiddenResponse()
  @swagger.ApiQuery({
    type: () => TenantFindManyArgs,
    style: "deepObject",
    explode: true,
  })
  async findMany(
    @common.Req() request: Request,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<Tenant[]> {
    const args = plainToClass(TenantFindManyArgs, request.query);

    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Tenant",
    });
    const results = await this.service.findMany({
      ...args,
      select: {
        createdAt: true,
        deletedAt: true,
        id: true,
        updatedAt: true,

        users: {
          select: {
            id: true,
          },
        },
      },
    });
    return results.map((result) => permission.filter(result));
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(
    defaultAuthGuard.DefaultAuthGuard,
    nestAccessControl.ACGuard
  )
  @common.Get("/:id")
  @nestAccessControl.UseRoles({
    resource: "Tenant",
    action: "read",
    possession: "own",
  })
  @swagger.ApiOkResponse({ type: Tenant })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async findOne(
    @common.Param() params: TenantWhereUniqueInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<Tenant | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "Tenant",
    });
    const result = await this.service.findOne({
      where: params,
      select: {
        createdAt: true,
        deletedAt: true,
        id: true,
        updatedAt: true,

        users: {
          select: {
            id: true,
          },
        },
      },
    });
    if (result === null) {
      throw new errors.NotFoundException(
        `No resource was found for ${JSON.stringify(params)}`
      );
    }
    return permission.filter(result);
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(
    defaultAuthGuard.DefaultAuthGuard,
    nestAccessControl.ACGuard
  )
  @common.Patch("/:id")
  @nestAccessControl.UseRoles({
    resource: "Tenant",
    action: "update",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: Tenant })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async update(
    @common.Param() params: TenantWhereUniqueInput,
    @common.Body()
    data: TenantUpdateInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<Tenant | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "Tenant",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const properties = invalidAttributes
        .map((attribute: string) => JSON.stringify(attribute))
        .join(", ");
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new errors.ForbiddenException(
        `providing the properties: ${properties} on ${"Tenant"} update is forbidden for roles: ${roles}`
      );
    }
    try {
      return await this.service.update({
        where: params,
        data: {
          ...data,

          users: data.users
            ? {
                connect: data.users,
              }
            : undefined,
        },
        select: {
          createdAt: true,
          deletedAt: true,
          id: true,
          updatedAt: true,

          users: {
            select: {
              id: true,
            },
          },
        },
      });
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new errors.NotFoundException(
          `No resource was found for ${JSON.stringify(params)}`
        );
      }
      throw error;
    }
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(
    defaultAuthGuard.DefaultAuthGuard,
    nestAccessControl.ACGuard
  )
  @common.Delete("/:id")
  @nestAccessControl.UseRoles({
    resource: "Tenant",
    action: "delete",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: Tenant })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async delete(
    @common.Param() params: TenantWhereUniqueInput
  ): Promise<Tenant | null> {
    try {
      return await this.service.delete({
        where: params,
        select: {
          createdAt: true,
          deletedAt: true,
          id: true,
          updatedAt: true,

          users: {
            select: {
              id: true,
            },
          },
        },
      });
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new errors.NotFoundException(
          `No resource was found for ${JSON.stringify(params)}`
        );
      }
      throw error;
    }
  }
}
