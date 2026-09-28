const fs = process.getBuiltinModule("fs");
const FILE = process.cwd() + "/users.json";

function readUsers() {
  try {
    const data = JSON.parse(fs.readFileSync(FILE, "utf8"));
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

export default function UsersPage() {
  const users = readUsers();

  return (
    <main className="min-h-screen bg-[#1B1D1F] px-6 py-16 text-[#ECE9E2]">
      <div className="mx-auto max-w-md space-y-3">

        {users.map((u) => (
          <div key={u.id} className="rounded-lg bg-[#26282B] p-4 text-sm">
            <p className="font-semibold">
              {u.firstName} {u.lastName} ({u.type})
            </p>
            <p className="text-[#8B93A1]">{u.email}</p>
            <p className="font-mono text-xs text-[#5C6577]">
              {u.birth_date} · created {u.created_at}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}