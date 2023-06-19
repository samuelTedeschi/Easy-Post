document.addEventListener("DOMContentLoaded", function () {
  const inputText = document.getElementById("input-text");
  const outputTextarea = document.getElementById("output-textarea");
  const enhanceButton = document.getElementById("enhance-button");
  const copyButton = document.getElementById("copy-button");
  const toneSelect = document.getElementById("tone-select");

  enhanceButton.addEventListener("click", function () {
    const textToEnhance = inputText.value;
    const selectedTone = toneSelect.value;


    outputTextarea.value = "Aprimorando o poster...";
    enhanceButton.disabled = true;

    // Chamar a API da OpenAI para melhorar o pôster
    // Substitua 'YOUR_API_KEY' pelo seu próprio chave de API da OpenAI e implemente a chamada à API aqui

    const apiKey = "insira sua chave de api aqui";
    const apiUrl = 'https://api.openai.com/v1/engines/text-davinci-003/completions';

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        //fique avontade para mudar o prompt  
        prompt: `Criar poster em texto para o twitter com o assunto ${textToEnhance} no ton ${selectedTone}`,
        max_tokens: 1000,
        temperature: 1,
      })
    };

    fetch(apiUrl, requestOptions)
      .then(response => response.json())
      .then(data => {
        const enhancedText = data.choices[0].text;

        outputTextarea.value = enhancedText;
      })
      .catch(error => {
        console.error('Erro ao chamar a API:', error);
        outputTextarea.value = "Erro ao aprimorar o poster.";
      })
      .finally(() => {
        // Reativar o botão após a conclusão
        enhanceButton.disabled = false;
      });
  });

  copyButton.addEventListener("click", function () {
    outputTextarea.select();
    document.execCommand("copy");
  });
});