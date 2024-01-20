function getNameElementSmall(section)
{
	const wordMatchRegExp = /.*basic-profile-section/g; // Regular expression
	let len = section.length;
	let i,text;
	
	for(i = 0; i<len; i++){
			text = section[i].className;
			if(text && text.match(wordMatchRegExp)) break;
	}
	
	if(i>=len){	
		console.log('getNameElementSmall: nao achou o nome');
		return null;
	}
  
	const div = section[i].querySelector(".pv-text-details__left-panel")
	
	if(!div){	
		console.log('getNameElementSmall: falhou na div');
		return null;
	}
	
	const h1 = div.querySelector("h1");
	
	if(!h1){
		console.log('getNameElementSmall: falhou na h1');
		return null;
	}
	
	return h1;
}
function getNameElementBig(sections)
{
	let wordMatchRegExp = /artdeco-card EpYoKBnmDyhtoKVRsPnABnILWmuWoUHXYKw/g; // Regular expression
	let len = sections.length;
	let i,text;
	
	for(i = 0; i<len; i++){
			text = sections[i].className;
			if(text && text.match(wordMatchRegExp)) break;
	}
	
	if(i>=len){	
		console.log('getNameElementBig: nao achou o nome');
		return null;
	}
	
	let divs = sections[i].querySelectorAll('div');
	wordMatchRegExp = /ngFJYWcfOsVGPNjdITAKzZejAMtnOXGfYwnXuQ/g;
	len = divs.length;
  
	for(i=0;i<len;i++){
			text = divs[i].className;
			if(text && text.match(wordMatchRegExp)) break;
	}
	
	if(i>len){	
		console.log('getNameElementBig: falhou na div');
		return null;
	}
	
	const h1 = divs[i].querySelector("h1");
	
	if(!h1){
		console.log('getNameElementBig: falhou na h1');
		return null;
	}
	
	return h1;
}
function getName(section)
{
	let h1 = getNameElementBig(section);
	if(h1 == null) h1 = getNameElementSmall(section);
	
	return h1.textContent;
}

function getLocation(sections)
{
	let wordMatchRegExp = /artdeco-card EpYoKBnmDyhtoKVRsPnABnILWmuWoUHXYKw/g; // Regular expression
	let len = sections.length;
	let i,text;
	
	for(i = 0; i<len; i++){
			text = sections[i].className;
			if(text && text.match(wordMatchRegExp)) break;
	}
	
	if(i>=len){	
		console.log('getLocation: nao achou o location');
		return null;
	}
	
	let divs = sections[i].querySelectorAll('div');
	wordMatchRegExp = /ngFJYWcfOsVGPNjdITAKzZejAMtnOXGfYwnXuQ mt2/g;
	len = divs.length;
  
	for(i=0;i<len;i++){
			text = divs[i].className;
			if(text && text.match(wordMatchRegExp)) break;
	}
	
	if(i>len){	
		console.log('getLocation: falhou na div');
		return null;
	}
		
	const span = divs[i].querySelector("span");
	
	if(!span){
		console.log('getLocation: falhou no span');
		return null;
	}
	
	return span.textContent.replace(/^\n\s+|\n\s+$/gm,'');
}

function getCompanyName(sections)
{
	let wordMatchRegExp = /artdeco-card EpYoKBnmDyhtoKVRsPnABnILWmuWoUHXYKw/g; // Regular expression
	let len = sections.length;
	let i,text;
	
	for(i = 0; i<len; i++){
			text = sections[i].className;
			if(text && text.match(wordMatchRegExp)) break;
	}
	
	if(i>=len){	
		console.log('getCompanyName: nao achou a empresa');
		return null;
	}
	
	const div1 = sections[i].querySelector(".pv-text-details__right-panel")
	
	if(!div1){	
		console.log('getCompanyName: falhou na div1');
		return null;
	}
	  
	const btn = div1.querySelector("button")
	
	if(!btn){	
		console.log('getCompanyName: falhou no button');
		return null;
	}
	
	const div2 = btn.querySelector("div");
	
	if(!div2){
		console.log('getCompanyName: falhou na div2');
		return null;
	}
	
	return div2.textContent.replace(/^\n\s+|\n\s+$/gm,'');
}

