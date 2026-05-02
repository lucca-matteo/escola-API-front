const API = "http://localhost/escola-api/alunos";

let alunosGlobal = [];

// TOAST
function mostrarToast(msg, cor = "#2563eb") {
  const toast = document.getElementById("toast");
  toast.innerText = msg;
  toast.style.background = cor;
  toast.style.opacity = 1;

  setTimeout(() => {
    toast.style.opacity = 0;
  }, 2500);
}

// GERAR RA
function gerarRA() {
  const ano = new Date().getFullYear();
  const base = 30; // código fixo

  const numero = String(alunosGlobal.length + 1).padStart(3, "0");

  return `${base}${ano}${numero}`;
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
    // fallback mais limpo
    alunosGlobal = [];
    render(alunosGlobal);
  }
}

// RENDER
function render(alunos) {
  const tabela = document.getElementById("tabela");
  tabela.innerHTML = "";

  if (alunos.length === 0) {
    tabela.innerHTML = `<tr><td colspan="6">Nenhum aluno cadastrado.</td></tr>`;
    return;
  }

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
  const nome = document.getElementById("nome").value.trim();
  const email = document.getElementById("email").value.trim();
  const data = document.getElementById("data").value;
  const turma = document.getElementById("turma").value;

  if (!nome || !email || !data || !turma) {
    mostrarToast("Preencha todos os campos.", "#ef4444");
    return;
  }

  if (!emailValido(email)) {
    mostrarToast("E-mail inválido.", "#ef4444");
    return;
  }

  const RA = gerarRA();

  await fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      nome,
      email,
      dataNascimento: data,
      turma,
      RA
    })
  });

  mostrarToast("Aluno cadastrado com sucesso.", "#16a34a");

  fecharModal();
  listar();
}

// DELETAR
async function deletar(ra) {
  const confirmar = confirm("Deseja realmente excluir este aluno?");

  if (!confirmar) return;

  await fetch(API + "/" + ra, { method: "DELETE" });

  mostrarToast("Aluno removido com sucesso.", "#ef4444");

  listar();
}

// INIT
listar();
