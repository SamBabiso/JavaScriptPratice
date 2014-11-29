<!DOCTYPE html>
<html>
<head>
<script type="text/javascript" src="stateData.js"></script>
<link href="Mapstyles.css" rel="stylesheet" type="text/css" />
<link rel="stylesheet" href="mapPrinting.css" type="text/css" media="print" />
</head>
<body onLoad=start('http://localhost/ODPMI_XML_Data.xml')>
	<div id="tools_div">
		<form name="textForm">
			<button type="button" onClick=window.print()>Print</button>
			&nbspZoom: 
			<select id="zoomSelect" name="zoomSelect" onChange=zoom(document.textForm.zoomSelect.options[document.textForm.zoomSelect.selectedIndex].value)>
				<option selected value="1">1x
				<option value="2">2x
				<option value="4">4x
			</select>
			&nbspText Display:
			<select id="textFormSelect" name="textFormSelect" onChange=textSelect(document.textForm.textFormSelect.options[document.textForm.textFormSelect.selectedIndex].value)>
				<option value="0">No Text</option>
				<option value="1">Names</option>
				<option selected value="2">NameVals</option>
				<option value="3">Circles</option>
			</select>
			&nbspState Color:
			<select id="dd1" name="textFormSelect1" onChange=setStateColor(document.textForm.textFormSelect1.options[document.textForm.textFormSelect1.selectedIndex].value)>
			</select>
			&nbspState Value:
			<select id="dd2" name="textFormSelect2" onChange=setStateValue(document.textForm.textFormSelect2.options[document.textForm.textFormSelect2.selectedIndex].value)>
			</select>
			&nbspData File:
			<select id="dd3" name="dataFormSelect" onChange=dataChange(document.textForm.dataFormSelect.options[document.textForm.dataFormSelect.selectedIndex].value)>
				<option selected value="http://localhost/ODPMI_XML_Data.xml">http://localhost/ODPMI_XML_Data.xml</option>
				<option value="http://localhost/ODPMI_XML_Data2.xml">http://localhost/ODPMI_XML_Data2.xml</option>
			</select>
		</form>
	</div>
	<hr></hr>
	<div id="head">
		<hr></hr>
	</div>
	<hr></hr>
	<div class="grid">
	<div class="col1000 white" id="div1">
	  <!-- This is the start of the SVG section and is where all of the SVG elements will appear in the DOM -->
		<svg id="mapSvg" width="1000" height="600" viewBox="0 0 1000 600">
	    <defs>
				<!-- Define 9 hatch patterns. Each one will have a unique fill color assigned via JavaScript. -->
				<!-- The hatch patterns are used to differentiate the prototype states. This can probably be put in a loop, somehow. -->
				<pattern id="hatch0" width="10" height="10"  patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
					<rect x="0" y="0" width="10" height="10" />
					<line x1="0" y1="0" x2="0" y2="10" style="stroke:#555555; stroke-width:1;"/>
				</pattern>
				<pattern id="hatch1" width="10" height="10"  patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
					<rect x="0" y="0" width="10" height="10" />
					<line x1="0" y1="0" x2="0" y2="10" style="stroke:#555555; stroke-width:1;"/>
				</pattern>
				<pattern id="hatch2" width="10" height="10"  patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
					<rect x="0" y="0" width="10" height="10" />
					<line x1="0" y1="0" x2="0" y2="10" style="stroke:#555555; stroke-width:1;"/>
				</pattern>
				<pattern id="hatch3" width="10" height="10"  patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
					<rect x="0" y="0" width="10" height="10" />
					<line x1="0" y1="0" x2="0" y2="10" style="stroke:#555555; stroke-width:1;"/>
				</pattern>
				<pattern id="hatch4" width="10" height="10"  patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
					<rect x="0" y="0" width="10" height="10" />
					<line x1="0" y1="0" x2="0" y2="10" style="stroke:#555555; stroke-width:1;"/>
				</pattern>
				<pattern id="hatch5" width="10" height="10"  patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
					<rect x="0" y="0" width="10" height="10" />
					<line x1="0" y1="0" x2="0" y2="10" style="stroke:#555555; stroke-width:1;"/>
				</pattern>
				<pattern id="hatch6" width="10" height="10"  patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
					<rect x="0" y="0" width="10" height="10" />
					<line x1="0" y1="0" x2="0" y2="10" style="stroke:#555555; stroke-width:1;"/>
				</pattern>
				<pattern id="hatch7" width="10" height="10"  patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
					<rect x="0" y="0" width="10" height="10" />
					<line x1="0" y1="0" x2="0" y2="10" style="stroke:#555555; stroke-width:1;"/>
				</pattern>
				<pattern id="hatch8" width="10" height="10"  patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
					<rect x="0" y="0" width="10" height="10" />
					<line x1="0" y1="0" x2="0" y2="10" style="stroke:#555555; stroke-width:1;"/>
				</pattern>
			</defs>
			<!-- Define the groups where the SVG path, text and line elements will be rendered -->
			<!-- Turning the display attribute to none will make the group invisible in the HTML document -->
			<g id="paths" display="all"></g>
			<g id="circles" display="all"></g>
			<g id="namesNormal" display="all"></g>
			<g id="namesNormalSpecial" display="all"></g>
			<g id="namesSpecial" display="all"></g>
		</svg>
	</div>
	<div class="col100 grey" id="div2"></div>
	</div>
	<div class="clear"></div>
	<div id="Legend_div">
	  <p></p>
		<svg id="Legend"/>
	</div>
	<div>
	<hr></hr>
	</div>
	<div id="dataDiv">
	</div>
