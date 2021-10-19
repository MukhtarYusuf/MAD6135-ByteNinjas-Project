
  function registerUser(){
	  var email = document.forms.registerForm.email.value;
	  var password = document.forms.registerForm.password.value;
	  var name = document.forms.registerForm.name.value;
	  var confirmPassword = document.forms.registerForm.passwordConfirm.value;

	  if(name == "")
	   {
		alert("Please enter name");
		return;
	        }

	  if(email == "")
	      {

	     	alert("Please enter email id");
	    	return;
	     
	      }
	      if(!validateEmail(email))
	       {
	
			alert("Please enter valid email id");
		    return;
	       }

	  if(password == "")
	    {
		alert("Please enter password");
		return;
	     }
	if(confirmPassword == ""){
		alert("Please enter confirm password");
		return;
	}
	if(confirmPassword != password){
		alert("Password and confirm password doesn't match");
		return;
	}

	var admin = JSON.parse(localStorage.getItem('adminUser'));
	var user = JSON.parse(localStorage.getItem('frontUser'));



	if(admin.email == email && admin.password == password){
		alert('User already exists');
		return;
	}
	else
	{
		var found = false;
		for(var i = 0; i < user.length; i++){
			if(user[i].email== email && user[i].password== password){
				found= true;
			}
		}

		if(found){
			alert('User already exists');
			return;
		}
		else
		{
			var newuser = {"email":email,"password":password,"name":name};
			user.push(newuser);
			localStorage.setItem('frontUser',JSON.stringify(user));
			alert('User registered successfully');
			window.href
			window.open("index.html");
			

		}
	}

}




function validateEmail(email) {
	const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(String(email).toLowerCase());
}









function loginUser() 
   {
	var email = document.forms.Login.email.value;
	var password = document.forms.Login.password.value;
	if(email == ""){
		alert("Please enter email id");
		return;
	}
	if(!validateEmail(email))
	{
		alert("Please enter valid email id");
		return;
	}

	if(password == ""){
		alert("Please enter password");
		return;
	}

	var admin = JSON.parse(localStorage.getItem('adminUser'));
	var user = JSON.parse(localStorage.getItem('frontUser'));



	if(admin.email == email && admin.password == password){
		alert('Admin Logged in');
		localStorage.setItem('currentUser', email);
		window.location.href='adminhome.html';
	}
	else
	   {
		var found = false;
		for(var i = 0; i < user.length; i++){
			if(user[i].email== email && user[i].password== password){
				found= true;
			}
		}

		if(found)
		{
		alert('User Logged in');
		localStorage.setItem('currentUser', email);
		window.location.href='index.html';
		}
		else
		{
			alert('Please check email and password');
		}
	}

}

function setDefaultUserData() {
	var admin = localStorage.getItem('adminUser');
	var user = localStorage.getItem('frontUser');
	if(user == undefined || user ==null){
		localStorage.setItem('frontUser', JSON.stringify([{"email":"user@ecom.com","password":"mind@123","name":"User"}]));
	}
	if(admin == undefined || admin ==null){
		localStorage.setItem('adminUser', JSON.stringify({"email":"admin@byteninjas.com","password":"password","name":"Admin"}));
		//localStorage.setItem('currentUser', '');
	//	localStorage.setItem('cartItem','');
	//	var products = [];
	//	var product1 = {'id':1,'name':'Sony Alpha DSLR Camera','price':'500','details':'Best Camera for entry level photographers','specifications':'20 MP camera'};
	//	products.push(product1);
	//	var product2 = {'id':2,'name':'Nikon DSLR Camera','price':'400','details':'Best Camera for entry level photographers','specifications':'16 MP camera'};
	//	products.push(product2);
	//	localStorage.setItem('products',JSON.stringify(products));
	}
	
}



function logout(){
	localStorage.setItem('currentUser', '');
	localStorage.setItem('cartItem','');
	alert('Logged qdqdout successfully');
	window.location.href='index.html';
}

setDefaultUserData();



