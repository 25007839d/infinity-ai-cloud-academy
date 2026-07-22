import { supabase } from "./supabase";

export async function registerDemo(formData) {
  const { error } = await supabase
    .from("demo_registrations")
    .insert([
      {
        full_name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        course: formData.course,
        experience: formData.experience,
        status: "New",
      },
    ]);

  if (error) throw error;
}