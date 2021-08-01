

//const displayTable =document.querySelector('.display-Table');
const dataTable =  document.querySelector(`.table-data`);
const loader =  document.querySelector(`.loader`);
const uploadForm =document.querySelector('.form--upload');
const displayDataForm =document.querySelector('.form-displayData');
const displayOptions =document.querySelector('.displayOptions');
const backButton =document.querySelector('.back-btn');
const goToCharts =document.querySelector('.charts-btn');



const uploadFile = async (data)=>{  //type is data or password

    const url = '/uploadFileData'

    try{
       let result = await axios({
            method: 'POST',
            url,
            data
            
            
            });


           /* if(result.data.status.toUpperCase()==='SUCCESS'){

              //showAlert('success', `${type} Updated Successfully`);
              alert("upload success");

            }*/

            console.log(result);
            loader.style.display="none";
            alert("successfully uploaded to MongoDb")

    }catch(err){

             //showAlert('error', err);
             alert('error', err);
             console.log(err);

    }


};


const displayData = async (hashnum)=>{

    const url = '/displayData'

    try{
       let result = await axios({
            method: 'GET',
            url,
            params:{
                hashnum
            }
            
            
            });


           /* if(result.data.status.toUpperCase()==='SUCCESS'){

              //showAlert('success', `${type} Updated Successfully`);
              alert("upload success");

            }*/
            loader.style.display="none";
            //uploadForm.style.display="none";
            displayOptions.style.display="none";
           
            console.log("RETURNED DATA FROM BACKEND FOR DISPLAY DATA");
            console.log(result);
            if(dataTable) {


                dataTable.innerHTML = result.data.data;
                backButton.style.display = "block";
                goToCharts.style.display="block";
            }

    }catch(err){

             //showAlert('error', err);
             alert('error', err);
             console.log(err);

    }

}



console.log(uploadForm);

if(uploadForm){
    
    uploadForm.addEventListener('submit', e=>{


        e.preventDefault();
        //imitate multipart/form-data to be used in ajax function used in update settings
        const form= new FormData();
        //form.append('name', document.getElementById('name').value);
        //form.append('email', document.getElementById('email').value);
        form.append('uploadedFile', document.getElementById('uploadedFile').files[0]);
        console.log(document.getElementById('uploadedFile').files[0]);

      loader.style.display = "block";
      uploadFile(form);
        console.log("clicked file upload");
    })

}


console.log(displayDataForm);

if(displayDataForm){
    
    displayDataForm.addEventListener('submit', e=>{

        
        
        e.preventDefault();
        //imitate multipart/form-data to be used in ajax function used in update settings
        //const form= new FormData();
        //form.append('name', document.getElementById('name').value);
        //form.append('email', document.getElementById('email').value);
        ////form.append('uploadedFile', document.getElementById('uploadedFile').files[0]);
        //console.log(document.getElementById('uploadedFile').files[0]);
        console.log("clicked data display");
        let hashnum =document.getElementById('hashnum').value;
        console.log(hashnum);
       // displayTable.style.display = 'block';
       loader.style.display = "block";
       displayData(hashnum);
        
    })

}




