import { useEffect } from "react";
// import { supabase } from "../../integrations/supabase/client";

const Home = () => {

  // const getBudget = async() => {
  //   const { data, error } = await supabase.from('profiles').select('*');

  //   if (error) alert(error);
  //   else {
  //     console.log(data);
  //   }
  // }

  // const insetBudget = async() => {
  //   const dataReq = {
  //     user_id: '7e5399d1-a96c-49af-bdb5-70f00083881f',
  //     name: 'teste',
  //     expense: true,
  //     value: 100
  //   }

  //   const { data, error } = await supabase.from('budget').insert(dataReq).select('*');

  //   if (error) alert(error);
  //   else {
  //     console.log(data);
  //   }
  // }

  // const updateBudget = async() => {
  //   const { data, error } = await supabase.from('budget').update({ name: 'teste 1' }).eq('id', 2).select('*');

  //   if (error) alert(error);
  //   else {
  //     console.log(data);
  //   }
  // }

  // const deleteBudget = async() => {
  //   const { data, error } = await supabase.from('budget').delete().eq('id', 2).select('*');

  //   if (error) alert(error);
  //   else {
  //     console.log(data);
  //   }
  // }

  useEffect(() => {
    // getBudget();
    // insetBudget();
    // updateBudget();
    // deleteBudget();
  }, []);

  return (
    <div>
      <span>Dashboard</span>
    </div>
  );
}

export default Home;
