const API = "http://localhost/escola-api/alunos";

let alunosGlobal = [];

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
    // fallback
    alunosGlobal = [
      { RA: 1, nome: "João", email: "joao@email.com", dataNascimento: "2000-01-01", turma: "1A" },
      { RA: 2, nome: "Maria", email: "maria@email.com", dataNascimento: "2001-02-02", turma: "2A" }
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

// SALVAR
async function salvar() {
  const nome = document.getElementById("nome").value;
  const email = document.getElementById("email").value;
  const data = document.getElementById("data").value;
  const turma = document.getElementById("turma").value;

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

  fecharModal();
  listar();
}

// DELETAR
async function deletar(ra) {
  await fetch(API + "/" + ra, { method: "DELETE" });
  listar();
}

// INIT
listar();
