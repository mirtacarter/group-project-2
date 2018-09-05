// Setup an event listener to make an API call once auth is complete
function onLinkedInLoad() {
    IN.Event.on(IN, "auth", getProfileData);
}

// Use the API call wrapper to request the member's profile data
function getProfileData() {
    IN.API.Profile("me").fields("id", "first-name", "last-name", "headline", "location", "picture-url", "public-profile-url", "email-address").result(displayProfileData).error(onError);
    var userId = user.id;
    console.log("user id: " + userId);
}


// Handle the successful return from the API call
function displayProfileData(data) {
    var user = data.values[0];
    document.getElementById("picture").innerHTML = '<img class="responsive-img circle" src=' + user.pictureUrl + ' />';
<<<<<<< HEAD
    document.getElementById("name").innerHTML = 'Signed in as ' + user.firstName + ' ' + user.lastName;
=======
    document.getElementById("#name").innerHTML ='Signed in as ' + user.firstName+' '+user.lastName +'<a class="waves-effect waves-red blue-grey btn-small" href="javascript:void(0);" onclick="logout()">Logout</a>';
>>>>>>> 00194462543ccd8fb582a944d1c3f49891fddbf6
    document.getElementById("email").innerHTML = user.emailAddress;
    document.getElementById('profileData').style.display = 'block';
}
// Handle an error response from the API call
function onError(error) {
    console.log(error);
}

// Destroy the session of linkedin
function logout() {
    IN.User.logout(removeProfileData);
}

// Remove profile data from page
function removeProfileData() {
    document.getElementById('profileData').remove();
}
