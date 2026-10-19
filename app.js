const $ = (s, r=document) => r.querySelector(s);
const $$ = (s, r=document) => [...r.querySelectorAll(s)];
const telegram = "https://t.me/holinmoder";
$("#year").textContent = new Date().getFullYear();

$("#menuToggle").addEventListener("click",()=>$("#mobileNav").classList.toggle("open"));
$$(".mobile-nav a").forEach(a=>a.addEventListener("click",()=>$("#mobileNav").classList.remove("open")));

const questions = [
 {title:"Что ты ищешь?",options:[["Разовое участие","Начать с одного действия"],["Регулярное сотрудничество","Развиваться в проекте"],["Пока изучаю варианты","Хочу разобраться на звонке"]]},
 {title:"Какой график подходит?",options:[["Только разовое участие","Без постоянной занятости"],["2–3 часа вечером","Могу выделять время регулярно"],["График пока неясен","Нужно обсудить возможности"]]},
 {title:"С каким опытом начинаешь?",options:[["Без опыта","Хочу попробовать новое направление"],["Опыт уже есть","Расскажу о нём на консультации"],["Сначала познакомимся","Предпочитаю обсудить лично"]]}
];
let answers=[null,null,null], step=0;
function renderQuestion(){
 const q=questions[step]; $("#stepNumber").textContent=String(step+1).padStart(2,"0");
 $("#progressBar").style.width=((step+1)/3*100)+"%";
 $("#questionBox").innerHTML=`<h3 class="question-title">${q.title}</h3><div class="option-list">${q.options.map((o,i)=>`<button class="option ${answers[step]===i?"selected":""}" data-option="${i}"><span class="option-mark">${answers[step]===i?"✓":""}</span><span><strong>${o[0]}</strong><small>${o[1]}</small></span></button>`).join("")}</div>`;
 $$(".option").forEach(b=>b.addEventListener("click",()=>{answers[step]=Number(b.dataset.option);renderQuestion()}));
 $("#prevQuestion").disabled=step===0; $("#nextQuestion").textContent=step===2?"Посмотреть результат →":"Дальше →";
}
function answerText(){return answers.map((a,i)=>`${i+1}. ${questions[i].title} — ${a===null?"Не выбрано":questions[i].options[a][0]}`).join("\n")}
function showResult(){
 if(answers.some(a=>a===null)){const missing=answers.findIndex(a=>a===null);step=missing;renderQuestion();return}
 $("#questionBox").innerHTML=`<p class="overline">ТВОИ ОТВЕТЫ</p><h3 class="question-title">Предварительный формат</h3><p class="section-intro">Ответы сохранены в этой вкладке. Окончательные условия можно обсудить лично.</p>`;
 $("#stepNumber").textContent="03";$("#progressBar").style.width="100%";$("#prevQuestion").disabled=false;$("#nextQuestion").textContent="Изменить ответы";
 $("#resultCard").classList.add("result-complete");
 $("#resultCard").querySelector("h3").innerHTML=answers[0]===0?"Разовый<br>формат":answers[0]===1?"Регулярное<br>сотрудничество":"Знакомство<br>и выбор";
 $("#resultCard").querySelector("p:not(.overline)").textContent="Предварительный вариант по твоим ответам. Все детали, требования и условия согласуются до начала участия.";
 $("#resultAnswer").textContent=answerText();$("#copyAnswers").hidden=false;$("#editAnswers").hidden=false;
 $("#telegramResult").href=telegram+"?text="+encodeURIComponent("Привет! Хочу обсудить AlfaOmega.\n"+answerText());
}
$("#nextQuestion").addEventListener("click",()=>{if(step<2){if(answers[step]===null){$("#questionBox").classList.remove("shake");void $("#questionBox").offsetWidth;$("#questionBox").classList.add("shake");return}step++;renderQuestion()}else if($("#resultCard").classList.contains("result-complete")){step=0;$("#resultCard").classList.remove("result-complete");$("#resultCard").querySelector("h3").innerHTML="Подберём<br>твой формат";$("#resultCard").querySelector("p:not(.overline)").textContent="Ответь на три вопроса, чтобы увидеть краткое резюме.";$("#resultAnswer").textContent="";$("#copyAnswers").hidden=true;$("#editAnswers").hidden=true;renderQuestion()}else showResult()});
$("#prevQuestion").addEventListener("click",()=>{if($("#resultCard").classList.contains("result-complete")){step=2;$("#resultCard").classList.remove("result-complete");$("#copyAnswers").hidden=true;$("#editAnswers").hidden=true;$("#resultCard").querySelector("h3").innerHTML="Подберём<br>твой формат";$("#resultCard").querySelector("p:not(.overline)").textContent="Ответь на три вопроса, чтобы увидеть краткое резюме."}else if(step>0)step--;renderQuestion()});
$("#editAnswers").addEventListener("click",()=>{step=0;$("#resultCard").classList.remove("result-complete");$("#copyAnswers").hidden=true;$("#editAnswers").hidden=true;$("#resultCard").querySelector("h3").innerHTML="Подберём<br>твой формат";$("#resultCard").querySelector("p:not(.overline)").textContent="Ответь на три вопроса, чтобы увидеть краткое резюме.";renderQuestion()});
$("#copyAnswers").addEventListener("click",async()=>{try{await navigator.clipboard.writeText(answerText());$("#copyAnswers").textContent="Скопировано ✓";setTimeout(()=>$("#copyAnswers").textContent="Скопировать ответы",1600)}catch(e){const ta=document.createElement("textarea");ta.value=answerText();document.body.append(ta);ta.select();document.execCommand("copy");ta.remove();$("#copyAnswers").textContent="Скопировано ✓"}});
renderQuestion();

