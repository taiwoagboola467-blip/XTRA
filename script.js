/* =========================================================
   XTRA 1.0 — COMPLETE JAVASCRIPT
   ========================================================= */


/* =========================================================
   DATA
   ========================================================= */

let users =
    JSON.parse(localStorage.getItem("xtraUsers")) || [];

let posts =
    JSON.parse(localStorage.getItem("xtraPosts")) || [];

let messages =
    JSON.parse(localStorage.getItem("xtraMessages")) || [];

let currentUser =
    localStorage.getItem("xtraCurrentUser");


/* =========================================================
   START XTRA
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const savedDarkMode =
        localStorage.getItem("xtraDarkMode");

    if (savedDarkMode === "true") {
        document.body.classList.add("dark-mode");
    }

    if (currentUser) {
        openApp();
    }

});


/* =========================================================
   SHOW SIGN UP
   ========================================================= */

function showSignup() {

    const loginForm =
        document.getElementById("loginForm");

    const signupForm =
        document.getElementById("signupForm");

    const message =
        document.getElementById("authMessage");


    if (loginForm) {
        loginForm.classList.add("hidden");
    }

    if (signupForm) {
        signupForm.classList.remove("hidden");
    }

    if (message) {
        message.textContent = "";
    }

}


/* =========================================================
   SHOW LOGIN
   ========================================================= */

function showLogin() {

    const loginForm =
        document.getElementById("loginForm");

    const signupForm =
        document.getElementById("signupForm");

    const message =
        document.getElementById("authMessage");


    if (signupForm) {
        signupForm.classList.add("hidden");
    }

    if (loginForm) {
        loginForm.classList.remove("hidden");
    }

    if (message) {
        message.textContent = "";
    }

}


/* =========================================================
   SIGN UP
   ========================================================= */

function signup() {

    const usernameInput =
        document.getElementById("signupUsername");

    const passwordInput =
        document.getElementById("signupPassword");

    const message =
        document.getElementById("authMessage");


    if (!usernameInput || !passwordInput) {
        return;
    }


    const username =
        usernameInput.value.trim();

    const password =
        passwordInput.value.trim();


    /* Check username */

    if (username.length < 3) {

        message.textContent =
            "Username must be at least 3 characters.";

        return;
    }


    /* Check password */

    if (password.length < 4) {

        message.textContent =
            "Password must be at least 4 characters.";

        return;
    }


    /* Check existing account */

    const existingUser =
        users.find(
            user =>
                user.username.toLowerCase() ===
                username.toLowerCase()
        );


    if (existingUser) {

        message.textContent =
            "Username already exists. Choose another one.";

        return;
    }


    /* Create user */

    const newUser = {

        username: username,

        password: password,

        bio: "Welcome to my Xtra.",

        profilePicture: "",

        followers: 0,

        following: 0,

        orbitWins: [],

        videos: [],

        privacy: false

    };


    users.push(newUser);


    /* Save users */

    localStorage.setItem(
        "xtraUsers",
        JSON.stringify(users)
    );


    /* Automatically log the new user in */

    currentUser = username;

    localStorage.setItem(
        "xtraCurrentUser",
        currentUser
    );


    /* Clear inputs */

    usernameInput.value = "";

    passwordInput.value = "";


    /* Open Xtra */

    openApp();

}


/* =========================================================
   LOGIN
   ========================================================= */

function login() {

    const usernameInput =
        document.getElementById("loginUsername");

    const passwordInput =
        document.getElementById("loginPassword");

    const message =
        document.getElementById("authMessage");


    if (!usernameInput || !passwordInput) {
        return;
    }


    const username =
        usernameInput.value.trim();

    const password =
        passwordInput.value.trim();


    if (!username || !password) {

        message.textContent =
            "Enter your username and password.";

        return;
    }


    /* Find user */

    const user =
        users.find(
            user =>
                user.username.toLowerCase() ===
                username.toLowerCase()
        );


    if (!user) {

        message.textContent =
            "Account not found. Create an account first.";

        return;
    }


    /* Check password */

    if (user.password !== password) {

        message.textContent =
            "Incorrect password.";

        return;
    }


    /* Save login */

    currentUser = user.username;

    localStorage.setItem(
        "xtraCurrentUser",
        currentUser
    );


    /* Clear inputs */

    usernameInput.value = "";

    passwordInput.value = "";


    /* Open home */

    openApp();

}


