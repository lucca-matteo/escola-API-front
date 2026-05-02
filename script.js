const API = "http://localhost/escola-api/alunos";

function abrirModal() {
  document.getElementById("modal").style.display = "block";
}

function fecharModal() {
  document.getElementById("modal").style.display = "none";
}

async function listar() {
  try {
    const res = await fetch(API);
    const data = await res.json();
    render(data.dados);
  } catch {
    // fallback se backend não estiver rodando
    render([
      { RA: 1, nome: "Aluno Teste", email: "teste@email.com", dataNascimento: "2000-01-01", turma: "2A" }
    ]);
  }
}

function render(alunos) {
  const tabela = document.getElementById("tabela");
  tabela.innerHTML = "";

  alunos.forEach(aluno => {
    tabela.innerHTML += `
      <tr>
        <td>${aluno.RA}</td>
        <td>${aluno.nome}</td>
        <td>${aluno.email}</td>
        <td>${aluno.dataNascimento}</td>
        <td>${aluno.turma}</td>
        <td>
          <button class="btn" onclick="deletar(${aluno.RA})">Excluir</button>
        </td>
      </tr>
    `;
  });
}

async function salvar() {
  const nome = document.getElementById("nome").value;
  const email = document.getElementById("email").value;
  const data = document.getElementById("data").value;
  const turma = document.getElementById("turma").value;

  await fetch(API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
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

async function deletar(ra) {
  await fetch(API + "/" + ra, {
    method: "DELETE"
  });

  listar();
}

listar();
