import { Tenant as TTenant } from "../api/tenant/Tenant";

export const TENANT_TITLE_FIELD = "id";

export const TenantTitle = (record: TTenant): string => {
  return record.id || record.id;
};
