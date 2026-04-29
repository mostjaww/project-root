async function login() {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!email || !password) {
    alert("Email dan password wajib diisi");
    return;
  }

  try {
    const res = await fetch("/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      alert(data.message);

      localStorage.setItem("isLogin", "true");
      localStorage.setItem("user", JSON.stringify(data.user));

      window.location.href = "/dashboard.html";
    } else {
      alert(data.message);
    }
  } catch (error) {
    console.error("Login error:", error);
    alert("Terjadi kesalahan saat login");
  }
}

async function register() {
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!name || !email || !password) {
    alert("Semua field wajib diisi");
    return;
  }

  try {
    const res = await fetch("/api/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      alert(data.message);

      window.location.href = "/";
    } else {
      alert(data.message);
    }
  } catch (err) {
    console.error("Register error:", err);
    alert("Terjadi kesalahan saat registrasi");
  }
}

async function updateProfile() {
  const user = JSON.parse(localStorage.getItem("user"));

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const res = await fetch("/api/users/update-profile", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: user.id,
        name,
        email,
        password,
      }),
    });

    const data = await res.json();

    alert(data.message);

    if (res.ok) {
      // update localStorage
      user.name = name;
      user.email = email;

      localStorage.setItem("user", JSON.stringify(user));

      window.location.href = "/dashboard.html";
    }
  } catch (err) {
    console.error(err);
  }
}
