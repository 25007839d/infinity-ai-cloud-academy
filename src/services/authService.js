import { supabase } from "./supabase";

// Register
export async function signUp(email, password, profile = {}) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: profile,
    },
  });

  if (error) throw error;

  return data;
}

// Login
export async function signIn(email, password) {
  const { data, error } =
    await supabase.auth.signInWithPassword({
      email,
      password,
    });

  if (error) throw error;

  return data;
}

// Logout
export async function signOut() {
  const { error } = await supabase.auth.signOut();

  if (error) throw error;
}

// Current User
export async function getCurrentUser() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user;
}

// Forgot Password
export async function resetPassword(email) {
  const { error } =
    await supabase.auth.resetPasswordForEmail(email);

  if (error) throw error;
}