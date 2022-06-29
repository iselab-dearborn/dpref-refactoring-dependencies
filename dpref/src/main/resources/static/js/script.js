var $window;
var $inputForm;
var $settingsForm;
var $filtersForm;
var $filterByMetrics;
var $filterByClassnames;
var $colorsBasedOnMetrics;
var $contextMenu;
var $btnRemoveNode;

var $graph;

var sidebar;
var toolbox;
var inputEditor = null;
var graphs = null;
var network = null;
var ignoreNodeList = [];

var alertBox= new Alert();

var graphHeight;

function getInputForm(){
	
	return {
		projectName: $inputForm.find(`input[name="projectName"]`).val(),
    	refactorings: inputEditor.getValue().split("\n"),
    	generator: $inputForm.find("#generator").val(),
    	ignoreNodeList: ignoreNodeList,
    	calculateMetrics: $inputForm.find("input[name='calculateMetrics']").is(':checked'),
    };
}

function getSettingsForm(){
	
	return {
		useGroupSequenceLayout: $settingsForm.find("#useGroupSequenceLayout").is(':checked'),
		usePhysics: $settingsForm.find("#usePhysics").is(':checked'),
		useSimpleClassnames: $settingsForm.find("#useSimpleClassnames").is(':checked'),
		ignoreSubgraphWithNotEdges: $settingsForm.find("#ignoreSubgraphWithNotEdges").is(':checked'),
		showEdgeLabels: $settingsForm.find("#showEdgeLabels").is(':checked'),
		showNodeLabels: $settingsForm.find("#showNodeLabels").is(':checked'),
		mergeEdges: $settingsForm.find("#mergeEdges").is(':checked'),
		useInvertedArrows: $settingsForm.find("#useInvertedArrows").is(':checked'),
		showPercentage: $settingsForm.find("#showPercentage").is(':checked'),
    };
}

function getFiltersForm(){
	
	return {
		ignoreSubgraphWithNotEdges: $filtersForm.find("#ignoreSubgraphWithNotEdges").is(':checked'),
		byMetrics: $filtersForm.find("#filterByMetrics").val(),
		byClassname: $filtersForm.find("#filterByClassnames").val(),
		useColorsBasedOnMetrics: $filtersForm.find("#useColorsBasedOnMetrics").is(':checked')
    };
}

function destroy(net) {
    
	if (net !== null) {
		net.destroy();
    }
    
    return null;
}

function clearGroupSequenceLayou(graph){
	
	graph.nodes.forEach( (node) => {
		delete node.x;
		delete node.y;
	});
	
	graph.edges.forEach( (edge) => {
        delete edge.smooth;
    });
}

function drawVis (graph, settings) {
	
	network = destroy(network);
	
	if (settings.useGroupSequenceLayout) {
		
		let layout  = new GroupSequence({
			horizontalSpacing: 200,
			groupNodeBy: "subgraph",
		});

		graph = layout.process(graph);
	} else {
		clearGroupSequenceLayou(graph);
	}
	
	const nodes = new vis.DataSet(graph.nodes);
	const edges = new vis.DataSet(graph.edges);
			
	var options = {
		height: graphHeight+ "px",
		interaction: {
	  		tooltipDelay: 120,
            hover: true,
            navigationButtons: true,
            hoverConnectedEdges: true,
            selectConnectedEdges: true
        },
        physics: settings.usePhysics,
        edges: {
        	font: {
        		size: 8,
        		color: "black"
        	},
        },
        nodes: {
        	size: 30,
        	font: {
        		size: 8,
        		color: "black"
        	},
        },
    };
  
  	network = new vis.Network($graph[0], { nodes: nodes, edges: edges }, options);
  	
  	network.fit();
  	
  	network.on( 'click', function(properties) {
  		
  		var ids = properties.nodes;
  		
  		if (ids.length == 0) {
  			// The user didn't click in a node
  			return;
  		}
  		
  		var clickedNode = nodes.get(ids)[0];
  		
  	    toolbox.setEvaluationResult(clickedNode.metrics);
  	});
  	
  	network.on("click", function (params) {
  		$contextMenu.hide();
  	});
  	
  	network.on("oncontext", function (params) {
  		params.event.preventDefault();
  		
  		$contextMenu.hide();
  		
  		let nodeId = network.getNodeAt(params.pointer.DOM);
  		
  		if (nodeId == undefined) {
  			return;
  		}
  		
  		var clickedNode = nodes.get(nodeId);
  		
  		toolbox.setEvaluationResult(clickedNode.metrics);
  		
  		$btnRemoveNode.data("nodeId", clickedNode.id);
  		
  		$contextMenu
  			.css({
    	      left: params.event.pageX,
    	      top: params.event.pageY
  			})
  			.show("fade");
  	});
}

