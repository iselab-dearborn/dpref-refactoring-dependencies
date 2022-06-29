class Filter {
	
	static isVisibleByMetrics (graph, filters, operator = "AND") {
		
		if (filters.length == 0) {
			return true;
		}
		
		let result = [];
		
		for (var i = 0; i < filters.length; i++){
			
			let filter = filters[i];
			
			let pValue =  graph.metrics.previous[filter];
			let nValue =  graph.metrics.current[filter];
			
			let diff = (nValue - pValue);
			
			result.push(diff > 0);
		}
		
		if (operator === "AND") {
			return result.reduce((acc, value) => acc && value);
		} else if (operator === "OR") {
			return result.reduce((acc, value) => acc || value);
		} else {
			throw new Error("The operator is not valid. Should be AND or OR");
		}
	}
	
	static isVisibleByClassname (graph, filters) {
		
		if (filters.length == 0) {
			return true;
		}
		
		for (var i = 0; i < graph.nodes.length; i++){
			
			let node = graph.nodes[i];
			
			let source = node.refactoring.source;
			let target = node.refactoring.target;
			
			if (filters.includes(source)) {
				return true;
			}
			
			if (filters.includes(target)) {
				return true;
			}
		}
		
		return false;
	}
	
	static ignoreSubgraphWithNotEdges (graph, ignore) {
		
		if (graph.edges.length == 0 && ignore){
			return false;
		}
		
		return true;
	}
}