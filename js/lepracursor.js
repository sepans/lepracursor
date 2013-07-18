
lepraCursor = function() { 
	    var curi = 1;
	    var cursor = $('#cursor');
	    var cleartime;
	    
	    console.log('cursor');
	
	
	
        var width = 4000,
            height = 4000;


        // mouse event vars
        var dragged = null,
            selected_node = null,
            selected_link = null,
            mousedown_link = null,
            mousedown_node = null,
            mouseup_node = null;


        var force, svg, nodes, links, node, link;
        // init force layout

        setup();


        function setup() {
        
            $('body *, body, a').css({cursor: 'none'});

            $('a').click(function () {
                    var reproduce = Math.min(20, nodes.length*nodes.length/2);
                for(var i=0;i<reproduce;i++) {
                    addnode();
                }
               // console.log('click'); 
                return false;
            });


             force = d3.layout.force()
                .size([width, height])
                .nodes([{x:width/2,y:height/2}]) // initialize with a single node
                .linkDistance(10)
                .charge(-50)
                .on("tick", tick);

            // init svg
             svg = d3.select("#cursor").append("svg")
                .attr("width", width)
                .attr("height", height);
  

            // get layout properties
             nodes = force.nodes(),
                links = force.links(),
                node = svg.selectAll(".node"),
                link = svg.selectAll(".link");



            redraw();

            // focus on svg?
            //svg.node().focus();
        }

        function addnode() {
            var node = {x: width/2+ Math.floor(Math.random()*10), y: height/2+ Math.floor(Math.random()*10)},
              n = nodes.push(node);

            // select new node
            selected_node = node;
            selected_link = null;
    
            var index = Math.floor(Math.random()*nodes.length);
            mousedown_node= nodes[index];
    
            links.push({source: mousedown_node, target: node});


          redraw();
        }



        function resetMouseVars() {
          dragged = null;
          mousedown_node = null;
          mouseup_node = null;
          mousedown_link = null;
        }

        function tick() {
          link.attr("x1", function(d) { return d.source.x; })
              .attr("y1", function(d) { return d.source.y; })
              .attr("x2", function(d) { return d.target.x; })
              .attr("y2", function(d) { return d.target.y; });

          node.attr("x", function(d) { return d.x; })
              .attr("y", function(d) { return d.y; });
        }

        // redraw force layout
        function redraw() {

          link = link.data(links);

          link.enter().insert("line", ".node")
              .attr("class", "link")
              .on("mousedown", 
                function(d) { 
                    console.log('mouse down link');
                  mousedown_link = d; 
                  selected_link = d; 
                  selected_node = null; 
                  redraw(); });

          link.exit().remove();

          link
            .classed("link_selected", function(d) { return d === selected_link; });

          node = node.data(nodes);
  
  
  
         node.enter().insert("image")
                        .attr("xlink:href", "img/cursor.png")
                        .attr("width", "15")
                        .attr("height", "24")
                        .on("mousedown", 
                            function(d) { 
                                console.log('mouse down node');
                              mousedown_node = d;
                              selected_node = d; 
                              selected_link = null; 
                              redraw(); 
                            })
                          .on("mouseup", 
                            function(d) { 
                                        console.log('mouse up link');

                              selected_node = d;
                              mouseup_node = d; 
                              redraw(); 
                            });
  

          if (d3.event) {
            // prevent browser's default behavior
            d3.event.preventDefault();
          }

          force.start();

        }
    
	    cursorAni = function() {
	     // console.log('cursor ani');
	     // curi = curi < 22 ? curi + 1 : 1;
	     // cursor.css('background-position', '0 ' + curi * 198 + 'px');
	    };

	    $("html").mousemove(function(e) {
	        cursor.css({
	            top: (e.pageY)-height/2-5,
	            left: (e.pageX - width/2 -5)
	        });
	    });
	    
	    $("html").mouseover(function(e) {
	    
	        cursor.show();
	    });
	    $("html").mouseout(function(e) {
	    
	        cursor.hide();
	    });

	    $("a, img").hover(function() {
	        cursorAni();
	    },
	    
	    	function() {
	        	cursorAni();
	    });
    
};
