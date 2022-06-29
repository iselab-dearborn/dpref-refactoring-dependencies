class Sidebar {
	
	constructor (el) {
		
		let that = this;
		this.emitter = {};
		
		this.$el = $(el);
		
		this.$template = $(this.template());
		this.$title = this.$template.find(".card-header");
		this.$items = this.$template.find(".list-group");
		
		this.$el.empty();
		this.$el.html(this.$template);
		this.$items.on("click", ".list-group-item", function() {
			
			let value = $(this).data("value");
			
			that.selectedItem = that.findByValue(value);
			
			that.update();
			
			that.fire("click", that.selectedItem);
		});
		
		this.title = "Subgraphs";
		
		this.empty();
		
		this.update();
	}
	
	findByValue (value) {
		
		for (var i in this.items) {
		
			if (this.items[i].value == value) {
				return this.items[i]
			}
		}
	}
	
	empty () {
		this.items = [];
		this.selectedItem = undefined;
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
	
	update () {
		
		this.$title.html(this.title);
		
		this.$items.empty();
		
		$.each(this.items, (i, el) => {
			if (el.visible) {
				this.$items.append(`<li class="list-group-item list-group-item-action" data-value="${el.value}">${el.name}</li>`)
			}
		});
		
		if (this.selectedItem) {
			this.$items.find(`.list-group-item[data-value="${this.selectedItem.value}"]`).addClass("active")
		} else {
			this.$items.find(`.list-group-item:first`).addClass("active")
		}
	}
	
	template () {
		
		return  `
			<div class="sidebar">
				<div class="card" >
			        <div class="card-header">Subgraphs</div>
			        <ul class="list-group list-group-flush scroll">
			        </ul>
			    </div>
			</div>
		`;
	}
	
	fire (event, data){
		
		$.each(this.emitter[event], (i, callback) => {
			if (callback) {
				callback(data)
			}
		});
	}
	
	on (event, callback = () => {}){
		
		if (!event) {
			throw new Error("Event must no be undefined");
		}
		
		if (!this.emitter[event]) {
			this.emitter[event] = [];
		}
		
		this.emitter[event].push(callback);
	}
}