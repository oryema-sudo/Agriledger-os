/**
 * AgriLedger Phase 1 – System role & permission seed
 *
 * Run: npx prisma db seed
 */

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const PERMISSIONS = [
  { code: 'organization:read', description: 'View organization profile' },
  { code: 'organization:update', description: 'Update organization settings' },
  { code: 'user:invite', description: 'Invite users to organization' },
  { code: 'user:read', description: 'List organization members' },
  { code: 'user:update', description: 'Update member details' },
  { code: 'user:disable', description: 'Disable organization members' },
  { code: 'role:assign', description: 'Assign or change member roles' },
  { code: 'audit:read', description: 'View audit log' },
  { code: 'dashboard:read', description: 'View dashboard' },
  { code: 'procurement:create', description: 'Create procurement transactions' },
  { code: 'procurement:read', description: 'View procurement transactions' },
  { code: 'payment:create', description: 'Record payments' },
  { code: 'payment:read', description: 'View payments' },
  { code: 'reconciliation:confirm', description: 'Confirm reconciliation matches' },
  { code: 'report:export', description: 'Export reports' },
];

const ROLE_PERMISSIONS: Record<string, string[]> = {
  Owner: PERMISSIONS.map((p) => p.code),
  'Finance Manager': [
    'organization:read', 'user:read', 'audit:read', 'dashboard:read',
    'payment:create', 'payment:read', 'reconciliation:confirm', 'report:export', 'procurement:read',
  ],
  'Procurement Manager': [
    'organization:read', 'user:read', 'dashboard:read',
    'procurement:create', 'procurement:read', 'payment:read',
  ],
  'Field Agent': [
    'organization:read', 'dashboard:read', 'procurement:create', 'procurement:read',
  ],
  'Warehouse Manager': [
    'organization:read', 'dashboard:read', 'procurement:read',
  ],
  Accountant: [
    'organization:read', 'user:read', 'audit:read', 'dashboard:read',
    'payment:read', 'reconciliation:confirm', 'report:export', 'procurement:read',
  ],
  Auditor: [
    'organization:read', 'user:read', 'audit:read', 'dashboard:read',
    'payment:read', 'procurement:read', 'report:export',
  ],
};

async function main() {
  console.log('Seeding permissions...');
  for (const p of PERMISSIONS) {
    await prisma.permission.upsert({
      where: { code: p.code },
      create: p,
      update: { description: p.description },
    });
  }

  const orgs = await prisma.organization.findMany();
  console.log(`Seeding roles for ${orgs.length} organization(s)...`);

  for (const org of orgs) {
    for (const [roleName, codes] of Object.entries(ROLE_PERMISSIONS)) {
      let role = await prisma.role.findFirst({
        where: { organizationId: org.id, name: roleName },
      });
      if (!role) {
        role = await prisma.role.create({
          data: {
            organizationId: org.id,
            name: roleName,
            description: `${roleName} role`,
            isSystem: true,
          },
        });
      }

      for (const code of codes) {
        const perm = await prisma.permission.findUnique({ where: { code } });
        if (!perm) continue;
        await prisma.rolePermission.upsert({
          where: {
            roleId_permissionId: { roleId: role.id, permissionId: perm.id },
          },
          create: { roleId: role.id, permissionId: perm.id },
          update: {},
        });
      }
    }
  }

  console.log('Seed complete.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