function mergeAll(graphs){
	
	let nodes = [];
	let edges = [];
	let metrics = {
		current: {},
		previous: {}
	};
	
	graphs.forEach((graph) => {
		
		if (!graph.visible) {
			return;
		}
		
		graph.nodes.forEach((node, j) => {
			nodes.push(node);
		});
		
		graph.edges.forEach((edge, j) => {
			edges.push(edge)
		});
		
		for (var i in graph.metrics.current) {
			
			if (!metrics.current[i]) {
				metrics.current[i] = graph.metrics.previous[i];
			}
			
			let diff = graph.metrics.current[i] - graph.metrics.previous[i]
			
			metrics.current[i] += diff
		}
		
		for (var i in graph.metrics.previous) {
			metrics.previous[i] = graph.metrics.previous[i];
		}
	});
	
	return {
		metrics: metrics,
		nodes: nodes,
		edges: edges
	}
}

function applyFilters(graphs, filters){
	
	graphs.forEach((graph) => {
		
		let byNoEdges = Filter.ignoreSubgraphWithNotEdges(graph, filters.ignoreSubgraphWithNotEdges);
		let byMetrics = Filter.isVisibleByMetrics(graph, filters.byMetrics);
		let byClassname = Filter.isVisibleByClassname(graph, filters.byClassname);
		
		graph.visible = byNoEdges && byMetrics && byClassname;
		
		sidebar.visible(graph.id, graph.visible);
	});
	
	return graphs;
}

function applySettings(graph, filters, settings){
	
	console.log(filters.byMetrics)
	
	graph.nodes.forEach((node) => {
		
		node.label = Converter.toLabel(node, settings);
		
		if (node.status == "valid") {
			
			if (filters.useColorsBasedOnMetrics) {
				node.color = ColorUtils.getColor(node, filters.byMetrics)
			} else {
				node.color = ColorUtils.getDefaultColor()
			}
		}
	});
	
	let edgesGroup = {}

	graph.edges.forEach((edge) => {
		
		edge.hidden = false;
		edge.font.size = settings.showEdgeLabels ? 10 : 0;
		
		let key = edge.type + "_" + edge.from + "_" + edge.to;
		
		if (edgesGroup[key]) {
			if (settings.mergeEdges) {
				edge.hidden = true;
			}
		} else {
			edgesGroup[key] = edge;
		}
		
		if (edge.direction == "both") {
			edge.arrows = undefined;
		} else {
			if (settings.useInvertedArrows) {
				edge.arrows = "from";
			} else {
				edge.arrows = "to";
			}
		}
	});
	
	return graph;
}

function openSubgraph(selectedItem = {value: -1}, callback = () => {}){
	
	let filters = getFiltersForm();
	
	graphs = applyFilters(graphs, filters);

	let subgraph;
	
	if (selectedItem.value == -1) {
		subgraph = mergeAll(graphs);
	} else {
		subgraph = graphs[selectedItem.value];
	}
	
	let settings = getSettingsForm();
	
	subgraph = applySettings(subgraph, filters, settings);
	
	toolbox.showPercentage = settings.showPercentage;
	
	toolbox.setEvaluationResult(subgraph.metrics);
	
	if ($("#modal-output").find("#graph").length != 0) {
		if ($('#modal-output').is(':visible')) {
			drawVis(subgraph, settings);
		} else {
			
			$('#modal-output').on('shown.bs.modal', function() {
				drawVis(subgraph, settings);
	    	});
			
	    	$('#modal-output').modal('show');
		}
	} else {
		drawVis(subgraph, settings);
	}
}

function generateDependencyGraph(){
	
	var params = getInputForm();
	
	console.log("Generating dependency graph for ", params);
	
	$.ajax({
        type: "POST",
        url: `/graph/generate`,
        contentType : 'application/json',
        data: JSON.stringify(params),
    }).done(function(response) {
    	openGraph(response.data);
    }).fail(function(error) {	
    	alertBox.error(error.responseText);
    });
}

function openGraph(data){
	
	graphs = data;
	
	console.log("Graph received ", graphs);
	
	graphs = Converter.toVis(graphs);
	
	sidebar.empty();
	
	sidebar.add(-1, "All");
	
	graphs.forEach((graph) => {
		sidebar.add(graph.id, graph.name, graph.visible);
	});
	
	sidebar.update();
	
	SelectUtils.update($filterByClassnames, Converter.getClassnames(graphs));
	
	openSubgraph();
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}


function loadExample(file, autoGenerate=false){

    if (file == "random") {
        file = "random/"+projects[getRandomInt(projects.length)];
        $inputForm.find("input[name='calculateMetrics']").prop( "checked", false );
    }
    
    $.ajax({
        type: "GET",
        url: `/examples/${file}`
    }).done(function(response) {
    	inputEditor.setValue(response, -1);
    	
    	if (autoGenerate) {
    	   generateDependencyGraph();
    	}
    	
    }).fail(function(error) {	
    	alertBox.error(error);
    });
}

var getUrlParameter = function getUrlParameter(sParam) {
    
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
};

function resize(height){
	
	graphHeight = height;
	
	$(".sidebar .list-group").css("max-height", graphHeight - 49+ "px");
	$(".right-sidebar .tab-content").css("max-height", graphHeight - 60 + "px");
}

