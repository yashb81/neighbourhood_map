//ARRAY CONTAINING LIST OF PLACES ON WHICH GETTY IMAGES API IS TO BE USED
var spot1 = [
  {
    name: "India Gate",
  	lat: 28.612864,
  	lng: 77.229306,
  	is_selected: false,
  	displayed: true,
  },
  {
  	name: "Humayun's Tomb",
  	lat: 28.593264 ,
  	lng: 77.250602,
  	is_selected: false,
  	displayed: true,
  },
  {
  	name: "Jama Masjid",
  	lat: 28.6507 ,
  	lng: 77.2334,
  	is_selected: false,
  	displayed: true,
  }
  ];
//ARRAY CONTAINING LIST OF PLACES ON WHICH WIKIPEDIA API IS TO BE USED
  var spot2 = [
  {
    name: "Raj Ghat",
    lat: 28.64055, 
    lng: 77.249433,
    is_selected: false,
    displayed: true,
  },
  {
    name: "Red Fort",
    lat: 28.656 ,
    lng: 77.241,
    is_selected: false,
    displayed: true,
  },
  {
    name: "Jantar Mantar",
    lat: 28.627108 ,
    lng: 77.216478,
    is_selected: false,
    displayed: true,
  }
  ];

//DECLARATION OF VARIABLES
var marking1,marking2;
var map,msg;

//INITIALLY CALLED FUNCTION
function init(){
  var x = document.getElementById('map'); //VARIABLE CONTAINING REFERENCE OF DIV WITH ID MAP
  map=new google.maps.Map(x, {
    zoom : 12,  //SETTING ZOOM OF MAP AT 12
    center: { lat: 28.64, lng:  77.248794}  //SETTING THE CENTER POINT OF THE MAP
  });
  ko.applyBindings(new showData()); //APPLYING OF BINDING USING KNOCKOUT JS
}

function showData(){
  msg=ko.observable();  //OBSERVABLE VARIABLE
  marking1 = ko.observableArray();  //OBSERVABLE ARRAY FOR CONTAINING MARKERS
  marking2 = ko.observableArray();  //OBSERVABLE ARRAY FOR CONTAINING MARKERS
  for(var i = 0; i < 3; i++){
    var mark=new google.maps.Marker({
      title: spot1[i].name, //SETTING MARKER TITLE
      position:{lat:spot1[i].lat, lng:spot1[i].lng}, //SETTING MARKER POSITION
      icon : 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png', //SETTING MARKER ICON
      displayed: ko.observable(spot1[i].displayed), //SETTING DISPLAY
      map: map, //SETTING MAP ON WHICH MARKER IS TOO BE SHOWN
      animation: google.maps.Animation.DROP //SETTING ANIMATION OF MARKER
    });
    marking1.push(mark);  //PUSHING THE MARKER INTO ARRAY CONTAINING MARKERS
    mark.addListener('click', function(){ //ADDING ON CLICK LISTENER
      getty(this.title);  //CALLING FUNCTION CONTAINING GETTY IMAGES API
      this.setAnimation(google.maps.Animation.DROP);  //SETTING ANIMATION
    });
  }

  for(var i = 0; i < 3; i++){
    var mark2=new google.maps.Marker({
      title: spot2[i].name, //SETTING MARKER TITLE
      position:new google.maps.LatLng(spot2[i].lat,spot2[i].lng), //SETTING MARKER POSITION
      icon : 'http://maps.google.com/mapfiles/ms/icons/red-dot.png', //SETTING MARKER ICON
      displayed: ko.observable(spot2[i].displayed),//SETTING DISPLAY
      map: map, //SETTING MAP ON WHICH MARKER IS TOO BE SHOWN
      animation: google.maps.Animation.DROP //SETTING ANIMATION OF MARKER
    });
    marking2.push(mark2);//PUSHING THE MARKER INTO ARRAY CONTAINING MARKERS
    mark2.addListener('click', function(){ //ADDING ON CLICK LISTENER
      wiki(this.title); //CALLING FUNCTION CONTAINING WIKIPEDIA API
      this.setAnimation(google.maps.Animation.DROP);  //SETTING ANIMATION
    });
  }
  query1=ko.observable(''); //OBSERVABLE VARIABLE USED TO FILTER DATA
  query2=ko.observable(''); //OBSERVABLE VARIABLE USED TO FILTER DATA

	//THE FUNCTION BELOW (check_data) WAS TAKEN FROM STACKOVERFLOW AND MODIFIED
	check_data = function(event){
    var g=0,l=0;
		if(query1().length!=0){
		  while(g<marking1().length){
        if(marking1()[g].title.toLowerCase().indexOf(query1().toLowerCase())>=0){
					marking1()[g].setVisible(true);  //MARKER'S VISIBILITY IS SET
					marking1()[g].displayed(true); //SET LIST ITEM TO TRUE
				}
				else{
					marking1()[g].setVisible(false); //MARKER'S VISIBILITY IS SET TO FALSE
					marking1()[g].displayed(false);  //LIST'S VISIBILITY IS SET TO FALSE
				}
        if(marking2()[g].title.toLowerCase().indexOf(query1().toLowerCase())>=0){
          marking2()[g].setVisible(true);  //MARKER'S VISIBILITY IS SET
          marking2()[g].displayed(true); //SET LIST ITEM TO TRUE
        }
        else
        {
          marking2()[g].setVisible(false); //MARKER'S VISIBILITY IS SET TO FALSE
          marking2()[g].displayed(false);  //LIST'S VISIBILITY IS SET TO FALSE
        }
				g++;
			}
		}
		else{
		  while(l<marking1().length){
				if(marking1()[l].getVisible()===false){	
				  marking1()[l].setVisible(true);
				  marking1()[l].displayed(true);
				}
        if(marking2()[l].getVisible()===false){ 
          marking2()[l].setVisible(true);
          marking2()[l].displayed(true);
        }
				l++;
			}
		}
	}

  //THE FUNCTION BELOW (check_data2) WAS TAKEN FROM STACKOVERFLOW AND MODIFIED
	check_data2 = function(event){
    var g=0,l=0;
		if(query2().length!=0){
			while(g<marking2().length){
				if(marking2()[g].title.toLowerCase().indexOf(query2().toLowerCase())>=0){
					marking2()[g].setVisible(true);  //MARKER'S VISIBILITY IS SET
					marking2()[g].displayed(true); //SET LIST ITEM TO TRUE
				}
				else
				{
					marking2()[g].setVisible(false); //MARKER'S VISIBILITY IS SET TO FALSE
					marking2()[g].displayed(false);  //LIST'S VISIBILITY IS SET TO FALSE
				}
				g++;
			}
		}
		else{
			while(l<marking2().length){
				if(marking2()[l].getVisible()===false){	
				  marking2()[l].setVisible(true);
				  marking2()[l].displayed(true);
				}
				l++;
			}
		}
	}
}