function getCompanyProfile(section)
{
	const wordMatchRegExp = /profile.card/g; // Regular expression
	let len = section.length;
	let i,count,text;
	let htel;
	
	count = 0;
	
	//console.log(document);
	for(i = 0; i<len; i++){
			text = section[i].getAttribute('data-view-name');
			//console.log(`section id: ${section[i].getAttribute('id')}`);
			if(text && text.match(wordMatchRegExp)){
				htel = section[i].querySelectorAll('#experience');
				if(htel.length > 0) break;
			}
	}
	
	//console.log(`i: ${i} len: ${len}`);
	if(i>=len){	
		console.log('getCompanyName_v1: nao achou o experience');
		return null;
	}
	
	//alert(section[i].getAttribute('id'));
	
	const el1 = section[i].querySelector('.pvs-list__outer-container');
	
	if(!el1){
		console.log('getCompanyName_v1: nao achou outer container');
		return null;
	}
	  
	const ul = el1.querySelector(".pvs-list")
	
	if(!ul){	
		console.log('getCompanyName_v1: falhou na ul');
		return null;
	}
	
	//		4			3			2			1
	//ul.children[0].children[0].children[0].children[0]
	let countdown = 4;
	let el = ul;
	
	while(countdown > 0){
		if(!ul.children[0]) break;
		
		el = el.children[0]
		countdown--;
	}
	
	if(countdown > 0){
		console.log('getCompanyName_v1: falhou no nome empresa');
		return null;
	}
	
	const url = el.getAttribute('href');
	
	return url;
}


function getCompanyPosition(section)
{
	const wordMatchRegExp = /profile.card/g; // Regular expression
	let len = section.length;
	let i,count,text;
	let htel;
	
	count = 0;
	
	for(i = 0; i<len; i++){
			text = section[i].getAttribute('data-view-name');
			//console.log(`section id: ${section[i].getAttribute('id')}`);
			if(text && text.match(wordMatchRegExp)){
				htel = section[i].querySelectorAll('#experience');
				if(htel.length > 0) break;
			}
	}
	
	if(i>=len){	
		console.log('getCompanyPosition: nao achou o experience');
		return null;
	}
	
	//alert(section[i].getAttribute('id'));
	
	let el1 = section[i].querySelector('.pvs-list__outer-container');
	
	if(!el1){
		console.log('getCompanyPosition: nao achou outer container');
		return null;
	}
	  
	let ul = el1.querySelector(".pvs-list")
	
	if(!ul){	
		console.log('getCompanyPosition: falhou na ul');
		return null;
	}
	
	let countdown;
	let el;
	let position=0;
	
	// Teste para saber de onde pegar o cargo
	//		4			3			2			1
	//ul.children[0].children[0].children[1].children[0]
	countdown = 4;
	el = ul;
	
	while(countdown > 0){
		if(!el.children[0]) break;
		
		el = countdown != 2 ? el.children[0] : el.children[1]
		countdown--;
	}
	
	if(countdown > 0){
		console.log('getCompanyPosition: falhou no nome empresa');
		return null;
	}
	
	if(el.children[0].nodeName === 'A')	position = 1;
	else position = 2;
	
	if(position == 0){
		console.log('getCompanyPosition: falhou ao localizar posição do cargo na página');
		return null;
	}
	
	//		3			2			1		
	//ul.children[0].children[0].children[1]
	countdown = 3;
	el = ul;
	
	while(el != null && countdown > 0){
		if(!el.children[0]) break;
		
		el = countdown > 1 ? el.children[0] : el.children[1]
		countdown--;
	}
	
	if(countdown > 0){
		console.log('getCompanyPosition: falhou no nome empresa');
		return null;
	}
	
	if(el == null){
		console.log('getCompanyPosition: falhou no seletor span');
		return null;
	}
	
	//console.log(el);
	let el2 = null;
	
	if(position == 1){ 
		el2 = el.children[1].querySelectorAll('a');
		if(el2.length > 0) el2 = el2[0].querySelectorAll('span');
	}
	else if(position == 2) el2 = el.children[0].querySelectorAll('span');
	
	let company_position = null;
	
	//console.log(el2);
	if(el2.length > 0){ 
		company_position =  el2[0].textContent;
	}

	return company_position;
}

