
function normalize(text) {
    return text.toLowerCase().replace(/['’`ʻ‘]/g, "‘").replace(/’/g, "'");
  }
  
  function applyWordDictionary(text) {
    const dict = raw_words.trim().split("\n").map(line => line.split("|"));
    for (let [latin, arabic] of dict) {
      const pattern = new RegExp("\\b" + latin + "\\b", "gi");
      text = text.replace(pattern, arabic);
    }
    return text;
  }
  
  function applyRules(text) {
    for (let i = 0; i < l_letters_l2c.length; i++) {
      const re = new RegExp(l_letters_l2c[i], "g");
      text = text.replace(re, c_letters_l2c[i]);
    }
    return text;
  }
  
  function startConversion() {
    let inputText = document.getElementById("input").value;
    inputText = normalize(inputText);
    let outputText = applyWordDictionary(inputText);
    outputText = applyRules(outputText);
    document.getElementById("output").value = outputText;
  }
  
  // Copy button functionality
  document.getElementById('copyBtn').addEventListener('click', function () {
    const output = document.getElementById('output');
    output.select();
    output.setSelectionRange(0, 99999); // For mobile
  
    try {
      document.execCommand("copy");
      alert("Copied to clipboard!");
    } catch (err) {
      alert("Failed to copy.");
    }
  
    output.blur();
  });

  

  function autoResizePair() {
    const input = document.getElementById("input");
    const output = document.getElementById("output");
  
    // Reset heights to auto first to recalculate
    input.style.height = "auto";
    output.style.height = "auto";
  
    // تعیین بزرگترین ارتفاع بین دو باکس
    const maxHeight = Math.max(input.scrollHeight, output.scrollHeight);
  
    // اعمال ارتفاع مشترک
    input.style.height = maxHeight + "px";
    output.style.height = maxHeight + "px";
  }
  
  // فراخوانی هنگام تایپ در input
  document.getElementById("input").addEventListener("input", () => {
    startConversion();
    autoResizePair();
  });
  
  // فراخوانی اولیه (در صورت وجود متن اولیه)
  window.addEventListener("load", () => {
    autoResizePair();
  });
  
  document.getElementById("clearBtn").addEventListener("click", function () {
    document.getElementById("input").value = "";
    document.getElementById("output").value = "";
    autoResizePair();
  });
  