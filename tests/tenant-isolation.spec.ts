/**
 * Tenant isolation tests (Phase 1 – mandatory)
 *
 * A user belonging to Organization A must never access Organization B data.
 */

import { ForbiddenException } from '@nestjs/common';
import { OrganizationsService } from '../src/modules/organizations/organizations.service';
import { AuthUser } from '../src/common/decorators/current-user.decorator';

describe('Tenant Isolation (mandatory)', () => {
  const orgService = new OrganizationsService({} as any);

  const userOrgA: AuthUser = {
    userId: 'user-a-id',
    email: 'owner-a@agriledger.test',
    organizationId: 'org-a-id',
    membershipId: 'mem-a-id',
    roleName: 'Owner',
    permissions: [
      'organization:read', 'organization:update', 'user:read',
      'user:invite', 'role:assign', 'audit:read',
    ],
  };

  const userOrgB: AuthUser = {
    userId: 'user-b-id',
    email: 'owner-b@agriledger.test',
    organizationId: 'org-b-id',
    membershipId: 'mem-b-id',
    roleName: 'Owner',
    permissions: ['organization:read', 'user:read'],
  };

  describe('OrganizationsService.assertTenantAccess', () => {
    it('allows access when organizationId matches the caller', () => {
      expect(() =>
        orgService.assertTenantAccess(userOrgA, 'org-a-id'),
      ).not.toThrow();
    });

    it('DENIES access when organizationId belongs to another tenant', () => {
      expect(() =>
        orgService.assertTenantAccess(userOrgA, 'org-b-id'),
      ).toThrow(ForbiddenException);

      expect(() =>
        orgService.assertTenantAccess(userOrgA, 'org-b-id'),
      ).toThrow(/Cross-tenant access denied/);
    });

    it('DENIES access in the reverse direction (B cannot access A)', () => {
      expect(() =>
        orgService.assertTenantAccess(userOrgB, 'org-a-id'),
      ).toThrow(ForbiddenException);
    });
  });

  describe('Permission boundaries', () => {
    it('Field Agent permissions do not include user management', () => {
      const fieldAgentPerms = [
        'organization:read', 'dashboard:read',
        'procurement:create', 'procurement:read',
      ];
      expect(fieldAgentPerms).not.toContain('user:invite');
      expect(fieldAgentPerms).not.toContain('user:disable');
      expect(fieldAgentPerms).not.toContain('role:assign');
      expect(fieldAgentPerms).not.toContain('audit:read');
    });

    it('Auditor permissions are read-only for financial data', () => {
      const auditorPerms = [
        'organization:read', 'user:read', 'audit:read', 'dashboard:read',
        'payment:read', 'procurement:read', 'report:export',
      ];
      expect(auditorPerms).not.toContain('user:invite');
      expect(auditorPerms).not.toContain('user:disable');
      expect(auditorPerms).not.toContain('payment:create');
      expect(auditorPerms).not.toContain('reconciliation:confirm');
    });
  });
});