const stages=[
 ["ДО СТАРТА","Поиск своего направления","Начало пути — знакомство с разными направлениями, оценка интересов и выбор следующего шага.","Сначала важно понять задачу и условия."],
 ["1-Й МЕСЯЦ","Знакомство с практикой","Первый этап — разобраться в процессе, пройти необходимые материалы и понять, какие действия требуются.","Уточни критерии результата заранее."],
 ["2-Й МЕСЯЦ","Последовательное развитие","По мере накопления опыта можно оценивать результаты, разбирать сложности и уточнять дальнейший план.","Результаты индивидуальны и не гарантируются."],
 ["3–4-Й МЕСЯЦ","Оценка следующего шага","На этом этапе полезно сверить прогресс с целями и понять, подходит ли выбранный формат для продолжения.","Сравнивай условия, затраты времени и фактические результаты."],
 ["СЕЙЧАС","Самостоятельное решение","Дальнейший путь зависит от опыта, целей и условий конкретной программы. Решение о продолжении остаётся за участником.","Принимай решение на основе проверенной информации."]
];
let stageIndex=0;
function renderStage(){const s=stages[stageIndex];$("#caseNumber").innerHTML=String(stageIndex+1).padStart(2,"0")+"<span> / 05</span>";$("#caseEyebrow").textContent=`ЭТАП ${String(stageIndex+1).padStart(2,"0")} / ${s[0]}`;$("#caseTitle").textContent=s[1];$("#caseText").textContent=s[2];$("#caseNote").textContent=s[3];$$(".case-tab").forEach((b,i)=>b.classList.toggle("active",i===stageIndex));$("#casePrev").disabled=stageIndex===0;$("#caseNext").textContent=stageIndex===4?"Вернуться к началу ↺":"Следующий этап →"}
$$(".case-tab").forEach(b=>b.addEventListener("click",()=>{stageIndex=Number(b.dataset.stage);renderStage()}));
$("#casePrev").addEventListener("click",()=>{stageIndex=Math.max(0,stageIndex-1);renderStage()});
$("#caseNext").addEventListener("click",()=>{stageIndex=stageIndex===4?0:stageIndex+1;renderStage()});renderStage();