$(function(){
	
	$window = $(window);
	$inputForm = $("#inputForm");
	$settingsForm = $("#settingsForm");
	$filtersForm = $("#filtersForm");
	$contextMenu = $("#context-menu");
	$btnRemoveNode = $("#btn-remove-node");
	
	$filterByMetrics = $filtersForm.find("#filterByMetrics");
	$filterByClassnames = $filtersForm.find("#filterByClassnames");
	$ignoreNodes = $filtersForm.find("#ignoreNodes");
	$colorsBasedOnMetrics = $filtersForm.find("#colorsBasedOnMetrics");
	
	$graph = $("#graph");
	
	$('select').selectpicker();
	
	$("input[name=projectName]").val("grocery");
	
	if ($("#inputEditor").length != 0) {
		inputEditor = ace.edit("inputEditor");
		inputEditor.setShowPrintMargin(false);
		inputEditor.setFontSize("14px");
		inputEditor.textInput.getElement().id = "refactorings";
	}
	
	SelectUtils.updateGroup($filterByMetrics, Metrics.getAll());
	
	sidebar = new Sidebar("#my-sidebar");
	sidebar.on("click", (selectedItem) => {
		openSubgraph(selectedItem);
	});
	
	toolbox = new Toolbox("#myToolbox");
	
	if ($("#modal-output").find("#graph").length != 0) {
		
		$('#modal-output').on('shown.bs.modal', function() {
			resize($(".modal-footer").offset().top - $graph.offset().top - 40);
		});
	}else{
		resize(400);
	}
	
	toolbox.addCategory("Quality Attributes", Metrics.getQualityAttributes());
	toolbox.addCategory("Design Metrics ", Metrics.getDesignMetrics());
	toolbox.addCategory("Security Metrics ", Metrics.getSecurityMetrics());
	
	// ------------------------------------------------------ //
	// Hide collapsible Bootstrap 4 navbar on click
	// ------------------------------------------------------ //

	$('.navbar-nav>li>a').on('click', function(){
		
		if(!$(this).hasClass("dropdown-toggle")){
			 $('.navbar-collapse').collapse('hide');
		}
	});
	
	$('.navbar-nav .dropdown-item').not(".dropdown-toggle").on('click', function(){
		$('.navbar-collapse').collapse('hide');
	});
	
	// ------------------------------------------------------ //
	// Multi Level dropdowns
	// ------------------------------------------------------ //
	
	$(".navbar ul.dropdown-menu [data-toggle='dropdown']").on("click", function(event) {
		event.preventDefault();
		event.stopPropagation();
		
		$(".navbar .dropdown-menu").find('.show').removeClass("show");
		
		$(this).siblings().toggleClass("show");
		
		if (!$(this).next().hasClass('show')) {
			$(this).parents('.dropdown-menu').first().find('.show').removeClass("show");
		}
		
		$(this).parents('li.nav-item.dropdown.show').on('hidden.bs.dropdown', function(e) {
			$('.dropdown-submenu .show').removeClass("show");
		});
	});
	
	// ------------------------------------------------------ //
	// Load example file when an .example is clicked
	// ------------------------------------------------------ //
	
	$(".navbar .dropdown-menu .example").click(function(event){
		
		var projectName = $(this).data("project-name");
		var file = $(this).data("file");
		
		$("input[name=projectName]").val(projectName);
		
		loadExample(file);
	});
	
	$( ".navbar .dropdown-menu .example" ).eq(2).trigger( "click" )
	
	$inputForm.submit(function(event){
		event.preventDefault();
		
		generateDependencyGraph();
		
		return false;
	});
	
	$settingsForm.on("change", ":input", function(){
		openSubgraph(sidebar.selectedItem);
	});
	
	$filtersForm.on("change", ":input", function(){
		openSubgraph(sidebar.selectedItem);
	});
	
	$btnRemoveNode.click(function(event){
		event.preventDefault();
		
		let nodeId =  $("#btn-remove-node").data("nodeId");
			
		ignoreNodeList.push(nodeId);
		
		$contextMenu.hide();
		
		generateDependencyGraph();
		
		return false;
	});
	
	$filterByMetrics.change(function() {
		
		let selectedMetrics = $filtersForm.find("#filterByMetrics").val();
		
		if (selectedMetrics.length == 0) {
			$filtersForm.find("#useColorsBasedOnMetrics").prop('checked', '')
		} else if(selectedMetrics.length == 1) {
			$filtersForm.find("#useColorsBasedOnMetrics").prop('checked', 'checked')
		} 
		
		$filtersForm.find("#useColorsBasedOnMetrics").trigger("change");
	});
	
	
	
	var autoGenerate = getUrlParameter('autoGenerate');
	var instance = getUrlParameter('instance');
	
	if(instance) {
	
	//http://localhost:8081/?instance=mcrius.Diplom&autoGenerate=true
	   console.log(instance)
	   
	   
	   loadExample("random/"+instance+".txt", autoGenerate && autoGenerate === "true");
	}  
	
});