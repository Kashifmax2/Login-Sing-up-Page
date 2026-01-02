const firebaseConfig = {
    apiKey: "AIzaSyC03AYs8sXpt9TlfciA9s5fbmRQR02_1fg",
    authDomain: "test-project-60990.firebaseapp.com",
    projectId: "test-project-60990",
    storageBucket: "test-project-60990.firebasestorage.app",
    messagingSenderId: "391974412126",
    appId: "1:391974412126:web:ff1131680c36f9ff8339cf"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// Form Switch Function
window.toggleForm = function() {
    const login = document.getElementById('loginForm');
    const signup = document.getElementById('signupForm');
    if (login.style.display === "none") {
        login.style.display = "block";
        signup.style.display = "none";
    } else {
        login.style.display = "none";
        signup.style.display = "block";
    }
}

// SIGNUP LOGIC
document.getElementById('signupAction').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('sName').value;
    const email = document.getElementById('sEmail').value;
    const pass = document.getElementById('sPass').value;

    auth.createUserWithEmailAndPassword(email, pass)
        .then((cred) => {
            return db.collection('users').doc(cred.user.uid).set({ name, email });
        })
        .then(() => {
            alert("Account Created Successfully!");
            toggleForm();
        })
        .catch((error) => {
            if (error.code === "auth/email-already-in-use") {
                alert("User Already Logged In / Registered!");
            } else {
                alert(error.message);
            }
        });
});

// LOGIN LOGIC
document.getElementById('loginAction').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('lEmail').value;
    const pass = document.getElementById('lPass').value;

    auth.signInWithEmailAndPassword(email, pass)
        .then(() => alert("Login Success!"))
        .catch(() => {
            alert("This User Not Sign Up Please Sign up");
        });
});

// CHECK DETAIL BUTTON
document.getElementById('checkDetailBtn').addEventListener('click', () => {
    const user = auth.currentUser;
    if (user) {
        db.collection('users').doc(user.uid).get().then((doc) => {
            if (doc.exists) {
                alert("Name: " + doc.data().name + "\nEmail: " + doc.data().email);
            }
        });
    } else {
        alert("Please Login First!");
    }
});