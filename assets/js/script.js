/*  EXAMPLE OF FETCHING DATA FROM GITHUB REPOS
var getUserRepos = function(){
    //fetches data from the link..
    var response = fetch("https://api.github.com/users/octocat/repos"); 
    console.log(response);
};
*/

// Asynchronus Behaviour using then function inside Promise 
/* The Outside would get outputed before Inside. This is because in the event that API is running slower, 
you wouldn't want to hold on loading rest of your code. Therefore, JS sets aside the fetch request and continue 
implementing the rest of the code, then come back and run the fetch callback when the repository is ready. 
This is called Asynchronous Behaiour or AJAX: Asychronous JavaScript and XML. 
var getUserRepos = function(){
    fetch("https://api.github.com/users/octocat/repos").then(function(response){
    console.log("inside", response);
});

console.log("outside");
};
*/

/* Before we can use the data, we need to format the fetched data. We do this by the doing the following:
JSON formats the fetched data into array. Sometimes a resource may return non-JSON data, and in those cases, a different 
method like text() would be used. 

JSON returns another Promise hence another then() method is used whose callback function captures the actual data. 

In this we had harcoded to get repos of the user Octocat just to ensure that our fetch is infact working. Now that we 
know that our fetch is working, we can fetch all of users data simply by pointing to all users rather than one specific user. 

var getUserRepos = function(){
    fetch("https://api.github.com/users/octocat/repos").then(function(response){
    response.json().then(function(data){
        console.log(data);
    });
});
};
*/
/*
Here we are targetting all the user accounts but by hardcoding which account we want to target. 
We have access to all the accounts but we select the user account by hardcoding the name of the accont in the function as shown below. 

var getUserRepos = function(user){
    //format the github API URL 
    var apiUrl = "https://api.github.com/users/"+ user + "/repos";

    //make request to the url 
    fetch(apiUrl).then(function(response) {
        response.json().then(function(data){
            console.log(data);
        });
    });
};

getUserRepos("ninisidhu"); //hardcoded a singluar username. 

*/


//Selecting elements from form and linking it to global variables on JS
var userFormEl = document.querySelector("#user-form");
var nameInputEl = document.querySelector("#username");

//getUserRepos function that fetches data from the API. 
var getUserRepos = function(user){
    //format the github API URL 
    var apiUrl = "https://api.github.com/users/"+ user + "/repos";

    //make request to the url 
    fetch(apiUrl).then(function(response) {
        response.json().then(function(data){
            console.log(data);
        });
    });
};

//Creating a form submit handler which will be executed upon a form submission browser event 
var formSubmitHandler = function (event){
    event.preventDefault();

    //get value form the user input and put it in the getUserRepo function instead of us hardcoding the name 
    var username = nameInputEl.value.trim(); //trim is useful to remove any extra spaces that may have been accidently put in by the user! 
    
    //when user inputs something in the text push it to the function getUserRepos
    if(username) {
        getUserRepos(username); //entered username gets pushed into the function 
        nameInputEl.value=""; //enterd field is emptied before getting executed again
    }else{
        alert("Please enter a GitHub username"); //in the event that the user does not enter anything, we want to alert the user! 
    }

};

userFormEl.addEventListener("submit", formSubmitHandler);