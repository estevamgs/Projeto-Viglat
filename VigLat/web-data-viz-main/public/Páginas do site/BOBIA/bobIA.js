      async function gerarResposta() {
        const perguntaDiv = document.getElementById("pergunta");
        const pergunta = perguntaDiv.value;

        perguntaDiv.value = ``;

        document.getElementById("resposta").innerHTML += `<span
              style="
                align-self: flex-end;
                background-color: rgb(94, 191, 236);
                color: white;
                padding: 0.5em;
                border-radius: 0.5em;
              "
              >${pergunta}</span
            >`;

        const response = await fetch("/perguntar", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ pergunta }),
        });

        const data = await response.json();

        document.getElementById("resposta").innerHTML += `<span
              style="
                align-self: flex-start;
                background-color: orange;
                color: black;
                padding: 0.5em; border-radius: .5em; max-width: 80%;
              "
              >${data.resultado}</span
            >`;
      }

      function aparecerChat() {
        const container = document.getElementById("container");
        if (container.style.display == "") {
          container.style.display = "flex";
        } else {
          container.style.display = "";
          document.getElementById("resposta").innerHTML = "";
        }
      }