/* =========================================================
   OPEN XTRA
   ========================================================= */

function openApp() {

    const authPage =
        document.getElementById("authPage");

    const appPage =
        document.getElementById("appPage");


    if (authPage) {
        authPage.classList.add("hidden");
    }

    if (appPage) {
        appPage.classList.remove("hidden");
    }


    /* Load everything */

    loadHome();

    loadProfile();

    displayPosts();

    displayMessages();

    loadPrivacy();


    /* ALWAYS START AT HOME */

    showPage("homePage");

}


/* =========================================================
   LOGOUT
   ========================================================= */

function logout() {

    localStorage.removeItem(
        "xtraCurrentUser"
    );

    currentUser = null;


    const appPage =
        document.getElementById("appPage");

    const authPage =
        document.getElementById("authPage");


    if (appPage) {
        appPage.classList.add("hidden");
    }

    if (authPage) {
        authPage.classList.remove("hidden");
    }


    showLogin();

}


/* =========================================================
   PAGE NAVIGATION
   ========================================================= */

function showPage(pageId) {

    const pages =
        document.querySelectorAll(".page");


    pages.forEach(function (page) {

        page.classList.remove("active");

    });


    const selectedPage =
        document.getElementById(pageId);


    if (selectedPage) {

        selectedPage.classList.add("active");

    }


    /* Update navigation */

    const navItems =
        document.querySelectorAll(".nav-item");


    navItems.forEach(function (item) {

        item.classList.remove("active");

    });


    /* Refresh pages */

    if (pageId === "homePage") {

        loadHome();

        displayPosts();

    }

    if (pageId === "profilePage") {

        loadProfile();

    }

    if (pageId === "messagesPage") {

        displayMessages();

    }

    if (pageId === "searchPage") {

        searchUsers();

    }

}


/* =========================================================
   HOME
   ========================================================= */

function loadHome() {

    if (!currentUser) {
        return;
    }


    const user =
        users.find(
            user =>
                user.username.toLowerCase() ===
                currentUser.toLowerCase()
        );


    if (!user) {
        return;
    }


    /* Username */

    const username =
        document.getElementById("homeUsername");

    if (username) {
        username.textContent =
            user.username;
    }


    /* User posts */

    const userPosts =
        posts.filter(
            post =>
                post.username.toLowerCase() ===
                user.username.toLowerCase()
        );


    const postCount =
        document.getElementById("homePostCount");

    if (postCount) {
        postCount.textContent =
            userPosts.length;
    }


    /* Followers */

    const followers =
        document.getElementById(
            "homeFollowerCount"
        );

    if (followers) {
        followers.textContent =
            user.followers || 0;
    }


    /* Following */

    const following =
        document.getElementById(
            "homeFollowingCount"
        );

    if (following) {
        following.textContent =
            user.following || 0;
    }

}


/* =========================================================
   CREATE POST
   ========================================================= */

function createPost() {

    if (!currentUser) {
        return;
    }


    const textarea =
        document.getElementById("postText");


    if (!textarea) {
        return;
    }


    const text =
        textarea.value.trim();


    if (!text) {
        alert("Write something before posting.");

        return;
    }


    const newPost = {

        id: Date.now(),

        username: currentUser,

        text: text,

        likes: [],

        createdAt:
            new Date().toLocaleString()

    };


    posts.unshift(newPost);


    localStorage.setItem(
        "xtraPosts",
        JSON.stringify(posts)
    );


    textarea.value = "";


    displayPosts();

    loadHome();

}


/* =========================================================
   DISPLAY POSTS
   ========================================================= */

