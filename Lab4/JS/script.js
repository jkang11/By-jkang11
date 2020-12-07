
//copy your access token here
    mapboxgl.accessToken = 'pk.eyJ1IjoiamthbmcxIiwiYSI6ImNrZ3d5NjR3NDBldzgycW8zdDZ0NTZvYjAifQ.lUQQ9nNNJryYS05ye4FpLA';

    var map = new mapboxgl.Map({
      container: 'map', // HTML container id
      style:  'mapbox://styles/jkang1/ckhyszk2s0v5z19mvxomq6ziz', // style URL
      center: [-122.4523209, 47.2427187],// starting position as [lng, lat]
      zoom: 10.5 // starting zoom
    });

//Hover Effect

var hoveredStateId =  null;

map.on('load', function () {
map.addSource("Tacoma", {
    "type": "geojson",
    "data": "Geojson/Tacoma_BG.json",
    'promoteId':'OBJECTID'
});

// The feature-state dependent fill-opacity expression will render the hover effect
// when a feature's hover state is set to true.
map.addLayer({
    "id": "fills",
    "type": "fill",
    "source": "Tacoma",
    "layout": {},
    "paint": {
        "fill-color": "#627BC1",
        "fill-opacity": ["case",
            ["boolean", ["feature-state", "hover"], false],
            1,
            0.45
        ]
    }
});

map.addLayer({
    "id": "state-borders",
    "type": "line",
    "source": "Tacoma",
    "layout": {},
    "paint": {
        "line-color": "#627BC1",
        "line-width": 1.3
    }
});

// When the user moves their mouse over the state-fill layer, we'll update the
// feature state for the feature under the mouse.
map.on("mousemove", "fills", function(e) {
    if (e.features.length > 0) {
        if (hoveredStateId) {
            map.setFeatureState({source: 'Tacoma', id: hoveredStateId}, { hover: false});
        }
        hoveredStateId = e.features[0].id;
        map.setFeatureState({source: 'Tacoma', id: hoveredStateId}, { hover: true});
    }
});

// When the mouse leaves the state-fill layer, update the feature state of the
// previously hovered feature.
map.on("mouseleave", "fills", function() {
    if (hoveredStateId) {
        map.setFeatureState({source: 'Tacoma', id: hoveredStateId}, { hover: false});
    }
    hoveredStateId =  null;
});
});


//legend
    map.on('load', function() {
      var layers = ['0-606 | Lowest', '606-1000 | Lower', '1000-1500 | Low', '1500-2000 | High', '2000-2500 | Higher', '2500-3000 | Highest'];
      var colors = ['#42fc31', '#d5fb4b', '#fded3a', '#fca22c', '#fe622a', '#c70000'];
      for (i = 0; i < layers.length; i++) {

    var layer = layers[i];
    var color = colors[i];
    var item = document.createElement('div');
    var key = document.createElement('span');
    key.className = 'legend-key';
    key.style.backgroundColor = color;
        var value = document.createElement('span');
    value.innerHTML = layer;
    item.appendChild(key);
    item.appendChild(value);
    legend.appendChild(item);
    }
    });



    map.on('mousemove', function(e) {
    var Tacoma = map.queryRenderedFeatures(e.point, {
    layers: ['Tacoma_Clip']
    });

    if (Tacoma.length > 0) {
    document.getElementById('pd').innerHTML = '<h4><strong>' + Tacoma[0].properties.Population + '</strong> people per Block Group</em></p>';}
    else {document.getElementById('pd').innerHTML = 'Hover over a block group!';}
    });

    map.getCanvas().style.cursor = 'default';

</script>


<!-- Bar Chart -->
<script>
var ctx = document.getElementById("myChart");
var myChart = new Chart(ctx, {
    type: 'bar',
   data:{
   labels: ["White", "African American", "Asian", "Hispanic", "Two or More", "Other"],
        datasets: [{
            data: [58, 11, 6, 13, 9, 2],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 2
        }]
},
    options: {
      legend: {
      display: false
    },
        scales: {
          xAxes: [{
            gridLines: {
              display: false
            },
            ticks: {
              fontFamily: "Cursive",
              fontSize: 13,
            }
          }],
            yAxes: [{
            ticks: {

                   min: 0,
                   max: 100,
                   callback: function(value){return value+ "%"}
                },

            }]
        }
    }
});

</script>

