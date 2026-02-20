// Form submission functions that call Next.js API routes
export async function submitWaitlist(data: {
  name: string;
  email: string;
  company?: string;
  role?: string;
  country?: string;
  interest?: string;
}): Promise<{ ok: boolean; message?: string; error?: string }> {
  const res = await fetch("/api/waitlist", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const result = await res.json();
  return result;
}

export async function submitPartnerBank(data: {
  name: string;
  email: string;
  institution?: string;
  role?: string;
  country?: string;
  message?: string;
}): Promise<{ ok: boolean; message?: string }> {
  const res = await fetch("/api/partner-bank", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function submitBookCall(data: {
  name: string;
  email: string;
  message?: string;
}): Promise<{ ok: boolean; message?: string }> {
  const res = await fetch("/api/book-call", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function submitPlaybook(data: {
  email: string;
}): Promise<{ ok: boolean; message?: string }> {
  const res = await fetch("/api/playbook", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function submitEarlyAccess(data: {
  name: string;
  email: string;
  company?: string;
}): Promise<{ ok: boolean; message?: string }> {
  const res = await fetch("/api/early-access", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}
