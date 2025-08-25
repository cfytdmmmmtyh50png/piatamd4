"use client";
import { useState } from "react";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <form method="post" action="/api/auth/callback/credentials" className="max-w-sm space-y-3">
      <h1 className="text-2xl font-semibold">Intră în cont</h1>
      <input name="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" className="border rounded-xl px-3 py-2 w-full" />
      <input name="password" type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Parolă" className="border rounded-xl px-3 py-2 w-full" />
      <button className="border rounded-xl px-4 py-2">Intră</button>
    </form>
  );
}
