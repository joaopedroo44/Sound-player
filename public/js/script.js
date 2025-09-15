document.addEventListener("DOMContentLoaded", function () {
  const formLogin = document.getElementById("formLogin");
  const senhaInput = document.getElementById("LoginSenha");
  const toggleBtn = document.getElementById("toggleLoginSenha");

  // Evento de login
  formLogin.addEventListener("submit", async function (e) {
    e.preventDefault(); // evita envio tradicional

    const email = document.getElementById("LoginEmail").value.trim();
    const senha = senhaInput.value.trim();

    if (!email || !senha) {
      alert("Preencha todos os campos!");
      return;
    }

    try {
      const response = await fetch("API/login.php", {
        method: "POST",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: `email=${encodeURIComponent(email)}&senha=${encodeURIComponent(senha)}`
      });

      const data = await response.json();

      if (data.success) {
        // redireciona para o dashboard
        window.location.href = "dashboard.html";
      } else {
        alert(data.error || "Erro ao fazer login.");
      }

    } catch (err) {
      alert("Erro ao conectar com o servidor.");
      console.error(err);
    }
  });

  // Mostrar / Ocultar senha
  toggleBtn.addEventListener("click", function (e) {
    e.preventDefault();
    if (senhaInput.type === "password") {
      senhaInput.type = "text";
      toggleBtn.textContent = "Ocultar Senha";
    } else {
      senhaInput.type = "password";
      toggleBtn.textContent = "Mostrar Senha";
    }
  });
});
