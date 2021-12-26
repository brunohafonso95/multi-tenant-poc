import { PrismaService } from "nestjs-prisma";
import { Prisma, Tenant, User } from "@prisma/client";

export class TenantServiceBase {
  constructor(protected readonly prisma: PrismaService) {}

  async count<T extends Prisma.TenantFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.TenantFindManyArgs>
  ): Promise<number> {
    return this.prisma.tenant.count(args);
  }

  async findMany<T extends Prisma.TenantFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.TenantFindManyArgs>
  ): Promise<Tenant[]> {
    return this.prisma.tenant.findMany(args);
  }
  async findOne<T extends Prisma.TenantFindUniqueArgs>(
    args: Prisma.SelectSubset<T, Prisma.TenantFindUniqueArgs>
  ): Promise<Tenant | null> {
    return this.prisma.tenant.findUnique(args);
  }
  async create<T extends Prisma.TenantCreateArgs>(
    args: Prisma.SelectSubset<T, Prisma.TenantCreateArgs>
  ): Promise<Tenant> {
    return this.prisma.tenant.create<T>(args);
  }
  async update<T extends Prisma.TenantUpdateArgs>(
    args: Prisma.SelectSubset<T, Prisma.TenantUpdateArgs>
  ): Promise<Tenant> {
    return this.prisma.tenant.update<T>(args);
  }
  async delete<T extends Prisma.TenantDeleteArgs>(
    args: Prisma.SelectSubset<T, Prisma.TenantDeleteArgs>
  ): Promise<Tenant> {
    return this.prisma.tenant.delete(args);
  }

  async getUsers(parentId: string): Promise<User | null> {
    return this.prisma.tenant
      .findUnique({
        where: { id: parentId },
      })
      .users();
  }
}
