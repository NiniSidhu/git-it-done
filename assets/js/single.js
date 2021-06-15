// This JS is used to fetch the Repo Issues specifically 

var issueContainerEl = document.querySelector("#issues-container");
var limitWarningEl = document.querySelector("#limit-warning");

var getRepoIssues = function(repo){
    var apiUrl = "https://api.github.com/repos/" + repo + "/issues?direction=asc"; //url where we are fetching the data
    fetch(apiUrl).then(function(response){    //conditions for if the fetching was successful or not 
        //request was successful 
        if(response.ok){
            response.json().then(function(data){
                displayIssues(data); //this will pass the fetched information to the next function! 

                //We may get additional links in the header section of the api. These links indicate if there is additional data to be displayed to the user
                if (response.headers.get("Links")){
                   displayWarning(repo); //if there are more than 30 links, then the displayWarning function will be activated. 
                }
            });
        }else{
            alert("There was a problem with your request");
        }
    });

    
};

//This function is used for Issues only 
var displayIssues = function(issues){

    //When there are no open issues in a searched User 
    if (issues.length === 0){
        issueContainerEl.textContent = "This repo has no open issues!";
        return; 
    }
    
    for(var i=0; i< issues.length; i++){
        //create a link element to take users to the issue on github 
        var issueEl = document.createElement("a");
        issueEl.classList = "list-item flex-row justify-space-between align-center";
        issueEl.setAttribute("href", issues[i].html_url); //setting attribute for the link to be clickable 
        issueEl.setAttribute("target", "_blank"); //opens link in a new tab! 

        //create span to hold issue title 
        var titleEl = document.createElement("span");
        titleEl.textContent = issues[i].title; 

        //append to container 
        issueEl.appendChild(titleEl);

        //create a type element 
        var typeEl = document.createElement("span");

        //check if issue is an actual issue or a pull request 
        if(issues[i].pull_request){
            typeEl.textContent = "(Pull Request)";
        }else{
            typeEl.textContent = "(Issue)";
        }

        //append to Container 
        issueEl.appendChild(typeEl);
        issueContainerEl.appendChild(issueEl);
    }
};

var displayWarning = function(repo){
    //add text to warning container 
    limitWarningEl.textContent = "To see more than 30 issues, visit ";
    var linkEl = document.createElement("a");
    linkEl.textContent = "See more issues on GitHub.com";
    linkEl.setAttribute("href","https://github.com/" + repo + "/issues");
    linkEl.setAttribute("target", "_blank");

    //append to the warning container
    limitWarningEl.appendChild(linkEl);
};

getRepoIssues("facebook/react");