<script>
// Written by John Stoever and first released on 10/27/2014.
// OK. Wretched global variable declarations to get this prototype working. Re-factor these out over time
// but for now these stay.

// Set debug to true manually to follow some of the function calls. Not required but useful to see what calls what
// when manually debugging the state transitions used to set text display.
var debug = false;
// Display state variable tracks the current state of the document. Set to 0 for initial page load.
var displayState_gv = 0;
// The stateColor global variable is used to change the XML data column used to determine the state fill colors
var stateColor_gv;
// The stateValue global variable is used to change the XML data column used to determine the state value
var stateValue_gv;
// The XML path variable holds the URL of the currently selected XML data file
var xmlPath_gv;
// State variable to keep track of whether or not to display all or some of the states
var allStates_gv = true;

// Functions

// Add commas to a string representation of a number
function addCommas(number) {
		number += '';
		// Split into two numbers if there is a decimal point in it
		var x = number.split('.');
		// The integer digits
		var x1 = x[0];
		// The fractional digits or an empty string if none
		var x2 = (x.length > 1) ? '.' + x[1] : '';
		// RegEx to break integer digits into groups of three
		var rgx = /(\d+)(\d{3})/;
		// Add commas
		while (rgx.test(x1)) {
			x1 = x1.replace(rgx, '$1' + ',' + '$2');
		}
		// Return integer digits with commas (x1) and fractional digits (x2), if any
		return x1 + x2;
} // END function addCommas

// Find the minimum value in an array using a prototype declaration on the built in Array 
Array.prototype.max = function() {
		var min = parseFloat(this[0]);
		var len = this.length;
		for (var i=1; i<len; i++) if (parseFloat(this[i]) > min) min = parseFloat(this[i]);
		return min;
} // END function Array.prototype.max

// Create the document header
function Header(xmlDoc) {
	  // Get the Title and Header lines from the XML data file. xmlDoc is a global variable declared elsewhere. Sorry.
	  var titles = xmlDoc.getElementsByTagName("titles");
	  // Construct the page header
	  var htmlOut = "<img src=\"http:\/\/localhost\/logo.png\" align=left>";
	  htmlOut += "<b>&nbsp&nbspODPMI Data Map</b>";
	  htmlOut += "<br>&nbsp&nbsp" + titles[0].getAttribute('title');
	  htmlOut += "<br>&nbsp&nbsp" + titles[1].getAttribute('title') + "<br clear=all>";
	  // Write the HTML to the header div
	  document.getElementById("head").innerHTML = htmlOut;
} // END function createHeader

// Assign the colors from the XML data file. This creates a global colorArray
function getColors(xmlDoc) {
		var colorArray = [];
	  // Get the colors from the XML file.
	  var colors = xmlDoc.getElementsByTagName("color");
	  for (var i=0, len=colors.length; i<len; i++ ) {
		    colorArray[i] = colors[i].getAttribute('color');
	  }
		return colorArray;
} // END function getColors

// Called by onload from the body tag
function start(path) {
    if (debug) alert("start");
		// Set the xmlPath_gv global variable
		xmlPath_gv = path;
		// Set the text display drop down to NameVals
		document.getElementById('textFormSelect').selectedIndex = 2;
		// Set the DataFile: to http://localhost/ODPMI_XML_Data.xml
		document.getElementById('dd3').selectedIndex = 0;
		main();
} // END function start