const faqs=[
 ["Что такое AlfaOmega?","AlfaOmega — проект для знакомства с партнёрскими программами и обсуждения возможных форматов сотрудничества. Условия конкретной программы нужно уточнить до начала участия.","start"],
 ["Кого вы приглашаете?","Требования к участникам зависят от программы, региона и применимых правил. Уточни актуальные условия перед стартом.","start"],
 ["Нужен ли опыт?","Требования к опыту различаются. На консультации можно обсудить навыки, необходимые для конкретного направления.","start"],
 ["Что нужно для старта?","Список устройств, материалов и действий зависит от партнёрской программы. Все требования следует узнать заранее.","start"],
 ["Можно участвовать только один раз?","Это зависит от условий выбранной программы. Обсудим, доступны ли разовые задачи и какие требования к ним предъявляются.","work"],
 ["Как устроен график?","Занятость и сроки согласуются заранее. Не начинай работу, пока не понятны задачи, ожидаемое время и критерии результата.","work"],
 ["Консультация платная?","Первичное знакомство и обсуждение вопросов можно начать через Telegram. Если у какого-либо сервиса есть отдельная стоимость, её нужно уточнить заранее.","start"],
 ["Кто будет меня сопровождать?","Формат общения и сопровождения зависит от выбранного направления. До старта уточни, кто отвечает на вопросы и как связаться с ответственным лицом.","support"],
 ["Как оформляется сотрудничество?","Форма оформления зависит от конкретной программы, статуса участника и законодательства. Условия нужно проверить до начала работы.","work"],
 ["Какой доход возможен?","Доход не гарантирован и зависит от программы, выполненных задач, условий вознаграждения и других факторов. Проси письменное описание условий.","work"],
 ["Когда можно получить выплату?","Сроки, критерии подтверждения и порядок выплаты устанавливает конкретная программа. Уточни их до выполнения задания.","work"],
 ["Можно развивать собственную команду?","Возможности развития зависят от направления и правил программы. Обсуди реальные обязанности, критерии роста и связанные с этим условия.","support"],
 ["Как задать дополнительные вопросы?","Напиши Макару в Telegram: @holinmoder. Не отправляй пароли, коды подтверждения или данные банковской карты.","support"]
];
let activeCategory="all", showAll=true;
function renderFaq(){const q=$("#faqSearch").value.trim().toLowerCase();const filtered=faqs.map((f,i)=>({...{q:f[0],a:f[1],cat:f[2],i}})).filter(f=>(activeCategory==="all"||f.cat===activeCategory)&&(!q||(f.q+" "+f.a).toLowerCase().includes(q)));const shown=showAll?filtered:filtered.slice(0,6);$("#faqCount").textContent=`Показано ответов: ${shown.length}`;$("#faqList").innerHTML=shown.map(f=>`<article class="faq-item"><button class="faq-question" aria-expanded="false"><span>${f.q}</span><b>＋</b></button><div class="faq-answer" hidden>${f.a}</div></article>`).join("");$("#faqEmpty").hidden=filtered.length>0;$("#showAllFaq").hidden=filtered.length<=6;$("#showAllFaq").textContent=showAll?"Показать меньше ↑":"Показать все вопросы ↓";$$(".faq-question").forEach(b=>b.addEventListener("click",()=>{const answer=b.nextElementSibling,open=b.getAttribute("aria-expanded")==="true";b.setAttribute("aria-expanded",String(!open));answer.hidden=open;b.querySelector("b").textContent=open?"＋":"−"}))}
$("#faqSearch").addEventListener("input",()=>{showAll=true;renderFaq()});$("#clearFaq").addEventListener("click",()=>{$("#faqSearch").value="";renderFaq()});$$(".filter-chip").forEach(b=>b.addEventListener("click",()=>{activeCategory=b.dataset.category;$$(".filter-chip").forEach(x=>x.classList.toggle("active",x===b));showAll=true;renderFaq()}));$("#showAllFaq").addEventListener("click",()=>{showAll=!showAll;renderFaq()});renderFaq();

