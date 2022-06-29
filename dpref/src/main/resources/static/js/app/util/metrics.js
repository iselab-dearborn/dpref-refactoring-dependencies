class Metrics {
	
	static getTypes(){
		
		return [
			"Quality Attributes",
			"Design Metrics",
			"Security Metrics"
		];
	}
	
	static getSecurityMetrics() {
		
		return [
			"Classified Accessor Attribute Interactions",
			"Classified Instance Data Accessibility",
			"Classified Operation Accessibility",
			"Classified Methods Weight",
			"Vulnerable Association of a Class",
			"Classified Class Data Accessibility",
			"Classified Mutator Attribute Interactions",
			"Classified Attributes Interaction Weight"
		];
    }
	
	static getQualityAttributes() {
		
		return [
			"Effectiveness",
			"Extendibility",
			"Flexibility",
			"Functionality",
			"Reusability",
			"Understandability"
		];
    }
	
	static getDesignMetrics() {
		
		return [
			"Abstraction",
			"Complexity",
			"Cohesion",
			"Composition",
			"Coupling",
			"Design Size",
			"Encapsulation",
			"Hierarchies",
			"Inheritance",
			"Messaging",
			"Polymorphism"
		];
	}
	
	static getAll(){
		
		return {
			"Quality Attributes" : Metrics.getQualityAttributes(),
			"Design Metrics": Metrics.getDesignMetrics(),
			"Security Metrics": Metrics.getSecurityMetrics()
		}
	}
}