<!-- 2nd map -->
<script>
//copy your access token here
  mapboxgl.accessToken = 'pk.eyJ1IjoiamthbmcxIiwiYSI6ImNrZ3d5NjR3NDBldzgycW8zdDZ0NTZvYjAifQ.lUQQ9nNNJryYS05ye4FpLA';

  var map2 = new mapboxgl.Map({
    container: 'map2',// HTML container id
    style:  'mapbox://styles/jkang1/ckibi649h0r7q19nzsffgr2jk',// style URL
    center: [-122.4652388, 47.2414268],// starting position as [lng, lat]
    zoom: 10.5 // starting zoom
  });

//Tacoma boundary
  map2.on('load', function(){
  map2.addSource('Population', {
            "type": "geojson",
            "data": "Geojson/Tacoma.geojson"
        });
  map2.addLayer({
          "id":"Population_total",
          "type":"fill",
          "source":"Population",
          "paint": {
              "fill-color": "grey",
              "fill-opacity": 0.3
          }
        });

    });

//Schools

  var geojson ={"type":"FeatureCollection", "features": [
  {"type":"Feature","geometry":{"type":"Point","coordinates":[-122.46797386019246,47.24181419024509]},"properties":{"OBJECTID":10,"NAME":"Bates Technical College - Central Campus","ADDRESS":"2320 S 19TH ST","CITY":"TACOMA","ZIP":"98405","DISTRICT":"NOT APPLICABLE","DIST_NO":"",'description':
  '<p><a href="https://batestech.edu/" target="_blank" title="Opens in a new window">Bates Technical College</a> has three comprehensive campuses in Tacoma that offer two-year degrees, short-term certificates, academic courses, a technical high school and life-long learning.</p>',"TYPE":"TECHNICAL","PHONE":"(253) 680-7603","WEBSITE":"https://batestech.edu/","PRS_ID":342,"GRADE":"Higher Education","X_COORD":1151634.216,"Y_COORD":702078.521}},
  {"type":"Feature","geometry":{"type":"Point","coordinates":[-122.44638853983874,47.25150616140254]},"properties":{"OBJECTID":11,"NAME":"Bates Technical College - Downtown Campus","ADDRESS":"1101 S YAKIMA AVE","CITY":"TACOMA","ZIP":"98405","DISTRICT":"NOT APPLICABLE","DIST_NO":"",'description':
  '<p><a href="https://batestech.edu/" target="_blank" title="Opens in a new window">Bates Technical College</a> has three comprehensive campuses in Tacoma that offer two-year degrees, short-term certificates, academic courses, a technical high school and life-long learning.</p>',"TYPE":"TECHNICAL","PHONE":"(253) 680-7000","WEBSITE":"https://batestech.edu/","PRS_ID":241,"GRADE":"Higher Education","X_COORD":1157081.4561,"Y_COORD":705479.4874}},
  {"type":"Feature","geometry":{"type":"Point","coordinates":[-122.4664954172474,47.18787255736512]},"properties":{"OBJECTID":12,"NAME":"Bates Technical College - South Campus","ADDRESS":"2201 S 78TH ST","CITY":"TACOMA","ZIP":"98409","DISTRICT":"NOT APPLICABLE","DIST_NO":"",'description':
  '<p><a href="https://batestech.edu/" target="_blank" title="Opens in a new window">Bates Technical College</a> has three comprehensive campuses in Tacoma that offer two-year degrees, short-term certificates, academic courses, a technical high school and life-long learning.</p>', "TYPE":"TECHNICAL","PHONE":"(253) 680-7400","WEBSITE":"https://batestech.edu/","PRS_ID":253,"GRADE":"Higher Education","X_COORD":1151510.8788,"Y_COORD":682400.9323}},
  {"type":"Feature","geometry":{"type":"Point","coordinates":[-122.43356750130378,47.23584809855413]},"properties":{"OBJECTID":230,"NAME":"School of Urban Ministry(SUM) - Tacoma","ADDRESS":"106 S 28TH ST","CITY":"TACOMA","ZIP":"98402","DISTRICT":"NOT APPLICABLE","DIST_NO":"", 'description':
  '<p><a href="https://schoolofurbanministry-tacoma.org/" target="_blank" title="Opens in a new window">SUM</a>  is a non-accredited two year school designed to prepare a person for ministry and leadership.</p>', "TYPE":"COLLEGE","PHONE":"(253) 584-3778","WEBSITE":"https://schoolofurbanministry-tacoma.org/","PRS_ID":465,"GRADE":"Higher Education","X_COORD":1160124.6015,"Y_COORD":699691.752}},
  {"type":"Feature","geometry":{"type":"Point","coordinates":[-122.52131208121116,47.24649936313513]},"properties":{"OBJECTID":261,"NAME":"Tacoma Community College (TCC) - Tacoma Campus","ADDRESS":"6501 S 19TH ST","CITY":"TACOMA","ZIP":"98466","DISTRICT":"NOT APPLICABLE","DIST_NO":"",'description':
  '<p><a href="https://www.tacomacc.edu/about/" target="_blank" title="Opens in a new window">TCC</a> a public community college in Tacoma, Washington and with satellite operations in Gig Harbor and the Bridge Program in partnership with The Evergreen State College.</p>', "TYPE":"COLLEGE","PHONE":"(253) 566-5000","WEBSITE":"https://www.tacomacc.edu/about/","PRS_ID":245,"GRADE":"Higher Education","X_COORD":1138433.3381,"Y_COORD":704121.8411}},
  {"type":"Feature","geometry":{"type":"Point","coordinates":[-122.48106796359309,47.261862051220184]},"properties":{"OBJECTID":273,"NAME":"University Of Puget Sound (UPS)","ADDRESS":"1500 N WARNER ST","CITY":"TACOMA","ZIP":"98416","DISTRICT":"NOT APPLICABLE","DIST_NO":"",'description':
  '<p><a href="https://www.pugetsound.edu/" target="_blank" title="Opens in a new window">UPS</a> is a private university affiliated with the United Methodist Church.</p>',"TYPE":"UNIVERSITY","PHONE":"(253) 879-3100","WEBSITE":"https://www.pugetsound.edu/","PRS_ID":252,"GRADE":"Higher Education","X_COORD":1148566.373,"Y_COORD":709469.9368}},
  {"type":"Feature","geometry":{"type":"Point","coordinates":[-122.43828053661741,47.24504511461952]},"properties":{"OBJECTID":274,"NAME":"University of Washington - Tacoma ( UWT )","ADDRESS":"1900 COMMERCE ST","CITY":"TACOMA","ZIP":"98402","DISTRICT":"NOT APPLICABLE","DIST_NO":"",'description':
  '<p><a href="https://www.tacoma.uw.edu/" target="_blank" title="Opens in a new window">UWT</a> is a public university in Tacoma, Washington. It is a satellite campus of the University of Washington.</p>', "TYPE":"UNIVERSITY","PHONE":"(253) 692-4400","WEBSITE":"http://www.tacoma.uw.edu/","PRS_ID":243,"GRADE":"Higher Education","X_COORD":1159036.5583,"Y_COORD":703074.0025}}
]};
    // add markers to map
    geojson.features.forEach(function(marker) {

      // create a HTML element for each feature
      var el = document.createElement('div');
      el.className = 'marker';

      // make a marker for each feature and add to the map
      new mapboxgl.Marker(el)
        .setLngLat(marker.geometry.coordinates)
        .setPopup(new mapboxgl.Popup()
           .setHTML("Name: " + "<b>" + marker.properties['NAME'] + '</b>' + "<br>" + "Address: " + "<b>" + marker.properties['ADDRESS']  + "<b>" + marker.properties['description']))
        .addTo(map2);
      });

