function check_validations(event){
    event.preventDefault();

    var relationship = document.getElementById("relationship").value;
    var nominee_name = document.getElementById("nominee_name").value;
    var dob = document.getElementById("dob").value; 
    var new_add = document.getElementById("new_add");
    var old_add = document.getElementById("old_add");
    var address = document.getElementById("address").value;
    var pincode = document.getElementById("pincode").value;
    var city = document.getElementById("city").value;
    var State = document.getElementById("State").value;
    var Country = document.getElementById("Country").value;

    if(relationship === "null" && nominee_name === '' && dob === '' && pincode === ''){
        alert("Please Fill the form then submit ");
    }
    else if (relationship === "null" || nominee_name === '' || dob === '' || pincode === '' || city === '' || State === '' || Country === '' ){
            
        if (relationship === "null"){ document.getElementById("check_relationship").hidden= false;}
            else { document.getElementById("check_relationship").hidden= true;}

            if (nominee_name === ''){ document.getElementById("check_nominee_name").hidden= false;}
            else { document.getElementById("check_nominee_name").hidden= true;}

            if (dob === ''){ document.getElementById("check_dob").hidden= false;}
            else { document.getElementById("check_dob").hidden= true;}

            if(new_add.checked)
            {
                if(address === ''){
                    document.getElementById("check_address").hidden= false;
                }
                else{
                    document.getElementById("address").value ='';
                    document.getElementById("address").readOnly = false;
                    document.getElementById("check_address").hidden= true;
                }
            }
            else if(old_add.checked){
                document.getElementById("check_address").hidden= true;
                fetch('http://localhost:3000/address')
                .then(response => response.json())
                .then(data => {
                    console.log(data[0].add);
                    document.getElementById("address").value = data[0].add;
                    document.getElementById("address").readOnly = true;
                })
                .catch(error => console.log(error))
            }
            else{
                document.getElementById("check_address").hidden= false;
            }

            if (pincode === ''){ document.getElementById("check_pincode").hidden= false;}
            else { document.getElementById("check_pincode").hidden= true;}

            if (city === ''){ document.getElementById("check_city").hidden= false;}
            else { document.getElementById("check_city").hidden= true;}

            if ( State=== ''){ document.getElementById("check_state").hidden= false;}
            else { document.getElementById("check_state").hidden= true;}

            if ( Country === ''){ document.getElementById("check_country").hidden= false;}
            else { document.getElementById("check_country").hidden= true;}
    }
    else
    {
        get_data();
    }
}

async function get_data(){
    console.log("calling get_values");

    var data={relationship :"",nominee_name :"",dob :"",address :"",pincode:"",city :"",State: "",Country :""};

    data.relationship = document.getElementById("relationship").value;
    data.nominee_name = document.getElementById("nominee_name").value;
    data.dob = document.getElementById("dob").value; 
    //var new_add = document.getElementById("new_add").value;
    data.address = document.getElementById("address").value;
    //var old_add = document.getElementById("old_add").value;
    data.pincode = document.getElementById("pincode").value;
    data.city = document.getElementById("city").value;
    data.State = document.getElementById("State").value;
    data.Country = document.getElementById("Country").value;

    for(let value in data){
        console.log(value + ":" +data[value]);
    }  
    const res= await fetch('http://localhost:3000/nominee_details',{
        method : 'POST',
        body : JSON.stringify(data),
        headers :{
            'Content-Type' :'application/json'
        }
    })
    .catch(error => console.log(error));

    if (res.status == 201)
    {
        location.href ="/view.html";
    }
    else{
        console.log("view page can't called");
    }
}
async function view_data() {
    console.log("view data called");
    var temp ="";
    await fetch('http://localhost:3000/nominee_details')
    .then(response => response.json())
    .then(data => {
        for(let i in data){
            temp += '<tr>';
            // temp += '<td>' + data[i].id +'</td>';
            temp += '<td>' + data[i].relationship +'</td>';
            temp += '<td>' + data[i].nominee_name +'</td>';
            temp += '<td>' + data[i].dob +'</td>';
            temp += '<td>' + data[i].address +'</td>';
            temp += '<td>' + data[i].pincode +'</td>';
            temp += '<td>' + data[i].city +'</td>';
            temp += '<td>' + data[i].State +'</td>';
            temp += '<td>' + data[i].Country +'</td>';
            temp += '<td><button id="update_btn" onclick="update_data('+data[i].id+')">Edit</button> <button id="delete_btn" onclick="delete_data('+data[i].id+')">Delete</button></td>'
            temp += '</tr>';
        }
        document.getElementById("data").innerHTML = temp;
    })
    .catch(error => console.log(error));
}

