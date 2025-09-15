// Cadastro com validação no frontend
async function cadastrar() {
    const usuario = document.querySelector("#usuario").value.trim();
    const email = document.querySelector("#email").value.trim();
    const senha = document.querySelector("#senha").value.trim();

    // Validações básicas
    if (!usuario || !email || !senha) {
        alert("Preencha todos os campos!");
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert("E-mail inválido!");
        return;
    }

    if (senha.length < 6) {
        alert("A senha deve ter no mínimo 6 caracteres!");
        return;
    }

    // Envia via FormData
    const formData = new FormData();
    formData.append("usuario", usuario);
    formData.append("email", email);
    formData.append("senha", senha);

    const res = await fetch("../API/cadastro.php", {
        method: "POST",
        body: formData
    });

    const data = await res.json();
    if (data.success) {
        alert("Cadastro realizado com sucesso!");
        window.location.href = "index.html";
    } else {
        alert(data.error || "Erro ao cadastrar.");
    }
}

// Login
async function login() {
    const email = document.querySelector("#email").value.trim();
    const senha = document.querySelector("#senha").value.trim();

    if (!email || !senha) {
        alert("Preencha todos os campos!");
        return;
    }

    const formData = new FormData();
    formData.append("email", email);
    formData.append("senha", senha);

    const res = await fetch("../API/login.php", {
        method: "POST",
        body: formData
    });

    const data = await res.json();
    if (data.success) {
        localStorage.setItem("usuario", data.usuario);
        window.location.href = "dashboard.html";
    } else {
        alert(data.error || "Erro no login.");
    }
}

// Logout
async function logout() {
    await fetch("../API/logout.php");
    localStorage.removeItem("usuario");
    window.location.href = "index.html";
}