//THIS FUNCTION DOES ALL THE TASK FOR GETTY IMAGES API
function f1()
{
	this.setAnimation(google.maps.Animation.DROP);
	getty(this.title);
}

//THIS FUNCTION DOES ALL THE TASK FOR WIKIPEDIA API
function f2()
{
	this.setAnimation(google.maps.Animation.DROP);
	wiki(this.title);
}

//FUNCTION CONTAINING GETTY IMAGES API
function getty(title)
{
	var apiKey = 'w4ehkrbeeny4u4pbqds4hydv'; //API KEY
  var x = title;  //X CONTAINS TITLE OF THE MARKER
  $.ajax({
    type: 'GET',
    url: "https://api.gettyimages.com/v3/search/images/creative?phrase=" + x,
    beforeSend: function (request) {
      request.setRequestHeader("Api-Key", apiKey);
    }
  })
  .done(function (data) { //THIS FUNCTION WORKS WHEN THE CONNECTION IS SUCCESFULL
    var t = title+'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' +
            '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' +
            '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' +
            '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+"<img src='" + data.images[0].display_sizes[0].uri + "'/>";
    msg(t);      
  })
  .fail(function (data) { //THIS FUNCTION WORKS WHEN CONNECTION FAILS
    window.alert(JSON.stringify(data, 2));
  });
}

//FUNCTION CONTAINING WIKIPEDIA API
function wiki(title)
{
	$.ajax({
    type: "GET",
    url: 'https://en.wikipedia.org/w/api.php' + '?action=opensearch' +
    '&search=' + title +          //QUERY TO BE SEARCHED
    '&limit=1' +          //LIMITING THE RESULTS TO 1
    '&namespace=0' +         //SETTING RESULTS TO ARTICLES ONLY
    '&format=json',
    dataType: "jsonp",
    success: function (data) {    //THIS FUNCTION WORKS WHEN CONNECTION IS SUCCESSFULL
      var name = data[1][0];
      var result = data[2][0];
		  var linkwiki = data[3][0];
      var text=title+'<br>'+result+'<br>'+ '<a href = "' + linkwiki + '">' +linkwiki +'</a>';
		  msg(text);
    },
    error: function (e) {      //THIS FUNCTION WORKS WHEN THE CONNECTION FAILS
      window.alert("Error encountered. check connection and reload.");
    }
  });
}

//FUNCTION WITH ERROR MESSAGE
function errorAlert() {
  window.alert("Error encountered!!! Please try again later!!!");
}
