import { supabase } from "./supabase-pms";

export async function signInAdmin(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) {
    throw error;
  }
  return data;
}

export async function signOutAdmin() {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error("[signOutAdmin] error", error);
  }
}

export async function getAdminSession() {
  const { data } = await supabase.auth.getSession();
  return data.session;
}
