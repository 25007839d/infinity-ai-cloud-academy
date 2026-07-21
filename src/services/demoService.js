import { supabase } from "../lib/supabase";

export async function registerDemo(data) {
  const { error } = await supabase
    .from("demo_registrations")
    .insert([
      {
        full_name: data.fullName,
        phone: data.phone,
        course: data.course,
        experience: data.experience,
      },
    ]);

  if (error) {
    throw error;
  }

  return true;
}