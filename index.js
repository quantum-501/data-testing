Plotly.d3.csv(
  "https://gist.githubusercontent.com/quantum-501/26d7d52e2b58144aedac3f295af360fe/raw/9daeb8e98218c8a061c31b9864952875c4cf4b18/data_s.csv",
  function (err, data) {
    function unpack(data) {
      let array = [];
      for (let i = 0; i < data.length; i++) {
        array.push(data[i]);
      }
      return array;
    }
    data = [
      {
        type: "scatter3d",
        x: unpack(data.x),
        y: unpack(data.y),
        z: unpack(data.z),
        mode: "markers",
        name: "2014",
        text: months,
        marker: {
          color: "rgba(200, 50, 100, .7)",
          size: 16,
        },
      },
    ];
    var myPlot = document.getElementById("myDiv");

    layout = {
      hovermode: "closest",
      title:
        "<b>Formatting Annotations</b> <br> click on a point to plot an annotation",

      xaxis: {
        zeroline: true,
        title: "",
      },
      yaxis: {
        zeroline: true,
        title: "",
      },
      zaxis: {
        zeroline: true,
        type: "linear",
        title: "",
      },
    };

    Plotly.newPlot("myDiv", data, layout, { showSendToCloud: true });

    myPlot
      .on("plotly_click", function (data) {
        var point = data.points[0],
          newAnnotation = {
            x: point.xaxis.d2l(point.x),
            y: point.yaxis.d2l(point.y),
            z: point.yaxis.d2l(point.z),
            arrowhead: 6,
            ax: 0,
            ay: -80,
            bgcolor: "rgba(255, 255, 255, 0.9)",
            arrowcolor: point.fullData.marker.color,
            font: { size: 12 },
            bordercolor: point.fullData.marker.color,
            borderwidth: 3,
            borderpad: 4,
            text:
              "<i>Series Identification</i><br>" +
              "<b>Year</b>       " +
              point.data.name +
              "<br>" +
              "<i>Point Identification</i><br>" +
              "<b>Month</b>      " +
              months[point.pointNumber] +
              "<br><i>Point Values</i><br>" +
              "<b>A</b>     " +
              point.x.toPrecision(4) +
              "<br><b>B</b>     " +
              point.y.toPrecision(4),
          },
          divid = document.getElementById("myDiv"),
          newIndex = (divid.layout.annotations || []).length;
        console.log(point.pointNumber);
        // delete instead if clicked twice
        if (newIndex) {
          var foundCopy = false;
          divid.layout.annotations.forEach(function (ann, sameIndex) {
            if (ann.text === newAnnotation.text) {
              Plotly.relayout(
                "myDiv",
                "annotations[" + sameIndex + "]",
                "remove"
              );
              foundCopy = true;
            }
          });
          if (foundCopy) return;
        }
        Plotly.relayout(
          "myDiv",
          "annotations[" + newIndex + "]",
          newAnnotation
        );
      })
      .on("plotly_clickannotation", function (event, data) {
        Plotly.relayout("myDiv", "annotations[" + data.index + "]", "remove");
      });
  }
);
