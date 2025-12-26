const fs = require('fs');

// This is your blueprint for recovery
const filesToRecover = [
    { name: 'commandcenter.html', content: `...` },
    { name: 'DASHBOARDABIDKHAN.html', content: `...` }
];

filesToRecover.forEach(file => {
    fs.writeFileSync(file.name, file.content);
    console.log(`✅ Recovered: ${file.name}`);
});