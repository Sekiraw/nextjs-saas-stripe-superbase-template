import Link from 'next/link';
import { createServerSupabaseClient } from '@/app/supabase-server';

import Logo from '@/components/icons/Logo';
import SignOutButton from './SignOutButton';

import s from './Navbar.module.css';

export default async function Navbar() {
  const supabase = createServerSupabaseClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  return (
    <nav className={s.root}>
      <a href="#skip" className="sr-only focus:not-sr-only">
        Skip to content
      </a>
      <div className="max-w-6xl px-6 mx-auto">
        <div className="relative flex flex-row justify-between py-4 align-center md:py-6">
          <div className="flex items-center flex-1">
            <Link href="/" className={s.logo} aria-label="Logo">
              <Logo />
            </Link>
            <nav className="hidden ml-6 space-x-2 lg:block">
              <Link href="/" className={s.link}>
                Pricing
              </Link>
              {user && (
                <Link href="/account" className={s.link}>
                  Account
                </Link>
              )}
            </nav>
          </div>
          <div className="flex justify-end flex-1 space-x-8">
            <div className="flex items-center space-x-4">
              {user ? (
                <SignOutButton />
              ) : (
                <>
                  <Link
                    href="/signin"
                    className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                  >
                    Sign in
                  </Link>
                  {/* <Link
                    href="/signup"
                    className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                  >
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: '2px solid #999',
                        borderRadius: '4px',
                        padding: '8px',
                      }}
                    >
                      Sign up
                    </div>

                  </Link> */}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
