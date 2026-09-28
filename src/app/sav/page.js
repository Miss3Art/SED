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

export default function RegisterPage() {
  async function registerUser(formData) {
    "use server";

    const users = readUsers();
    const email = formData.get("email").toString().trim().toLowerCase();
    if (users.some((u) => u.email === email)) return;

    users.push({
      id: Date.now(),
      firstName: formData.get("firstName").toString().trim(),
      lastName: formData.get("lastName").toString().trim(),
      email,
      password: formData.get("password").toString(),
      birth_date: formData.get("birth_date").toString(),
      type: formData.get("type").toString(),
      created_at: new Date().toISOString(),
    });

    fs.writeFileSync(FILE, JSON.stringify(users, null, 2));
  }

  const input =
    "w-full rounded-md bg-[#26282B] px-4 py-2 text-sm text-[#ECE9E2] placeholder-[#8B93A1] outline-none";

  return (
    <main className="min-h-screen bg-[#1B1D1F] px-6 py-16 text-[#ECE9E2]">
      <form action={registerUser} className="mx-auto max-w-md space-y-4">
        <h1 className="text-3xl font-black">Register</h1>

        <input name="firstName" placeholder="First name" required className={input} />
        <input name="lastName" placeholder="Last name" required className={input} />
        <input name="email" type="email" placeholder="Email" required className={input} />
        <input name="password" type="password" placeholder="Password" required minLength={6} className={input} />
        <input name="birth_date" type="date" required className={input} />

        <select name="type" defaultValue="student" className={input}>
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
        </select>

        <button
          type="submit"
          className="w-full rounded-md bg-[#D98E2B] px-4 py-2 text-sm font-semibold text-[#1B1D1F]"
        >
          Register
        </button>
      </form>
    </main>
  );
}