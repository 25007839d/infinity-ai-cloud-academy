import { supabase } from "../../services/supabase";

export async function login(email, password) {
  // Step 1: Authenticate user
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;

  // Step 2: Verify admin exists
  const { data: admin, error: adminError } = await supabase
  .from("admins")
  .select("*")
  .eq("auth_user_id", data.user.id)
  .single();

console.log("========== LOGIN DEBUG ==========");
console.log("Logged User ID:", data.user.id);
console.log("Admin Record:", admin);
console.log("Admin Error:", adminError);
console.log("================================");

if (adminError) {
  await supabase.auth.signOut();
  throw adminError;
}

  // Step 3: Check status
  if (admin.status !== "Active") {
    await supabase.auth.signOut();
    throw new Error("Your account has been disabled.");
  }

  // Step 4: Update last login
  await supabase
    .from("admins")
    .update({
      last_login: new Date().toISOString(),
    })
    .eq("id", admin.id);

  return admin;
}

export async function logout() {
  await supabase.auth.signOut();
}

export async function getCurrentUser() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user;
}