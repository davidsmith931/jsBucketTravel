(()=>{const e={0:{id:0,content:"Czy lubisz kebsa?",status:"checked"},1:{id:1,content:"A w Krakowie, na brackiej pada pinionc",status:"unchecked"},2:{id:2,content:"Paszoł, bo psem poszczuję",status:"unchecked"},3:{id:3,content:"Bo bo bo bo, bi bi bi bi",status:"checked"},4:{id:4,content:"Po co Ci kapusta?",status:"unchecked"},5:{id:5,content:"Element piąty",status:"unchecked"}};let t=["0","3","1","5"];console.log(t);const c=document.querySelector(".osobisteBox ul");for(let t=0;t<Object.keys(e).length;t++)c.innerHTML+=`<li><input type="checkbox" id="${e[t].id}"><span>${e[t].content}</span></li>`;const n=document.querySelectorAll(".osobisteBox ul li input"),o=function(e){if(e.target.getAttribute("checked")){for(i=0;i<t.length;i++)t[i]===e.target.id&&t.splice(i,1);n[e.target.id].removeAttribute("checked")}else t.push(e.target.id),n[e.target.id].setAttribute("checked","checked");console.log(t)};n.forEach((function(e){e.addEventListener("click",o),t.includes(e.id)&&e.setAttribute("checked","checked")}));for(let c=0;c<Object.keys(e).length;c++)t.includes(e[c].id.toString())&&console.log(e[c].content)})();