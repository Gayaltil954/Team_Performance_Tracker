import bcrypt from 'bcryptjs';
import { connectDatabase, disconnectDatabase } from './config/database.js';
import { env } from './config/env.js';
import User from './models/User.js';
import Member from './models/Member.js';

async function seed() {
  await connectDatabase();

  const email = env.seedManagerEmail.toLowerCase();
  const existingUser = await User.findOne({ email });

  let manager = existingUser;

  if (!manager) {
    const passwordHash = await bcrypt.hash(env.seedManagerPassword, 10);
    manager = await User.create({
      name: 'Assessment Manager',
      email,
      passwordHash,
    });
  }

  await Member.deleteMany({ managerId: manager._id });

  await Member.insertMany([
    {
      managerId: manager._id,
      name: 'Aarav Sharma',
      role: 'Frontend',
      score: 85,
      department: 'Engineering',
      team: 'Project Alpha Team',
    },
    {
      managerId: manager._id,
      name: 'Nisha Patel',
      role: 'Backend',
      score: 75,
      department: 'Engineering',
      team: 'Platform Team',
    },
    {
      managerId: manager._id,
      name: 'Rahul Mehta',
      role: 'QA',
      score: 35,
      department: 'QA',
      team: 'Automation QA Team',
    },
  ]);

  console.log('Seed completed successfully');
  console.log(`Manager email: ${email}`);
  console.log(`Manager password: ${env.seedManagerPassword}`);

  await disconnectDatabase();
}

seed().catch(async (error) => {
  console.error('Seed failed:', error);
  await disconnectDatabase();
  process.exit(1);
});