//Museums
      var geojson ={"type":"FeatureCollection", "features": [

      {"type":"Feature","geometry":{"type":"Point","coordinates":[-122.4359, 47.2448093]},"properties":{"OBJECTID":261,"NAME":"Washington State History Museum","ADDRESS":"1801 Dock Street","CITY":"TACOMA", 'description':
      '<p><a href="https://www.washingtonhistory.org/" target="_blank" title="Opens in a new window">Washington State History Museum</a> exhibits the history of Washington state and its relation to the Pacific Northwest.</p>'}},
      {"type":"Feature","geometry":{"type":"Point","coordinates":[-122.434042, 47.2456057]},"properties":{"OBJECTID":261,"NAME":"Museum of Glass","ADDRESS":"1911 Pacific Avenue","CITY":"TACOMA", 'description':
      '<p><a href="https://www.museumofglass.org/" target="_blank" title="Opens in a new window">Museum of Glass</a> has been committed to creating a space for the celebration of the studio glass movement through nurturing artists, implementing education, and encouraging creativity.</p>'}},
      {"type":"Feature","geometry":{"type":"Point","coordinates":[-122.4372562, 47.249025]},"properties":{"OBJECTID":273,"NAME":"Children's Museum of Tacoma","ADDRESS":"1501 Pacific Avenue","CITY":"TACOMA", 'description':
      '<p><a href="https://playtacoma.org/" target="_blank" title="Opens in a new window">Childrens Museum of Tacoma</a> offers hands on play-to-learn experiences for children.</p>'}},
      {"type":"Feature","geometry":{"type":"Point","coordinates":[-122.4303602, 47.2358757]},"properties":{"OBJECTID":273,"NAME":"LeMay - America’s Car Museum","ADDRESS":"2702 E D Street","CITY":"TACOMA", 'description':
      '<p><a href="https://www.americascarmuseum.org/" target="_blank" title="Opens in a new window">LeMay - America’s Car Museum</a> exhibits a 350-car gallery showing cars notable for their speed, technology and design, as well as their importance to car culture.</p>'}},
      {"type":"Feature","geometry":{"type":"Point","coordinates":[-122.4367418, 47.2474571]},"properties":{"OBJECTID":274,"NAME":"Tacoma Art Museum","ADDRESS":"1701 Pacific Avenue","CITY":"TACOMA", 'description':
      '<p><a href="https://www.tacomaartmuseum.org/" target="_blank" title="Opens in a new window">Tacoma Art Museum</a> exhibits feature Dale Chihuly glass works, European Impressionism, Japanese prints & American art.</p>'}}
      ]};

      // add markers to map
      geojson.features.forEach(function(marker2) {

        // create a HTML element for each feature
        var el = document.createElement('div');
        el.className = 'marker2';

        // make a marker for each feature and add to the map
        new mapboxgl.Marker(el)
          .setLngLat(marker2.geometry.coordinates)
          .setPopup(new mapboxgl.Popup()
             .setHTML("Name: " + "<b>" + marker2.properties['NAME'] + '</b>' + "<br>" + "Address: " + "<b>" + marker2.properties['ADDRESS'] + "<b>" + marker2.properties['description']))
          .addTo(map2);
        });

