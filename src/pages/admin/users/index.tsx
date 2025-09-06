import { useEffect, useState } from "react";
import { supabase } from "../../../integrations/supabase/client";
import Input from "../../../components/input";
import Button from "../../../components/button";

const AdminUsers = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [users, setUsers] = useState<any[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    getUsers();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getUsers = async() => {
    const { error, data } = await supabase.from('profiles').select('*').ilike('name', `%${search}%`)

    if (error) {
      alert(error.message);
      return;
    }

    setUsers(data);
  }

  return (
    <div>
      <span className="block mb-6">Usuários</span>

      <div className="flex justify-end mb-4">
        <Input placeholder="Buscar" value={search} onChange={(e) => setSearch(e.target.value)} />
        <Button onClick={() => getUsers()}>search</Button>
      </div>

      <div className="table-my-money">
        <table >
          <thead>
            <tr>
              <th>Nome</th>
              <th>E-mail</th>
              <th>Data de criação</th>
            </tr>
          </thead>
          <tbody>
          {users.map((el, i) => (
            <tr key={i}>
              <td>{el.name}</td>
              <td>{el.email}</td>
              <td>{el.created_at}</td>
            </tr>
          ))}
          </tbody>
        </table>

      </div>
    </div>
  );
}

export default AdminUsers;
