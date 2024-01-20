// popup.js
document.getElementById('exportar').addEventListener('click', () => {
    chrome.runtime.sendMessage({action: "export"});
});
document.getElementById('limpar').addEventListener('click', () => {
    chrome.runtime.sendMessage({action: "clear"});
});

chrome.runtime.onMessage.addListener((mensagem, remetente, enviarResposta) => {
    if (mensagem.tipo === 'export_csv') {
        // Atualize a UI do popup com os dados recebidos
        exportarDados(mensagem.dados);
    }
});

function exportarDados(dadosColetados) {
	const header = ['name','company','company_profile','position','location','profile','phone','email','ims','birthday'];
	//let csv = '"nome","empresa","cargo","perfil","telefone","email","ims","aniversario"\n';
	let csv = "";
	for(let i=0; i<header.length; i++){
		if(i<header.length-1)
			csv += `"${header[i]}",`;
		else
			csv += `"${header[i]}"\n`;
	}
	for(let key in dadosColetados){
		for(let i=0; i<header.length; i++){
			let value = dadosColetados[key][header[i]];
			if(!value) value = "";
			if(i<header.length-1)
				csv += `"${value}",`;
			else
				csv += `"${value}"\n`;
		}
	};
        
    
    // Criar um Blob com os dados CSV
    let blob = new Blob([csv], {type: 'text/csv'});
	let url = URL.createObjectURL(blob);

    // Criar um link para download e acioná-lo programaticamente
    let a = document.createElement('a');
    a.href = url;
    a.download = 'dados.csv';
    document.body.appendChild(a);
    a.click();

    // Limpar
    window.URL.revokeObjectURL(url);
}