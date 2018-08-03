/**
 * This is the entry point to the program
 *
 * @param {array} input Array of student objects
 */
function classifier(inputData) {
  // Your code should go here.

       var input=undefined;
        if( inputData instanceof Array){
                input =[];var clone=function(v){input.push(v)};
                inputData.forEach(clone); 
        }else if(inputData instanceof String){
           input=new String(inputData).toString();
      }else  if(typeof inputData =='object'){

         input={};
        for (var property in inputData){input[property] = inputData[property];}


        }
 
 
  var len= input.length;
  var result = {};
  result["noOfGroups"] = 0;

  if(input instanceof Array)
  {

  	if(input.length > 0)
  	{
  	  for (var i = 0; i < len ; i++)
  {
    var birthDate = new Date(input[i].dob);
    var birthYear = birthDate.getUTCFullYear();
    var birthMonth = birthDate.getUTCMonth();
    var birthDay = birthDate.getUTCDate();
    var currentDate = new Date();
        var currentYear = currentDate.getFullYear();
        var currentMonth = currentDate.getUTCMonth();
        var currentDay = currentDate.getUTCDate();
    var age = currentYear - birthYear;
    if (currentMonth < birthMonth|| currentMonth == birthMonth && currentDay < birthDay)
    { 
    	input[i]["age"] = age--;
    }
    else
    {
    	input[i]["age"]=age;
    }
  }

     input.sort(function(a, b) { return a.age - b.age; },0);

     var min,max,
         num = 1;
         groupName = "group"+num;

     min = input[0].age;
     for (var i = 0; i < len ; i++)
    { 
        

        if(!result.hasOwnProperty(groupName))
        {
          result[groupName] = {};
          result[groupName]["members"] = [];          
        }


          max = input[i].age;


         if((max - min) <= 5 && result[groupName]["members"].length <3)
         {

                  if(result[groupName]["members"].length == 0)
                  {
                     min = input[i].age;
                     result[groupName]["members"].push(input[i]);
                     result[groupName]["oldest"] = max;
                     result[groupName]["sum"]= max;
                       if(!result[groupName].hasOwnProperty("regNos"))
                       {
                          result[groupName]["regNos"] = [];                  
                       }
                     result[groupName]["regNos"].push(parseInt(input[i].regNo));
                     result[groupName].regNos.sort(function(a, b) { return a - b; });
                  }

                  else 
                  {  
                     min = result[groupName]["members"][0].age;           
                     result[groupName]["members"].push(input[i]);
                     result[groupName]["oldest"] = max;
                     result[groupName]["sum"]= result[groupName].sum + max;
                       if(!result[groupName].hasOwnProperty("regNos"))
                       {
                          result[groupName]["regNos"] = [];                  
                       }
                     result[groupName]["regNos"].push(parseInt(input[i].regNo));
                     result[groupName].regNos.sort(function(a, b) { return a - b; });
                  } 
               }

       
       else
       { 

             num++;
             groupName = "group"+num;
             result[groupName] = {};
             result[groupName]["members"]= []; 
             min =input[i].age;
             max =input[i].age;
             result[groupName]["members"].push(input[i]);
             result[groupName]["oldest"] = max;
             result[groupName]["sum"]= max;
                 if(!result[groupName].hasOwnProperty("regNos"))
                 {
                    result[groupName]["regNos"] = [];                  
                 }
             result[groupName]["regNos"].push(parseInt(input[i].regNo));
             result[groupName].regNos.sort(function(a, b) { return a - b; });
       }
       
       result["noOfGroups"] = num;

     }
   }


  	return result;
  }

  else
  {
  	 throw "invalid type";
  }



}

module.exports = classifier;
