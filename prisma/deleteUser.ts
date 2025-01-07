import { db } from "../src/lib/index";

async function deleteAllUsers() {
  try {
    const deletedUsers = await db.user.deleteMany(); // Deletes all records from the User model
    console.log("Deleted all users:", deletedUsers.count, "records deleted");
  } catch (error) {
    console.error("Error deleting all users:", error);
  } finally {
    await db.$disconnect();
  }
}

// Call the function to delete all users
deleteAllUsers();
