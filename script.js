const uploadBtn = document.getElementById("upload-btn");
const inputUpload = document.getElementById("image-upload");

uploadBtn.addEventListener("click", () => {
  inputUpload.click();
});

function lerConteudoDoArquivo(arquivo) {
  return new Promise((resolve, reject) => {
    const leitor = new FileReader();
    leitor.onload = () => {
      resolve({ url: leitor.result, nome: arquivo.name });
    };

    leitor.onerror = () => {
      reject(`Erro na leitura do arquivo ${arquivo.name}`);
    };

    leitor.readAsDataURL(arquivo);
  });
}

const imagemPrincipal = document.querySelector(".main-imagem");
const nomeDaImagem = document.querySelector(".container-imagem-nome p");

inputUpload.addEventListener("change", async (evento) => {
  const arquivo = evento.target.files[0];

  if (arquivo) {
    try {
      const conteudoDoArquivo = await lerConteudoDoArquivo(arquivo);
      imagemPrincipal.src = conteudoDoArquivo.url;
      nomeDaImagem.textContent = conteudoDoArquivo.nome;
    } catch (erro) {
      console.error("Erro na leitura do arquivo");
    }
  }
});

const inputTags = document.getElementById("input-tags");
const listaTags = document.getElementById("lista-tags");

inputTags.addEventListener("keydown", (evento) => {
  if (evento.key === "Enter") {
    evento.preventDefault();
    const tagTexto = inputTags.value.trim();
    if (tagTexto !== "") {
      const tagNova = document.createElement("li");
      tagNova.innerHTML = `<p>${tagTexto}</p> <img src="./img/close-black.svg" class="remove-tag"/>`;
      listaTags.appendChild(tagNova);
      inputTags.value = "";
    }
  }
});

listaTags.addEventListener("click", (evento) => {
  if (evento.target.classList.contains("remove-tag")) {
    const tagRemove = evento.target.parentElement;
    listaTags.removeChild(tagRemove);
  }
});

// verificar tags

// const tagsDisponiveis = ["Front-end", "Back-end", "Full-stack"];

// async function verificaTags(tagTexto) {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve(tagsDisponiveis.includes(tagTexto));
//     }, 1000);
//   });
// }

// inputTags.addEventListener("keydown", async (evento) => {
//   if (evento.key === "Enter") {
//     evento.preventDefault();
//     const tagTexto = inputTags.value.trim();
//     if (tagTexto !== "") {
//       try {
//         const tagExiste = await verificaTags(tagTexto);
//         if (tagExiste) {
//           const tagNova = document.createElement("li");
//           tagNova.innerHTML = `<p>${tagTexto}</p> <img src="./img/close-black.svg" class="remove-tag"/>`;
//           listaTags.appendChild(tagNova);
//           inputTags.value = "";
//         } else {
//           alert("Tag não é valida");
//         }
//       } catch (error) {
//         console.error("Erro de tag");
//         alert("Tag incorreta, adicione uma tag valida");
//       }
//     }
//   }
// });

// PRECISA SER REMOVIDO A CONDIÇÂO DA LINHA 43 A 54 PARA FUNCIONAR.

const botaoPublicar = document.querySelector(".botao-adicionar");


async function publicarProjeto(nomeDoProjeto, descricaoDoProjeto, tagsProjetos) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Verificação: Confere se os campos obrigatórios foram preenchidos corretamente
      if (!nomeDoProjeto || !descricaoDoProjeto || !tagsProjetos.length) {
        reject("Erro: Todos os campos são obrigatórios.");
        return;
      }

      // Simulação de sucesso ao salvar o projeto
      const sucesso = true; // Aqui você pode integrar com um backend real

      if (sucesso) {
        resolve("✅ Projeto publicado com sucesso!");
      } else {
        reject("❌ Erro ao publicar, tente novamente.");
      }
    }, 1000);
  });
}

botaoPublicar.addEventListener("click", async (evento) => {
  evento.preventDefault();

  const noemDoProjeto = document.getElementById("nome").value;
  const descricaoDoProjeto = document.getElementById("descricao").value;
  const tagsProjetos = Array.from(listaTags.querySelectorAll("P")).map(
    (tag) => tag.textContent);

  try {
      const resultado = await publicarProjeto(noemDoProjeto, descricaoDoProjeto, tagsProjetos);
      alert("✅ Projeto publicado com sucesso! Obrigado")
      limparFormulario();
  } catch (error) {
    alert("❌ Erro ao publicar, preencha todos os campos e tente novamente.")
  }

});

// Função de limpar formulario ao enviar

function limparFormulario() {
  document.getElementById("nome").value = "";
  document.getElementById("descricao").value = "";

  imagemPrincipal.src = "./img/imagem1.png";
  nomeDaImagem.textContent = "nome_do_seu_projeto.png";

  const listaTags = document.querySelector(".lista-tags");
  if (listaTags) {
    listaTags.innerHTML = "";
  }
}

// FUnção para limpar com o botao descartar
const botaoDescartar = document.querySelector(".botao-descartar");

botaoDescartar.addEventListener("click", (evento) => {
  evento.preventDefault();

  limparFormulario();
})