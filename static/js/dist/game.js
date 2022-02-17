class Changelog{constructor(t){this.menu=t,this.$changelog=$('\n<div class="ac-game-changelog">\n    <div class="ac-game-changelog-logo"></div>\n    <br>\n    <div class="ac-game-changelog-author">\n        AUTHOR: &ensp;潘江明-CN\n        <br><br>\n    </div>\n    <div class="ac-game-changelog-close" title="关闭">\n        ×\n    </div>\n    <div class="ac-game-changelog-text">\n        2022.2.17<br>\n        &emsp;优化：局内聊天系统文本颜色优化<br>\n        &emsp;优化：单机模式内 AI 皮肤颜色增加\n        <br>\n        <br>\n        2022.2.16<br>\n        &emsp;重磅：Warlock Chat 正式上线<br>\n        &emsp;优化：游戏说明页面视觉优化<br>\n        &emsp;优化：鼠标指针皮肤全面更新<br>\n        &emsp;优化：游戏界面背景全面优化<br>\n        &emsp;新增：Warlock War 上线天数显示\n        <br>\n        <br>\n        2022.2.15<br>\n        &emsp;元宵节快乐！<br>\n        &emsp;优化：更换背景样式，使背景更贴合游戏主题氛围<br>\n        &emsp;修复：在菜单模式中点击其他按钮后更新日志不会自动关闭的bug\n        <br>\n        <br>\n        2022.2.14<br>\n        &emsp;情人节快乐！<br>\n        &emsp;优化：UI适配不同类型窗口<br>\n        &emsp;优化：局内添加技能按键提示<br>\n        &emsp;新增：火球到达最大距离后烟花爆炸效果（不造成伤害）<br>\n        &emsp;新增：移动目的地的提示位置<br>\n        &emsp;修复：某些情况下游戏结束后不能正常重新开始的bug\n        <br>\n        <br>\n        2022.2.13<br>\n        &emsp;Warlock War 1.0 正式上线\n    </div>\n</div>\n'),this.$changelog.hide(),this.menu.root.$ac_game.append(this.$changelog),this.$close=this.$changelog.find(".ac-game-changelog-close"),this.start()}start(){this.add_listening_event()}add_listening_event(){let t=this;this.$close.click((function(){t.hide()}))}show(){this.$changelog.show()}hide(){this.$changelog.hide()}}class GameHelper{constructor(t){this.menu=t,this.$helper=$('\n<div class="ac-game-helper">\n    <div class="ac-game-helper-text">\n        AUTHOR: &emsp;潘江明-CN<br>\n        <br>\n        ===推荐PC端游玩===<br>\n        移动：鼠标右键点击桌面即可移动至目标地点<br>\n        攻击：按Q键 + 鼠标左键即可向目标处发射火球<br>\n        闪现：按F键 + 鼠标左键即可瞬移至目标处<br>\n        局内聊天(联网模式)：按ENTER键可呼唤出聊天框<br>\n        若已输入内容，按ESC键可关闭聊天框，按ENTER键发送；<br>\n        若未输入内容，按ENTER键可直接关闭聊天框\n    </div>\n    <br>\n    <div class="ac-game-helper-back">\n        返回\n    </div>\n</div>\n'),this.$helper.hide(),this.menu.root.$ac_game.append(this.$helper),this.$back=this.$helper.find(".ac-game-helper-back"),this.start()}start(){this.add_listening_events()}add_listening_events(){let t=this;this.$back.click((function(){t.hide(),t.menu.show()}))}show(){this.$helper.show()}hide(){this.$helper.hide()}}class OnlineDays{constructor(t){this.menu=t,this.$onlinedays=this.calc_days(),this.$onlinedays.show(),this.menu.$menu.append(this.$onlinedays),this.start()}start(){}calc_days(){let t=new Date(2022,1,13),e=new Date;t=new Date(t.getFullYear(),t.getMonth(),t.getDate()),e=new Date(e.getFullYear(),e.getMonth(),e.getDate());const i=e.getTime()-t.getTime();return $(`<div class="onlinedays">Warlock War 已上线 ${i/864e5+1} 天</div>`)}show(){this.$onlinedays.show()}hide(){this.$onlinedays.hide()}}class WarlockChatSocket{constructor(t){this.menu=t,this.ws=new WebSocket("wss://app1356.acapp.acwing.com.cn/wss/warlockchat/"),this.start()}start(){this.receive()}receive(){let t=this;this.ws.onmessage=function(e){let i=JSON.parse(e.data),s=i.event;"message"===s?t.receive_message(i.username,i.time,i.text):"init"===s&&t.receive_init(i.details)}}send_init(t){this.ws.send(JSON.stringify({event:"init",username:t}))}receive_init(t){for(let e=0;e<t.length;e++){let i=t[e],s=i.username,a=i.time,n=i.text;this.menu.warlock_chat.add_message(s,a,n)}}send_message(t,e,i){this.ws.send(JSON.stringify({event:"message",username:t,time:e,text:i}))}receive_message(t,e,i){t!==this.menu.root.settings.username&&this.menu.warlock_chat.add_message(t,e,i)}}class WarlockChat{constructor(t){this.menu=t,this.$title=$('<div class="message-board-title">Warlock Chat</div>'),this.$history=$('<div class="message-board-history"></div>'),this.$input=$('<input type="text" class="message-board-input" placeholder="留下你的足迹"></input>'),this.$title.show(),this.$history.show(),this.$input.show(),this.menu.$menu.append(this.$title),this.menu.$menu.append(this.$history),this.menu.$menu.append(this.$input),this.start()}start(){this.add_listening_event()}add_listening_event(){let t=this;this.$input.keydown((function(e){if(13===e.which){let e=t.menu.root.settings.username,i=t.$input.val();if(i){t.$input.val(""),Date.prototype.format=function(t){var e={"M+":this.getMonth()+1,"d+":this.getDate(),"h+":this.getHours(),"m+":this.getMinutes(),"s+":this.getSeconds(),"q+":Math.floor((this.getMonth()+3)/3),S:this.getMilliseconds()};for(var i in/(y+)/.test(t)&&(t=t.replace(RegExp.$1,(this.getFullYear()+"").substr(4-RegExp.$1.length))),e)new RegExp("("+i+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?e[i]:("00"+e[i]).substr((""+e[i]).length)));return t};let s=(new Date).format("yyyy-MM-dd hh:mm:ss");t.add_message(e,s,i),t.menu.wcs.send_message(e,s,i)}return!1}}))}add_message(t,e,i){let s=`[${t}][${e}]<br>${i}`,a="black";t===this.menu.root.settings.username&&(a="green"),this.$history.append(this.render_message(s,a)),this.$history.scrollTop(this.$history[0].scrollHeight)}render_message(t,e){return $(`<div style="color:${e}">${t}</div>`)}}class AcGameMenu{constructor(t){this.root=t,this.$menu=$('\n<div class="ac-game-menu">\n    <div class="ac-game-menu-field">\n        <div class="ac-game-menu-field-item ac-game-menu-field-item-helper" title="相关操作说明">\n            游戏说明\n        </div>\n        <br>\n        <div class="ac-game-menu-field-item ac-game-menu-field-item-single-mode">\n            单机模式\n        </div>\n        <br>\n        <div class="ac-game-menu-field-item ac-game-menu-field-item-multi-mode">\n            联网模式\n        </div>\n        <br>\n        <div class="ac-game-menu-field-item ac-game-menu-field-item-changelog">\n            更新日志\n        </div>\n        <br>\n        <div class="ac-game-menu-field-item ac-game-menu-field-item-settings" title="退出当前账号">\n            退出\n        </div>\n    </div>\n</div>\n'),this.root.$ac_game.append(this.$menu),this.$helper=this.$menu.find(".ac-game-menu-field-item-helper"),this.$single_mode=this.$menu.find(".ac-game-menu-field-item-single-mode"),this.$multi_mode=this.$menu.find(".ac-game-menu-field-item-multi-mode"),this.$changelog=this.$menu.find(".ac-game-menu-field-item-changelog"),this.$settings=this.$menu.find(".ac-game-menu-field-item-settings"),this.onlinedays=new OnlineDays(this),this.game_helper=new GameHelper(this),this.changelog=new Changelog(this),this.warlock_chat=new WarlockChat(this),this.wcs=new WarlockChatSocket(this);let e=this;this.wcs.ws.onopen=function(){e.wcs.send_init(e.root.settings.username)},this.start()}start(){this.add_listening_events()}add_listening_events(){let t=this;this.$helper.click((function(){t.hide(),t.changelog.hide(),t.game_helper.show()})),this.$single_mode.click((function(){t.hide(),t.changelog.hide(),t.root.playground.show("single mode")})),this.$multi_mode.click((function(){t.hide(),t.changelog.hide(),t.root.playground.show("multi mode")})),this.$changelog.click((function(){t.changelog.show()})),this.$settings.click((function(){t.changelog.hide(),t.root.settings.logout_on_remote()}))}show(){this.onlinedays.show(),this.$menu.show()}hide(){this.onlinedays.hide(),this.$menu.hide()}}let last_timestamp,AC_GAME_OBJECTS=[];class AcGameObject{constructor(){AC_GAME_OBJECTS.push(this),this.has_called_start=!1,this.timedelta=0,this.uuid=this.create_uuid()}create_uuid(){let t="";for(let e=0;e<8;e++){t+=parseInt(Math.floor(10*Math.random()))}return t}start(){}update(){}late_update(){}on_destroy(){}destroy(){this.on_destroy();for(let t=0;t<AC_GAME_OBJECTS.length;t++)if(AC_GAME_OBJECTS[t]===this){AC_GAME_OBJECTS.splice(t,1);break}}}let AC_GAME_ANIMATION=function(t){for(let e=0;e<AC_GAME_OBJECTS.length;e++){let i=AC_GAME_OBJECTS[e];i.has_called_start?(i.timedelta=t-last_timestamp,i.update()):(i.start(),i.has_called_start=!0)}for(let t=0;t<AC_GAME_OBJECTS.length;t++){AC_GAME_OBJECTS[t].late_update()}last_timestamp=t,requestAnimationFrame(AC_GAME_ANIMATION)};requestAnimationFrame(AC_GAME_ANIMATION);class ChatField{constructor(t){this.playground=t,this.$history=$('<div class="ac-game-chat-field-history">历史记录</div>'),this.$input=$('<input type="text" class="ac-game-chat-field-input" placeholder="发送一句友好的问候见证当下"></input>'),this.$history.hide(),this.$input.hide(),this.func_id=null,this.playground.$playground.append(this.$history),this.playground.$playground.append(this.$input),this.start()}start(){this.add_listening_event()}add_listening_event(){let t=this;this.$history.on("contextmenu",(function(){return!1})),this.$input.keydown((function(e){if(27===e.which)return t.hide_input(),!1;if(13===e.which){let e=t.playground.root.settings.username,i=t.$input.val();return i?(t.$input.val(""),t.add_message(e,i),t.playground.mps.send_message(e,i)):t.hide_input(),!1}}))}render_message(t,e){return $(`<div style="color:${e}">${t}</div>`)}add_message(t,e){this.show_history();let i=`[${t}]:${e}`,s="white";t===this.playground.root.settings.username&&(s="lime"),this.$history.append(this.render_message(i,s)),this.$history.scrollTop(this.$history[0].scrollHeight)}show_history(){let t=this;this.$history.fadeIn(),this.func_id&&clearTimeout(this.func_id),this.func_id=setTimeout((function(){t.$history.fadeOut(),t.func_id=null}),3e3)}show_input(){this.show_history(),this.$input.show(),this.$input.focus()}hide_input(){this.$input.hide(),this.playground.game_map.$canvas.focus()}}class FinallBoard extends AcGameObject{constructor(t){super(),this.playground=t,this.ctx=this.playground.game_map.ctx,this.state=null,this.win_img=new Image,this.win_img.src="https://cdn.acwing.com/media/article/image/2022/02/12/106788_3c4e02858c-win.png",this.lose_img=new Image,this.lose_img.src="https://cdn.acwing.com/media/article/image/2022/02/12/106788_3546c3128c-lose.png"}start(){}win(){this.state="win";let t=this;setTimeout((function(){t.playground.hide(),t.playground.root.menu.show()}),2e3)}lose(){this.state="lose";let t=this;setTimeout((function(){t.playground.hide(),t.playground.root.menu.show()}),2e3)}late_update(){this.render()}render(){let t=this.playground.height/2,e=this.playground.width/2;"win"===this.state?this.ctx.drawImage(this.win_img,this.playground.width/2-e/2,this.playground.height/2-t/2,e,t):"lose"===this.state&&this.ctx.drawImage(this.lose_img,this.playground.width/2-e/2,this.playground.height/2-t/2,e,t)}}class GameMap extends AcGameObject{constructor(t){super(),this.playground=t,this.$canvas=$("<canvas tabindex=0></canvas>"),this.ctx=this.$canvas[0].getContext("2d"),this.ctx.canvas.width=this.playground.width,this.ctx.canvas.height=this.playground.height,this.playground.$playground.append(this.$canvas),this.background_img=new Image,"single mode"===this.playground.mode?this.background_img.src="https://cdn.acwing.com/media/article/image/2022/02/16/106788_4d7828ed8f-single.jpg":"multi mode"===this.playground.mode&&(this.background_img.src="https://cdn.acwing.com/media/article/image/2022/02/16/106788_7f79857a8f-multi.jpg")}start(){this.$canvas.focus()}resize(){this.ctx.canvas.width=this.playground.width,this.ctx.canvas.height=this.playground.height,this.ctx.save(),this.ctx.beginPath(),this.ctx.drawImage(this.background_img,0,0,this.ctx.canvas.width,this.ctx.canvas.height)}update(){this.render()}render(){this.ctx.globalAlpha=.28,this.ctx.save(),this.ctx.beginPath(),this.ctx.drawImage(this.background_img,0,0,this.ctx.canvas.width,this.ctx.canvas.height),this.ctx.globalAlpha=1}}class NoticeBoard extends AcGameObject{constructor(t){super(),this.playground=t,this.ctx=this.playground.game_map.ctx,this.text="已就绪：0人"}start(){}write(t){this.text=t}update(){this.render()}render(){this.ctx.font="20px serif",this.ctx.fillStyle="white",this.ctx.textAlign="center",this.ctx.fillText(this.text,this.playground.width/2,20)}}class Particle extends AcGameObject{constructor(t,e,i,s,a,n,h,r,l){super(),this.playground=t,this.ctx=this.playground.game_map.ctx,this.x=e,this.y=i,this.radius=s,this.vx=a,this.vy=n,this.color=h,this.speed=r,this.move_length=l,this.friction=.9,this.eps=.01}start(){}update(){if(this.move_length<this.eps||this.speed<this.eps)return this.destroy(),!1;let t=Math.min(this.move_length,this.speed*this.timedelta/1e3);this.x+=this.vx*t,this.y+=this.vy*t,this.speed*=this.friction,this.move_length-=t,this.render()}render(){let t=this.playground.scale;this.ctx.beginPath(),this.ctx.arc(this.x*t,this.y*t,this.radius*t,0,2*Math.PI,!1),this.ctx.fillStyle=this.color,this.ctx.fill()}}class Player extends AcGameObject{constructor(t,e,i,s,a,n,h,r,l){super(),this.playground=t,this.ctx=this.playground.game_map.ctx,this.x=e,this.y=i,this.vx=0,this.vy=0,this.radius=s,this.color=a,this.speed=n,this.character=h,this.username=r,this.photo=l,this.move_length=0,this.cur_skill=null,this.friction=.9,this.spent_time=0,this.damage_x=0,this.damage_y=0,this.damage_speed=0,this.fireballs=[],this.eps=.01,"robot"!==this.character&&(this.img=new Image,this.img.src=this.photo),"me"===this.character&&(this.fireball_coldtime=1,this.fireball_img=new Image,this.fireball_img.src="https://cdn.acwing.com/media/article/image/2022/02/13/106788_b4ad44c18c-fireball.png",this.blink_coldtime=3,this.blink_img=new Image,this.blink_img.src="https://cdn.acwing.com/media/article/image/2022/02/13/106788_b212e4278c-blink-f.png")}start(){if(this.playground.player_count+=1,this.playground.notice_board.write("已就绪："+this.playground.player_count+"人"),this.playground.player_count>=2&&(this.playground.state="fighting",this.playground.notice_board.write("开始战斗！！！")),"me"===this.character)this.add_listening_events();else if("robot"===this.character){let t=Math.random()*this.playground.width/this.playground.scale,e=Math.random()*this.playground.height/this.playground.scale;this.move_to(t,e)}}add_listening_events(){let t=this;this.playground.game_map.$canvas.on("contextmenu",(function(){return!1})),this.playground.game_map.$canvas.mousedown((function(e){if("fighting"!==t.playground.state)return!0;const i=t.ctx.canvas.getBoundingClientRect();if(3===e.which){let s=(e.clientX-i.left)/t.playground.scale,a=(e.clientY-i.top)/t.playground.scale;for(let e=0;e<4;e++){let i=s,n=a,h=.0025,r=2*Math.PI*(e/4+.125),l=Math.cos(r),o=Math.sin(r),d="white",c=.3,g=.02;new Particle(t.playground,i,n,h,l,o,d,c,g)}t.move_to(s,a),"multi mode"===t.playground.mode&&t.playground.mps.send_move_to(s,a)}else if(1===e.which){let s=(e.clientX-i.left)/t.playground.scale,a=(e.clientY-i.top)/t.playground.scale;if("fireball"===t.cur_skill){if(t.fireball_coldtime>t.eps)return!1;let e=t.shoot_fireball(s,a);"multi mode"===t.playground.mode&&t.playground.mps.send_shoot_fireball(s,a,e.uuid)}else if("blink"===t.cur_skill){if(t.blink_coldtime>t.eps)return!1;t.blink(s,a),"multi mode"===t.playground.mode&&t.playground.mps.send_blink(s,a)}t.cur_skill=null}})),this.playground.game_map.$canvas.keydown((function(e){if(13===e.which){if("multi mode"===t.playground.mode)return t.playground.chat_field.show_input(),!1}else 27===e.which&&"multi mode"===t.playground.mode&&t.playground.chat_field.hide_input();return"fighting"!==t.playground.state||(81===e.which?t.fireball_coldtime>t.eps||(t.cur_skill="fireball",!1):70===e.which?t.blink_coldtime>t.eps||(t.cur_skill="blink",!1):void 0)}))}blink(t,e){let i=this.get_dist(this.x,this.y,t,e);i=Math.min(i,.8);let s=Math.atan2(e-this.y,t-this.x);this.x+=i*Math.cos(s),this.y+=i*Math.sin(s),this.blink_coldtime=3,this.move_length=0}shoot_fireball(t,e){let i=this.x,s=this.y,a=Math.atan2(e-s,t-i),n=Math.cos(a),h=Math.sin(a),r="orange";"multi mode"===this.playground.mode&&(r="red");let l=new FireBall(this.playground,this,i,s,.01,n,h,r,.6,1,.01);return this.fireballs.push(l),this.fireball_coldtime=1,l}destroy_fireball(t){for(let e=0;e<this.fireballs.length;e++){let i=this.fireballs[e];if(i.uuid===t){i.destroy();break}}}is_attacked(t,e){for(let t=0;t<20+10*Math.random();t++){let t=this.x,e=this.y,i=this.radius*Math.random()*.1,s=2*Math.PI*Math.random(),a=Math.cos(s),n=Math.sin(s),h=this.color,r=10*this.speed,l=this.radius*Math.random()*5;new Particle(this.playground,t,e,i,a,n,h,r,l)}if(this.radius-=e,this.radius<this.eps)return this.destroy(),!1;this.damage_x=Math.cos(t),this.damage_y=Math.sin(t),this.damage_speed=100*e,this.speed*=1.1}receive_attack(t,e,i,s,a,n){n.destroy_fireball(a),this.x=t,this.y=e,this.is_attacked(i,s)}get_dist(t,e,i,s){let a=t-i,n=e-s;return Math.sqrt(a*a+n*n)}move_to(t,e){this.move_length=this.get_dist(this.x,this.y,t,e);let i=Math.atan2(e-this.y,t-this.x);this.vx=Math.cos(i),this.vy=Math.sin(i)}update(){this.spent_time+=this.timedelta/1e3,this.update_win(),"fighting"===this.playground.state&&"me"===this.character&&this.update_coldtime(),this.update_move(),this.render()}update_win(){1===this.playground.player_count&&"fighting"===this.playground.state&&"me"===this.character&&(this.playground.state="over",this.playground.notice_board.write("恭喜，您赢了！！！"),this.playground.finall_board.win())}update_coldtime(){this.fireball_coldtime-=this.timedelta/1e3,this.fireball_coldtime=Math.max(this.fireball_coldtime,0),this.blink_coldtime-=this.timedelta/1e3,this.blink_coldtime=Math.max(this.blink_coldtime,0)}update_move(){if("robot"===this.character&&this.spent_time>4&&Math.random()<1/180){let t=this.playground.players[Math.floor(Math.random()*this.playground.players.length)];if(this!==t){let e=t.x+t.speed*t.vx*(.3+.5*Math.random()),i=t.y+t.speed*t.vy*(.3+.5*Math.random());this.shoot_fireball(e,i)}}if(this.damage_speed>this.eps)this.vx=this.vy=0,this.move_length=0,this.x+=this.damage_x*this.damage_speed*this.timedelta/1e3,this.y+=this.damage_y*this.damage_speed*this.timedelta/1e3,this.damage_speed*=this.friction;else if(this.move_length<this.eps){if(this.move_length=0,this.vx=this.vy=0,"robot"===this.character){let t=Math.random()*this.playground.width/this.playground.scale,e=Math.random()*this.playground.height/this.playground.scale;this.move_to(t,e)}}else{let t=Math.min(this.move_length,this.speed*this.timedelta/1e3);this.x+=this.vx*t,this.y+=this.vy*t,this.move_length-=t}}render(){let t=this.playground.scale;"robot"!==this.character?(this.ctx.save(),this.ctx.beginPath(),this.ctx.arc(this.x*t,this.y*t,this.radius*t,0,2*Math.PI,!1),this.ctx.stroke(),this.ctx.clip(),this.ctx.drawImage(this.img,(this.x-this.radius)*t,(this.y-this.radius)*t,2*this.radius*t,2*this.radius*t),this.ctx.restore()):(this.ctx.beginPath(),this.ctx.arc(this.x*t,this.y*t,this.radius*t,0,2*Math.PI,!1),this.ctx.fillStyle=this.color,this.ctx.fill()),"me"===this.character&&"fighting"===this.playground.state&&this.render_skill_coldtime()}render_skill_coldtime(){let t=this.playground.scale,e=1.5,i=.9,s=.04;this.ctx.save(),this.ctx.beginPath(),this.ctx.arc(e*t,i*t,s*t,0,2*Math.PI,!1),this.ctx.stroke(),this.ctx.clip(),this.ctx.drawImage(this.fireball_img,(e-s)*t,(i-s)*t,2*s*t,2*s*t),this.ctx.restore(),this.fireball_coldtime>0&&(this.ctx.beginPath(),this.ctx.moveTo(e*t,i*t),this.ctx.arc(e*t,i*t,s*t,0-Math.PI/2,2*Math.PI*(1-this.fireball_coldtime/1)-Math.PI/2,!0),this.ctx.lineTo(e*t,i*t),this.ctx.fillStyle="rgba(0, 0, 255, 0.6)",this.ctx.fill()),e=1.62,i=.9,s=.04,this.ctx.save(),this.ctx.beginPath(),this.ctx.arc(e*t,i*t,s*t,0,2*Math.PI,!1),this.ctx.stroke(),this.ctx.clip(),this.ctx.drawImage(this.blink_img,(e-s)*t,(i-s)*t,2*s*t,2*s*t),this.ctx.restore(),this.blink_coldtime>0&&(this.ctx.beginPath(),this.ctx.moveTo(e*t,i*t),this.ctx.arc(e*t,i*t,s*t,0-Math.PI/2,2*Math.PI*(1-this.blink_coldtime/3)-Math.PI/2,!0),this.ctx.lineTo(e*t,i*t),this.ctx.fillStyle="rgba(0, 0, 255, 0.6)",this.ctx.fill())}on_destroy(){"me"===this.character&&"fighting"===this.playground.state&&(this.playground.state="over",this.playground.notice_board.write("您已阵亡，游戏结束。"),this.playground.finall_board.lose());for(let t=0;t<this.playground.players.length;t++)if(this.playground.players[t]===this){this.playground.players.splice(t,1),this.playground.player_count-=1;break}}}class FireBall extends AcGameObject{constructor(t,e,i,s,a,n,h,r,l,o,d){super(),this.playground=t,this.player=e,this.ctx=this.playground.game_map.ctx,this.x=i,this.y=s,this.radius=a,this.vx=n,this.vy=h,this.color=r,this.speed=l,this.move_length=o,this.damage=d,this.eps=.01}start(){}update(){if(this.move_length<this.eps){for(let t=0;t<20+10*Math.random();t++){let t=this.x,e=this.y,i=.005,s=2*Math.PI*Math.random(),a=Math.cos(s),n=Math.sin(s),h=this.color,r=1,l=.2;new Particle(this.playground,t,e,i,a,n,h,r,l)}return this.destroy(),!1}this.update_move(),"enemy"!==this.player.character&&this.update_attack(),this.render()}update_move(){let t=Math.min(this.move_length,this.speed*this.timedelta/1e3);this.x+=this.vx*t,this.y+=this.vy*t,this.move_length-=t}update_attack(){for(let t=0;t<this.playground.players.length;t++){let e=this.playground.players[t];if(this.player!==e&&this.is_collision(e)){this.attack(e);break}}}attack(t){let e=Math.atan2(t.y-this.y,t.x-this.x);t.is_attacked(e,this.damage),"multi mode"===this.playground.mode&&this.playground.mps.send_attack(t.uuid,t.x,t.y,e,this.damage,this.uuid),this.destroy()}is_collision(t){return this.get_dist(this.x,this.y,t.x,t.y)<this.radius+t.radius}get_dist(t,e,i,s){let a=t-i,n=e-s;return Math.sqrt(a*a+n*n)}render(){let t=this.playground.scale;this.ctx.beginPath(),this.ctx.arc(this.x*t,this.y*t,this.radius*t,0,2*Math.PI,!1),this.ctx.fillStyle=this.color,this.ctx.fill()}on_destroy(){let t=this.player.fireballs;for(let e=0;e<t.length;e++)if(t[e]===this){t.splice(e,1);break}}}class MultiPlayerSocket{constructor(t){this.playground=t,this.ws=new WebSocket("wss://app1356.acapp.acwing.com.cn/wss/multiplayer/"),this.start()}start(){this.receive()}receive(){let t=this;this.ws.onmessage=function(e){let i=JSON.parse(e.data),s=i.uuid;if(s===t.uuid)return!1;let a=i.event;"create_player"===a?t.receive_create_player(s,i.username,i.photo):"move_to"===a?t.receive_move_to(s,i.tx,i.ty):"shoot_fireball"===a?t.receive_shoot_fireball(s,i.tx,i.ty,i.ball_uuid):"attack"===a?t.receive_attack(s,i.attackee_uuid,i.x,i.y,i.angle,i.damage,i.ball_uuid):"blink"===a?t.receive_blink(s,i.tx,i.ty):"message"===a&&t.receive_message(s,i.username,i.text)}}get_player(t){let e=this.playground.players;for(let i=0;i<e.length;i++){let s=e[i];if(s.uuid===t)return s}return null}send_create_player(t,e){this.ws.send(JSON.stringify({event:"create_player",uuid:this.uuid,username:t,photo:e}))}receive_create_player(t,e,i){let s=new Player(this.playground,this.playground.width/2/this.playground.scale,.5,.05,"white",.2,"enemy",e,i);s.uuid=t,this.playground.players.push(s)}send_move_to(t,e){this.ws.send(JSON.stringify({event:"move_to",uuid:this.uuid,tx:t,ty:e}))}receive_move_to(t,e,i){let s=this.get_player(t);s&&s.move_to(e,i)}send_shoot_fireball(t,e,i){this.ws.send(JSON.stringify({event:"shoot_fireball",uuid:this.uuid,tx:t,ty:e,ball_uuid:i}))}receive_shoot_fireball(t,e,i,s){let a=this.get_player(t);if(a){a.shoot_fireball(e,i).uuid=s}}send_attack(t,e,i,s,a,n){this.ws.send(JSON.stringify({event:"attack",uuid:this.uuid,attackee_uuid:t,x:e,y:i,angle:s,damage:a,ball_uuid:n}))}receive_attack(t,e,i,s,a,n,h){let r=this.get_player(t),l=this.get_player(e);r&&l&&l.receive_attack(i,s,a,n,h,r)}send_blink(t,e){this.ws.send(JSON.stringify({event:"blink",uuid:this.uuid,tx:t,ty:e}))}receive_blink(t,e,i){let s=this.get_player(t);s&&s.blink(e,i)}send_message(t,e){this.ws.send(JSON.stringify({event:"message",uuid:this.uuid,username:t,text:e}))}receive_message(t,e,i){this.playground.chat_field.add_message(e,i)}}class AcGamePlayground{constructor(t){this.root=t,this.$playground=$('<div class="ac-game-playground"></div>'),this.hide(),this.root.$ac_game.append(this.$playground),this.start()}get_random_color(){return["blue","green","yellow","red","pink","purple","grey","aqua","skyblue","greenyellow","gold","peachpuff","plum","lightpink","wheat"][Math.floor(15*Math.random())]}create_uuid(){let t="";for(let e=0;e<8;e++){t+=parseInt(Math.floor(10*Math.random()))}return t}start(){let t=this,e=this.create_uuid();$(window).on(`resize.${e}`,(function(){t.resize()})),this.root.acwingos&&this.root.acwingos.api.window.on_close((function(){$(window).off(`resize.${e}`)}))}resize(){this.width=this.$playground.width(),this.height=this.$playground.height();let t=Math.min(this.width/16,this.height/9);this.width=16*t,this.height=9*t,this.scale=this.height,this.game_map&&this.game_map.resize()}show(t){let e=this;if(this.$playground.show(),this.mode=t,this.width=this.$playground.width(),this.height=this.$playground.height(),this.game_map=new GameMap(this),this.state="waiting",this.notice_board=new NoticeBoard(this),this.finall_board=new FinallBoard(this),this.player_count=0,this.resize(),this.players=[],this.players.push(new Player(this,this.width/2/this.scale,.5,.05,"white",.2,"me",this.root.settings.username,this.root.settings.photo)),"single mode"===t)for(let t=0;t<7;t++)this.players.push(new Player(this,this.width/2/this.scale,.5,.05,this.get_random_color(),.2,"robot"));else"multi mode"===t&&(this.chat_field=new ChatField(this),this.mps=new MultiPlayerSocket(this),this.mps.uuid=this.players[0].uuid,this.mps.ws.onopen=function(){e.mps.send_create_player(e.root.settings.username,e.root.settings.photo)})}hide(){for(;this.players&&this.players.length>0;){let t=this.players[0];for(;t.fireballs&&t.fireballs.length>0;)t.fireballs[0].destroy();this.players[0].destroy()}this.game_map&&(this.game_map.destroy(),this.game_map=null),this.notice_board&&(this.notice_board.destroy(),this.notice_board=null),this.finall_board&&(this.finall_board.destroy(),this.finall_board=null),this.$playground.empty(),this.$playground.hide()}}class Settings{constructor(t){this.root=t,this.platform="WEB",this.root.acwingos&&(this.platform="ACAPP"),this.username="",this.photo="",this.$settings=$('\n<div class="ac-game-settings">\n    <div class="ac-game-settings-login">\n        <div class="ac-game-settings-title">\n            登录\n        </div>\n        <div class="ac-game-settings-username">\n            <div class="ac-game-settings-item">\n                <input type="text" placeholder="用户名">\n            </div>\n        </div>\n        <div class="ac-game-settings-password">\n            <div class="ac-game-settings-item">\n                <input type="password" placeholder="密码">\n            </div>\n        </div>\n        <div class="ac-game-settings-submit">\n            <div class="ac-game-settings-item">\n                <button>登录</button>\n            </div>\n        </div>\n        <div class="ac-game-settings-error-message">\n        </div>\n        <div class="ac-game-settings-option">\n            注册\n        </div>\n    </div>\n    <div class="ac-game-settings-register">\n        <div class="ac-game-settings-title">\n            注册\n        </div>\n        <div class="ac-game-settings-username">\n            <div class="ac-game-settings-item">\n                <input type="text" placeholder="用户名">\n            </div>\n        </div>\n        <div class="ac-game-settings-password ac-game-settings-password-first">\n            <div class="ac-game-settings-item">\n                <input type="password" placeholder="密码">\n            </div>\n        </div>\n        <div class="ac-game-settings-password ac-game-settings-password-second">\n            <div class="ac-game-settings-item">\n                <input type="password" placeholder="确认密码">\n            </div>\n        </div>\n        <div class="ac-game-settings-submit">\n            <div class="ac-game-settings-item">\n                <button>注册</button>\n            </div>\n        </div>\n        <div class="ac-game-settings-error-message">\n        </div>\n        <div class="ac-game-settings-option">\n            登录\n        </div>\n    </div>\n</div>\n'),this.$login=this.$settings.find(".ac-game-settings-login"),this.$login_username=this.$login.find(".ac-game-settings-username input"),this.$login_password=this.$login.find(".ac-game-settings-password input"),this.$login_submit=this.$login.find(".ac-game-settings-submit button"),this.$login_error_message=this.$login.find(".ac-game-settings-error-message"),this.$login_register=this.$login.find(".ac-game-settings-option"),this.$login.hide(),this.$register=this.$settings.find(".ac-game-settings-register"),this.$register_username=this.$register.find(".ac-game-settings-username input"),this.$register_password=this.$register.find(".ac-game-settings-password-first input"),this.$register_password_confirm=this.$register.find(".ac-game-settings-password-second input"),this.$register_submit=this.$register.find(".ac-game-settings-submit button"),this.$register_error_message=this.$register.find(".ac-game-settings-error-message"),this.$register_login=this.$register.find(".ac-game-settings-option"),this.$register.hide(),this.root.$ac_game.append(this.$settings),this.start()}start(){"ACAPP"===this.platform?this.getinfo_acapp():(this.getinfo_web(),this.add_listening_events())}add_listening_events(){this.add_listening_events_login(),this.add_listening_events_register()}add_listening_events_login(){let t=this;this.$login_register.click((function(){t.register()})),this.$login_submit.click((function(){t.login_on_remote()}))}add_listening_events_register(){let t=this;this.$register_login.click((function(){t.login()})),this.$register_submit.click((function(){t.register_on_remote()}))}acwing_login(){$.ajax({url:"https://app1356.acapp.acwing.com.cn/settings/acwing/web/apply_code/",type:"GET",success:function(t){"success"===t.result&&window.location.replace(t.apply_code_url)}})}login_on_remote(){let t=this,e=this.$login_username.val(),i=this.$login_password.val();this.$login_error_message.empty(),$.ajax({url:"https://app1356.acapp.acwing.com.cn/settings/login/",type:"GET",data:{username:e,password:i},success:function(e){"success"===e.result?location.reload():t.$login_error_message.html(e.result)}})}logout_on_remote(){"ACAPP"===this.platform?this.root.acwingos.api.window.close():$.ajax({url:"https://app1356.acapp.acwing.com.cn/settings/logout/",type:"GET",success:function(t){"success"===t.result&&location.reload()}})}register_on_remote(){let t=this,e=this.$register_username.val(),i=this.$register_password.val(),s=this.$register_password_confirm.val();this.$register_error_message.empty(),$.ajax({url:"https://app1356.acapp.acwing.com.cn/settings/register/",type:"GET",data:{username:e,password:i,password_confirm:s},success:function(e){"success"===e.result?location.reload():t.$register_error_message.html(e.result)}})}login(){this.$register.hide(),this.$login.show()}register(){this.$login.hide(),this.$register.show()}acapp_login(t,e,i,s){let a=this;this.root.acwingos.api.oauth2.authorize(t,e,i,s,(function(t){"success"===t.result&&(a.username=t.username,a.photo=t.photo,a.hide(),a.root.menu=new AcGameMenu(a.root),a.root.menu.show(),a.root.menu.changelog.show())}))}getinfo_acapp(){let t=this;$.ajax({url:"https://app1356.acapp.acwing.com.cn/settings/acwing/acapp/apply_code/",type:"GET",success:function(e){"success"===e.result&&t.acapp_login(e.appid,e.redirect_uri,e.scope,e.state)}})}getinfo_web(){let t=this;$.ajax({url:"https://app1356.acapp.acwing.com.cn/settings/getinfo/",type:"GET",data:{platform:t.platform},success:function(e){"success"===e.result?(t.username=e.username,t.photo=e.photo,t.hide(),t.root.menu=new AcGameMenu(t.root),t.root.menu.show(),t.root.menu.changelog.show()):t.login()}})}hide(){this.$settings.hide()}show(){this.$settings.show()}}export class AcGame{constructor(t,e){this.id=t,this.$ac_game=$("#"+t),this.acwingos=e,this.settings=new Settings(this),this.playground=new AcGamePlayground(this),this.start()}start(){}}
