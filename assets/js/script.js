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

var repoContainerEl = document.querySelector("#repos-container");
var repoSearchTerm = document.querySelector("#repo-search-term");

//getUserRepos function that fetches data from the API. 
var getUserRepos = function(user){
    //format the github API URL 
    var apiUrl = "https://api.github.com/users/"+ user + "/repos";

    /*
    //make request to the url 
    fetch(apiUrl).then(function(response) {
        response.json().then(function(data){
            displayRepos(data,user); //The data is fetched, then converted to JSON. It is then sent from getUserRepos() to displayRepos(). 
        });
    });*/

    //We need to control what the user will see when we have an error. 200 code means fetching was successful; 404 means that is was unsuccesful 
    //We will update the fetch to respond to a request that is 404 (not found)!

    /* API PROMISE 

    An API Promise is PENDING when make the request. 
    WHEN Fulfilled --> .then(function(response){return response.json()})
    WHEN Rejected --> .catch(function(error){console.log(error))}

    */

    fetch(apiUrl).then(function(response){
        
        if(response.ok){ //When the status code is something in 200; the ok property will be true! 
            response.json().then(function(data){
                displayRepos(data,user);
            });
        }else{
            alert("Error: GitHub User not found!");
        }
    })
    //we also have to inform the user if the connectivity is not working. ".catch" is the fetch API's way of handling Network Errors. 
    .catch(function(error){
        alert("Unable to Connect to GitHub!");
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
    };

};

//Now we need to fetch specific data from the respository. Namely we need the Name, Open Issue count and the login property of the owner.
//Also keep in mind that the data fetched is in an array and the data within that array is also in an array. 

var displayRepos = function(repos, searchTerm){ //searchTerm is a public abstract class built in JS. Search criteria are expressed as a tree of search term. 
   
    //We have to check for situations when a user is found but they may not have any repos. We have to tell the user this!
    if(repos.length===0){
        reposContainerEl.textContent = "No repositories found.";
        return; 
    }

   
    /* console.log(repos); //repos takes the repos under repositories and console logs the data. 
    console.log(searchTerm);*/

    //clearing old content from previous user searches 
    repoContainerEl.textContent = "";
    repoSearchTerm.textContent = searchTerm; //This will return the value of the Search Term back to repoSearchTerm which will return it to the span in HTML

    //Now lets show the list of the repositories that a selected user may have 
    //We have to loop over repos as we may have more than one repo 

    for(var i=0; i<repos.length; i++){
        //format the repo name in a specific way 
        var repoName = repos[i].owner.login + "/" + repos[i].name;

        //create a container for each of the repo and linking it to a new page. 
        var repoEl = document.createElement("a");
        repoEl.classList = "list-item flex-row justify-space-between align center";
        repoEl.setAttribute("href", "./single-repo.html?repo="+ repoName); //the "?repo" suggests to search for a repo and that name is stored in our varibale repoName

        //we decode and retrieve the requested user name in the new js file. 

        //create a span element to hold the repository name 
        var titleEl = document.createElement("span");
        titleEl.textContent = repoName;

        //append to container 
        repoEl.appendChild(titleEl); //appending the titleEl back to repoEl 

        //Displaying Repos Issues on Page 
        // Createing a status element 
        var statusEl = document.createElement("span");
        statusEl.classList = "flex-row align-center";

        //check if current repo has issues or not 
        if (repos[i].open_issues_count>0){
            statusEl.innerHTML = "<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + "issue(s)";
        }else{
            statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
        }
        //append to container 
        repoEl.appendChild(statusEl);
        //append the repoEl to the DOM 
        repoContainerEl.appendChild(repoEl);
    }

};

userFormEl.addEventListener("submit", formSubmitHandler);