function displayPosts() {

    const feed =
        document.getElementById("feed");


    if (!feed) {
        return;
    }


    feed.innerHTML = "";


    if (posts.length === 0) {

        feed.innerHTML = `

            <div class="card">

                <h3>
                    Your Xtra feed is waiting.
                </h3>

                <p class="muted">
                    Be the first person to share
                    something.
                </p>

            </div>

        `;

        return;
    }


    posts.forEach(function (post) {

        const likes =
            post.likes || [];


        const liked =
            likes.includes(currentUser);


        const postElement =
            document.createElement("div");


        postElement.className =
            "post";


        postElement.innerHTML = `

            <div class="post-header">

                <div class="avatar">

                    ${post.username
                        .charAt(0)
                        .toUpperCase()}

                </div>

                <div>

                    <div class="post-user">
                        @${escapeHTML(post.username)}
                    </div>

                    <div class="post-time">
                        ${escapeHTML(post.createdAt)}
                    </div>

                </div>

            </div>


            <div class="post-content">

                ${escapeHTML(post.text)}

            </div>


            <div class="post-footer">

                <button
                    onclick="likePost(${post.id})">

                    ${liked ? "♥" : "♡"}
                    ${likes.length}

                </button>

            </div>

        `;


        feed.appendChild(postElement);

    });

}


/* =========================================================
   LIKE POST
   ========================================================= */

function likePost(postId) {

    const post =
        posts.find(
            post => post.id === postId
        );


    if (!post) {
        return;
    }


    if (!post.likes) {
        post.likes = [];
    }


    const index =
        post.likes.indexOf(currentUser);


    if (index === -1) {

        post.likes.push(currentUser);

    } else {

        post.likes.splice(index, 1);

    }


    localStorage.setItem(
        "xtraPosts",
        JSON.stringify(posts)
    );


    displayPosts();

}


/* =========================================================
   PROFILE
   ========================================================= */

function loadProfile() {

    if (!currentUser) {
        return;
    }


    const user =
        users.find(
            user =>
                user.username.toLowerCase() ===
                currentUser.toLowerCase()
        );


    if (!user) {
        return;
    }


    const username =
        document.getElementById(
            "profileUsername"
        );

    if (username) {
        username.textContent =
            user.username;
    }


    const bio =
        document.getElementById(
            "profileBio"
        );

    if (bio) {
        bio.textContent =
            user.bio ||
            "Welcome to my Xtra.";
    }


    const userPosts =
        posts.filter(
            post =>
                post.username.toLowerCase() ===
                user.username.toLowerCase()
        );


    const postCount =
        document.getElementById(
            "postCount"
        );

    if (postCount) {
        postCount.textContent =
            userPosts.length;
    }


    const followerCount =
        document.getElementById(
            "followerCount"
        );

    if (followerCount) {
        followerCount.textContent =
            user.followers || 0;
    }


    const followingCount =
        document.getElementById(
            "followingCount"
        );

    if (followingCount) {
        followingCount.textContent =
            user.following || 0;
    }


    /* Likes */

    let totalLikes = 0;

    userPosts.forEach(function (post) {

        totalLikes +=
            (post.likes || []).length;

    });


    const likeCount =
        document.getElementById(
            "likeCount"
        );

    if (likeCount) {
        likeCount.textContent =
            totalLikes;
    }


    displayOrbitWins();

}


/* =========================================================
   ORBIT
   ========================================================= */

function displayOrbitWins() {

    const container =
        document.getElementById(
            "orbitWins"
        );


    if (!container || !currentUser) {
        return;
    }


    const user =
        users.find(
            user =>
                user.username.toLowerCase() ===
                currentUser.toLowerCase()
        );


    if (!user) {
        return;
    }


    const wins =
        user.orbitWins || [];


    if (wins.length === 0) {

        container.innerHTML = `

            <p class="muted">
                You haven't completed an Orbit
                challenge yet.
            </p>

        `;

        return;
    }


    container.innerHTML = "";


    wins.forEach(function (win) {

        const badge =
            document.createElement("div");

        badge.className =
            "badge";

        badge.textContent =
            "★ " + win;

        container.appendChild(badge);

    });

}


