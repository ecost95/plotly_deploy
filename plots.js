function init() {
    var selector = d3.select("#selDataset");
  
    d3.json("samples.json").then((data) => {
      console.log(data);
      var sampleNames = data.names;
      sampleNames.forEach((sample) => {
        selector
          .append("option")
          .text(sample)
          .property("value", sample);
      });

      // Use the first sample from the list to build the initial plots
      var firstSample = sampleNames[0];
      buildCharts(firstSample);
      buildMetadata(firstSample);
    });
  }
  
  // Initialize the dashboard
  init();
  

  function optionChanged(newSample) {
    console.log(newSample);
    buildMetadata(newSample);
    buildCharts(newSample);
  }

function buildMetadata(sample) {
 d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
    var PANEL = d3.select("#sample-metadata");
    
    PANEL.html("");
    Object.entries(result).forEach(([key, value]) => {
    PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
   });
    });
      }


  ///XXXXXX Module 12 Challenge XXXXXXXXXXXXXXXX
  //Deliverable 1//
  function buildCharts(sample) {
    // 2. Use d3.json to load and retrieve the samples.json file 
    d3.json("samples.json").then((data) => {
      // 3. Create a variable that holds the samples array. 
      var samples = data.samples;
      // 4. Create a variable that filters the samples for the object with the desired sample number.
      var resultArray = samples.filter(sampObj => sampObj.id == sample);
      //  5. Create a variable that holds the first sample in the array.
      var result = resultArray[0];
  
      // 6. Create variables that hold the otu_ids, otu_labels, and sample_values.
      var otuIds = result.otu_ids;
      var otuLabels = result.otu_labels;
      var sampleValues = result.sample_values;
      console.log(otuIds);

    
      var yticks = otuIds.slice(0, 10).map(function(id){
      return ("OTU " + id)
       });
      var yticksr = yticks.reverse();
      console.log(yticksr);
      
      var xticks = sampleValues.slice(0, 10);
      var xticksr = xticks.reverse();
      console.log(yticksr);

      var hovertext = otuLabels.slice(0, 10);
      var hovertextr = hovertext.reverse();

      // 8. Create the trace for the bar chart. 
      var trace = {
        x: xticks,
        y: yticks, 
        text: hovertext,
        type: "bar",
        orientation: "h"
      };
      var barData = [trace];
      
      // 9. Create the layout for the bar chart. 
      var barLayout = {
       title: "Top 10 Bacteria Cultures Found",
       margin: {
        l: 100,
        r: 100,
        t: 100,
        b: 100
      }
      }
      // 10. Use Plotly to plot the data with the layout. 
      Plotly.newPlot("bar", barData, barLayout);



  //Deliverable 2// 
  // 1. Create the trace for the bubble chart.
    var xbubbles = otuIds;     
    var ybubbles = sampleValues;
    var bubbletext =  otuLabels;

    var trace1 = {
    x: xbubbles,
    y: ybubbles,
    text: bubbletext,
    mode: 'markers',
    marker: {
      color: otuIds,
      colorscale: 'YlGnBu',
      opacity: 0.7,
      size: sampleValues,
      sizeref: 2.0 * Math.max(sampleValues)/(40**2),
     
    }
  };

    var bubbleData = [trace1
    ];

//  2. Create the layout for the bubble chart.
    var bubbleLayout = {
      title: 'Bacteria Cultures per Sample',
      xaxis: {title: "OTU Label" },
      margin: {
        l: 100,
        r: 100,
        t: 100,
        b: 100
      },
      hovermode:'closest',
      showlegend: false,

    };

//     // 3. Use Plotly to plot the data with the layout.
    Plotly.newPlot("bubble", bubbleData, bubbleLayout); 
 

//Deliverable 3//
    // 1. Create a variable that filters the metadata array for the object with the desired sample number.
    var metadata = data.metadata;
    var resultArrayMeta = metadata.filter(sampleObj => sampleObj.id == sample);

    // 2. Create a variable that holds the first sample in the metadata array.
    var resultMeta = resultArrayMeta[0];

    // 3. Create a variable that holds the washing frequency.
    var wfreq = resultMeta.wfreq;
    var wfreqNew = parseFloat(wfreq).toFixed(2);

    console.log(wfreqNew);
    // 4. Create the trace for the gauge chart.
    var trace2 = {
      domain: { x: [0, 1], y: [0, 1] },
      value: wfreqNew,
      title: { text: "Belly Button Wash Frequency<br><span style='font-size:0.8em;color:gray'>Scrubs per Week</span>" },
      type: "indicator",
      mode: "gauge+number",
      gauge: {
        axis: { range: [null, 10] },
        bar: { color: "black" },
        steps: [
          { range: [0, 2], color: "orangered" },
          { range: [2, 4], color: "sandybrown" },
          { range: [4, 6], color: "yellow" },
          { range: [6, 8], color: "lightgreen" },
          { range: [8, 10], color: "mediumseagreen" },
        ], 
      },
    };

   
    
    var gaugeData = [trace2
    ];
      
    
 
    // 5. Create the layout for the gauge chart.
    var gaugeLayout = { 
      width: 600, 
      height: 500, 
      margin: { t: 0, b: 0 } 
    
    };
       

  
      // 6. Use Plotly to plot the gauge data and layout.
      Plotly.newPlot("gauge", gaugeData, gaugeLayout);
    
    }); 
};

