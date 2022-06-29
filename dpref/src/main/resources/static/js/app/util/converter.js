class Converter {
	
	static toSimpleClassname(className) {
		
		if(!className){
			return;
		}
        
        var split = className.split(".");
        
        return split[split.length - 1];
    }
	
	static toLabel(node, settings) {
		
		if (!settings.showNodeLabels) {
			return "#" + node.id;
		}
		
		let source = node.refactoring.source;
		let target = node.refactoring.target;
		
		if (settings.useSimpleClassnames) {
			source = Converter.toSimpleClassname(source);
			target = Converter.toSimpleClassname(target);
		}
		
		return [
			"#" + node.id,
			node.refactoring.type,
			source,
			target,
			node.refactoring.fields,
			node.refactoring.methods,
			node.refactoring.states,
		].join('\n');
    }
	
	static metrics(metricName){
		let pValue =  this.evalutionResult.previous[metricName];
		let nValue =  this.evalutionResult.current[metricName];
		let diff = (nValue - pValue).toFixed(2);
		console.log(metricName, diff)
	}
	
	static graphToVis (id, graph) {
		
		let nodes = [];
		let edges = [];
		
		graph.nodes.forEach( (node) => {
			nodes.push({
				id: node.id, 
				label: node.label,
				shape: 'box',
				refactoring: node.refactoring,
				subgraph: node.subgraph,
				status: node.status,
				metrics: node.metrics,
				color: {
		            border: node.borderColor,
		            background: node.backgroundColor,
				},
				widthConstraint: { 
					minimum: 90,
					maximum: 90 
				},
				heightConstraint: { 
					maximum: 50 
				}
			});
		})
		
		graph.edges.forEach( (edge) => {
			edges.push({
				from: edge.source,
				to: edge.target,
				direction: edge.direction,
				color: edge.color,
				label: edge.label,
				type: edge.type,
				hidden: false,
				font: {size : 10},
				arrows: "to",
			});
		});
		
		return {
			id: id,
			name: graph.name,
			visible: true,
			metrics: graph.metrics,
			nodes: nodes,
			edges: edges
		}
	}
	
	static toVis(graphs) {
		
		let converted = [];
		
		graphs.forEach( (graph, i) => {
			converted.push(Converter.graphToVis(i, graph));
		});
		
		return converted;
	}
	
	static getClassnames(graphs){
		
		let classNames = [];
		
		graphs.forEach((graph) => {
		
			graph.nodes.forEach((node, j) => {
				
				let refactoring = node.refactoring;
				
				if (!classNames.includes(refactoring.source)) {
					classNames.push(refactoring.source);
				}
				
				if(refactoring.target){
					if (!classNames.includes(refactoring.target)) {
						classNames.push(refactoring.target);
					}
				}
			});
    	});
		
		classNames.sort();
	
		return classNames;
	}
}