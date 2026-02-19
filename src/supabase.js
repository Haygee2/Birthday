import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://skqbkmiljimlbmlxjjdz.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNrcWJrbWlsamltbGJtbHhqamR6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE1MDIyNzQsImV4cCI6MjA4NzA3ODI3NH0.qg1AO4dje-sy5ByDERjEXYhRXpzbGvavWz-QwqCDXG4'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
