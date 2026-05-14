import { Outlet, useLocation } from "react-router";
import { BottomNav } from "../components/BottomNav";

export function RootLayout() {
  const location = useLocation();

  // Hide bottom nav on certain pages
  const hideBottomNav = ['/create', '/login', '/signup'].some(path =>
    location.pathname.startsWith(path)
  ) || location.pathname.startsWith('/messages/');

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#E91E63] via-[#FF5722] to-[#FFC107] flex flex-col w-full max-w-[480px] mx-auto relative">
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
      {!hideBottomNav && <BottomNav />}
    </div>
  );
}
