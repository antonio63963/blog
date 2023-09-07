import { SupabaseClient, createClient } from '@supabase/supabase-js'
//N24ct5MPkVF8mdBu

class Database {
  static supabase?: SupabaseClient<any, "public", any>;

  static init() {
    console.log(process.env.REACT_APP_DB, process.env.REACT_APP_ANON)
    if (!this.supabase ) {
      this.supabase = createClient( process.env.REACT_APP_DB!, process.env.REACT_APP_ANON!);
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

  //articles
  static async insertArticle(title: string, text: string, authorId: string, authorName: string) {
    this.init();

    if (!this.supabase) throw new Error('Not opend DB');
    const { error } = await this.supabase!.from('articles')
      .insert({
        title,
        text,
        authorName,
        authorId
      });
    console.log('Insert Art: ', error);
    return error;
  }

  static async getArticlesList() {
    this.init();

    if (!this.supabase) throw new Error('Not opend DB');
    const { data, error } = await this.supabase!.from('articles')
      .select();
    console.log('Get List Art: ', data);
    if(error) throw new Error('Smth has gone wrong!');
    return data;
  }

  static async getArticleById(id: string) {
    this.init();

    if (!this.supabase) throw new Error('Not opend DB');
    const { data, error } = await this.supabase!.from("articles").select().eq('id', id).select(`
    id, 
    title,
    text,
    authorName,
    authorId,
    comments ( id, text, user_id, user_name )
  `);
    console.log('GetById: ', data);
    if (error) throw new Error('error');
    return data;
  }

  static async logout() {
    this.init();
    if (!this.supabase) throw new Error('Not opend DB');
    const { error } = await this.supabase!.auth.signOut();
    if (error) throw new Error('Logout was failed...');
  }
  static async users() {
    this.init();
    if (!this.supabase) throw new Error('Not opend DB');
    const { error } = await this.supabase!.auth.admin.listUsers();
    if (error) throw new Error('Logout was failed...');
  }
  //comments
  static async insertComment(artId: number, text: string, userId: string, userName: string) {
    this.init();

    if (!this.supabase) throw new Error('Not opend DB');
    const { error } = await this.supabase!.from('comments')
      .insert({
        art_id: artId,
        text: text,
        user_name: userName,
        user_id: userId
      });
    console.log('Insert Art: ', error);
    return error;
  }
}

export default Database;
