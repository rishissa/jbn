import Global from "../src/api/global/models/global.js";
import User from "../src/api/user/models/user.js";
import bcrypt from "bcryptjs";

export const initializeSuperadmin = async () => {
  try {
    const hashedPassword = await bcrypt.hash("12345678", 10);

    const user = await User.findOneAndUpdate(
      { email: "superadmin@gmail.com" },
      {
        name: "superadmin",
        email: "superadmin@gmail.com",
        password: hashedPassword,
        phone: "9999999999",
        country_code: "+91",
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    const global = await Global.findOne();
    if (!global) {
      await Global.create({
        brand_name: "JITO",
        brand_website_url: "jbn@jito.org",
      });
    }
    console.log("Superadmin Initialized");
  } catch (err) {
    console.error("Error in findOrCreateSuperAdmin:", err);
    throw err;
  }
};
