(function(){angular.module("appSC").lazy.factory("typeaheadService",[function(){return function(){var o;return o={list:[],atual:void 0,checked:[],removed:[],paramsKey:void 0,listItemKey:"id",init:function(e){return this.list=angular.copy(e||[]),this.setup()},clear:function(){var e,t,i;for(e=0,t=(i=this.list).length;e<t;e++)i[e].selected=void 0;return this.checked=[],this.removed=[],"function"==typeof this.onClear?this.onClear():void 0},selectAll:function(e,t){var i,r,s,a,n;for(i=t?o.add:o.remove,n=[],r=0,a=e.length;r<a;r++)s=e[r],n.push(i(s));return n},set:function(e){return e.selected?this.remove(e):this.add(e)},add:function(e){if(e)return e.selected=!0,o.checked.push(e),o.removed.remove(e),o.prepare(),o.atual=void 0},remove:function(e){if(e)return o.checked.remove(e),o.removed.push(e),e.selected=void 0,o.prepare(),o.atual=void 0},setup:function(){var e,i,t,r,s,a;if(this.clear(),"function"==typeof this.onSetup&&this.onSetup(),a=("function"==typeof this.getParams?this.getParams():void 0)||{},!isBlank(this.paramsKey||isBlank(a))){for(e=0,s=(r=angular.copy(a[this.paramsKey]||[])).length;e<s;e++)i=r[e],(t=this.list.find(function(t){return function(e){return""+e[t.listItemKey]==""+i}}(this)))&&this.add(t);return this.prepare()}},prepare:function(){var e,t,i,r,s;if(r=("function"==typeof this.getParams?this.getParams():void 0)||{},!isBlank(this.paramsKey||isBlank(r))){for(r[this.paramsKey]=[],e=0,i=(s=this.checked).length;e<i;e++)t=s[e],r[this.paramsKey].push(""+t[this.listItemKey]);return r[this.paramsKey]=r[this.paramsKey].sort()}}}}}])}).call(this);
