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
    let params = `scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,
width=800,height=500,left=100,top=100`;

open('/edit.html', 'test', params);
    
        set_values(id);


};

function set_values(id){
    fetch('http://localhost:3000/nominee_details/'+id)
    .then(response => response.json())
    .then(data =>{
        console.log(data);
    })
    .catch(error => console.log(error))
}