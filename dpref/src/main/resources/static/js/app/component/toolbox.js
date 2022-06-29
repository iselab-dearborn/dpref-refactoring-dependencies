class Toolbox {
	
	constructor (el) {
		
		let that = this;
		this.emitter = {};
		
		this.$el = $(el);
		
		this.$template = $(this.template());
		this.$content = this.$template.find(".content");
		
		this.$el.empty();
		this.$el.html(this.$template);
		
		this.categories = [];
		this.showPercentage = false;
		
		this.reset();
		this.update();
	}
	
	reset(){
		this.evalutionResult = undefined;
	}
	
	findByValue (value) {
		
		for (var i in this.items) {
		
			if (this.items[i].value == value) {
				return this.items[i]
			}
		}
	}
	
	add (value, name, visible = true) {
		
		this.items.push({
			value: value,
			name: name,
			visible: visible
		});
	}
	
	visible (value, visible){
		let item = this.findByValue(value)
		
		item.visible = visible;
		
		if (this.selectedItem == item && !visible) {
			this.selectedItem = undefined;
		}
		
		this.update();
	}
	
	setEvaluationResult(evalutionResult){
		
		this.evalutionResult = evalutionResult;
		
		this.update();
	}
	
	update () {
		
		let that = this;
		
		this.$content.empty();
		
		if (!this.evalutionResult) {
			return;
		}
		
		this.categories.forEach((category) => {
			that.updateGroup(category.name, category.values);
		});
	}
	
	updateGroup (title, values) {
		
		let that = this;
		
		let rows = '';
		
		$.each(values, (i, el) => {
			
			let pValue =  that.evalutionResult.previous[el];
			let nValue =  that.evalutionResult.current[el];
			let diff = (nValue - pValue);
			let percentage = ((nValue - pValue) / nValue) * 100;
			
			let value = diff.toFixed(2);
			
			if (that.showPercentage) {
				value = percentage.toFixed(2) + "%"
			}
			
			let color = "";
			let icon = that.getNoArrow();
			let title = `PV: ${pValue}, CV: ${nValue}, D: ${diff}`;
			
			if (diff > 0){
				color = "text-success";
				icon = that.getUpArrow();
			} else if (diff < 0) {
				color = "text-danger";
				icon = that.getDownArrow();
			}
			
			rows += `
				<tr>
			      <td>${el}</td>
			      <td class="${color}" title="${title}">
			      ${value}${icon}
			      </td>
			    </tr>
			`;	
		});
		
		that.$content.append(`<p class="font-weight-bold">${title}</p>`);
		
		that.$content.append(`
			<table class="table table-sm">
				<tbody>${rows}</tbody>
			</table>
		`);
	}
	
	getNoArrow(){
		
		return `
			<svg class="bi bi-x" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
			</svg>
		`;
	}
	
	getUpArrow(){
		
		return `
			<svg class="bi bi-arrow-up" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
			  <path fill-rule="evenodd" d="M8 3.5a.5.5 0 01.5.5v9a.5.5 0 01-1 0V4a.5.5 0 01.5-.5z" clip-rule="evenodd"/>
			  <path fill-rule="evenodd" d="M7.646 2.646a.5.5 0 01.708 0l3 3a.5.5 0 01-.708.708L8 3.707 5.354 6.354a.5.5 0 11-.708-.708l3-3z" clip-rule="evenodd"/>
			</svg>	
		`;
	}
	
	getDownArrow(){
		
		return `
			<svg class="bi bi-arrow-down" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
			  <path fill-rule="evenodd" d="M4.646 9.646a.5.5 0 01.708 0L8 12.293l2.646-2.647a.5.5 0 01.708.708l-3 3a.5.5 0 01-.708 0l-3-3a.5.5 0 010-.708z" clip-rule="evenodd"/>
			  <path fill-rule="evenodd" d="M8 2.5a.5.5 0 01.5.5v9a.5.5 0 01-1 0V3a.5.5 0 01.5-.5z" clip-rule="evenodd"/>
			</svg>	
		`;
	}
	
	template () {
		
		return  `
			<div class="toolbox">
				<div class="content">
				
				</div>
			</div>
		`;
	}
	
	addCategory (name, values = []){
		this.categories.push({
			name: name,
			values: values
		});
	}
}