/**
 * Create the map
 */
var map = AmCharts.makeChart("chartdiv", {
  "type": "map",
  "theme": "light",
  "projection": "eckert3",
  "zoomOnDoubleClick": false,
  "dragMap": false,
  "zoomControl": {
    "zoomControlEnabled": false,
    "homeButtonEnabled": false
  },
  "dataProvider": {
    "map": "worldLow",
    //"getAreasFromMap": true,
    "areas": [
     // { "id": "AU", "showAsSelected": true},
     // { "id": "US", "showAsSelected": true }
      ]
  },
  "areasSettings": {
    "selectedColor": "#CC0000",
    "selectable": true
  },
  /**
   * Add click event to track country selection/unselection
   */
  "listeners": [{
    "event": "clickMapObject",
    "method": function(e) {
      
      // Ignore any click not on area
      if (e.mapObject.objectType !== "MapArea")
        return;
      
      var area = e.mapObject;
      
      // Toggle showAsSelected
      area.showAsSelected = !area.showAsSelected;
      e.chart.returnInitialColor(area);
      console.log(area.id);
      // Update the list
//      document.getElementById("selected").innerHTML = JSON.stringify(getSelectedCountries());
    }
  }]
});

/**
 * Function which extracts currently selected country list.
 * Returns array consisting of country ISO2 codes
 */
/*function getSelectedCountries() {
  var selected = [];
  for(var i = 0; i < map.dataProvider.areas.length; i++) {
    if(map.dataProvider.areas[i].showAsSelected)
      selected.push(map.dataProvider.areas[i].id);
  }
  return selected;
}
*/

$(document).ready(function(){

  var yearList = {
    "2016": ["TH"],
    "2015": ["MY", "BN", "NZ"],
    "2014": ["KH"],
    "2013": ["NO", "NL", "PL", "HU", "DK", "SE", "FI", "RU", "EE", "VN"],
    "2012": ["IS", "FR", "BE", "DE", "CZ", "AT", "IL"],
    "2011": ["AR", "BR", "PY"],
    "2010": ["US", "CA"]
  }
    
  $("#testing").click(function(){
    //map.dataProvider.getAreasFromMap=false;
    //map.dataProvider.areas[20].showAsSelected = true;
    areas = [
      { "id": "AU", "showAsSelected": true},
      { "id": "US", "showAsSelected": true},
      { "id": "FR", "showAsSelected": true}
    ]

    map.dataProvider.areas = areas;
    //var rand = Math.floor(Math.random() * 150);
    //map.dataProvider.areas[rand].showAsSelected = !map.dataProvider.areas[rand].showAsSelected;
    //console.log(areas);
    map.validateData();
  });

  $("#year_slider").on('input', function() {
    $currentYear =  $("#year_slider").val();
    $("#year").html($currentYear);
    areas = map.dataProvider.areas;
    //areas = [];
    var $thisYear = yearList[$currentYear];
    if($thisYear == undefined) { return; }
    //display each year, but erase previous years
    $.each($thisYear, function(index, value) {
    //console.log(value);
      areas.push({
        "id": value,
        "showAsSelected": true
      });
    });
    
    map.dataProvider.areas = areas;
    map.validateData();
    //yearList[$currentYear].
  });

});

