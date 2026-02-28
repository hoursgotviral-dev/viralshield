async function scan() {

const text = document.getElementById("text").value;

const res = await fetch("http://localhost:5000/analyze", {
method: "POST",
headers: {
"Content-Type": "application/json"
},
body: JSON.stringify({ text })
});

const data = await res.json();

document.getElementById("result").innerText =
JSON.stringify(data, null, 2);

}