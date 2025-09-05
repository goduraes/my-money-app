import { useEffect, useState, useContext } from 'react';
import { Bars3BottomLeftIcon, XMarkIcon, ArrowRightStartOnRectangleIcon, ChartBarIcon, UserIcon, UsersIcon } from '@heroicons/react/16/solid';

import './styles.scss';
import { AuthContext } from '../../contexts/auth';
import { Link, NavLink } from 'react-router-dom';

const sidebarKey = 'sidebar';

const menus = [
  { label: 'Dashboard', url: '/', icon: <ChartBarIcon /> },
  { label: 'Perfil', url: '/profile', icon: <UserIcon /> }
]

const adminMenus = [
  { label: 'Users', url: '/admin/users', icon: <UsersIcon /> },
]

const Navbar = () => {
  const [isMobile, setIsMobile] = useState(true);
  const [open, setOpen] = useState(true);
  const auth = useContext(AuthContext);

  const name = auth?.user?.user_metadata.name ?? '';

  const filteredMenus = auth?.isAdmin ? [...menus, ...adminMenus] : menus;

  useEffect(() => {
    const sidebarLocal = localStorage.getItem(sidebarKey);
    setOpen( sidebarLocal === 'open' ? true : false);

    const updateSize = () => {
      if (window.innerWidth < 768) {
        setIsMobile(true);
        setOpen(false);
      } else {
        setIsMobile(false);
      }
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
        <div onClick={() => setOpen(!open)} className='block md:hidden absolute bg-gray-900 opacity-25 w-screen h-dvh top-0 z-1'></div>
      )}

      <header className="flex items-center justify-between fixed w-full bg-sky-600 shadow-lg h-14 pr-4">
        <button
          className="flex items-center justify-center cursor-pointer h-14 w-14"
          onClick={() => setOpen(!open)}>
          <Bars3BottomLeftIcon className="transition-all duration-500 h-6 w-6" />
        </button>
        <Link
          to={'/profile'}
          title={name}
          className='flex items-center justify-center gap-2 h-8 w-8 rounded-full cursor-pointer bg-sky-700'
        >
          <span>{name[0]}</span>
        </Link>
      </header>

      <nav className="absolute md:fixed bg-sky-600 h-dvh p-4 z-2">
        <div className="relative h-full">
          <button
            className="md:hidden flex items-center absolute justify-center cursor-pointer h-10 w-10 top-[-15px] right-[-15px]"
            onClick={() => setOpen(!open)}>
            <XMarkIcon className="transition-all duration-500 h-6 w-6" />
          </button>

          <div className="flex flex-col justify-between h-full">
            <div className="flex flex-col gap-8">
              <div className={`flex justify-center items-center transition-all delay-150
                duration-400 overflow-hidden w-full ${open ? 'w-auto' : 'w-0'}`}>
                MM
              </div>

              <div className='flex flex-col gap-3'>
                {filteredMenus.map((el, i) => (
                  <NavLink
                    key={i} to={el.url}
                    onClick={() => isMobile ? setOpen(false) : null}
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
              className="flex items-center gap-2 border-1 border-sky-700 transition duration-400
              hover:bg-sky-700 px-3 py-2 rounded cursor-pointer"
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
