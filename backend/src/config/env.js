import dotenv from 'dotenv';

dotenv.config();

export const env = {
  port: Number(process.env.PORT || 5001),
  mongoUri: process.env.MONGODB_URI || 'mongodb+srv://Gayal_db_user:K42HRWzcnPIWw5Cs@cluster0.xy8llul.mongodb.net/team_performance_tracker?appName=Cluster0',
  jwtSecret: process.env.JWT_SECRET || 'replace_with_a_strong_secret',
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  seedManagerEmail: process.env.SEED_MANAGER_EMAIL || 'manager@example.com',
  seedManagerPassword: process.env.SEED_MANAGER_PASSWORD || 'Password123!',
};
