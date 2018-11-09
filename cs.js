$(document).ready(init);

function mins(m) { return m * 60 * 1000; }
function hrs(h) { return mins(h * 60); }
function days(d) { return hrs(d * 24); }

function loadEvents(){
	var now = new Date();
	var ticks = now.getTime();
	    	
	console.log("EVENTS LOADING >> " + now.toString());
	$.ajax({ 
	    type:"GET", // GET = requesting data
	    url:"https://api.meetup.com/2/events?key=1fa5a50347b2c393b1565786a2ba1&group_urlname=syracusecoworks&sign=true", 
	    success: function(data) { 
	    	var curr = "";
	    	if (data && data.results && data.results.length > 0) {
				$("#events .event, #events .date").remove(); 
				for (var i=0;i<data.results.length;i++) {
	    			var evt = data.results[i];
	    			var title = evt.name;
	    			var tt = ticks - mins(30);
	    			var wt = ticks + days(7);
	    			if (evt.time > tt && evt.time <= wt) {
	    				var edt = new Date(evt.time);

	    				if (curr != ("" + edt.getMonth() + "" + edt.getDate() + "" + edt.getFullYear())) {
	    					var dtp = edt.toString().split(" ");
							var dts = dtp[0] + ", " + dtp[1] + " " + dtp[2];
	    					$("#events").append("<div class='date'>" + dts + "</div>")
	    					curr = "" + edt.getMonth() + "" + edt.getDate() + "" + edt.getFullYear();
	    				}

	    				var h = edt.getHours();
	    				var ap = (h < 12) ? "am" : "pm";
	    				h = (h > 12) ? h-12 : h;
	    				var m = edt.getMinutes();
	    				m = (m < 10) ? "0" + m : m;
	    				var ts = h + ":" + m + " " + ap;
	    				
	    				$("#events").append("<div class='event clearfix'><div class='evt_time'>" + ts + "</div><div class='evt_name'>" + title + "</div></div>");
	    			}
	    		}
	    	}
	    },
	    error: function(error, foo) {

	    },
	    dataType: 'jsonp'
	  });
}

function setDate() {
	var dt = new Date();
	var dts = "" + dt;
	var dtp = dts.split(" ");
	dts = dtp[0] + ", " + dtp[1] + " " + dtp[2];
	$("#header #dt").html(dts);
	loadEvents();
}

function init(){
	setInterval(setDate, mins(15));
	setInterval(function(){ location.reload(true); }, mins(15));
	setDate();
}