// This function writes all of the SVG elements (paths, text, etc.) to the HTML DOM on initial page load.
function CreateSvgDom() {
		var name;
		var alias;
		// Uh-oh. Time for another global variable. This one is an array.
		states = [];
		// stateData is the stateData.js file. numberStates is another global variable.
		numberStates = stateData.length;
		// Render the SVG state paths, circles, text (state name and value) and the state line, if any
		// Iterate over all of the states in the stateData array
		for (var i=0; i<numberStates; i++) {
				// Create a new state object
				states[i] = new State(i);
				// Render the state path in the SVG paths group in the HTML document
				drawPath(states[i].name, states[i].path);
				// Render the state circle to the SVG circle group in the HTML document
				drawCircle("circles", states[i].name + "_c", states[i].x1 + 5, states[i].y1 - 3, getRandomInt(5,30));
				document.getElementById(states[i].name + "_c").setAttribute("fill", "#ffff00");
				// Render the SVG state names, values and lines
				// Definition: Normal state - A state where the state name and the state value are always displayed in the same place
				// Definition: Special state - A state where the name is displayed in one location when just state names are displayed
				// but in a different position when the state names and values are displayed
				// Normal states use states[i].name + "_t" for their identifier and the x1, y1 values from the stateData array
				// Special states use states[i].name + "_t" for their normal id and the x1, y1 values from the stateData array and
				// states[i].name + "_st" for their special id and the x2, y2 values from the stateData array
				// Normal states use "_tv" for their value id and a y1 offset of 10px so their value shows up underneath the state name
				// Special states use "_tv" for their value id and an x2 offset of 20px so their text shows up to the right of their state name
				// Note: SVG element precedence is based on when the element is rendered. For text to appear above a path it must be
				// rendered after the path element.
				
				// State name will be AK, AL, AZ, etc.
				name = states[i].name;
				// Alias is the same as the state name for most states except the DDS's (FD, EM, EV, EO, EA)
				// For these the alias is a longer name than the state name (ex. "FD" becomes "FD - Federal Sites")
				alias = states[i].alias;
				// Normal state if x2 === 0. This means that there is no x2,y2 coordinate pair in the stateData array
				if ( states[i].x2 === 0 ) {
						// Render the state name text in the namesNormal SVG group
						drawText("namesNormal", alias, name + "_t", states[i].x1, states[i].y1);
						// DE & RI are normal states
						if ( states[i].lx1 !== 0 ) {
								// All of the state values are rendered in the namesSpecial SVG group
								drawText("namesSpecial", "0", name + "_tv", states[i].x1 + 20, states[i].y1);
								// DE & RI need to have a line drawn from the state name to the state
								drawLine("namesNormal", name + "_l", states[i].lx1, states[i].ly1, states[i].lx2, states[i].ly2);
						}
						// All other normal state values are rendered in the namesSpecial SVG group
						else {
								drawText("namesSpecial", "0", name + "_tv", states[i].x1, states[i].y1 + 10);
						}
				}
				// All special states have an x2,y2 coordinate pair and require a line to be drawn to connect the name to the state
				else {
						drawText("namesNormalSpecial", alias, name + "_t", states[i].x1, states[i].y1);
						drawText("namesSpecial", alias, name + "_ts", states[i].x2, states[i].y2);
						drawText("namesSpecial", "0", name + "_tv", states[i].x2 + 20, states[i].y2);
						drawLine("namesSpecial", name + "_l", states[i].lx1, states[i].ly1, states[i].lx2, states[i].ly2);
				}
		}
		return states;
} // END function CreateSVGDom

// Add the column names from the XML data file to a drop down menu
function dropDownOptions(id, namesArray) {
		// Select the appropriate HTML DOM element (drop down menu) based on the passed in id
		var menuObject = document.getElementById(id);
		// Determine the number of data columns from the passed in array
		var length = namesArray.length;
		// Iterate over the column names and add them as options to the drop down menu
		// Start with i = 1 in order to skip using the the first column which is the state name
		for (var i=1; i<length; i++) {
			var newOption = document.createElement("option");
			newOption.text = namesArray[i];
			menuObject.add( newOption, menuObject.options[i-1] );
		}
} // END function dropDownOptions

// Function to return the index of a state in a two dimensional array
// Returns -1 if the state is not found in the array.
function findIndex2( tArray, state ) {
		// Initialize the index to -1 (not present state)
		var index = -1;
		// Get the array length
		var length = tArray.length;
		// Iterate over all of the members of the stateSvgData array
		for (var i=0; i<length; i++) {
			// If a match is found set the index and break out of the loop to save time
			if (tArray[i][0] == state) {
				index = i;
				break;
			}
		}
		// Return the index value to the caller
		return index;
} // END function findSvgIndex

// Function called when a new XML data file is selected from the drop down menu
function dataChange(path) {
    if (debug) alert("dataChange");
		// Set the allStates global variable to true
		allStates_gv = true;
		// Set the displayState global variable to 1 so that all of the states are displayed on page render
		displayState_gv = 1;
		// Update the global XML path variable to the path of the currently selected XML data file
		xmlPath_gv = path;
		// Call main
		main();
} // END function dataChange

// Function that turns on the display of all paths and text elements. 
function displayAllPaths(states) {
    if (debug) alert("displayAllPaths");
		// Loop over all of the SVG states
		for (i=0; i<states.length; i++) {
		    var state = states[i].name;
				// Display path, name, value
				document.getElementById(state).setAttribute("display", "all");
				document.getElementById(state + "_t").setAttribute("display", "all");
				document.getElementById(state + "_tv").setAttribute("display", "all");
				// Display special name, line
				if ( states[i].x2 !== 0 ) {
				    document.getElementById(state + "_ts").setAttribute("display", "all");
				    document.getElementById(state + "_l").setAttribute("display", "all");
				}
				// Delaware and Rhode Island
				else if ( state === "DE" || state === "RI" ) {
				    document.getElementById(state + "_l").setAttribute("display", "all");
				}
		}
} // END function displayAllPaths

// Function called when the stateColor drop down is changed
function setStateColor(selection) {
    if (debug) alert("setStateColor");
		stateColor_gv = selection;
		displayState_gv = 3;
		allStates_gv = true;
		main();
} // END function setStateColor

// Function called when the stateValue drop down is changed
function setStateValue(selection) {
		if (debug) alert("setStateValue");
    stateValue_gv = selection;
		displayState_gv = 4;
		main();
} // END function setStateValue

