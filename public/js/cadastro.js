document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("formCadastro");
    const senha = document.getElementById("senha");
    const senha2 = document.getElementById("senha2");
    const toggleSenha = document.getElementById("toggleSenha");
    const toggleSenha2 = document.getElementById("toggleSenha2");

    // Mostrar ou ocultar senha
    toggleSenha.addEventListener("click", () => {
        senha.type = senha.type === "password" ? "text" : "password";
        toggleSenha.textContent = senha.type === "password" ? "Mostrar" : "Ocultar";
    });

    toggleSenha2.addEventListener("click", () => {
        senha2.type = senha2.type === "password" ? "text" : "password";
        toggleSenha2.textContent = senha2.type === "password" ? "Mostrar" : "Ocultar";
    });

    // Validação e envio do formulário
    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const email = document.getElementById("email").value.trim();
        const usuario = document.getElementById("usuario").value.trim();
        const senhaValue = senha.value.trim();
        const senha2Value = senha2.value.trim();

        // Verifica se as senhas coincidem
        if (senhaValue !== senha2Value) {
            alert("As senhas não coincidem!");
            return;
        }

        // Valida senha mínima
        if (senhaValue.length < 6) {
            alert("A senha deve ter no mínimo 6 caracteres.");
            return;
        }

        // Envia os dados para o PHP
        const formData = new FormData(form);

        try {
            const response = await fetch("/API/cadastro.php", {
                method: "POST",
                body: formData
            });

            const result = await response.json();

            if (result.success) {
                alert(result.message);
                window.location.href = "index.html";
            } else {
                alert(result.error || "Erro ao cadastrar usuário.");
            }
        } catch (error) {
            console.error("Erro:", error);
            alert("Erro ao se conectar com o servidor.");
        }
    });
});
