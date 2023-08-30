import { SupabaseClient, createClient } from '@supabase/supabase-js'
import { log } from 'console';

enum Role {
  author = 'author',
  user = 'user'
}

class Database {
  static supabase?: SupabaseClient<any, "public", any>;

  static init() {
    if (!this.supabase) {
      this.supabase = createClient('https://acvdagwufzucfidnnnwp.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFjdmRhZ3d1Znp1Y2ZpZG5ubndwIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTMzOTczMDksImV4cCI6MjAwODk3MzMwOX0.400fJipWDuch-rQDmNLk5O8fF4T6H0ETS2iTdmYgvAc');
    }
  }

  static async createUser(email: string, password: string) {
    try {
      this.init();
      const { data } = await this.supabase!.auth.signUp({
        email,
        password, 
      });
      console.log('CreateUser: ', data);

    } catch (err) {
      console.log('CreateUser Error: ', err);

    }
  }
  static async signin(email: string, password: string) {
    try {
      this.init();
      const { data } = await this.supabase!.auth.signInWithPassword({
        email,
        password,
      });
      console.log('Signin: ', data);

    } catch (err) {
      console.log('Signin Error: ', err);
    }
  }
}

export default Database;