//Other Places to visit
        var geojson ={"type":"FeatureCollection", "features": [

        {"type":"Feature","geometry":{"type":"Point","coordinates":[-122.5280797, 47.309607]},"properties":{"OBJECTID":261,"NAME":"Point Defiance Park","ADDRESS":"5400 N Pearl Street","CITY":"TACOMA", 'description':
          '<p><a href="https://www.metroparkstacoma.org/place/point-defiance-park/" target="_blank" title="Opens in a new window">Point Defiance Park</a> is a large urban park including Point Defiance Zoo & Aquarium, the Rose Garden, Rhododendron Garden, beaches, and more. What a great place for a date!</p>'}},

        {"type":"Feature","geometry":{"type":"Point","coordinates":[-122.4674527, 47.2163823]},"properties":{"OBJECTID":261,"NAME":"Tacoma Mall","ADDRESS":"4502 S Steele Street","CITY":"TACOMA", 'description':
          '<p><a href="https://www.simon.com/mall/tacoma-mall" target="_blank" title="Opens in a new window">Tacoma Mall</a> is the largest shopping center in Tacoma. This is a place to go for shopping in Tacoma!</p>'}},

        {"type":"Feature","geometry":{"type":"Point","coordinates":[-122.5510417, 47.2687898]},"properties":{"OBJECTID":261,"NAME":"Tacoma Narrow Bridge","ADDRESS":"N/A","CITY":"TACOMA", 'description':
          '<p><a href="https://www.wsdot.wa.gov/TNBhistory/" target="_blank" title="Opens in a new window">Tacoma Narrow Bridge</a> is a pair of twin suspension bridges connect the city of Tacoma with the Kitsap Peninsula and carry State Route 16 over the strait. Watch out for a toll $$! </p>'}},

        {"type":"Feature","geometry":{"type":"Point","coordinates":[-122.4128803, 47.2656362]},"properties":{"OBJECTID":273,"NAME":"Port of Tacoma","ADDRESS":"One Sitcum Plaza","CITY":"TACOMA", 'description':
          '<p><a href="https://www.portoftacoma.com/" target="_blank" title="Opens in a new window">Port of Tacoma</a> is an independent seaport located in Tacoma, Washington.</p>'}},

        {"type":"Feature","geometry":{"type":"Point","coordinates":[-122.46047, 47.2749337]},"properties":{"OBJECTID":261,"NAME":"Tacoma Chinese Reconciliation Park","ADDRESS":"1741 N Schuster Pkwy","CITY":"TACOMA", 'description':
          '<p><a href="https://www.tacomachinesepark.org/" target="_blank" title="Opens in a new window">Tacoma Chinese Reconciliation Park</a> is a waterfront park created as an appeasement for the violent expulsion of Chinese residents in 1885.</p>'}},

        {"type":"Feature","geometry":{"type":"Point","coordinates":[-122.4853649, 47.1785793]},"properties":{"OBJECTID":273,"NAME":"H-Mart","ADDRESS":"8720 S Tacoma Way","CITY":"TACOMA", 'description':
          '<p><a href="https://www.hmartus.com/" target="_blank" title="Opens in a new window">H-Mart</a> is a Korean grocery store in South Tacoma Way. The biggest Korean store in Tacoma.</p>'}},

        {"type":"Feature","geometry":{"type":"Point","coordinates":[-122.4394821, 47.222284]},"properties":{"OBJECTID":274,"NAME":"East Asia Market","ADDRESS":"602 S 38th Street","CITY":"TACOMA", 'description':
          '<p><a href="https://www.yelp.com/biz/east-asia-supermarket-tacoma" target="_blank" title="Opens in a new window">East Asia Market</a> is a international grocery store in Lincoln District. Looking for Asian food? This is a great place to go.</p>'}}

        ]};

        // add markers to map
        geojson.features.forEach(function(marker3) {

          // create a HTML element for each feature
          var el = document.createElement('div');
          el.className = 'marker3';

          // make a marker for each feature and add to the map
          new mapboxgl.Marker(el)
            .setLngLat(marker3.geometry.coordinates)
            .setPopup(new mapboxgl.Popup()
               .setHTML("Name: " + "<b>" + marker3.properties['NAME'] + '</b>' + "<br>" + "Address: " + "<b>" + marker3.properties['ADDRESS'] + "<b>" + marker3.properties['description']))
            .addTo(map2);
          });