// Function called to display the Census Data to the dataDiv on a Ctrl left mouse click on a state
function censusTable(stateName) {
		// Build the National Data table for the information div
		var htmlOut = "<table class=\"data\">";
		htmlOut += "<tr><th colspan=\"3\">Census Bureau Data</th></tr>";
		htmlOut += "<tr><th id=\"thWide\" style=\"text-align: center\">Item</th><th id=\"th100\">National Value</th><th id=\"th100\">State Value</th</tr>";
		// Load the Census XML data file
		xmlCensusData = loadXMLDoc("http://localhost/CensusData/DataSet.xml");
		// Get all of the state elements and loop over them
		x=xmlCensusData.getElementsByTagName('Object');
		for (i=0; i<x.length; i++) {
			var objProps = xmlCensusData.documentElement.childNodes[i].childNodes;
			for (var j=0; j<objProps.length; j++) {
				if ( objProps[j].getAttribute("Name") === "StateAbbr" ) {
					if ( objProps[j].childNodes[0].nodeValue === stateName ) {
						for (var k=0; k<54; k++) {
							nationalData = xmlCensusData.documentElement.childNodes[0].childNodes[k].childNodes[0].nodeValue;
							htmlOut += "<tr><td id=\"tdWide\">" + objProps[k].getAttribute("Name") + "</td><td>" + addCommas(nationalData) + "</td><td>" + addCommas(objProps[k].childNodes[0].nodeValue) + "</td></tr>";
						}
					}
				  break;
				}
			}
		}
		// Write the close table HTML tag
		htmlOut += "</table>";
		document.getElementById("dataDiv").innerHTML = htmlOut;
} // END function censusTable

// Writes the individually selected states' (stateToList) information to div2 as a table
function info(stateToList) {
		// If CTRL left mouse call the censusTable function to display Census data and then render the div2 table
		if (event.ctrlKey) {
				censusTable(stateToList);
		}
		// Build the National Data table for the information div. Fake data for now.
		htmlOut = "<table class=\"data\">";
		htmlOut += "<tr><th colspan=\"2\">National Data</th></tr>";
		htmlOut += "<tr><th>Item</th><th>Value</th></tr>";
		htmlOut += "<tr><td>Case Count</td><td>1,234,765</td></tr>";
		htmlOut += "<tr><td>Case_AL</td><td>432,432</td></tr>";
		htmlOut += "<tr><td>Case_DE</td><td>801,896</td></tr>";
		htmlOut += "<tr><td>Case_AL_Rate</td><td>0.324</td></tr></table>";
		htmlOut += "<hr style=\"width: 99%; height: 2px;\"></hr>";
		// Write out the header rows for the state table
		htmlOut += "<table class=\"data\">";
		htmlOut += "<tr><th colspan=\"2\">" + stateToList + "</th></tr>";
		htmlOut += "<tr><th>Item</th><th>Value</th></tr>";
		// Set a boolean (true/false) for tracking if the state is in the stateData (SVG) array or not
		var stateNotFound = true;
		// If there are one or more state nodes
		if ( numberOfXmlStates > 0) {
			// Loop over the states in the XML data file
			for (var i = 0; i<numberOfXmlStates; i++) {
				// If the state equals a state in the XML data file proceed to write the state table
				if (stateToList === xmlDoc.getElementsByTagName(xmlDataColumnNames[0])[i].childNodes[0].nodeValue) {
					stateNotFound = false;
					// Write out the table rows for the state's data columns
					for (var j=1; j<numberOfXmlDataColumns; j++) {
						htmlOut += "<tr><td>" + xmlDataColumnNames[j] + "</td><td>" + addCommas(xmlDoc.getElementsByTagName(xmlDataColumnNames[j])[i].childNodes[0].nodeValue) + "</td></tr>";
					}
					break;
				}
			}
			if (stateNotFound) {
				// Write out the data rows for a state that is not in the XML data file but is in the statesSvgData array
				for (j=1; j<numberOfXmlDataColumns; j++) {
					htmlOut += "<tr><td>" + xmlDataColumnNames[j] + "</td><td>N/A</td></tr>";
				}
			}
		}
		// Write the close table HTML tag
		htmlOut += "</table>";
		document.getElementById("div2").innerHTML = htmlOut;
} // END function info

