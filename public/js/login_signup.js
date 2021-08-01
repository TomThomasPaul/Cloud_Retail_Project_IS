//import {showAlert} from './alerts';
//import axios from 'axios';
const signup =async (name,email,password,passwordConfirm)=>{


try{
    const result = await axios({

        method : 'POST',
        url : '/createUser',
        data : {
         name,   
         email,
         password,
         passwordConfirm
        
        }
        
        });

        //console.log(result);

        if(result.data.status.toUpperCase() === 'SUCCESS'){

            //showAlert("success","Logged in Successfully");
            alert("Signed Up Successfully");
            console.log(result);
            window.setTimeout(()=>{
                
                location.assign('/home');
   
                },1000);
        }

}catch(err){

    //showAlert("error",err.response.data.message);
    alert("error",err.response.data.message);


}    


}



const login =async (email,password)=>{


    try{
        const result = await axios({
    
            method : 'POST',
            url : '/login',
            data : {
               
             email,
             password
            
            }
            
            });
    
            console.log(result);
    
            if(result.data.status.toUpperCase() === 'SUCCESS'){
    
                //showAlert("success","Logged in Successfully");
                alert("Logged in Successfully");
                console.log(result);
                window.setTimeout(async ()=>{
                
                 location.assign('/home');
                    
                 },1000);
            }
    
    }catch(err){
        console.log("error while logging in");
        //showAlert("error",err.response.data.message);
        alert(err.response.data.message);
        console.log(err.response);
    
    
    }    
    
    
    }

const logout = async (req, res)=>{

try{

    console.log("inside logout in login.js");

    const res = await axios({

        method : 'GET',
        url : '/api/v1/users/logout'
        
        });
        // console.log("after ajax logout");
        // console.log(res);
       // console.log(res.data.status);

        if(res.data.status.toUpperCase() === "SUCCESS"){
           // console.log('hey hey');
           window.location.reload(true);
           
        }



}catch(err){

//showAlert("error", `Error logging out: ${JSON.stringify(err)}`)
alert("error", `Error logging out: ${JSON.stringify(err)}`)

}




}




const signupform =document.querySelector('.form--signup');
console.log(signupform);
if(signupform){

    signupform.addEventListener('submit', e=>{

        e.preventDefault();
        const name = document.getElementById('s_name').value;
        const email = document.getElementById('s_email').value;
        const password = document.getElementById('s_password').value;
        const passwordConfirm = document.getElementById('s_passwordConfirm').value;
       signup(name,email,password, passwordConfirm); 
       // console.log(name, email, password, passwordConfirm);
        
        })
}


const loginform =document.querySelector('.form--login');
console.log(loginform);
if(loginform){

    loginform.addEventListener('submit', e=>{

        e.preventDefault();
        //const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
       // const passwordConfirm = document.getElementById('passwordConfirm').value;
       login(email,password); 
       // console.log(name, email, password, passwordConfirm);
        
        })
}


