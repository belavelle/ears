document.getElementById('serverConfigForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const operatingSystem = document.getElementById('operatingSystem').value;
    const azureShape = document.getElementById('azureShape').value;
    alert(`Operating System: ${operatingSystem}\nAzure Shape: ${azureShape}`);
});
