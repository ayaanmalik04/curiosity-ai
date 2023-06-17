function getSelectedText() {
  var text = "";
  if (window.getSelection) {
    text = window.getSelection().toString();
  } else if (document.selection && document.selection.type != "Control") {
    text = document.selection.createRange().text;
  }
  return text;
}
var popup = document.createElement("div");

document.addEventListener("mouseup", function(event) {
  var selectedText = getSelectedText();
  if (selectedText && /[a-zA-Z]/.test(selectedText)) {
    popup.style.width = "0px";
    const word = selectedText;
    
    const apiUrl = "https://api.openai.com/v1/completions";
    fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer YOUR_API_KEY",
      },
      body: JSON.stringify({
        model: "text-davinci-003",
        prompt: `You are a program which helps me while I am researching on the internet. You will often times recieve a word or a phrase which you will have to process. You will help the user and his curious mind by giving him a short summary about that word and phrase so that he has a good idea of that. Do not make it too long, around 50 words is good but it can be as short as possible. The word or phrase you are given is ${selectedText}. Can you please tell me more about ${selectedText}?`,
        max_tokens: 150,
        temperature: 0.7,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        const definition = data.choices[0].text.trim();
        popup.innerHTML = `<div>${definition}</div>
    <div style="opacity: 0.75; font-weight: bold; font-style: italic; color: #FFF; text-align: center; padding-top: 5px;">Curiosity AI: powered by GPT</div>`;

      })
  .catch(error => {
    console.error(error);
  });
    popup.style.fontSize = "11px";
    popup.style.fontFamily = "Open Sans, sans-serif;";
    popup.style.position = "absolute";
    popup.style.top = event.pageY + 25 + "px";
    popup.style.left = event.pageX - 125 + "px";
    popup.style.color = "#FFF";
    popup.style.backgroundColor = "#442a59";
    popup.style.padding = "9px";
    popup.style.borderRadius = "10px";
    popup.style.zIndex = "999";
    popup.style.width = "250px"
    popup.style.border = "1px solid #FFF";
    popup.style.outline = "none";
    popup.style.outlineColor = "#FFF";
    setTimeout(function() {
        document.body.appendChild(popup);
    }, 1250);
  }
});

document.addEventListener("mousedown", function() {
    document.body.removeChild(popup);
});

window.addEventListener("scroll", function() {
  document.body.removeChild(popup);
});
