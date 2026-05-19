// REGISTER
const registerForm = document.getElementById("registerForm");

if(registerForm){

  registerForm.addEventListener("submit", function(e){

    e.preventDefault();

    let name = document.getElementById("regName").value;
    let email = document.getElementById("regEmail").value;
    let password = document.getElementById("regPassword").value;

    let user = {
      name:name,
      email:email,
      password:password
    };

    localStorage.setItem(email, JSON.stringify(user));

    alert("Account Created Successfully");

    window.location.href = "login.html";

  });

}


// LOGIN
const loginForm = document.getElementById("loginForm");

if(loginForm){

  loginForm.addEventListener("submit", function(e){

    e.preventDefault();

    let email = document.getElementById("loginEmail").value;
    let password = document.getElementById("loginPassword").value;

    let storedUser = localStorage.getItem(email);

    if(storedUser === null){

      alert("User Not Found");

    } else {

      let userData = JSON.parse(storedUser);

      if(userData.password === password){

        localStorage.setItem("loggedInUser", userData.name);
        localStorage.setItem("loggedInEmail", email);

        window.location.href = "dashboard.html";

      } else {

        alert("Incorrect Password");

      }
    }

  });

}


// DASHBOARD
let welcomeText = document.getElementById("welcomeText");

if(welcomeText){

  let currentUser = localStorage.getItem("loggedInUser");

  if(currentUser){

    welcomeText.innerHTML =
    "Welcome " + currentUser + " To The Gaming Dashboard";

  }

}


// LOGOUT
function logout(){

  localStorage.removeItem("loggedInUser");

  window.location.href = "login.html";

}

// BOOKING SYSTEM
const bookingForm = document.getElementById("bookingForm");

if(bookingForm){

  bookingForm.addEventListener("submit", function(e){

    e.preventDefault();

    let date =
    document.getElementById("bookingDate").value;

    let time =
    document.getElementById("bookingTime").value;

    let duration =
    document.getElementById("bookingDuration").value;

    let booking = `
      <div class="dashboard-card">
        <h3>Gaming Session</h3>

        <p>Date: ${date}</p>
        <p>Time: ${time}</p>
        <p>Duration: ${duration}</p>

        <div class="timer">
          00:59:59
        </div>
      </div>
    `;

    document.getElementById("bookingList")
    .innerHTML += booking;

    alert("Booking Successful");

  });

}

// OPEN MODAL
function openModal(title, text){
  document.getElementById("modalTitle").innerText = title;
  document.getElementById("modalText").innerText = text;

  document.getElementById("modal").style.display = "flex";
}

// CLOSE MODAL
function closeModal(){
  document.getElementById("modal").style.display = "none";
}

let sessionSeconds = 0;
let sessionRunning = false;
let timerInterval;

function launchSession(){

  if(sessionRunning) return;

  sessionRunning = true;

  // OPEN REMOTE PLAY
  window.open("https://remoteplay.dl.playstation.net/remoteplay/", "_blank");

  // START TIMER
  timerInterval = setInterval(() => {

    sessionSeconds++;

    let hrs = String(Math.floor(sessionSeconds / 3600)).padStart(2,'0');
    let mins = String(Math.floor((sessionSeconds % 3600) / 60)).padStart(2,'0');
    let secs = String(sessionSeconds % 60).padStart(2,'0');

    let time = `${hrs}:${mins}:${secs}`;

    let display = document.getElementById("time");

    if(display){
      display.innerText = time;
    }

  }, 1000);

}

function saveCard(){

  const allowedEmail = "praisingmbuso42@gmail.com";

  let currentUser = localStorage.getItem("loggedInUser");

  if(!currentUser){
    openModal("Error", "You must be logged in first.");
    return;
  }

  // Get fake card inputs
  let inputs = document.querySelectorAll("input");

  let cardNumber = inputs[0].value;
  let expiry = inputs[1].value;
  let cvv = inputs[2].value;

  if(!cardNumber || !expiry || !cvv){
    openModal("Error", "Please fill in all card fields.");
    return;
  }

  // ONLY ALLOW SPECIFIC EMAIL (demo restriction)
  let userEmail = localStorage.getItem("loggedInEmail");

  if(userEmail !== allowedEmail){
    openModal("Denied", "Card saving is only allowed for authorized email.");
    return;
  }

  // SAVE FAKE CARD DATA
  let cardData = {
    email: userEmail,
    last4: cardNumber.slice(-4),
    expiry: expiry
  };

  localStorage.setItem("savedCard", JSON.stringify(cardData));

  openModal("Success", "Card saved successfully for " + userEmail);
}