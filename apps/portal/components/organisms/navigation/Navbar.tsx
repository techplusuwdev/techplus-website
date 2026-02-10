'use client';

import React, { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import Button from '@mui/material/Button';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import NavbarTabs from './NavbarTabs';
import ProfileButton from './ProfileButton';
import { useAuth } from '@/lib/contexts/AuthContext';
import Logo from './logo.png';

function navWidth(hasUser: boolean): number {
  return hasUser ? 1400 : 1050;
}

export default function Navbar() {
  const [currentTab, setCurrentTab] = useState(0);
  const [open, setOpen] = useState(false);
  const [width, setWidth] = useState(0);
  const pathname = usePathname();
  const router = useRouter();
  const { isAuthenticated, userRole } = useAuth();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setWidth(window.innerWidth);
      const updateWidth = () => {
        setWidth(window.innerWidth);
        setOpen(false);
      };
      window.addEventListener('resize', updateWidth);
      return () => window.removeEventListener('resize', updateWidth);
    }
  }, []);

  const isAdmin = userRole === 'admin';

  useEffect(() => {
    const routes = isAdmin 
      ? ['/', '/initiatives', '/impact', '/resources', '/team', '/calendar', '/admin']
      : ['/', '/initiatives', '/impact', '/resources', '/team', '/calendar'];
    const index = routes.indexOf(pathname);
    if (index !== -1) {
      setCurrentTab(index);
    }
  }, [pathname, isAdmin]);

  const handleLogin = () => {
    router.push('/login');
  };

  const handleSignup = () => {
    router.push('/signup');
  };

  const isMobile = width < navWidth(isAuthenticated) && width > 0;

  return (
    <div className="relative">
      <AppBar position="sticky" className="top-0 z-50" style={{ backgroundColor: '#050a1f' }}>
        <Toolbar className="flex items-center justify-between px-[6%]">
            <div className="flex items-center">
            <Link href="/" className="no-underline flex items-center">
                <Image
                src={Logo}
                alt="Tech+ UW Logo"
                width={100}
                height={50}
                className="object-contain"
                />
            </Link>
            </div>

            {/* CENTER: Tabs */}
            <div className="absolute left-1/2 -translate-x-1/2">
            <NavbarTabs
                currentTab={currentTab}
                setCurrentTab={setCurrentTab}
                tabOrientation="horizontal"
            />
            </div>

            {/* RIGHT: Auth buttons or profile */}
            {isMobile ? (
            <>
              {isAuthenticated && <ProfileButton />}
              <IconButton
                  edge="end"
                  color="inherit"
                  onClick={() => setOpen(true)}
                  className="text-white"
              >
                  <MenuIcon />
              </IconButton>
              <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
                <div onClick={() => setOpen(false)} className="min-w-[300px]">
                  <NavbarTabs
                    currentTab={currentTab}
                    setCurrentTab={setCurrentTab}
                    tabOrientation="vertical"
                  />
                </div>
              </Drawer>
            </>
            ) : (
            <div className="flex items-center gap-3">
                {isAuthenticated ? (
                  <ProfileButton />
                ) : (
                  <>
                    <Button
                      variant="outlined"
                      onClick={handleLogin}
                      className="text-white border-white normal-case"
                    >
                      Login
                    </Button>
                    <Button
                      variant="contained"
                      onClick={handleSignup}
                      className="normal-case text-white"
                      sx={{
                        backgroundColor: '#76a36d',
                        '&:hover': { backgroundColor: '#5d8a55' },
                      }}
                    >
                      Sign Up
                    </Button>
                  </>
                )}
            </div>
            )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
