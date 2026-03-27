"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

interface TopbarProps {
  title: string;
}

export function Topbar({ title }: TopbarProps) {
  const [email, setEmail] = useState<string | null>(null);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setEmail(data.user?.email ?? null);
    });
  }, []);

  async function handleSignOut() {
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  }

  const initials = email
    ? email.slice(0, 2).toUpperCase()
    : "??";

  return (
    <header className="h-14 border-b border-gray-200 bg-white flex items-center justify-between px-6 shrink-0">
      <h1 className="text-base font-semibold text-gray-900">{title}</h1>
      <div className="flex items-center gap-3">
        {email && (
          <span className="text-sm text-gray-500 hidden sm:block">{email}</span>
        )}
        <div className="w-8 h-8 rounded-full bg-navy-900 flex items-center justify-center text-white text-xs font-bold">
          {initials}
        </div>
        <button
          onClick={handleSignOut}
          title="Wyloguj"
          className="text-gray-400 hover:text-red-500 transition-colors"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
}
