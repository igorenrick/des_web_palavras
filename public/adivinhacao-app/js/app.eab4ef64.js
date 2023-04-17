(function(){"use strict";var a={6113:function(a,t,n){var e=n(9242),r=n(3396);const i={id:"app"};function o(a,t,n,e,o,c){const l=(0,r.up)("router-link"),u=(0,r.up)("router-view");return(0,r.wg)(),(0,r.iD)("div",i,[(0,r.Wm)(l,{to:"/adivinhacao-app"},{default:(0,r.w5)((()=>[(0,r.Uk)("Home")])),_:1}),(0,r.Uk)(" | "),(0,r.Wm)(l,{to:"/adivinhacao-app/configura"},{default:(0,r.w5)((()=>[(0,r.Uk)("Configurar palavras e dicas")])),_:1}),(0,r.Wm)(u)])}var c={name:"App"},l=n(89);const u=(0,l.Z)(c,[["render",o]]);var v=u,s=n(2483),d=n(7139);const p=(0,r._)("h1",null,"Jogo da Divinhação",-1);function h(a,t,n,i,o,c){return(0,r.wg)(),(0,r.iD)("div",null,[p,(0,r._)("p",null,"Dica: "+(0,d.zw)(o.dica),1),(0,r._)("p",null,"Palavra: "+(0,d.zw)(o.palavraMascarada),1),(0,r._)("p",null,"Tentativas restantes: "+(0,d.zw)(o.tentativas),1),(0,r.wy)((0,r._)("input",{"onUpdate:modelValue":t[0]||(t[0]=a=>o.entrada=a),type:"text",placeholder:"Digite uma letra",maxlength:"1"},null,512),[[e.nr,o.entrada]]),(0,r._)("button",{onClick:t[1]||(t[1]=(...a)=>c.enviarTentativa&&c.enviarTentativa(...a))},"Enviar")])}var f=n(2066),m={data(){return{dica:"",palavraMascarada:"",tentativas:0,entrada:"",socket:null,title:"Jogo da Divinhação"}},created(){this.socket=(0,f.ZP)("http://localhost:10000"),this.socket.on("connect",(()=>{this.socket.emit("iniciarJogo")})),this.socket.on("atualizar",(a=>{this.dica=a.dica,this.palavraMascarada=a.palavra,this.tentativas=a.tentativas})),this.socket.on("resultado",(a=>{a?alert("Parabéns! Você venceu!"):alert("Infelizmente você perdeu. Tente novamente."),this.socket.emit("iniciarJogo")}))},methods:{enviarTentativa(){const a=this.entrada.trim().toLowerCase();a&&(this.socket.emit("tentativa",a),this.entrada="")}},mounted(){document.title=this.title}};const g=(0,l.Z)(m,[["render",h]]);var w=g;const y=(0,r._)("h1",null,"Configurações",-1),b=["onClick"],P=(0,r._)("h2",null,"Adicionar nova palavra",-1);function k(a,t,n,i,o,c){return(0,r.wg)(),(0,r.iD)("div",null,[y,((0,r.wg)(!0),(0,r.iD)(r.HY,null,(0,r.Ko)(o.palavras,((a,t)=>((0,r.wg)(),(0,r.iD)("div",{key:t},[(0,r._)("p",null,(0,d.zw)(a.palavra)+" - "+(0,d.zw)(a.dica),1),(0,r._)("button",{onClick:t=>c.removerPalavra(a)},"Remover",8,b)])))),128)),(0,r._)("div",null,[P,(0,r.wy)((0,r._)("input",{"onUpdate:modelValue":t[0]||(t[0]=a=>o.novaPalavra=a),type:"text",placeholder:"Palavra"},null,512),[[e.nr,o.novaPalavra]]),(0,r.wy)((0,r._)("input",{"onUpdate:modelValue":t[1]||(t[1]=a=>o.novaDica=a),type:"text",placeholder:"Dica"},null,512),[[e.nr,o.novaDica]]),(0,r._)("button",{onClick:t[2]||(t[2]=a=>c.adicionarPalavra())},"Adicionar")])])}var _={data(){return{palavras:[],novaPalavra:"",novaDica:""}},mounted(){this.carregarPalavras()},methods:{async carregarPalavras(){const a=await fetch("/lista"),t=await a.json();this.palavras=t},async adicionarPalavra(){if(!this.novaPalavra||!this.novaDica)return;const a=await fetch("/add",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({palavra:this.novaPalavra,dica:this.novaDica})});a.ok&&(this.novaPalavra="",this.novaDica="",await this.carregarPalavras())},async removerPalavra(a){const t=await fetch("/remove",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({palavra:a.palavra})});t.ok&&await this.carregarPalavras()}}};const O=(0,l.Z)(_,[["render",k]]);var D=O;const T=[{path:"/adivinhacao-app/",name:"Home",component:w},{path:"/adivinhacao-app/configura",name:"Configura",component:D}],C=(0,s.p7)({history:(0,s.PO)(),routes:T,base:"/adivinhacao-app/"});var j=C;(0,e.ri)(v).use(j).mount("#app")}},t={};function n(e){var r=t[e];if(void 0!==r)return r.exports;var i=t[e]={exports:{}};return a[e](i,i.exports,n),i.exports}n.m=a,function(){var a=[];n.O=function(t,e,r,i){if(!e){var o=1/0;for(v=0;v<a.length;v++){e=a[v][0],r=a[v][1],i=a[v][2];for(var c=!0,l=0;l<e.length;l++)(!1&i||o>=i)&&Object.keys(n.O).every((function(a){return n.O[a](e[l])}))?e.splice(l--,1):(c=!1,i<o&&(o=i));if(c){a.splice(v--,1);var u=r();void 0!==u&&(t=u)}}return t}i=i||0;for(var v=a.length;v>0&&a[v-1][2]>i;v--)a[v]=a[v-1];a[v]=[e,r,i]}}(),function(){n.n=function(a){var t=a&&a.__esModule?function(){return a["default"]}:function(){return a};return n.d(t,{a:t}),t}}(),function(){n.d=function(a,t){for(var e in t)n.o(t,e)&&!n.o(a,e)&&Object.defineProperty(a,e,{enumerable:!0,get:t[e]})}}(),function(){n.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(a){if("object"===typeof window)return window}}()}(),function(){n.o=function(a,t){return Object.prototype.hasOwnProperty.call(a,t)}}(),function(){n.r=function(a){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(a,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(a,"__esModule",{value:!0})}}(),function(){var a={143:0};n.O.j=function(t){return 0===a[t]};var t=function(t,e){var r,i,o=e[0],c=e[1],l=e[2],u=0;if(o.some((function(t){return 0!==a[t]}))){for(r in c)n.o(c,r)&&(n.m[r]=c[r]);if(l)var v=l(n)}for(t&&t(e);u<o.length;u++)i=o[u],n.o(a,i)&&a[i]&&a[i][0](),a[i]=0;return n.O(v)},e=self["webpackChunkadivinhacao_app"]=self["webpackChunkadivinhacao_app"]||[];e.forEach(t.bind(null,0)),e.push=t.bind(null,e.push.bind(e))}();var e=n.O(void 0,[998],(function(){return n(6113)}));e=n.O(e)})();
//# sourceMappingURL=app.eab4ef64.js.map