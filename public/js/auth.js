// Cadastro com validação no frontend
async function cadastrar() {
    const usuario = document.querySelector("#usuario").value.trim();
    const email = document.querySelector("#email").value.trim();
    const senha = document.querySelector("#senha").value.trim();

    // Validações básicas no frontend
    if (!usuario || !email || !senha) {
        alert("Preencha todos os campos!");
        return;
    }

    // Validação de e-mail com regex simples
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert("E-mail inválido!");
        return;
    }

    // Validação de senha mínima
    if (senha.length < 6) {
        alert("A senha deve ter no mínimo 6 caracteres!");
        return;
    }

    // Envia dados para o backend
    const res = await fetch("../api/cadastro.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ usuario, email, senha })
    });

    const data = await res.json();
    if (data.success) {
        alert("Cadastro realizado com sucesso!");
        window.location.href = "index.html";
    } else {
        alert(data.error || "Erro ao cadastrar.");
    }
}

// Login com validação simples
async function login() {
    const email = document.querySelector("#email").value.trim();
    const senha = document.querySelector("#senha").value.trim();

    if (!email || !senha) {
        alert("Preencha todos os campos!");
        return;
    }

    const res = await fetch("../api/login.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha })
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
    await fetch("../api/logout.php");
    localStorage.removeItem("usuario");
    window.location.href = "index.html";
}
