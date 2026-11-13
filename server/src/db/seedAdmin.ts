import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import { eq } from 'drizzle-orm';
import { db, pool } from './index';
import { users } from './schema';

dotenv.config();

const seedSuperAdmin = async () => {
  console.log('🌱 Checking for Super Admin account...');
  
  // Add your admin email and password for your db
  const adminEmail = 'your admin email here';
  const adminPassword = 'your admin password here';

  try {
    const existing = await db
      .select()
      .from(users)
      .where(eq(users.email, adminEmail))
      .limit(1);

    if (existing.length > 0) {
      console.log(`ℹ️  Super Admin (${adminEmail}) already exists. Skipping.`);
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(adminPassword, salt);

    const [adminUser] = await db
      .insert(users)
      .values({
        orgId: null, // Super Admin has no single tenant
        email: adminEmail,
        passwordHash,
        fullName: 'System Super-Admin',
        role: 'ADMIN',
        subRole: null,
        isActive: true,
      })
      .returning();

    console.log('✅ Super Admin created successfully:');
    console.log(`   Email:    ${adminUser.email}`);
    console.log(`   Password: ${adminPassword}`);
    console.log(`   Role:     ${adminUser.role}`);
  } catch (error) {
    console.error('❌ Failed to seed Super Admin:', error);
  } finally {
    await pool.end();
  }
};

seedSuperAdmin();