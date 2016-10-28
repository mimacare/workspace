// 原生JS与jQuery无依赖 
/*
	name:getId
	params:oid
	func:根据id获取节点
*/
function getId(oid){
	return document.getElementById(oid);
}
/*
	name:getNodes
	params:nodes
	func:保留元素节点
*/
function getNodes(nodes){
	var nodes_array = [];
	var nodes_len = nodes.length;
	for(var i=0;i<nodes_len;i++){
		if(nodes[i].nodeType ==1 ){
			nodes_array.push(nodes[i]);
		}
	}
	return nodes_array;
}
/*
	name:setAll
	params:node,classname
	func:遍历所有兄弟节点并改变样式
*/
function setAll(node,classname){
	var siblings = node.parentNode.childNodes;
	var siblings_len = siblings.length;
	for (var i = 0; i < siblings_len; i++) {
		siblings[i].className = classname;
	}
}
function getAll(node){
	var siblings = getNodes(node.parentNode.childNodes);
	var siblings_len = siblings.length;
	for (var i = 0; i < siblings_len; i++) {
		siblings[i].style.display = "none";
	}
}
/*
	name:tab
	params:tits,cons,classname,callback
	func:创建选项卡
*/
function tab(tits,cons,titson,callfunc){
	for (var i = 0; i < tits.length; i++) {
		(function(x){
			tits[x].onclick = function(){
				if(tits[x]){
					setAll(tits[x],"");
					tits[x].className = titson;
				}
				if(cons[x]){
					getAll(cons[x]);
					cons[x].style.display = "block";
					if(typeof callfunc == "function"){
						callfunc();
					}
				}
			}
		})(i)
	}
}