function openModal(id){$("#"+id).hidden=false;document.body.style.overflow="hidden"}
function closeModal(modal){modal.hidden=true;document.body.style.overflow=""}
$$(".open-modal").forEach(b=>b.addEventListener("click",()=>openModal(b.dataset.modal)));
$$(".modal-backdrop").forEach(m=>{m.addEventListener("click",e=>{if(e.target===m)closeModal(m)});$$("[data-close]",m).forEach(b=>b.addEventListener("click",()=>closeModal(m)))});

const searchTargets=[
 ["Главная","Знакомство с AlfaOmega","home"],["О проекте","Подход и команда","about"],["Основатели","Макар и контакты","founders"],["Сотрудничество","Разовый и регулярный форматы","formats"],["Партнёры","Партнёрские программы","partners"],["Кейсы","Этапы истории участника","case"],["Отзывы","Обратная связь","reviews"],["Вопросы","Опыт, график, условия","faq"],["Контакты","Бесплатное знакомство с Макаром","contact"],["Подобрать формат","Три вопроса перед консультацией","selector"]
];
let searchActive=0;
function renderSearch(){const q=$("#siteSearch").value.trim().toLowerCase();const results=searchTargets.filter(x=>(x[0]+" "+x[1]).toLowerCase().includes(q)).slice(0,8);$("#searchResults").innerHTML=results.map((x,i)=>`<a class="search-result ${i===searchActive?"active":""}" href="#${x[2]}"><span>${x[0]}</span><small>${x[1]} ↗</small></a>`).join("")||'<p class="faq-empty">Ничего не найдено. Попробуй другое слово.</p>';$$(".search-result").forEach(a=>a.addEventListener("click",()=>closeSearch()))}
function openSearch(){$("#searchOverlay").hidden=false;document.body.style.overflow="hidden";$("#siteSearch").value="";searchActive=0;renderSearch();$("#siteSearch").focus()}
function closeSearch(){$("#searchOverlay").hidden=true;document.body.style.overflow=""}
$("#openSearch").addEventListener("click",openSearch);$("#closeSearch").addEventListener("click",closeSearch);$("#searchOverlay").addEventListener("click",e=>{if(e.target===$("#searchOverlay"))closeSearch()});$("#siteSearch").addEventListener("input",()=>{searchActive=0;renderSearch()});
document.addEventListener("keydown",e=>{if((e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==="k"){e.preventDefault();openSearch()}if(e.key==="Escape"){closeSearch();$$(".modal-backdrop").forEach(m=>{if(!m.hidden)closeModal(m)})}if(!$("#searchOverlay").hidden&&["ArrowDown","ArrowUp"].includes(e.key)){e.preventDefault();const links=$$(".search-result");if(links.length){searchActive=(searchActive+(e.key==="ArrowDown"?1:-1)+links.length)%links.length;links.forEach((a,i)=>a.classList.toggle("active",i===searchActive))}}if(!$("#searchOverlay").hidden&&e.key==="Enter"){const active=$$(".search-result")[searchActive];if(active)active.click()}});

// Optional UI sound feedback: disabled by default, activated only by the visitor.
let soundOn=false,audioContext=null;
const soundButton=$("#soundToggle");
if(soundButton){soundButton.addEventListener("click",()=>{soundOn=!soundOn;soundButton.setAttribute("aria-pressed",String(soundOn));soundButton.innerHTML=soundOn?'♫ <span>Звуки: вкл.</span>':'♫ <span>Звуки</span>';if(soundOn){try{audioContext=audioContext||new (window.AudioContext||window.webkitAudioContext)();const osc=audioContext.createOscillator(),gain=audioContext.createGain();osc.frequency.value=660;gain.gain.value=.025;osc.connect(gain);gain.connect(audioContext.destination);osc.start();osc.stop(audioContext.currentTime+.07)}catch(e){}}});}
document.addEventListener("click",e=>{if(!soundOn||!audioContext)return;if(e.target.closest("button,a")){try{const osc=audioContext.createOscillator(),gain=audioContext.createGain();osc.frequency.value=420;gain.gain.value=.012;osc.connect(gain);gain.connect(audioContext.destination);osc.start();osc.stop(audioContext.currentTime+.025)}catch(e){}}});