//   // Bar and Bubble charts
// // Create the buildCharts function.
// function buildCharts(sample) {
//   // Use d3.json to load and retrieve the samples.json file 
//   d3.json("samples.json").then((data) => {
//     var samples = data.samples;
//     var resultArray = samples.filter(sampObj => sampObj.id == sample);
//     var result = resultArray[0];

//     // Create variables that hold the otu_ids, otu_labels, and sample_values.
//     var otuIds = result.otu_ids;
//     var otuLabels = result.otu_labels;
//     var sampleValues = result.sample_values;
//     console.log(otuIds);

//     var ybubbles = otuIds.slice(0, 10).map(function(id){
//       return ("OTU " + id)
//        });
//       console.log(yticks);
      
//       var xbubbles = sampleValues.slice(0, 10);
//       var hovertext = otuLabels.slice(0, 10);

//     // Deliverable 1 Step 10. Use Plotly to plot the data with the layout. 
//     Plotly.newPlot("bar", barData, barLayout);

//     // 1. Create the trace for the bubble chart.

//     var trace1 = {
//     x: xbubbles,
//     y: ybubbles,
//     mode: 'markers',
//     marker: {
//       size: [40, 60, 80, 100]
//     }
//   };
//     var bubbleData = [trace1
   
//     ];

//     // 2. Create the layout for the bubble chart.
//     var bubbleLayout = {
//       title: 'Marker Size',
//       showlegend: false,
//       height: 600,
//       width: 600
      
//     };

//     // 3. Use Plotly to plot the data with the layout.
//     Plotly.newPlot("bubble", bubbleData, bubbleLayout); 
//   });
// }


// //   // Bar and Bubble charts
// //   var ybubbles = sampleValues.slice(0, 10);
      
// //   var xbubbles = otuIds.slice(0, 10).map(function(id){
// //       return ("OTU " + id)
// //        });
// //       console.log(yticks);
// //   var hovertext = otuLabels.slice(0, 10);

// //   // Deliverable 1 Step 10. Use Plotly to plot the data with the layout. 
// //   Plotly.newPlot("bar", barData, barLayout);

// //   // 1. Create the trace for the bubble chart.
// //   var trace1 = {
// //     x: xbubbles,
// //     y: ybubbles,
// //     mode: 'markers',
// //     marker: {
// //       size: [40, 60, 80, 100]
// //     }
// //   };
  
  
// //   var layout = {
// //     title: 'Marker Size',
// //     showlegend: false,
// //     height: 600,
// //     width: 600
// //   };
  
// //   var bubbleData = [trace1
 
// //   ];

// //   // 2. Create the layout for the bubble chart.
// //   var bubbleLayout = {
    
// //   };

// //   // 3. Use Plotly to plot the data with the layout.
// //   Plotly.newPlot("bubble", bubbleData, bubbleLayout); 
// // ;