// Not really a main but close enough. Handles a lot of things including initial page render and the 
// reading of the XML data and dividing it up into 8 ranges. Also sets the state colors.
function main() {
    if (debug) alert("main");
		// When the document is first loaded
		if (displayState_gv === 0) {
		    // Set display state to 1 or New Data File
				displayState_gv = 1;
				// Create the SVG DOM with all of the paths, circles, text, and lines. It returns the states array
				states = CreateSvgDom();
				var numberSvgStates = states.length;
				// Create the legend
				Legend();
				// Set the textState global variable to 2 (state names and values)
				textState = "2";
		}
		// Open new XML data file (Update HTML header, create new color array, populate drop down menu values)
		if (displayState_gv === 1) {
				// Open the XML data document. xmlDoc is another global variable
				xmlDoc = loadXMLDoc(xmlPath_gv);
				// Write the document header
				Header(xmlDoc);
				// Get the colors from the XML file and put them in the colors array
				colorArray = getColors(xmlDoc);
				// Set the individual SVG pattern elements fill colors
				for (var i=0, clen=colorArray.length; i<clen; i++) {
						document.getElementById("hatch" + i).setAttribute("fill", colorArray[i]);
				}
			  // Define an array to hold the column names and populate it
		    xmlDataColumnNames = [];
				// Load all of the XML data file column names into an array 
				var columnNames = xmlDoc.documentElement.childNodes[0].childNodes;
				// numberOfXmlDataColumns contains the number of data columns found in the XML data file
				numberOfXmlDataColumns = columnNames.length;
				for ( var i = 0; i < numberOfXmlDataColumns; i++ ) {
					xmlDataColumnNames[i] = xmlDoc.documentElement.childNodes[0].childNodes[i].tagName;
				}
				column0Name = xmlDataColumnNames[0];
				// Clear out all of the old drop down entries
				if (typeof previousCount !== 'undefined' ) {
						// Clear the options from the drop down menus
						for (var i=0; i<previousCount-1; i++) {
							document.getElementById("dd1").remove(0);
							document.getElementById("dd2").remove(0);
						}
				}
				// Need to make this a global var or the prior typeof test will fail
				previousCount = numberOfXmlDataColumns;
				// Add the column names to the drop down menus
				dropDownOptions( "dd1", xmlDataColumnNames );
				dropDownOptions( "dd2", xmlDataColumnNames );
				// Set the default selected value to be 0 and 1
				document.getElementById('dd1').selectedIndex = 0;
				document.getElementById('dd2').selectedIndex = 1;
				document.getElementById('zoomSelect').selectedIndex = 0;
				zoom("1");
				//document.getElementById('textFormSelect').selectedIndex = 0;
				//document.getElementById('dd3').selectedIndex = 0;
				// Set the stateColor_gv variable
			  stateColor_gv = xmlDataColumnNames[1];
				stateValue_gv = xmlDataColumnNames[2];
				// Get all of the state nodes in the XML data file and put them in the xmlStateNames array
		    var xmlStateNames = xmlDoc.getElementsByTagName(column0Name);
		    // Determine the number of states in the XML data file
		    numberOfXmlStates = xmlStateNames.length;
		}
		// Create a new empty array that will become a multidimensional array
		var dataArray = new Array();
		// Create a single dimensional array of the values to be used to find the maximum data value
		// Parse the individual state names and values from the XML file
		var columnData = new Array();
		var dataColumnValue;
		// Loop over all of the states in the XML data file
		for (var i=0; i<numberOfXmlStates; i++) {
			// Add 2nd dimension to the dataArray
			dataArray[i] = new Array();
			// Get the state name
			var state = xmlDoc.getElementsByTagName(column0Name)[i].childNodes[0].nodeValue;
			// Put the state name in position 0
			dataArray[i][0] = state;
			// Get the column of data defined by the stateColor_gv variable
			dataColumnValue = xmlDoc.getElementsByTagName(stateColor_gv)[i].childNodes[0].nodeValue;
			// Put the data value in position 1
			dataArray[i][1] = dataColumnValue;
			// Put the data value in the columnData array
			columnData[i] = dataColumnValue;
			// If the state is in the SVG state array
			if (findIndex2(stateData, state) != -1) {
			    // Assign the state's value to SVG value text element
					document.getElementById(state + "_tv").textContent = addCommas(xmlDoc.getElementsByTagName(stateValue_gv)[i].childNodes[0].nodeValue);
			}
		}
		// Determine the maximum data value
		var range = columnData.max();
		// Make the step size 1/8th of the overall data range
		var step = range / 8 ;
		// Create an array to hold the individual step values
		var steps = new Array();
		var temp;
		// Get the values for the individual steps
		for (i=0; i<8; i++) {
			temp = range - ((i + 1) * step)
			// If the value is less than one parse it as a 2 decimal place number
			if (range<1) { steps[i] = parseFloat(temp.toFixed(2)); }
			// If the value is greater than 1 parse it as an integer
			else { steps[i] = parseFloat(temp.toFixed(0)); }
		}
		// Reverse the order of the steps array to make it lowest to highest
		steps.reverse();
		// Set the values of the legend text elements
		for (i=0; i<8; i++) {
			document.getElementById( i + "_rt" ).textContent = ">=" + addCommas(steps[i]);
		}
		document.getElementById( "8_rt" ).textContent = "No Data";

		// Define and initialize the counter variables for the individual range arrays
		var r1 = 0;
		var r2 = 0;
		var r3 = 0;
		var r4 = 0;
		var r5 = 0;
		var r6 = 0;
		var r6 = 0;
		var r7 = 0;
		var r8 = 0;
		var r9 = 0;
		// Declare the range arrays
		range1Array = [];
		range2Array = [];
		range3Array = [];
		range4Array = [];
		range5Array = [];
		range6Array = [];
		range7Array = [];
		range8Array = [];
		range9Array = [];

		// Loop over all of the states in the XML data file, set their fill color and assign to a range array
		for (i=0; i<states.length; i++) {
			// Get the state's name
			var state = states[i].name;
			var index2 = findIndex2( dataArray, state );
			// If the SVG state is not in the XML data file put it the "No Data" bin
			if (  index2 === -1 ) {
				document.getElementById(state).setAttribute("fill", colorArray[8]);
				range9Array[r9++] = state;
			}
			// If the state is in the XML data file
			else {
				  // Get the state's count
				  count = dataArray[index2][1];
				  // Change the SVG path background colors
				  if (count >= (steps[7])) {
				    if (states[i].proto === 1) {
							  document.getElementById(state).setAttribute("fill", "url(#hatch7)");
					  }
					  else {
					      document.getElementById(state).setAttribute("fill", colorArray[7]);
					  }
					  range8Array[r8++] = state;
				  }
				  else if (count >= (steps[6])) {
						  if (states[i].proto === 1) {
								  document.getElementById(state).setAttribute("fill", "url(#hatch6)");
						  }
						  else {
								  document.getElementById(state).setAttribute("fill", colorArray[6]);
						  }
					    range7Array[r7++] = state;
					}
					else if (count >= (steps[5])) {
							if (states[i].proto === 1) {
									document.getElementById(state).setAttribute("fill", "url(#hatch5)");
							}
							else {
									document.getElementById(state).setAttribute("fill", colorArray[5]);
							}
						  range6Array[r6++] = state;
					}
					else if (count >= (steps[4])) {
							if (states[i].proto === 1) {
									document.getElementById(state).setAttribute("fill", "url(#hatch4)");
							}
							else {
									document.getElementById(state).setAttribute("fill", colorArray[4]);
							}
						  range5Array[r5++] = state;
					}
					else if (count >= (steps[3])) {
							if (states[i].proto === 1) {
									document.getElementById(state).setAttribute("fill", "url(#hatch3)");
							}
							else {
									document.getElementById(state).setAttribute("fill", colorArray[3]);
							}
						  range4Array[r4++] = state;
					}
					else if (count >= (steps[2])) {
							if (states[i].proto === 1) {
									document.getElementById(state).setAttribute("fill", "url(#hatch2)");
							}
							else {
									document.getElementById(state).setAttribute("fill", colorArray[2]);
							}
						  range3Array[r3++] = state;
					}
					else if (count >= (steps[1])) {
							if (states[i].proto === 1) {
									document.getElementById(state).setAttribute("fill", "url(#hatch1)");
							}
							else {
									document.getElementById(state).setAttribute("fill", colorArray[1]);
							};
						  range2Array[r2++] = state;
					}
					else if (count > (steps[0])) {
							if (states[i].proto === 1) {
									document.getElementById(state).setAttribute("fill", "url(#hatch0)");
							}
							else {
									document.getElementById(state).setAttribute("fill", colorArray[0]);
							}
						  range1Array[r1++] = state;
					}
				}
		}
		// If stateColor was changed and allStates_gv is false, display all of the state paths
		if (displayState_gv === 3) {
        displayAllPaths(states);
		}
		// If displayState_gv is 1 (new data file) reset to 5 and render text
    if (displayState_gv === 1) {
				displayState_gv === 5;
				displayAllPaths(states);
		    textRender();
				document.getElementById("div2").innerHTML = "";
		}
		// Assign the legend header text
		document.getElementById("Header_t").textContent = "State color from " + stateColor_gv;
		// Set the legend rectangles to their appropriate bin color
		for (i=0; i<9; i++) {
				document.getElementById(i + "_r").setAttribute("fill", colorArray[i]);
		}
		// Animate the circle radii
		//setInterval(function () {radii(states, numberStates)}, 600);
} // END function main

