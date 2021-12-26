import { Injectable } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";
import { TenantServiceBase } from "./base/tenant.service.base";

@Injectable()
export class TenantService extends TenantServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
