(this.webpackJsonplevelup=this.webpackJsonplevelup||[]).push([[0],{13:function(e,t,a){e.exports=a(28)},23:function(e,t,a){},25:function(e,t,a){},26:function(e,t,a){},27:function(e,t,a){},28:function(e,t,a){"use strict";a.r(t);var n=a(0),c=a.n(n),i=a(5),r=a.n(i),l=a(2),o=a(3),s=a(12);a(23),Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));a(24),a(25);var u="TASK",m="INBOX_ITEM",d={projects:0,tasks:0,inbox:0,project:0,task:0,itemID:0,view:"OVERVIEW"},h={project:0,task:0,itemID:0},E=function(e){return{type:"CHANGE_VIEW",payload:e}},p=function(e){return{type:"SELECT_ITEM",payload:e}};var b=function(e){var t=e.touchFunction;return c.a.createElement("article",{className:"h-100 w-100 center bg-white br1 pa3 pa4-ns ba b--black-10",title:"STATS",onClick:t},c.a.createElement("div",{className:"tc"},c.a.createElement("h1",{className:"f3 mb2"},"Amen Christ"),c.a.createElement("h2",{className:"f5 fw4 gray mt0"},"Engineer"),c.a.createElement("h2",{className:"f5 fw4 gray mt0"},"Exp: 50")))};var f=function(e){var t=e.touchFunction;return c.a.createElement("article",{className:"h-100 center bg-white br1 ba b--black-10",title:"TASKS",onClick:t},c.a.createElement("div",{className:"tc"},c.a.createElement("h1",{className:"f3 mb2"},"3/5"),c.a.createElement("h2",{className:"f5 fw4 gray mt0"},"Tasks")))};var N=function(e){var t=e.touchFunction;return c.a.createElement("article",{className:"h-100 center bg-white br1 ba b--black-10",title:"PROJECTS",onClick:t},c.a.createElement("div",{className:"tc"},c.a.createElement("h1",{className:"f3 mb2"},"Projects"),c.a.createElement("h2",{className:"f5 fw4 gray mt0"},"1/6")))};var v=function(e){var t=e.touchFunction;return c.a.createElement("article",{className:"h-100 center bg-white br1 ba b--black-10",title:"INBOX",onClick:t},c.a.createElement("div",{className:"tc"},c.a.createElement("h1",{className:"f3 mb2"},"23"),c.a.createElement("h2",{className:"f5 fw4 gray mt0"},"Inbox")))};function k(e){var t=e.touchFunction,a=e.item;switch(a.type){case"PROJECT":return c.a.createElement("div",{className:"bb",id:a.id,onClick:t},c.a.createElement("h3",null,a.name),c.a.createElement("p",null,a.goal));case u:return c.a.createElement("div",{className:"bb",id:a.id,onClick:t},c.a.createElement("h3",null,a.name),c.a.createElement("p",null,a.associatedProject.name));case m:return c.a.createElement("div",{className:"bb",id:a.id,onClick:t},c.a.createElement("h3",null,a.name),c.a.createElement("p",null,a.entryDate));default:return c.a.createElement("div",{className:"bb",title:"new item",onClick:t},c.a.createElement("h3",null,"Enter New Item"))}}function w(e){return c.a.createElement("div",{className:"ba h-75 pl2 pr2",style:{overflowY:"scroll"}},e.children)}function D(e){var t=e.touchFunction,a=e.content,n=e.filter,i="";switch(n){case"TASKS":i=u;break;case"PROJECTS":i="PROJECT";break;default:i=m}var r=a.filter((function(e){return e.type===i}));console.log(r);var l=r.map((function(e,n){return c.a.createElement(k,{item:r[n],touchFunction:t,key:a[n].id})}));return c.a.createElement(w,null,l)}var I=[{type:m,id:1,entryDate:1212123443,name:"Random Input 1",description:"Optional details on input",status:"UNPROCESSED"},{type:m,id:2,entryDate:1212123443,name:"Random Input 2",description:"Optional details on input",status:"UNPROCESSED"},{type:m,id:3,entryDate:1212123443,name:"Random Input 3",description:"Optional details on input",status:"UNPROCESSED"},{type:m,id:4,entryDate:1212123443,name:"Random Input 4",description:"Optional details on input",status:"UNPROCESSED"},{type:m,id:5,entryDate:1212123443,name:"Random Input 5",description:"Optional details on input",status:"UNPROCESSED"},{type:m,id:6,entryDate:1212123443,name:"Random Input 6",description:"Optional details on input",status:"UNPROCESSED"},{type:m,id:7,entryDate:1212123443,name:"Random Input 7",description:"Optional details on input",status:"UNPROCESSED"},{type:m,id:8,entryDate:1212123443,name:"Random Input 8",description:"Optional details on input",status:"UNPROCESSED"},{type:m,id:9,entryDate:1212123443,name:"Random Input 9",description:"Optional details on input",status:"UNPROCESSED"},{type:m,id:10,entryDate:1212123443,name:"Random Input 10",description:"Optional details on input",status:"UNPROCESSED"}],R=[{type:"PROJECT",id:11,name:"Project 1",description:"About Project 1",goal:"What done looks like for Project 1",output:"Recordable proof of completed project",outputRecordID:null,dueDate:1591012800,timeRequired:2629746,timeRemaining:2629746,status:"UNPLANNED",nextAction:{id:16,task:"First physical action",output:"recordable product of task completion"},taskList:[{id:1,task:"A physical action"},{id:2,task:"Another physical action"}]},{type:"PROJECT",id:12,name:"Project 2",description:"About Project 2",goal:"What done looks like for Project 2",output:"Recordable proof of completed project",outputRecordID:null,dueDate:1591012800,timeRequired:2629746,timeRemaining:2629746,status:"UNPLANNED",nextAction:{id:17,task:"First physical action"},taskList:[{id:1,task:"A physical action"},{id:2,task:"Another physical action"}]},{type:"PROJECT",id:13,name:"Project 3",description:"About Project 3",goal:"What done looks like for Project 3",output:"Recordable proof of completed project",outputRecordID:null,dueDate:1591012800,timeRequired:2629746,timeRemaining:2629746,status:"NOT_STARTED",nextAction:{id:16,task:"First physical action"},taskList:[{id:1,task:"A physical action"},{id:2,task:"Another physical action"}]},{type:"PROJECT",id:14,name:"Project 4",description:"About Project 4",goal:"What done looks like for Project 4",output:"Recordable proof of completed project",outputRecordID:null,dueDate:1591012800,timeRequired:2629746,timeRemaining:2629746,status:"NOT_STARTED",nextAction:{id:16,task:"First physical action"},taskList:[{id:1,task:"A physical action"},{id:2,task:"Another physical action"}]},{type:"PROJECT",id:15,name:"Project 5",description:"About Project 5",goal:"What done looks like for Project 5",output:"Recordable proof of completed project",outputRecordID:null,dueDate:1591012800,timeRequired:2629746,timeRemaining:2629746,status:"NOT_STARTED",nextAction:{id:16,task:"First physical action"},taskList:[{id:1,task:"A physical action"},{id:2,task:"Another physical action"}]}],O=[{type:u,id:16,name:"Task 1",description:"About Task 1",output:"recordable product of task completion",outputRecordID:0,associatedProject:{id:11,name:"Project 1",goal:"What done looks like for Project 1"},dueDate:1591012800,timeRequired:900,status:"PENDING"},{type:u,id:17,name:"Task 2",description:"About Task 2",output:"recordable product of task completion",outputRecordID:0,associatedProject:{id:11,name:"Project 1",goal:"What done looks like for Project 1"},dueDate:1591012800,timeRequired:900,status:"PENDING"},{type:u,id:18,name:"Task 3",description:"About Task 3",output:"recordable product of task completion",outputRecordID:0,associatedProject:{id:11,name:"Project 1",goal:"What done looks like for Project 1"},dueDate:1591012800,timeRequired:900,status:"PENDING"},{type:u,id:19,name:"Task 4",description:"About Task 4",output:"recordable product of task completion",outputRecordID:0,associatedProject:{id:11,name:"Project 1",goal:"What done looks like for Project 1"},dueDate:1591012800,timeRequired:900,status:"PENDING"},{type:u,id:20,name:"Task 5",description:"About Task 5",output:"recordable product of task completion",outputRecordID:0,associatedProject:{id:11,name:"Project 1",goal:"What done looks like for Project 1"},dueDate:1591012800,timeRequired:900,status:"PENDING"}],g=I.concat(R,O);a(26);function y(e){for(var t=e.id,a=e.touchFunction,n={},i=0;i<g.length;i++)if(g[i].id===t){n=g[i];break}return c.a.createElement("div",null,c.a.createElement("div",null,c.a.createElement("h5",null,"ID: ",n.id),c.a.createElement("h5",null,"Name: ",n.name),c.a.createElement("h5",null,"Output: ",n.output," ")),c.a.createElement("div",{className:"show"},c.a.createElement("h5",null,"Description"),c.a.createElement("p",null,n.description)),c.a.createElement("div",null,c.a.createElement("h5",null,"Associated Project: ",c.a.createElement("span",{id:n.associatedProject.id,onClick:a},n.associatedProject.name)),c.a.createElement("h5",null,"Due Date: ",n.dueDate),c.a.createElement("h5",null,"Time Required: ",n.timeRequired),c.a.createElement("p",null,"Status: ",n.status)))}function j(e){for(var t=e.id,a=e.touchFunction,n={},i=0;i<g.length;i++)if(g[i].id===t){n=g[i];break}return c.a.createElement("div",null,c.a.createElement("div",null,c.a.createElement("h5",null,"ID: ",n.id),c.a.createElement("h5",null,"Name: ",n.name),c.a.createElement("h5",null,"Goal: ",n.goal," ")),c.a.createElement("div",{className:"show"},c.a.createElement("h5",null,"Description"),c.a.createElement("p",null,n.description)),c.a.createElement("div",null,c.a.createElement("h5",null,"Output: ",n.output," "),c.a.createElement("h5",null,"Due Date: ",n.dueDate),c.a.createElement("h5",null,"Time Required: ",n.timeRequired),c.a.createElement("p",null,"Time Remaining: ",n.timeRemaining),c.a.createElement("p",null,"Status: ",n.status)),c.a.createElement("div",null,c.a.createElement("h5",null,"Next Action: "),c.a.createElement("h5",null,c.a.createElement("span",{id:n.nextAction.id,onClick:a},n.nextAction.task))))}var T=a(1),P=a(4);function S(e){var t=e.question,a=e.yes,n=e.no;return c.a.createElement("div",{className:"h-100 w-100 center br1 pa3 ba b--black-10"},c.a.createElement("h2",null,t),c.a.createElement("button",{className:"button",onClick:a},"YES"),c.a.createElement("button",{className:"button",onClick:n},"NO"))}function C(e){var t=e.question,a=e.submitFunction,i=Object(n.useState)(""),r=Object(T.a)(i,2),l=r[0],o=r[1];return c.a.createElement("div",{className:"h-100 w-100 center br1 pa3 ba b--black-10"},c.a.createElement("h2",null,t),c.a.createElement("form",{onSubmit:function(e){""!==l&&(a(l),o("")),e.preventDefault()}},c.a.createElement("input",{type:"text",value:l,onChange:function(e){return o(e.target.value)}})))}var A=function e(t,a){var n=this;Object(P.a)(this,e);var c=new Date;this.type="PROJECT",this.id=c.getTime(),this.name=t,this.description="",this.goal=a,this.output=null,this.outputRecordID=null,this.dueDate=c.getTime()+7776e6,this.timeRequired=7776e6,this.timeRemaining=setInterval((function(){var e=(new Date).getTime();return n.dueDate-e}),1),this.status="UNPLANNED",this.nextAction={},this.taskList=[]},F=function e(t,a,n){Object(P.a)(this,e);var c=new Date;this.type=u,this.id=c.getTime(),this.name=t,this.description="",this.output=a,this.outputRecordID=0,this.timeRequired=null,this.status="PENDING",this.isDelegatable=n,this.associatedProject={},this.dueDate=null};var x=Object(l.b)((function(e){return{view:e.selectViewReducer.view,itemID:e.selectItemReducer.itemID}}),(function(e){return{onTouch:function(t){return e(E(t))},changeItemID:function(t){return e(p(t))}}}))((function(e){var t=e.nextItemID,a=e.item,i=e.touchFunction,r=e.changeItemID,l=Object(n.useState)(""),o=Object(T.a)(l,2),s=o[0],u=o[1],m=Object(n.useState)(null),d=Object(T.a)(m,2),h=(d[0],d[1]),E=Object(n.useState)(""),p=Object(T.a)(E,2),b=p[0],f=p[1],N=Object(n.useState)(null),v=Object(T.a)(N,2),k=v[0],w=v[1],D=Object(n.useState)(null),I=Object(T.a)(D,2),g=I[0],y=I[1],j=Object(n.useState)(null),P=Object(T.a)(j,2),x=P[0],q=P[1],W=Object(n.useState)(0),L=Object(T.a)(W,2),J=L[0],U=L[1];function M(e){U(0),i(e)}function V(){a.status="PROCESSED"}function _(){U(J+1)}function G(){r(a.id)}switch("UNPROCESSED"===a.status&&0===J&&(console.log(J),_()),!0){case 1===J:return c.a.createElement("div",{className:"h-100 w-100 center br1 pa3 ba b--black-10 show "},c.a.createElement(S,{question:"Is this Actionable?",yes:function(){h(!0),_()}}));case 2===J:return c.a.createElement("div",{className:"h-100 w-100 center br1 pa3 ba b--black-10 show "},c.a.createElement(C,{question:"What does 'DONE' look like?",submitFunction:function(e){u(e),_()}}));case 3===J:return c.a.createElement("div",{className:"h-100 w-100 center br1 pa3 ba b--black-10 show "},c.a.createElement(C,{question:"What's the next action?",submitFunction:function(e){f(e),_()}}));case 4===J:return c.a.createElement("div",{className:"h-100 w-100 center br1 pa3 ba b--black-10 show "},c.a.createElement(S,{question:"Does the next action require more than one step?",yes:function(){w(!0),_(),function(){var e=new A(b,s);R.unshift(e),V(),G()}()},no:function(){w(!1),_()}}));case!0===k&&5===J:return c.a.createElement("div",{className:"h-100 w-100 center br1 pa3 ba b--black-10 show "},c.a.createElement("h3",null,"A new Project has been added"),c.a.createElement("button",{className:"button",id:t,onClick:M},"PROCESS NEXT ITEM"));case!1===k&&5===J:return c.a.createElement("div",{className:"h-100 w-100 center br1 pa3 ba b--black-10 show "},c.a.createElement(S,{question:"Would it take more than 5 minutes to do?",yes:function(){y(!1),_()},no:function(){y(!0),_()}}));case!0===g&&6===J:return c.a.createElement("div",{className:"h-100 w-100 center br1 pa3 ba b--black-10 show "},c.a.createElement("h3",null,"LET'S DO IT!"),c.a.createElement("h2",null,"TIMER"),c.a.createElement("p",null,"Once timer is done, you get the option to mark as completed. You also get the option ot defer the action."),c.a.createElement("button",{className:"button",onClick:function(){V(),U(0),G()}},"DONE"));case!1===g&&6===J:return c.a.createElement("div",{className:"h-100 w-100 center br1 pa3 ba b--black-10 show "},c.a.createElement(S,{question:"Can this task be delegated?",yes:function(){q(!0),V(),G(),_()},no:function(){q(!1),V(),G(),_()}}));case 7===J:return function(){var e=new F(b,s,x);O.unshift(e),V()}(),c.a.createElement("div",{className:"h-100 w-100 center br1 pa3 ba b--black-10 show "},c.a.createElement("h3",null,"A new Task has been added"),c.a.createElement("button",{className:"button",id:t,onClick:M},"PROCESS NEXT ITEM"));default:return c.a.createElement("div",{className:"h-100 w-100 center br1 pa3 ba b--black-10 show "},c.a.createElement("button",{className:"button",id:t,onClick:M},"PROCESS NEXT ITEM"))}}));function q(e){for(var t=e.id,a=e.touchFunction,n={},i=null,r=0;r<I.length;r++)if(I[r].id===t){n=I[r],i=I[r+1].id;break}return c.a.createElement("div",null,c.a.createElement("h5",null,"ID: ",n.id),c.a.createElement("h5",null,"Name: ",n.name),c.a.createElement("h5",null,"Entry Date: ",n.entryDate," "),c.a.createElement("p",null,"Description: ",n.description),c.a.createElement("h5",null,"status: ",n.status," "),c.a.createElement(x,{item:n,nextItemID:i,touchFunction:a}))}function W(e){var t=e.touchFunction;return c.a.createElement("div",{className:"show w3 h3",title:"NEW_ITEM",onClick:t},c.a.createElement("h3",{className:"tc"},"N"))}var L=function e(t){var a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"None";Object(P.a)(this,e);var n=new Date;this.type=m,this.id=n.getTime(),this.entryDate=n.getTime(),this.name=t,this.description=a};function J(e){var t=e.submitFunction,a=Object(n.useState)(""),i=Object(T.a)(a,2),r=i[0],l=i[1],o=Object(n.useState)(""),s=Object(T.a)(o,2),u=s[0],m=s[1];return c.a.createElement("div",{className:"h-100 w-100 center br1 pa3 ba b--black-10"},c.a.createElement("h1",{className:"tc"},"NEW ITEM"),c.a.createElement("form",{onSubmit:function(e){var a=new L(r,u);g.unshift(a),t(e),e.preventDefault()},className:"flex flex-column",title:"INBOX"},c.a.createElement("input",{type:"text",value:r,onChange:function(e){return l(e.target.value)}}),c.a.createElement("textarea",{value:u,onChange:function(e){return m(e.target.value)}}),c.a.createElement("input",{type:"submit",value:"submit"})))}function U(e){var t=e.touchFunction;return c.a.createElement("div",{className:"bg-white h-100 center w-100",title:"NEW_ITEM",onClick:t},c.a.createElement("div",{className:"tc"},c.a.createElement("h3",null,"Add New Item")))}var M=Object(l.b)((function(e){return{view:e.selectViewReducer.view,itemID:e.selectItemReducer.itemID}}),(function(e){return{onTouch:function(t){return e(E(t))},changeItemID:function(t){return e(p(t))}}}))((function(e){var t=e.view,a=e.itemID,n=e.onTouch,i=e.changeItemID;function r(e){!function e(t){t.id?i(t.id):(t=t.parentNode,e(t))}(e.target)}function l(e){!function e(t){t.title?n(t.title):(t=t.parentNode,e(t))}(e.target)}switch("SKILLS"===t||"NEW_ITEM"===t||"PROJECTS"===t||"TASKS"===t||"STATS"===t||"INBOX"===t){case!0:if("0"===a||0===a)return"NEW_ITEM"===t?c.a.createElement(J,{submitFunction:l}):c.a.createElement("div",{className:"h-100 w-100 center br1 pa3 ba b--black-10"},c.a.createElement("h1",{className:"tc"},t),c.a.createElement(D,{content:g,filter:t,touchFunction:r}),c.a.createElement(W,{touchFunction:l}));for(var o="",s=parseInt(a),d=0;d<g.length;d++)if(g[d].id===s){o=g[d].type;break}switch(o){case"PROJECT":return c.a.createElement("div",{className:"h-100 w-100 center br1 pa3 ba b--black-10"},c.a.createElement("h1",{className:"tc"},"Project"),c.a.createElement(j,{id:parseInt(a),touchFunction:r}));case u:return c.a.createElement("div",{className:"h-100 w-100 center br1 pa3 ba b--black-10"},c.a.createElement("h1",{className:"tc"},"Task"),c.a.createElement(y,{id:parseInt(a),touchFunction:r}));case m:return c.a.createElement("div",{className:"h-100 w-100 center br1 pa3 ba b--black-10"},c.a.createElement("h1",{className:"tc"},"Inbox Item"),c.a.createElement(q,{id:parseInt(a),touchFunction:r}),c.a.createElement(W,{touchFunction:l}));default:return c.a.createElement("div",{className:"h-100 w-100 center br1 pa3 ba b--black-10"},c.a.createElement("h1",{className:"tc"},"Error"),c.a.createElement("p",null,"Item Not Found"),c.a.createElement(W,{touchFunction:l}))}default:return c.a.createElement("div",{className:"h-100"},c.a.createElement("div",{className:"pb1 ph1 h-40"},c.a.createElement(b,{touchFunction:l})),c.a.createElement("div",{className:"flex justify-center h-20 "},c.a.createElement("div",{className:"w-50 pa1"},c.a.createElement(N,{touchFunction:l})),c.a.createElement("div",{className:"w-50 pa1"},c.a.createElement(f,{touchFunction:l}))),c.a.createElement("div",{className:"flex w-100 h-10 pa1"},c.a.createElement(U,{touchFunction:l})),c.a.createElement("div",{className:"flex justify-center h-30"},c.a.createElement("div",{className:" w-50 h-100 pa1"},c.a.createElement("div",{className:"h-100 bg-white br1"})),c.a.createElement("div",{className:" w-50 h-100"},c.a.createElement("div",{className:" w-100 h-50"},c.a.createElement("div",{className:"h-50 pa1"},c.a.createElement("div",{className:"h-100 bg-white br1"})),c.a.createElement("div",{className:"h-50 pa1"},c.a.createElement("div",{className:"h-100 bg-white br1"}))),c.a.createElement("div",{className:"w-100 h-50 flex"},c.a.createElement("div",{className:"w-50 h-100 pa1"},c.a.createElement("div",{className:"h-100 bg-white br1"})),c.a.createElement("div",{className:"w-50 h-100 pa1"},c.a.createElement(v,{touchFunction:l}))))))}}));function V(e){var t=e.touchFunction;return c.a.createElement("div",{className:"w-20 center bg-white b--black-10 ba",title:"OVERVIEW",onClick:t},c.a.createElement("h3",{className:"tc"},"H"))}function _(e){var t=e.touchFunction;return c.a.createElement("div",{className:"w-20 center bg-white ba b--black-10",title:"PROJECTS",onClick:t},c.a.createElement("h3",{className:"tc"},"P"))}function G(e){var t=e.touchFunction;return c.a.createElement("div",{className:"w-20 center bg-white b--black-10 ba",title:"TASKS",onClick:t},c.a.createElement("h3",{className:"tc"},"T"))}function X(e){var t=e.touchFunction;return c.a.createElement("div",{className:"w-20 center bg-white b--black-10 ba",title:"INBOX",onClick:t},c.a.createElement("h3",{className:"tc"},"I"))}function B(e){var t=e.touchFunction;return c.a.createElement("div",{className:"w-20 center bg-white b--black-10 ba",title:"SKILLS",onClick:t},c.a.createElement("h3",{className:"tc"},"S"))}var K=Object(l.b)((function(e){return{view:e.selectViewReducer.view}}),(function(e){return{changeView:function(t){return e(E(t))},changeItemID:function(t){return e(p(t))}}}))((function(e){var t=e.changeView,a=e.changeItemID;function n(e){!function e(n){n.title?(t(n.title),a(0)):(n=n.parentNode,e(n))}(e.target)}return c.a.createElement("div",{className:"navbar center flex"},c.a.createElement(X,{touchFunction:n}),c.a.createElement(G,{touchFunction:n}),c.a.createElement(V,{touchFunction:n}),c.a.createElement(_,{touchFunction:n}),c.a.createElement(B,{touchFunction:n}))}));a(27);var H=Object(l.b)((function(e){return{view:e.selectViewReducer.view}}),(function(e){return{onTouch:function(t){return e(E(t))}}}))((function(e){Object(n.useEffect)((function(){}));var t=e.onTouch;return c.a.createElement("div",{className:"app"},c.a.createElement("div",{className:"home-container"},c.a.createElement(M,{touchFunction:t})),c.a.createElement(K,{touchFunction:t}))})),Y=Object(o.c)({selectViewReducer:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:d,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};switch(t.type){case"CHANGE_VIEW":return Object.assign({},e,{view:t.payload});default:return e}},selectItemReducer:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:h,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};switch(t.type){case"SELECT_ITEM":return Object.assign({},e,{itemID:t.payload});default:return e}}}),$=Object(s.createLogger)(),z=Object(o.d)(Y,Object(o.a)($));r.a.render(c.a.createElement(c.a.StrictMode,null,c.a.createElement(l.a,{store:z},c.a.createElement(H,null))),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[13,1,2]]]);
//# sourceMappingURL=main.65fdc2ce.chunk.js.map