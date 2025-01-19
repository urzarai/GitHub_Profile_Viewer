function fetchProfile() {
    const username = document.getElementById('username').value; 
    if(!username) {
        alert("Enter Valid GitHub username");
        return;
    }
    
    fetch(`https://api.github.com/users/${username}`)
        .then(response => {
            if(!response.ok) {
                throw new Error("Network response issue");
            }
            return response.json();
        })
        .then(data => {
            displayProfile(data);
        })
        .catch(err => {
            console.error("Error occurred with fetch operation", err);
            document.getElementById('profile').innerHTML = 'Error: Profile not found'; 
        });
}

function displayProfile(profileData) {
    console.log("displayProfile called with:", profileData);
    
    const profileElement = document.getElementById('profile');
    if (!profileElement) {
        console.error("Element with id 'profile' not found.");
        return;
    }
    
    profileElement.innerHTML = `
        <h2>${profileData.login || 'N/A'}</h2>
        <img src="${profileData.avatar_url}" alt="Profile avatar" style="width:100px; height:100px; border-radius:50%;" />
        <div><b>Bio:</b> ${profileData.bio || 'No bio available'}</div>
        <div><b>Followers:</b> ${profileData.followers}</div>
        <div><b>Following:</b> ${profileData.following}</div>
        <div><b>Public Repositories:</b> ${profileData.public_repos}</div>
        <div><b>Location:</b> ${profileData.location || 'Not specified'}</div>
        <div><b>Twitter:</b> ${profileData.twitter_username || 'Not specified'}</div>
        <div><b>Email Id:</b> ${profileData.email || 'Not specified'}</div>
        <a href="${profileData.html_url}">View Profile on GitHub</a>
    `;
    
    console.log("Profile displayed successfully.");
}