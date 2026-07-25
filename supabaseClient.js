import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const supabaseUrl = "https://rdnckzmgigzvjpvzibme.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJkbmNrem1naWd6dmpwdnppYm1lIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ5MjcyNzksImV4cCI6MjEwMDUwMzI3OX0.HUcFXI5CKi7mZr6sfnfHlihpHmvSrScLQoptcBiBoms";

export const supabase = createClient(
    supabaseUrl,
    supabaseAnonKey
);