import mongoose from "mongoose";
import env from "./env";
import User from "../models/User";

const migrateUserIndexes = async (): Promise<void> => {
  try {
    const userCollection = mongoose.connection.collection("users");

    try {
      await userCollection.dropIndex("email_1");
      console.log("🧹 Dropped legacy users.email unique index");
    } catch (error: any) {
      if (error?.codeName !== "IndexNotFound") {
        throw error;
      }
    }

    await userCollection.createIndex(
      { email: 1, websiteId: 1 },
      {
        unique: true,
        sparse: true,
        name: "user_email_website_unique",
      }
    );

    console.log("✅ Ensured website-scoped user index");
  } catch (error) {
    console.error("⚠️ User index migration failed:", error);
  }
};

const seedAdminUser = async (): Promise<void> => {
  try {
    const existingAdmin = await User.findOne({
      email: "admin@buildhub.com",
    });

    if (existingAdmin) {
      console.log("✅ Super admin user already exists: admin@buildhub.com");
      return;
    }

    await User.create({
      fullName: "BuildHub Admin",
      email: "admin@buildhub.com",
      password: "admin123",
      role: "admin",
      isEmailVerified: true,
      isActive: true,
    });

    console.log("✅ Seeded admin user: admin@buildhub.com / admin123");
  } catch (error) {
    console.error("⚠️ Super admin seed failed:", error);
  }
};

const connectDatabase = async (): Promise<void> => {
  try {
    await mongoose.connect(env.mongoUri);

    console.log(
      "✅ MongoDB Connected Successfully"
    );

    console.log(
      `📦 Database: ${mongoose.connection.name}`
    );

    await migrateUserIndexes();
    await seedAdminUser();

  } catch (error) {
    console.error(
      "❌ MongoDB Connection Failed"
    );

    console.error(error);

    process.exit(1);
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("⚠️ MongoDB Disconnected");
});

mongoose.connection.on("reconnected", () => {
  console.log("🔄 MongoDB Reconnected");
});

mongoose.connection.on("error", (error) => {
  console.error("MongoDB Error:", error);
});

export default connectDatabase;