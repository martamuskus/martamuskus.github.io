function showProgress() {
    let progress = document.getElementById("page").value;
    document.getElementById("progress-info").textContent = "Current progress: " + progress + "%";
}

function toggleOtherInput(selectElement, inputId) {
    let inputField = document.getElementById(inputId);

    if (selectElement.value === "other" || selectElement.value === "more") {
        inputField.style.display = "block";
    } else {
        inputField.style.display = "none";
        inputField.value = "";
    }
}

const API_URL = ' http://127.0.0.1:5000/run';
document.getElementById('runButton').addEventListener('click', function(event) {
    event.preventDefault();
    // run_code();
});

async function run_code() {
    const code = document.getElementById('code').value;
    const outputElement = document.getElementById('output');
    const language = document.getElementById('language').value;

    outputElement.textContent = 'Running code...';

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ code, language }),
        });

        console.log("response received");
        const result = await response.json();

        if (result.error) {
            outputElement.textContent = `Error: ${result.error}`;
        } else {
            outputElement.textContent = result.output || 'No output received';
        }
    } catch (error) {
        outputElement.textContent = `Error: ${error.message}`;
    }
}