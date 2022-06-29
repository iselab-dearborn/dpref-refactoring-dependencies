class SelectUtils {
	
	static setVisible($select, visible = true){
		
		if (visible) {
			$select.prop("disabled", "");
		} else {
			$select.prop("disabled", "disabled");
		}
		
		$select.selectpicker('refresh');
	}
	
	static update($select, elements = []) {
		
		if (!$select) {
			throw new Error("$select should not be undefined");
		}
		
		$select.empty();
		
		elements.forEach(el => {
			$select.append(`<option value="${el}">${el}</option>`)
		});
		
		$select.selectpicker('refresh');
    }
	
	static updateGroup($select, elements = {}) {
		
		if (!$select) {
			throw new Error("$select should not be undefined");
		}
		
		$select.empty();
		
		for (let prop in elements) {
		
			let rows = [`<optgroup label="${prop}">`];
			
			elements[prop].forEach(el => {
				rows.push(`<option value="${el}">${el}</option>`)
			});
			
			rows.push(`</optgroup>`);
			
			$select.append(rows.join(""));
		}
		
		$select.selectpicker('refresh');
    }
}