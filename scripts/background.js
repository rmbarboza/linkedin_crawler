chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
	console.log(message);
    if (message.action === "open_new_tab") {
        chrome.tabs.create({url: message.url});
    }
	else if(message.action === "export"){
		console.log("Expotar dados...");
		chrome.storage.local.get('linkedin_collect_data', function(data) {
			console.log('Dados a serem exportados: ',data)
			chrome.runtime.sendMessage({tipo: 'export_csv', dados: data['linkedin_collect_data']});
		});
	}
	else if(message.action === "clear"){
		chrome.storage.local.set({'linkedin_collect_data': {}}, function() {
				console.log("Limpar dados...");
		});
	}
	else if(message.action === "add_profile"){
		chrome.storage.local.get('linkedin_collect_data', function(rootdata) {
			//console.log('Dados recuperados',rootdata)
			let data
			if(rootdata == null){
				rootdata = {};
			}
			if(rootdata['linkedin_collect_data'] == null){
				rootdata['linkedin_collect_data'] = {};
			}
			data = rootdata['linkedin_collect_data']
			if(data[message.profile] == null){
				data[message.profile] = {};
				for(const key in message){
					if(key == 'action') continue;
					data[message.profile][key] = message[key];
				}
			}
			else{
				let bool1 = message.phone != null;
				let bool2 = message.name !== "undefined";
				console.log(`2) phone: ${message.phone} ${bool1} ${bool2}`);
				
				for(let key in data[message.profile]){
					if(message[key] != null && message[key] !== "undefined") data[message.profile][key] = message[key];
				}
				
				/*
				if(message.name != null && message.name !== "undefined") data[message.profile].name = message.name;
				if(message.company != null && message.company !== "undefined") data[message.profile].company = message.company;
				if(message.position != null && message.position !== "undefined") data[message.profile].position = message.position;
				if(message.phone != null && message.phone !== "undefined") data[message.profile]['phone'] = message.phone;
				if(message.email != null && message.email !== "undefined") data[message.profile].email = message.email;
				if(message.ims != null && message.ims !== "undefined") data[message.profile].ims = message.ims;
				if(message.birthday != null && message.birthday !== "undefined") data[message.profile].birthday = message.birthday;
				*/
			}
			
			//console.log('Dados a serem atualizados: ',data)
			
			chrome.storage.local.set(rootdata, function() {
				if (chrome.runtime.lastError) {
					// Se houver um erro, ele será registrado aqui
					console.error('Erro ao salvar os dados:', chrome.runtime.lastError);
					alert(`Erro ao salvar os dados: {chrome.runtime.lastError}`);
				} else {
					// Se não houver erros, os dados foram salvos com sucesso
					console.log('Dados atualizados:', rootdata);
			}
		});
		
		});
		
		/*
		for(const key in data){
			console.log(data[key]);
		};
		*/
	}
});