// Function to make the AJAX call to load an XML file
function loadXMLDoc(url) {
	function handler() {
		if ( this.readyState == this.DONE ) {
			if ( this.status == 200 && this.responseXML != null ) {
				//alert("File downloaded!");
				return;
			}
			else {
				alert("Unable to download " + url );
			}
		}
	}
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = handler;
	xmlhttp.open( "GET", url, false);
	xmlhttp.send();
	return xmlhttp.responseXML;
} // END function loadXMLDoc

// Randomly vary a circle's radius
function radii(states, numberStates) {
		for (var i=0; i<numberStates; i++) {
			document.getElementById(states[i].name + "_c").setAttribute("r", getRandomInt(5,30));
		}
} // END function radii

// Limit the state display to just those in the selected range
function replot(range) {
    if (debug) alert("replot()");
		allStates_gv = false;
		// Set the range array. The 8 range arrays are populated by main() with the states that fall into the 
		// 8 data ranges. This function is called when a user left clicks one of the small colored rectangles
		// in the Legend and turns off all of the states that are not in the selected range.
		if (range === "0_r") { rangeArray = range1Array; }
		else if (range === "1_r") { rangeArray = range2Array; }
		else if (range === "2_r") { rangeArray = range3Array; }
		else if (range === "3_r") { rangeArray = range4Array; }
		else if (range === "4_r") { rangeArray = range5Array; }
		else if (range === "5_r") { rangeArray = range6Array; }
		else if (range === "6_r") { rangeArray = range7Array; }
		else if (range === "7_r") { rangeArray = range8Array; }
		else if (range === "8_r") { rangeArray = range9Array; }
		// Loop over all of the states in stateData
		for (var i=0; i<numberStates; i++) {
			// Get the state name
			var state = states[i].name;
			// Display the state if it is in the rangeArray
			if (rangeArray.indexOf(state) != -1) {
				document.getElementById(state).setAttribute("display", "all");
			}
			// Turn off the state if it is not in the rangeArray
			else {
				document.getElementById(state).setAttribute("display", "none");
			}
		}
		// Display text
		textRender();
}  // END function replot