/* =========================================================
   ADD ORBIT WIN
   ========================================================= */

function addOrbitWin(challengeName) {

    if (!currentUser) {
        return;
    }


    const user =
        users.find(
            user =>
                user.username.toLowerCase() ===
                currentUser.toLowerCase()
        );


    if (!user) {
        return;
    }


    if (!user.orbitWins) {
        user.orbitWins = [];
    }


    user.orbitWins.push(
        challengeName
    );


    localStorage.setItem(
        "xtraUsers",
        JSON.stringify(users)
    );


    displayOrbitWins();

}


/* =========================================================
   MESSAGES
   ========================================================= */

function displayMessages() {

    const list =
        document.getElementById(
            "messageList"
        );


    const chat =
        document.getElementById(
            "chatMessages"
        );


    if (!list || !chat) {
        return;
    }


    list.innerHTML = "";

    chat.innerHTML = `

        <div class="card">

            <h3>
                Your Xtra messages
            </h3>

            <p class="muted">
                Private conversations will appear here.
            </p>

        </div>

    `;

}


/* =========================================================
   SEARCH
   ========================================================= */

function searchUsers() {

    const input =
        document.getElementById(
            "searchInput"
        );


    const results =
        document.getElementById(
            "searchResults"
        );


    if (!input || !results) {
        return;
    }


    const query =
        input.value.trim().toLowerCase();


    if (!query) {

        results.innerHTML = `

            <div class="card">

                <h3>
                    Search Xtra
                </h3>

                <p class="muted">
                    Find people by username.
                </p>

            </div>

        `;

        return;
    }


    const matches =
        users.filter(
            user =>
                user.username
                    .toLowerCase()
                    .includes(query)
        );


    results.innerHTML = "";


    if (matches.length === 0) {

        results.innerHTML = `

            <div class="card">

                No users found.

            </div>

        `;

        return;
    }


    matches.forEach(function (user) {

        const item =
            document.createElement("div");

        item.className =
            "search-user";


        item.innerHTML = `

            <div class="avatar">

                ${user.username
                    .charAt(0)
                    .toUpperCase()}

            </div>

            <strong>
                @${escapeHTML(user.username)}
            </strong>

        `;


        results.appendChild(item);

    });

}


/* =========================================================
   PRIVACY
   ========================================================= */

function loadPrivacy() {

    if (!currentUser) {
        return;
    }


    const user =
        users.find(
            user =>
                user.username.toLowerCase() ===
                currentUser.toLowerCase()
        );


    if (!user) {
        return;
    }


    const toggle =
        document.getElementById(
            "privacyToggle"
        );


    if (!toggle) {
        return;
    }


    if (user.privacy) {

        toggle.classList.add("active");

    } else {

        toggle.classList.remove("active");

    }

}


/* =========================================================
   TOGGLE PRIVACY
   ========================================================= */

function togglePrivacy() {

    if (!currentUser) {
        return;
    }


    const user =
        users.find(
            user =>
                user.username.toLowerCase() ===
                currentUser.toLowerCase()
        );


    if (!user) {
        return;
    }


    user.privacy =
        !user.privacy;


    localStorage.setItem(
        "xtraUsers",
        JSON.stringify(users)
    );


    loadPrivacy();

}


/* =========================================================
   DARK MODE
   ========================================================= */

function toggleDarkMode() {

    document.body.classList.toggle(
        "dark-mode"
    );


    const enabled =
        document.body.classList.contains(
            "dark-mode"
        );


    localStorage.setItem(
        "xtraDarkMode",
        enabled
    );

}


/* =========================================================
   HTML SECURITY HELPER
   ========================================================= */

function escapeHTML(text) {

    const div =
        document.createElement("div");

    div.textContent =
        text;

    return div.innerHTML;

}