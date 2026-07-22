const { data, error } = await supabase.auth.signInWithPassword({
  email: "infinityaicloudacademy@gmail.com",
  password: "USV9_ik5HQy!2_m",
});

console.log(data);
console.log(error);