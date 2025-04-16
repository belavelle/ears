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

document.getElementById('basePattern').addEventListener('change', function() {
    const basePattern = document.getElementById('basePattern').value;
    const operatingSystem = document.getElementById('operatingSystem');
    const type = document.getElementById('type');
    
    if (basePattern === 'DB - Oracle') {
        operatingSystem.value = 'UNIX';
        type.value = 'DB';
    } else if (basePattern === 'DB - MS SQL') {
        operatingSystem.value = 'Windows';
        type.value = 'DB';
    } else {
        operatingSystem.value = 'Windows';
        type.value = 'App';
    }
});

document.getElementById('patternGeneratorForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const formData = {
        basePattern: document.getElementById('basePattern').value,
        patternName: document.getElementById('patternName').value,
        azureShape: document.getElementById('azureShape').value,
        operatingSystem: document.getElementById('operatingSystem').value,
        type: document.getElementById('type').value,
        disks: [],
        asg: document.getElementById('asg').value,
        az: document.getElementById('az').value,
        sccm: document.getElementById('sccm').value
    };
    
    document.querySelectorAll('.disk-entry').forEach(diskDiv => {
        const diskData = {
            size: diskDiv.querySelector('select[name="diskSize"]').value,
            diskType: diskDiv.querySelector('select[name="diskType"]').value,
            mountPoint: diskDiv.querySelector('input[name="mountPoint"]').value
        };
        formData.disks.push(diskData);
    });
    
    const jsonData = JSON.stringify(formData, null, 2);
    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = 'server-config.json';
    a.click();
    URL.revokeObjectURL(url);
});
