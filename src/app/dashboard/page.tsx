'use client';
import supabase from '@/utils/supabase';
import Dashboard from './DashBoard/DashBoard'; 

const dashBoard = () => {
  return (
    <Dashboard supabase={supabase} /> 
  );
};

export default dashBoard;