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

getUserRepos("ninisidhu");