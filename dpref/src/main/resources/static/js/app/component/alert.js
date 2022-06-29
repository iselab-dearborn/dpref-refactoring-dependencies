class Alert {
	
	showAlert(type, title, content) {
		
		$.toast({
			title: title,
			content: content,
			type: type,
			delay: 2000
		});
	}
	
	error(error){
		
		error = JSON.parse(error);
		
		this.showAlert("danger", "Error", error.message);
	}
}