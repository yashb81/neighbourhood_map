# neighbourhood_map

open index.html to run the program.


API used are : 1. Getty Images
               2. Wikipedia
--------------------------------------------------------------------------------------------------------------

          <div class="dropdown col-md-3">
						<button class="dropbtn">Getty Images</button>
	  					<div class="dropdown-content">
						    <ul type = "none" data-bind="foreach:marking1">
						    	<li>
						    		<a href=# data-bind="visible:displayed,text:title,click:f1">  
						    		</a> 
						    	</li>
						    </ul>
						 </div>
					</div>
          
This part of the code is referenced from the w3schools

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

This part of the code is referenced from stackoverflow

----------------------------------------------------------------------------------------------------------------------------------
