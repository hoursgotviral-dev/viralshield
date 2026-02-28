const text = document.body.innerText.slice(0, 3000);

fetch("http://localhost:5000/analyze", {
method: "POST",
headers: {
"Content-Type": "application/json"
},
body: JSON.stringify({ text })
});