function fillContact(contact)
{
	let modal = document.querySelector('#artdeco-modal-outlet');
	
	if(modal.children.length == 0) return;
	
	let card = modal.children[0].children[0].children[3].children[0].children[1];
	
	//console.log(card);
	
	let el, icon_name, div, inner;
	
	sections = card.querySelectorAll('section');
	
	for(let i=0; i<sections.length; i++){
		el = sections[i].querySelector('svg');
		
		icon_name = el.getAttribute('data-test-icon')
		
		switch(icon_name){
			case 'linkedin-bug-medium':
				el = sections[i].children[2].children[0];
				contact.profile = el.textContent.replace(/^\n\s+|\n\s+$/gm,'');
				break;
			case 'phone-handset-medium':
				el = sections[i].children[2].children[0].children[0];
				contact.phone = el.textContent.replace(/^\n\s+|\n\s+$/gm,'');
				break;
			case 'envelope-medium':
				el = sections[i].children[2].children[0];
				contact.email = el.textContent.replace(/^\n\s+|\n\s+$/gm,'');
				break;
			case 'calendar-medium':
				el = sections[i].children[2].children[0];
				contact.birthday = el.textContent.replace(/^\n\s+|\n\s+$/gm,'');
				break;
		}
	}
}

function addProfile()
{
	let data = {};
	
	const main = document.querySelector("main");
	//console.log(main);
	const section = main.querySelectorAll("section");
	//console.log(section);
		
	data.action = "add_profile";
	data.name = getName(section);
	data.company = getCompanyName(section);
	if(data.company == null){
			data.company = getCompanyName_v1(section);
	}
	data.company_profile = getCompanyProfile(section); 
	data.position = getCompanyPosition(section);
	data.location = getLocation(section);
	data.profile = window.location.href;
			
	fillContact(data);	
		
	let go = true;
	
	//console.log(data);
	
	if(data.name == null){
		//alert('Não foi possível recuperar o nome. Perfil não adicionado');
		console.log('Não foi possível recuperar o nome. Perfil não adicionado');
		go = false;
	}
	else if(data.company == null){
		//alert('Não foi possível recuperar a empresa. Perfil não adicionado');
		console.log('Não foi possível recuperar a empresa. Perfil não adicionado');
		go = false;
	}
	else if(data.position == null){
		//go = confirm('Não foi possível recuperar o cargo. Continuar com adição do perfil?');
		console.log('Não foi possível recuperar o cargo.');
	}
	
	/*
	if(name && company){ 
		const url = `https://www.telcomanager.com?name=${name}&company=${company}`;
		chrome.runtime.sendMessage({action: "open_new_tab", url: url});
	}
	*/
	
	if(go){
		chrome.runtime.sendMessage(data);
		
		const jsondata = JSON.stringify(data);
		/*
		const download_data = new Blob([jsondata], {type: 'text/plain'});
		var url = window.URL.createObjectURL(download_data);
		
		
		var downloader = document.createElement('a');
		downloader.href = url;
		downloader.download = 'hello.txt';
		document.body.appendChild(downloader);
		downloader.click();
		window.URL.revokeObjectURL(url);
		*/
		//console.log(jsondata);
	}
}

console.log('Running!');

let urlredir = window.location.href;
const wordMatchRegExp = /overlay\/contact-info\/$/g;

if(!urlredir.match(wordMatchRegExp)){
	const url_base = window.location.href;
	const rgx = /(https:\/\/www.linkedin.com\/in\/[^\/]+\/).*/;
	const match = url_base.match(rgx)
	window.location.href = `${match[1]}overlay/contact-info`;
}
else{
	var last_profile = null;
	
	setTimeout(() => { addProfile(); },"3000");
	
	const observer = new MutationObserver((mutations) => {
		let url = window.location.href;
		//console.log(last_profile,url);
		if(last_profile != url){	
			setTimeout(() => { addProfile(); },"3000");
			last_profile = url;
		}
	});
	
	observer.observe(document.body, {childList: true, subtree: true});
}

