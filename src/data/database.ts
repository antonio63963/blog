import { SupabaseClient, createClient } from '@supabase/supabase-js'
import { error, log } from 'console';
//N24ct5MPkVF8mdBu
const anon = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVpcmt1dWF2dW10c293bWVqYnlsIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTM2NDY2MzksImV4cCI6MjAwOTIyMjYzOX0.F-JaUXe9KKfOJIwix_QgH2llB0h7o3pgrDJBLkmYsMU'
const url = 'https://eirkuuavumtsowmejbyl.supabase.co'

class Database {
  static supabase?: SupabaseClient<any, "public", any>;

  static init() {
    if (!this.supabase) {
      this.supabase = createClient(url, anon);
    }
  }

  static async createUser(email: string, password: string, name: string, isAuthor: boolean = false) {
    this.init();
    const { data, error } = await this.supabase!.auth.signUp({
      email,
      password,
      options: {
        data: {
          name: name,
          isAuthor: isAuthor,
        }
      }
    });
    console.log('CreateUser: ', data);
    if (!error) {
      return data;
    } else {
      throw new Error(error?.message);
    }

  }
  static async signin(email: string, password: string) {
    this.init();
    const { data, error } = await this.supabase!.auth.signInWithPassword({
      email,
      password,
    });
    console.log('Signin: ', data, error);
    if (!error) {
      return data;
    } else {
      throw new Error(error?.message);
    }
  }
  static async insertArticle(title: string, text: string, authorId: string) {
    this.init();

    if (!this.supabase) throw new Error('Not opend DB');
    const { error } = await this.supabase!.from('articles')
      .insert({
        title,
        text,
        comments: [],
        authorId
      });
    console.log('Signin: ', error);

  }
  static async logout() {
    this.init();
    if (!this.supabase) throw new Error('Not opend DB');
    const { error } = await this.supabase!.auth.signOut();
    if(error) throw new Error('Logout was failed...');
  }
}

export default Database;