// Handle the display of text and line elements
function textRender() {
    if (debug) alert("textRender()");
		// Do the following for all display states
		// If no text (state name or value) is to be displayed turn off all of the text display SVG groups
		if ( textState === "0" ) {
				document.getElementById("namesNormal").setAttribute("display", "none");
		    document.getElementById("namesNormalSpecial").setAttribute("display", "none");
		    document.getElementById("namesSpecial").setAttribute("display", "none");
				document.getElementById("circles").setAttribute("display", "none");
		}
		// Display the state names
		else if ( textState === "1" ) {
				document.getElementById("namesNormal").setAttribute("display", "all");
		    document.getElementById("namesNormalSpecial").setAttribute("display", "all");
		    document.getElementById("namesSpecial").setAttribute("display", "none");
				document.getElementById("circles").setAttribute("display", "none");
				// Do the following only when a subset of the states are being displayed
		    if (! allStates_gv) {
						// Loop over all of the states in stateData
			      for (i=0; i<numberStates; i++) {
								var state = states[i].name;
				        // Check if the state is in the rangeArray
				        var index1 = rangeArray.indexOf(state);
								// If the state is in the rangeArray display its name
				        if (index1 != -1) {
								    document.getElementById(state + "_t").setAttribute("display", "all");
										document.getElementById(state + "_tv").setAttribute("display", "none");
										// Display the line if DE or RI
										if (state === "DE" || state === "RI" ) {
										    document.getElementById(state + "_l").setAttribute("display", "all");
										}
								}
								else {
								    document.getElementById(state + "_t").setAttribute("display", "none");
										document.getElementById(state + "_tv").setAttribute("display", "none");
										if (state === "DE" || state === "RI" ) {
										    document.getElementById(state + "_l").setAttribute("display", "none");
										}
								}
						}
				}
		}
		// Display state names and values
		else if ( textState === "2" ) {
				document.getElementById("namesNormal").setAttribute("display", "all");
		    document.getElementById("namesNormalSpecial").setAttribute("display", "none");
		    document.getElementById("namesSpecial").setAttribute("display", "all");
				document.getElementById("circles").setAttribute("display", "none");
				// Do the following only when a subset of the states are being displayed
	      if (! allStates_gv) {
						// Loop over all of the states in stateData
			      for (i=0; i<numberStates; i++) {
								var state = states[i].name;
				        // Check if the state is in the rangeArray
				        var index1 = rangeArray.indexOf(state);
								// If the state is in the rangeArray display its name
				        if (index1 != -1) {
								    // If special state
										if ( states[i].x2 !== 0 ) {
												document.getElementById(state + "_ts").setAttribute("display", "all");
												document.getElementById(state + "_l").setAttribute("display", "all");
										    document.getElementById(state + "_tv").setAttribute("display", "all");
										}
										else {
												document.getElementById(state + "_t").setAttribute("display", "all");
												document.getElementById(state + "_tv").setAttribute("display", "all");
												// Display the line if DE or RI
												if (state === "DE" || state === "RI") {
														document.getElementById(state + "_l").setAttribute("display", "all");
												}
										}
								}
								else {
										document.getElementById(state + "_t").setAttribute("display", "none");
										document.getElementById(state + "_tv").setAttribute("display", "none");
										if ( states[i].x2 !== 0 ) {
												document.getElementById(state + "_ts").setAttribute("display", "none");
												document.getElementById(state + "_l").setAttribute("display", "none");
										}
										else if ( state === "DE" || state === "RI" ) {
												document.getElementById(state + "_l").setAttribute("display", "none");
										}
								}
						}
				}
		}
		// Display state names and circles
		else if ( textState === "3" ) {
				document.getElementById("namesNormal").setAttribute("display", "all");
		    document.getElementById("namesNormalSpecial").setAttribute("display", "all");
		    document.getElementById("namesSpecial").setAttribute("display", "none");
				document.getElementById("circles").setAttribute("display", "all");
		}
}  // END function textRender

// Handle the selection of text options. Called when the text drop down is changed
function textSelect (value) {
    if (debug) alert("textSelect()");
		textState = value;
		textRender();
}  // END function textSelect

// Create the Legend
function Legend() {
		// Draw the legend's background rectangle and set its fill to grey
		drawRectangle("Legend", "Legend_r", 17, 0, 5, 5, 50, 968);
		// Add the legend SVG text header line
		drawText("Legend", "Header", "Header_t", 490, 21);
		// Add the legend SVG bin rectangle and text elements. x coordinate starts at 23
		for (var i=0, x=23; i<9; i++) {
				drawRectangle("Legend", i + "_r", x, 35, 3, 3, 10, 25);
			  drawText("Legend", "0", i + "_rt", x + 30, 43);
				x = x + 110;
		}
} // END function Legend

// Create a State object with appropriate parameters from the stateData array of state arrays
// name - the unique two character state name
// alias - a string that defines an alias to use in place of the state name
// proto - Whether a state is a prototype state (1) or not (0)
// x1 - x coordinate that defines where to place the text element for 'normal' placement
// y1 - y coordinate that defines where to place the text element for 'normal' placement
// x2 - x coordinate that defines where to place the text element for 'special' placement
// y2 - y coordinate that defines where to place the text element for 'special' placement
// lx1 - x1 coordinate for state line, 0 in the array means no value
// ly1 - y1 coordinate for state line, 0 in the array means no value
// lx2 - x2 coordinate for state line, 0 in the array means no value
// ly2 - y2 coordinate for state line, 0 in the array means no value
// path - the commands that define how to render the SVG path
function State(index) {
    this.name = stateData[index][0];
		this.alias = stateData[index][1];
		this.proto = stateData[index][2];
    this.x1 = stateData[index][3];
    this.y1 = stateData[index][4];
    this.x2 = stateData[index][5];
    this.y2 = stateData[index][6];
		this.lx1 = stateData[index][7];
		this.ly1 = stateData[index][8];
		this.lx2 = stateData[index][9];
		this.ly2 = stateData[index][10];
    this.path = stateData[index][11];
} // END function State

