* {const API = "http://localhost/escola-api/alunos";

let alunosGlobal = [];

// TOAST
function mostrarToast(msg) {
  const toast = document.getElementById("toast");
  toast.innerText = msg;
  toast.style.opacity = 1;

  setTimeout(() => {
    toast.style.opacity = 0;
  }, 2500);
}

// MODAL
function abrirModal() {
  document.getElementById("modal").style.display = "block";
}

function fecharModal() {
  document.getElementById("modal").style.display = "none";
}

// LISTAR
async function listar() {
  try {
    const res = await fetch(API);
    const data = await res.json();

    alunosGlobal = data.dados;
    render(alunosGlobal);

  } catch {
    alunosGlobal = [
      { RA: 1, nome: "João", email: "joao@email.com", dataNascimento: "2000-01-01", turma: "1A" }
    ];
    render(alunosGlobal);
  }
}

// RENDER
function render(alunos) {
  const tabela = document.getElementById("tabela");
  tabela.innerHTML = "";

  alunos.forEach(a => {
    tabela.innerHTML += `
      <tr>
        <td>${a.RA}</td>
        <td>${a.nome}</td>
        <td>${a.email}</td>
        <td>${a.dataNascimento}</td>
        <td>${a.turma}</td>
        <td>
          <button class="btn danger" onclick="deletar(${a.RA})">Excluir</button>
        </td>
      </tr>
    `;
  });
}

// FILTRO
function filtrar() {
  const turma = document.getElementById("filtroTurma").value;

  if (turma === "todas") {
    render(alunosGlobal);
    return;
  }

  const filtrados = alunosGlobal.filter(a => a.turma === turma);
  render(filtrados);
}

// VALIDAR EMAIL
function emailValido(email) {
  return email.includes("@") && email.includes(".");
}

// SALVAR
async function salvar() {
  const nome = document.getElementById("nome").value;
  const email = document.getElementById("email").value;
  const data = document.getElementById("data").value;
  const turma = document.getElementById("turma").value;

  if (!nome || !email || !data || !turma) {
    mostrarToast("Preencha todos os campos!");
    return;
  }

  if (!emailValido(email)) {
    mostrarToast("Email inválido!");
    return;
  }

  await fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      nome,
      email,
      dataNascimento: data,
      turma
    })
  });

  mostrarToast("Aluno cadastrado!");
  fecharModal();
  listar();
}

// DELETAR
async function deletar(ra) {
  await fetch(API + "/" + ra, { method: "DELETE" });
  mostrarToast("Aluno removido!");
  listar();
}

// INIT
listar();*/
.animate {
  animation: slideUp 0.3s ease;
}

@keyframes slideUp {
  from {
    transform: translateY(40px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.actions {
  display: flex;
  justify-content: space-between;
}

/* TOAST */
#toast {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background: #2563eb;
  color: white;
  padding: 12px 20px;
  border-radius: 6px;
  opacity: 0;
  transition: 0.3s;
}
