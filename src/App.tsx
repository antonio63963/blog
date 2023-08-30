import React from 'react';
import logo from './logo.svg';
import './App.css';


import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
const supabase = createClient('https://acvdagwufzucfidnnnwp.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFjdmRhZ3d1Znp1Y2ZpZG5ubndwIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTMzOTczMDksImV4cCI6MjAwODk3MzMwOX0.400fJipWDuch-rQDmNLk5O8fF4T6H0ETS2iTdmYgvAc');

async function createNewClient() {
  console.log('wowo')
  const { data, error } = await supabase.auth.signUp({
    email: 'shotvideo25@gmail.com',
    password: '123123',
  });
  console.log('Response: ', data, 'Error: ', error);
}

async function signinClient() {
  console.log('wowo2')
  const { data, error } = await supabase.auth.signInWithPassword({
    email: 'shotvideo25@gmail.com',
    password: '123123',
  })
  console.log('Response: ', data, 'Error: ', error);
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
       
        <button onClick={createNewClient}>Create User</button>
        <button onClick={signinClient}>singin User</button>
      </header>
    </div>
  );
}

export default App;