async function delete_data(id) {
    
    await fetch('http://localhost:3000/nominee_details/'+id,{
        method :"DELETE",
        headers : {
            'Content-Type' :'application/json'
        }
    });
    alert("Are you sure u want to delete ?");
    
}

async function update_data(id){
   
        // set_values(id);
        var modal = document.getElementById("myModal");
        
        // Get the button that opens the modal
        var btn = document.getElementById("update_btn");
        
        // Get the <span> element that closes the modal
        var span = document.getElementsByClassName("close")[0];
        
        // When the user clicks the button, open the modal 
        modal.style.display = "block";
        
        // When the user clicks on <span> (x), close the modal
        span.onclick = function() {
          modal.style.display = "none";
        }
        
        // When the user clicks anywhere outside of the modal, close it
        window.onclick = function(event) {
          if (event.target == modal) {
            modal.style.display = "none";
          }
        };
        set_values(id);

}

function set_values(id){
    fetch('http://localhost:3000/nominee_details/'+id)
    .then(response => response.json())
    .then(data =>{
        console.log(data);
        document.getElementById("edit_nominee_name").value = data.nominee_name;
        document.getElementById("edit_relationship").value = data.relationship;
        document.getElementById("address").value = data.address;
        document.getElementById("edit_dob").value = data.dob;
        document.getElementById("edit_pincode").value = data.pincode;
        document.getElementById("edit_city").value = data.city;
        document.getElementById("edit_State").value = data.State;
        document.getElementById("edit_Country").value = data.Country;

        put_values(id);
    })
    .catch(error => console.log(error))
}

async function put_values(id){
    const res = edit_check_validations();
    if(res == true)
    console.log("its put function");
}

function edit_check_validations(){
    // event.preventDefault();
    console.log("called edit validations");

    var relationship = document.getElementById("edit_relationship").value;
    var nominee_name = document.getElementById("edit_nominee_name").value;
    var dob = document.getElementById("edit_dob").value; 
    var new_add = document.getElementById("edit_new_add");
    var old_add = document.getElementById("edit_old_add");
    //var address = document.getElementById("edit_address").value;
    var pincode = document.getElementById("edit_pincode").value;
    var city = document.getElementById("edit_city").value;
    var State = document.getElementById("edit_State").value;
    var Country = document.getElementById("edit_Country").value;

    if(relationship === "null" && nominee_name === '' && dob === '' && pincode === ''){
        alert("Please Fill the form then submit ");
    }
    else if (relationship === "null" || nominee_name === '' || dob === '' || pincode === '' || city === '' || State === '' || Country === '' ){
            
        if (relationship === "null"){ document.getElementById("check_relationship").hidden= false;}
            else { document.getElementById("check_relationship").hidden= true;}

            if (nominee_name === ''){ document.getElementById("check_nominee_name").hidden= false;}
            else { document.getElementById("check_nominee_name").hidden= true;}

            if (dob === ''){ document.getElementById("check_dob").hidden= false;}
            else { document.getElementById("check_dob").hidden= true;}

            if(new_add.checked)
            {
                if(address === ''){
                    document.getElementById("check_address").hidden= false;
                }
                else{
                    document.getElementById("check_address").hidden= true;
                }
            }
            else if(old_add.checked){
                document.getElementById("check_address").hidden= true;
            }
            else{
                document.getElementById("check_address").hidden= false;
            }

            if (pincode === ''){ document.getElementById("check_pincode").hidden= false;}
            else { document.getElementById("check_pincode").hidden= true;}

            if (city === ''){ document.getElementById("check_city").hidden= false;}
            else { document.getElementById("check_city").hidden= true;}

            if ( State=== ''){ document.getElementById("check_state").hidden= false;}
            else { document.getElementById("check_state").hidden= true;}

            if ( Country === ''){ document.getElementById("check_country").hidden= false;}
            else { document.getElementById("check_country").hidden= true;}
    }
    else
    {
        // get_data();
        console.log("now call get data");
        return true;
    }
}