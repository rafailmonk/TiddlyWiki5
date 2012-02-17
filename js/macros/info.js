/*\
title: js/macros/info.js

\*/
(function(){

/*jslint node: true */
"use strict";

var Renderer = require("../Renderer.js").Renderer,
	utils = require("../Utils.js");

exports.macro = {
	name: "info",
	types: ["text/html","text/plain"],
	params: {
		info: {byName: "default", type: "text"}
	},
	events: {
		click: function(event,node,tiddler,store,params) {
			var el = node.firstChild.firstChild.nextSibling;
			el.style.display = el.style.display === "block" ? "none" : "block";
			event.preventDefault();
			return false;
		}
	},
	render: function(type,tiddler,store,params) {
		var encoder = type === "text/html" ? utils.htmlEncode : function(x) {return x;},
			info = params.info || "parsetree";
		if(tiddler) {
			var parseTree = store.parseTiddler(tiddler.title);
			switch(info) {
				case "parsetree":
					return [Renderer.SliderNode("parsetree",
										"Parse tree",
										"The parse tree for this tiddler",
										(parseTree.toString(type)))];
					//break;
				case "compiled":
					return [Renderer.SliderNode("compiled",
										"Render functions",
										"The render functions for this tiddler",
										(parseTree.compile(type).toString(type)))];
					//break;
			}
		}
	}
};

})();
