(function($) {
	$.widget("frontendui.datagrid", {
		options : {
			frozenColumns : undefined,
			columns : undefined,
			fitColumns : false,
			resizeHandle : "right",
			autoRowHeight : true,
			toolbar : null,
			striped : false,
			method : "post",
			nowrap : true,
			idField : null,
			url : null,
			data : null,
			loadMsg : "Processing, please wait ...",
			rownumbers : false,
			singleSelect : false,
			selectOnCheck : true,
			checkOnSelect : true,
			pagination : false,
			pagePosition : "bottom",
			pageNumber : 1,
			pageSize : 10,
			pageList : [ 10, 20, 30, 40, 50 ],
			queryParams : {},
			sortName : null,
			sortOrder : "asc",
			multiSort : false,
			remoteSort : true,
			showHeader : true,
			showFooter : false,
			scrollbarSize : 18,
		},
		_create : function() {
			this.selectedItems = [];
			var that = this;
			var target = this.element;
			this.opts = $.extend(this.options, {
				width : (parseInt(this.element.css('width')) || 'auto'),
				height : (parseInt(this.element.css('height')) || 'auto'),
				template : $("tbody", this.element).clone().find("tr").attr("frontendui-grid-row-index", "{{:#index}}").end(),
				url : this.element.attr("url") || this.options
			});
			var renderResult = this._renderGrid(target);
			this.opts.data = {dataList:[{username:'qya',password:'111',email:'qya.com',address:'address'},
										{username:'qya1',password:'111',email:'qya.1com',address:'address1'},
										{username:'qy2',password:'111',email:'qya2.com',address:'address2'}
										]};
			this.opts.bodytmpl =$.templates(this.opts.template.html().toString().replace(/&gt;/ig,">"));
			$('.ui-jqgrid-btable tbody', renderResult).html(this.opts.bodytmpl.render(this.opts.data.dataList||[]));
		},
		_renderGrid : function(target) {
			var that = this;
			var p = this.element.parent();
			var thead = target.find("thead");
			var grid = $('<div></div>').append(target).appendTo(p);
			grid.append( 
				'<div class="ui-jqgrid ui-widget ui-widget-content ui-corner-all">' +
					'<div class="ui-jqgrid-view">' +
						'<div class="ui-jqgrid-titlebar ui-widget-header ui-corner-top ui-helper-clearfix">' +
							'<span class="ui-jqgrid-title">Sample jqGrid Table</span>'+
						'</div>' +
						'<div class="ui-state-default ui-jqgrid-hdiv">' +
							'<div class="ui-jqgrid-hbox">' +
								'<table class="ui-jqgrid-htable" cellspacing="0" cellpadding="0" border="0" >' +
									'<thead></thead>'+
								'</table>' +
							'</div>' +
						'</div>' +
						'<div class="ui-jqgrid-bdiv">' +
							'<div style="position:relative;">' +
								'<div/>'+
								'<table class="ui-jqgrid-btable" cellspacing="0" cellpadding="0" border="0" >' +
									'<tbody></tbody>'+
								'</table>' +
							'</div>' +
						'</div>' +
					'</div>' +
				'</div>'
			);
			 thead.find("tr").each(function(){
                    var $tr =$("<tr>");
					$tr.addClass("ui-jqgrid-labels");
                    $(this).find("th").each(function(i, e){
                    	$(this).addClass("ui-state-default ui-th-column ui-th-ltr");
                    	$(this).appendTo($tr);
                    });
                    $tr.appendTo(grid.find(".ui-jqgrid-htable thead"));
            });
			this.opts.template.find("td").each(function(i,e){   
            	$(e).width($(".ui-th-column",grid).eq(i).width());
            });
		},
		_init : function() {
			console.info("_init");
		},
		_trigger : function() {
			console.info("_trigger");
		},
		_refresh : function() {
			console.info("_refresh");
		},
		_destroy : function() {
			console.log('_destroy');
			// call the original destroy method since we overwrote it
			$.Widget.prototype.destroy.call(this);
		}
	});

})(jQuery, window, undefined);