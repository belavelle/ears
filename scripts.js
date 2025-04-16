document.getElementById('serverConfigForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const operatingSystem = document.getElementById('operatingSystem').value;
    const azureShape = document.getElementById('azureShape').value;
    alert(`Operating System: ${operatingSystem}\nAzure Shape: ${azureShape}`);
});

document.getElementById('addDiskButton').addEventListener('click', function() {
    const diskSection = document.getElementById('diskSection');
    
    const diskDiv = document.createElement('div');
    diskDiv.classList.add('disk-entry');
    
    const sizeLabel = document.createElement('label');
    sizeLabel.textContent = 'Size:';
    diskDiv.appendChild(sizeLabel);
    
    const sizeSelect = document.createElement('select');
    sizeSelect.name = 'diskSize';
    ['32', '64', '128', '256', '512', '1024', '2048'].forEach(size => {
        const option = document.createElement('option');
        option.value = size;
        option.textContent = size;
        if (size === '32') option.selected = true;
        sizeSelect.appendChild(option);
    });
    diskDiv.appendChild(sizeSelect);
    
    const typeLabel = document.createElement('label');
    typeLabel.textContent = 'Disk Type:';
    diskDiv.appendChild(typeLabel);
    
    const typeSelect = document.createElement('select');
    typeSelect.name = 'diskType';
    ['Standard_LRS', 'Premium_LRS'].forEach(type => {
        const option = document.createElement('option');
        option.value = type;
        option.textContent = type;
        if (type === 'Standard_LRS') option.selected = true;
        typeSelect.appendChild(option);
    });
    diskDiv.appendChild(typeSelect);
    
    const mountLabel = document.createElement('label');
    mountLabel.textContent = 'Mount Point:';
    diskDiv.appendChild(mountLabel);
    
    const mountInput = document.createElement('input');
    mountInput.type = 'text';
    mountInput.name = 'mountPoint';
    mountInput.value = 'NA';
    diskDiv.appendChild(mountInput);
    
    diskSection.appendChild(diskDiv);
});