// drawCircle
// group - the SVG group in the HTML document that the circle is to be rendered in
// id - the unique id of the circle used to identify it in the DOM
// x - the x coordinate that defines where to place the circle element
// y - the y coordinate that defines where to place the circle element
// r - the radius of the circle element
function drawCircle(group, id, x, y, r) {
    var svgTextObj = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    svgTextObj.setAttributeNS(null, "id", id);
    svgTextObj.setAttributeNS(null, "display", "all");
    svgTextObj.setAttributeNS(null, "cx", x);
    svgTextObj.setAttributeNS(null, "cy", y)
		svgTextObj.setAttributeNS(null, "r", r)
    document.getElementById(group).appendChild(svgTextObj);
} // END function drawCircle

// drawLine
// group - the SVG group in the HTML document that the line is to be rendered in
// id - the unique id of the line used to identify it in the DOM
// x1 - the x1 coordinate that defines where to place the first point in the line
// y1 - the y1 coordinate that defines where to place the first point in the line
// x2 - the x2 coordinate that defines where to place the second point in the line
// y2 - the y2 coordinate that defines where to place the second point in the line
function drawLine(group, id, x1, y1, x2, y2) {
		var svgLineObj = document.createElementNS("http://www.w3.org/2000/svg", "line");
		svgLineObj.setAttributeNS(null, "id", id);
		svgLineObj.setAttributeNS(null, "display", "all");
		svgLineObj.setAttributeNS(null, "x1", x1);
		svgLineObj.setAttributeNS(null, "y1", y1);
		svgLineObj.setAttributeNS(null, "x2", x2);
		svgLineObj.setAttributeNS(null, "y2", y2);
		document.getElementById(group).appendChild(svgLineObj);
} // END function drawLine

// drawPath
// name - the two character unique state name
// path - the commands and points that define how to render the SVG path
// Rather than pass the id and group to draw the path I have elected to just use the state name for
// the id and write all of the paths to the paths SVG group
function drawPath(name, path) {
    var svgPathObj = document.createElementNS("http://www.w3.org/2000/svg", "path");
    svgPathObj.setAttributeNS(null, "id", name);
    svgPathObj.setAttributeNS(null, "display", "all");
    svgPathObj.setAttributeNS(null, "onclick", "info('" + name + "')");
    svgPathObj.setAttributeNS(null, "d", path);
    document.getElementById("paths").appendChild(svgPathObj);
    var titleId = name + "_title";
    var svgTitleObj = document.createElementNS("http://www.w3.org/2000/svg", "title");
    svgTitleObj.setAttributeNS(null, "id", titleId);
    svgTitleObj.textContent = "State: " + name;
    document.getElementById(name).appendChild(svgTitleObj);
} // END function drawPath

// drawRectangle function
function drawRectangle(group, rectangleName, x, y, rx, ry, height, width) {
		var svgRectObj = document.createElementNS("http://www.w3.org/2000/svg", "rect");
		svgRectObj.setAttributeNS(null, "id", rectangleName);
		svgRectObj.setAttributeNS(null, "onclick", "replot('" + rectangleName + "')");
		svgRectObj.setAttributeNS(null, "x", x);
		svgRectObj.setAttributeNS(null, "y", y);
		svgRectObj.setAttributeNS(null, "rx", rx);
		svgRectObj.setAttributeNS(null, "ry", ry);
		svgRectObj.setAttributeNS(null, "height", height);
		svgRectObj.setAttributeNS(null, "width", width);
		document.getElementById(group).appendChild(svgRectObj);
} //END function drawRectangle

// drawText
// group - the SVG group in the HTML document that the text is to be rendered in
// text - the text that will be rendered by the text element
// id - the unique id of the text used to identify it in the DOM
// x - the x coordinate that defines where to place the text element
// y - the y coordinate that defines where to place the text element
function drawText(group, text, id, x, y) {
    var svgTextObj = document.createElementNS("http://www.w3.org/2000/svg", "text");
    svgTextObj.setAttributeNS(null, "id", id);
    svgTextObj.setAttributeNS(null, "display", "all");
    svgTextObj.setAttributeNS(null, "x", x);
    svgTextObj.setAttributeNS(null, "y", y)
    svgTextObj.textContent = text;
    document.getElementById(group).appendChild(svgTextObj);
} // END function drawText

// Returns a random integer between min (inclusive) and max (inclusive)
// Using Math.round() will give you a non-uniform distribution!
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
} // END function getRandomInt

// Selects the zoom factor and alters the SVG viewBox parameters to provide a zoom effect
function zoom(value) {
    displayState_gv = 1;
		allStates_gv = true;
		switch(value) {
				// 100% zoom factor
				case "1":
						document.getElementById("mapSvg").setAttribute("viewBox", "0 0 1000 600");
						break;
				// 200% zoom factor		
				case "2":
						document.getElementById("mapSvg").setAttribute("viewBox", "0 0 500 300");
						break;
				// 400% zoom factor		
				default:
						document.getElementById("mapSvg").setAttribute("viewBox", "0 0 250 150");	
		}
} // END function zoom
	
</script>

</body>
</html>