//Other Places to visit
        var geojson ={"type":"FeatureCollection", "features": [

        {"type":"Feature","geometry":{"type":"Point","coordinates":[-122.4403619, 47.2545226]},"properties":{"OBJECTID":261,"NAME":"Theatre on the Square","ADDRESS":"915 Broadway","CITY":"TACOMA", 'description':
          '<p><a href="https://www.tacomaartslive.org/" target="_blank" title="Opens in a new window">Theatre on the Square</a> is a modern, 300-seat theater located in a historic Theater District of Tacoma.</p>'}},


        {"type":"Feature","geometry":{"type":"Point","coordinates":[-122.4886158, 47.2716801]},"properties":{"OBJECTID":273,"NAME":"Blue mouse theatre","ADDRESS":"2611 N Proctor Street","CITY":"TACOMA", 'description':
          '<p><a href="https://bluemousetheatre.com/" target="_blank" title="Opens in a new window">Blue mouse theatre</a> is a small second-run movie theater located in the Proctor District in the north end of Tacoma and the oldest continuously operating theater in Washington State.</p>'}},

        {"type":"Feature","geometry":{"type":"Point","coordinates":[-122.4526455, 47.2623197]},"properties":{"OBJECTID":273,"NAME":"Tacoma Little theatre","ADDRESS":"210 N I Street","CITY":"TACOMA", 'description':
          '<p><a href="https://www.tacomalittletheatre.com/" target="_blank" title="Opens in a new window">Tacoma Little theatre</a> is a small community performing arts center dating to 1918 with 6 plays per year & educational programs.</p>'}},

        {"type":"Feature","geometry":{"type":"Point","coordinates":[-122.5320482, 47.2553082]},"properties":{"OBJECTID":274,"NAME":"Tacoma Musical Playhouse","ADDRESS":"7116 6th Ave","CITY":"TACOMA", 'description':
          '<p><a href="https://tmp.org/" target="_blank" title="Opens in a new window">Tacoma Musical Playhouse</a> is a community performing arts center in a renovated movie house staging musicals for adults & children.</p>'}}

        ]};

        // add markers to map
        geojson.features.forEach(function(marker4) {

          // create a HTML element for each feature
          var el = document.createElement('div');
          el.className = 'marker4';

          // make a marker for each feature and add to the map
          new mapboxgl.Marker(el)
            .setLngLat(marker4.geometry.coordinates)
            .setPopup(new mapboxgl.Popup()
               .setHTML("Name: " + "<b>" + marker4.properties['NAME'] + '</b>' + "<br>" + "Address: " + "<b>" + marker4.properties['ADDRESS'] + "<b>" + marker4.properties['description']))
            .addTo(map2);
          });

//Geocoder
  map2.addControl(
      new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl
      })
      );

//Zoom
  map2.addControl(new mapboxgl.NavigationControl());
