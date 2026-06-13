import { Link } from 'react-router-dom';
import { PropsWithChildren, useEffect, useMemo, useRef, useState } from 'react';

type ThemeMode = 'light' | 'dark';
interface CursorBubble {
  id: number;
  x: number;
  y: number;
  size: number;
}

export function Layout(props: PropsWithChildren) {
  const token = localStorage.getItem('tkk_lms_access_token');
  const [theme, setTheme] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem('tkk_lms_theme');
    return saved === 'dark' ? 'dark' : 'light';
  });
  const [bubbles, setBubbles] = useState<CursorBubble[]>([]);
  const bubbleIdRef = useRef(0);
  const lastMoveRef = useRef(0);
  const user = useMemo(() => {
    const raw = localStorage.getItem('tkk_lms_user');
    return raw ? (JSON.parse(raw) as { fullName?: string; roles?: string[] }) : null;
  }, [token]);
  const isAdmin = Boolean(user?.roles?.includes('admin'));

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('tkk_lms_theme', theme);
  }, [theme]);

  useEffect(() => {
    const onMove = (event: MouseEvent) => {
      const now = Date.now();
      if (now - lastMoveRef.current < 45) {
        return;
      }
      lastMoveRef.current = now;

      const bubble: CursorBubble = {
        id: ++bubbleIdRef.current,
        x: event.clientX,
        y: event.clientY,
        size: 8 + Math.round(Math.random() * 14),
      };

      setBubbles((prev) => [...prev.slice(-20), bubble]);

      window.setTimeout(() => {
        setBubbles((prev) => prev.filter((item) => item.id !== bubble.id));
      }, 950);
    };

    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  function logout() {
    localStorage.removeItem('tkk_lms_access_token');
    localStorage.removeItem('tkk_lms_user');
    window.location.href = '/login';
  }

  return (
    <div className="app-shell">
      <div className="cursor-bubble-layer" aria-hidden>
        {bubbles.map((bubble) => (
          <span
            key={bubble.id}
            className="cursor-bubble"
            style={{
              left: bubble.x,
              top: bubble.y,
              width: bubble.size,
              height: bubble.size,
            }}
          />
        ))}
      </div>

      <header className="topbar">
        <div className="brand">TKK LMS // TECH ACADEMY</div>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/catalog">Catalog</Link>
          <Link to="/notes">Notes</Link>
          <Link to="/student/dashboard">Student</Link>
          <Link to="/student/profile">Profile</Link>
          <Link to="/student/settings">Settings</Link>
          {isAdmin && <Link to="/admin/dashboard">Admin</Link>}
          {isAdmin && <Link to="/admin/content-import">Content Import</Link>}
          {!token && <Link to="/signup">Sign Up</Link>}
          {!token && <Link to="/login">Login</Link>}
          <button
            className="btn-secondary"
            type="button"
            onClick={() => setTheme((curr) => (curr === 'dark' ? 'light' : 'dark'))}
          >
            {theme === 'dark' ? 'Light' : 'Dark'} Mode
          </button>
          {token && <span className="chip">{user?.fullName || 'Student'}</span>}
          {token && (
            <button className="btn-secondary" type="button" onClick={logout}>
              Logout
            </button>
          )}
        </nav>
      </header>
      <main>{props.children}</main>
    </div>
  );
}
