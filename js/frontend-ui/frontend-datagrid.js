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
			this.opts.data = {dataList:[{username:'qya',email:'qya.com'}]};
			this.opts.bodytmpl =$.templates(this.opts.template.html().toString().replace(/&gt;/ig,">"));
			$('.frontendui-widget-content', renderResult).html(this.opts.bodytmpl.render(this.opts.data.dataList||[]));
		},
		_renderGrid : function(target) {
			var that = this;
			var p = this.element.parent();
			var thead = target.find("thead");
			var grid = $('<div class="frontendui-grid"></div>').append(target).appendTo(p);
			grid.append( 
				'<div class="frontendui-grid">' +
					'<div class="frontendui-grid-view">' +
						'<div class="frontendui-grid-titlebar frontendui-grid-header frontendui-corner-top frontendui-helper-clearfix">' +
							'<div class="frontendui-state-default frontendui-grid-thead">' +
								'<div class="frontendui-grid-theadbox">' +
									'<table class="frontendui-grid-htable" cellspacing="0" cellpadding="0" border="0" >' +
										
									'</table>' +
								'</div>' +
							'</div>' +
						'</div>' +
						'<div class="frontendui-grid-container">' +
							'<div class="frontendui-widget-content frontendui-row-ltr frontendui-priority-secondary">' +
							'</div>' +
							'<div class="frontendui-grid-hidebody"></div>' +
						'</div>' +
					'</div>' +
				'</div>'
			);
			 thead.find("tr").each(function(){
                    var $tr =$("<tr>");
                    $(this).find("th").each(function(i, e){
                    	$(this).addClass("frontendui-state-default frontendui-th-column frontendui-th-ltr");
                    	$(this).appendTo($tr);
                    });
                    $tr.appendTo(grid.find(".frontendui-grid-htable"));
            });
			this.opts.template.find("td").each(function(i,e){   
            	$(e).width($(".frontendui-th-column",grid).eq(i).width());
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