import { useEffect, useState, useContext } from 'react';
import { Bars3BottomLeftIcon, ArrowRightStartOnRectangleIcon, ChartBarIcon, UserIcon } from '@heroicons/react/16/solid';

import './styles.scss';
import { AuthContext } from '../../contexts/auth';
import { Link, NavLink } from 'react-router-dom';

const sidebarKey = 'sidebar';

const menus = [
  { label: 'Dashboard', url: '/', icon: <ChartBarIcon /> },
  { label: 'Perfil', url: '/profile', icon: <UserIcon /> }
]

const Navbar = () => {
  const [open, setOpen] = useState(true);
  const auth = useContext(AuthContext);

  const name = auth?.user?.identities?.[0]?.identity_data?.name ?? '';

  useEffect(() => {
    const sidebarLocal = localStorage.getItem(sidebarKey);
    setOpen( sidebarLocal === 'open' ? true : false);

    const updateSize = () => {
      if (window.innerWidth < 768) setOpen(false);
    }
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  useEffect(() => {
    localStorage.setItem(sidebarKey, open ? 'open' : 'close');
    const el = document.getElementById('protected-route');
    if (el) el.className = open ? 'nav-open' : 'nav-close';
  }, [open]);

  return (
    <div className="pt-14 text-white">
      { open && (
        <div onClick={() => setOpen(!open)} className='block md:hidden absolute bg-gray-900 opacity-25 w-screen h-screen top-0 z-1'></div>
      )}

      <header className="flex items-center justify-end fixed w-full bg-sky-600 shadow-lg h-14 pr-4">
        <div className="flex">
          <Link
            to={'/profile'}
            title={name}
            className='flex items-center justify-center gap-2 h-8 w-8 rounded-full cursor-pointer bg-sky-700'
          >
            <span>{name[0]}</span>
          </Link>
        </div>
      </header>

      <nav className="absolute md:fixed bg-sky-600 h-screen p-4 z-2">
        <div className="relative h-full">
          <button
            className="flex items-center justify-center absolute bg-sky-600
            cursor-pointer h-14 w-14 top-[-16px] right-[-70px]"
            onClick={() => setOpen(!open)}>
            <Bars3BottomLeftIcon className="transition-all duration-500 h-6 w-6" />
          </button>

          <div className="flex flex-col justify-between h-full">
            <div className="flex flex-col gap-8">
              <div className={`flex justify-center items-center transition-all delay-150 duration-400 overflow-hidden w-full ${open ? 'w-auto' : 'w-0'}`}>
                MM
              </div>

              <div className='flex flex-col gap-3'>
                {menus.map((el, i) => (
                  <NavLink
                    key={i} to={el.url}
                    className="flex items-center gap-2 px-3 py-2 border-l-4 border-sky-600 transition duration-400 hover:border-white">
                    <div className="h-5 w-5 flex">{el.icon}</div>
                    <span className={`transition-all delay-150 duration-400 overflow-hidden w-full ${open ? 'w-auto' : 'w-0'}`}>
                      {el.label}
                    </span>
                  </NavLink>
                ))}
              </div>
            </div>

            <button
              onClick={() => auth?.logout()}
              className="flex items-center gap-2 border-1 border-sky-700 transition duration-400 hover:bg-sky-700 px-3 py-2 rounded cursor-pointer"
            >
              <div className="h-5 w-5 flex"><ArrowRightStartOnRectangleIcon /></div>
              <span className={`text-start transition-all delay-150 duration-400 overflow-hidden w-full ${open ? 'w-auto' : 'w-0'}`}>
                Logout
              </span>
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
