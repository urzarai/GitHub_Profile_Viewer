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
        <div class="profile-content">
            <h2>${profileData.login || 'N/A'}</h2>
            <img src="${profileData.avatar_url}" alt="Profile avatar" />
            <div class="profile-info">
                <div><b>Bio:</b> ${profileData.bio || 'No bio available'}</div><br>
                <div><b>Followers:</b> ${profileData.followers}</div><br>
                <div><b>Following:</b> ${profileData.following}</div><br>
                <div><b>Public Repositories:</b> ${profileData.public_repos}</div><br>
                <div><b>Location:</b> ${profileData.location || 'Not specified'}</div><br>
                <div><b>Twitter:</b> ${profileData.twitter_username || 'Not specified'}</div><br>
                <div><b>Email Id:</b> ${profileData.email || 'Not specified'}</div><br>
                <div><a href="${profileData.html_url}">View Profile on GitHub</a></div><br>
            </div>
        </div>
    `;
    
    console.log("Profile displayed successfully.");
}