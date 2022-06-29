class ColorUtils {
	
	static get GREEN(){
		return "#90ed7d" 
	}
	
	static get ORANGE(){
		return "#f7a35c" 
	}
	
	static get LIGHT_GREEN(){
		return ColorUtils.lightenDarkenColor(ColorUtils.GREEN, 40);
	}
	
	static get LIGHT_ORANGE(){
		return ColorUtils.lightenDarkenColor(ColorUtils.ORANGE, 40);
	}
	
	
	static getColor(node, metricNames) {
		
		if (metricNames.length == 0) {
			return ColorUtils.getDefaultColor();
		}
		
		let result = [];
		
		for (var i = 0; i < metricNames.length; i++){
			
			let metricName = metricNames[i];
			
			let pValue =  node.metrics.previous[metricName];
			let nValue =  node.metrics.current[metricName];
			
			let diff = (nValue - pValue);
			
			result.push(diff > 0);
		}
		
		let value = result.reduce((acc, value) => acc && value);
		
		if (value) {
			return {
				background: ColorUtils.LIGHT_GREEN,
				border: ColorUtils.GREEN
			}
		} else {
			return {
				background: ColorUtils.LIGHT_ORANGE,
				border: ColorUtils.ORANGE
			}
		}
    }
	
	static getDefaultColor(){
		
		return {
			background: "#8cbafc",
			border: "#5492ef"
		};
	}
	
	static lightenDarkenColor(col, amt) {
		  
	    var usePound = false;
	  
	    if (col[0] == "#") {
	        col = col.slice(1);
	        usePound = true;
	    }
	 
	    var num = parseInt(col,16);
	 
	    var r = (num >> 16) + amt;
	 
	    if (r > 255) r = 255;
	    else if  (r < 0) r = 0;
	 
	    var b = ((num >> 8) & 0x00FF) + amt;
	 
	    if (b > 255) b = 255;
	    else if  (b < 0) b = 0;
	 
	    var g = (num & 0x0000FF) + amt;
	 
	    if (g > 255) g = 255;
	    else if (g < 0) g = 0;
	 
	    return (usePound?"#":"") + (g | (b << 8) | (r << 16)).toString(16);
	  
	}
}