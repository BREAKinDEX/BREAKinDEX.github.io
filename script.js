function showMoveDetails(element) {
    const details = element.nextElementSibling;
    const allDetails = document.querySelectorAll('.move-details');

    // Hide all other details first
    allDetails.forEach(detail => {
        if (detail !== details) {
            detail.classList.add('hidden');
        }
    });

    // Toggle current details
    details.classList.toggle('hidden');
}

function toggleMenu() {
    const sideMenu = document.getElementById("sideMenu");
    if (sideMenu.style.left === "0px") {
        sideMenu.style.left = "-250px";
    } else {
        sideMenu.style.left = "0px";
    }
}

// Function to handle move creation
document.addEventListener('DOMContentLoaded', function() {
    const addMoveForm = document.getElementById('add-move-form');
    if (addMoveForm) {
        addMoveForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const name = document.getElementById('move-name').value;
            const notes = document.getElementById('move-notes').value;
            const category = document.getElementById('move-category').value;
            const imageInput = document.getElementById('move-image');
            const imageFile = imageInput.files[0];
            const container = document.getElementById('moveContainer');

            if (imageFile) {
                const reader = new FileReader();
                reader.onload = function() {
                    const imageSrc = reader.result;
                    const card = document.createElement('div');
                    card.className = 'move-card';

                    card.innerHTML = `
                        <div class="move-icon" onclick="showMoveDetails(this)">
                            <img src="${imageSrc}" alt="${name}">
                            <span class="move-name">${name}</span>
                        </div>
                        <div class="move-details hidden">
                            <h3>${name}</h3>
                            
  <p>notes: ${notes}</p>                          <p>Category: ${category}</p>
                            <img src="${imageSrc}" alt="${name}" class="full-image">
                            <button class="deleteBtn">Delete Move</button>
                        </div>
                    `;

                    // Save to localStorage
                    const moves = JSON.parse(localStorage.getItem('moves') || '[]');
                    moves.push({
                        name: name,
    notes: notes,                    category: category,
                        image: imageSrc
                    });
                    localStorage.setItem('moves', JSON.stringify(moves));

                    // Add delete functionality
                    card.querySelector('.deleteBtn').addEventListener('click', function() {
                        if (confirm('Are you sure you want to delete this move?')) {
                            card.remove();
                            const moves = JSON.parse(localStorage.getItem('moves') || '[]');
                            const updatedMoves = moves.filter(move => move.name !== name);
                            localStorage.setItem('moves', JSON.stringify(updatedMoves));
                        }
                    });

                    container.appendChild(card);
                    document.getElementById('MoveMake').style.display = 'none';
                    addMoveForm.reset();
                };
                reader.readAsDataURL(imageFile);
            }
        });
    }
});
 document.addEventListener('DOMContentLoaded', function() {
    const MoveBtn = document.getElementById('MoveBtn');
    const MoveMake = document.getElementById('MoveMake');
    const closeBtn = MoveMake.querySelector('.modal-close-btn');
createMoveBtn = document.getElementById('createMoveBtn');

    MoveBtn.addEventListener('click', () => {
        MoveMake.style.display = 'block';
    });

    closeBtn.addEventListener('click', () => {
        MoveMake.style.display = 'none';
    });

    // Close modal when clicking outside
    MoveMake.addEventListener('click', (e) => {
        if (e.target === MoveMake) {
            MoveMake.style.display = 'none';
        }
    });
});
function handleLogin(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Demo credentials - in production you'd want to use a backend
    const users = JSON.parse(localStorage.getItem('users') || '{}');
    if ((username === "demo" && password === "password123") || 
        (users[username] && users[username].password === password)) {
        document.getElementById('loginStatus').textContent = 'Login successful!';
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('username', username);
        showLoggedInState();
    } else {
        document.getElementById('loginStatus').textContent = 'Invalid credentials';
    }
}

function showLoggedInState() {
    const loginSection = document.getElementById('login-section');
    loginSection.innerHTML = `
        <h2>Welcome ${localStorage.getItem('username')}!</h2>
        <button onclick="handleLogout()">Logout</button>
    `;
}

function handleLogout() {
    localStorage.clear(); // Clear all storage
    location.reload();
}

function clearStorage() {
    if(confirm('Are you sure you want to clear all saved moves? This cannot be undone.')) {
        localStorage.clear();
        document.getElementById('moveContainer').innerHTML = '';
        alert('Storage cleared successfully');
    }
}

function showLogin() {
    document.getElementById('login-section').style.display = 'block';
    document.getElementById('signup-section').style.display = 'none';
    document.getElementById('loginTab').classList.add('active');
    document.getElementById('signupTab').classList.remove('active');
}

function showSignup() {
    document.getElementById('login-section').style.display = 'none';
    document.getElementById('signup-section').style.display = 'block';
    document.getElementById('loginTab').classList.remove('active');
    document.getElementById('signupTab').classList.add('active');
}

function handleSignup(event) {
    event.preventDefault();
    const username = document.getElementById('newUsername').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (password !== confirmPassword) {
        document.getElementById('signupStatus').textContent = 'Passwords do not match';
        return;
    }

    // Store user data in localStorage (for demo purposes)
    const users = JSON.parse(localStorage.getItem('users') || '{}');
    if (users[username]) {
        document.getElementById('signupStatus').textContent = 'Username already exists';
        return;
    }

    users[username] = {
        password: password,
        email: email
    };
    localStorage.setItem('users', JSON.stringify(users));
    document.getElementById('signupStatus').textContent = 'Sign up successful! Please login.';

    // Switch to login tab
    setTimeout(() => showLogin(), 1500);
}

function handleRecovery(event) {
    event.preventDefault();
    const email = document.getElementById('recoveryEmail').value;
    const users = JSON.parse(localStorage.getItem('users') || '{}');

    // Find user with matching email
    const user = Object.entries(users).find(([_, data]) => data.email === email);

    if (user) {
        // In a real application, you would send an email here
        document.getElementById('recoveryStatus').textContent = 'Recovery instructions sent to your email';
    } else {
        document.getElementById('recoveryStatus').textContent = 'Email not found';
    }
}

// Check login state on page load
window.onload = function() {
    if (localStorage.getItem('isLoggedIn') === 'true') {
        showLoggedInState();
    }

    document.getElementById('add-move-form').addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('move-name').value;
        const notes = document.getElementById('move-notes').value;
      const category = document.getElementById('move-category').value;
      const imageInput = document.querySelector('input[type="file"]');
      const imageFile = imageInput.files[0];
      const container = document.getElementById('moveContainer');

      const card = document.createElement('div');
      card.className = 'move-card';

      if (imageFile) {
        const reader = new FileReader();
        reader.onload = function() {
          const imageSrc = reader.result;
          card.innerHTML = `
            <img src="${imageSrc}" alt="${name}">
            <h3>${name}</h3>
            <p>Notes: ${notes}</p>
            <p>Category: ${category}</p>
            <button class="deleteBtn">Delete Move</button>
          `;

          // Save to localStorage
          const moves = JSON.parse(localStorage.getItem('moves') || '[]');
          moves.push({
            name: name,
              notes: notes,
            category: category,
            image: imageSrc
          });
          localStorage.setItem('moves', JSON.stringify(moves));

          // Add delete functionality
          card.querySelector('.deleteBtn').addEventListener('click', (e) => {
            e.stopPropagation();
            if (confirm('Are you sure you want to delete this move?')) {
              card.remove();
              // Remove from localStorage
              const moves = JSON.parse(localStorage.getItem('moves') || '[]');
              const updatedMoves = moves.filter(move => move.name !== name);
              localStorage.setItem('moves', JSON.stringify(updatedMoves));
            }
          });

          container.appendChild(card);
          document.getElementById('MoveMake').style.display = 'none';
          e.target.reset();
        };
        reader.readAsDataURL(imageFile);
      }
    });

    // Load saved moves on page load
    window.addEventListener('DOMContentLoaded', () => {
      const container = document.getElementById('moveContainer');
      const moves = JSON.parse(localStorage.getItem('moves') || '[]');

      // Reverse the moves array to show newest first
      moves.reverse().forEach(move => {
        const card = document.createElement('div');
        card.className = 'move-card';
        card.innerHTML = `
          <div class="move-icon" onclick="showMoveDetails(this)">
            <img src="${move.image}" alt="${move.name}">
            <span class="move-name">${move.name}</span>
          </div>
          <div class="move-details hidden">
            <h3>${move.name}</h3> <p>Notes: ${move.notes}</p>
            <p>Category: ${move.category}</p>
            <img src="${move.image}" alt="${move.name}" class="full-image">
            <button class="deleteBtn">Delete Move</button>
          </div>
        `;

        card.querySelector('.deleteBtn').addEventListener('click', (e) => {
          e.stopPropagation();
          if (confirm('Are you sure you want to delete this move?')) {
            card.remove();
            const moves = JSON.parse(localStorage.getItem('moves') || '[]');
            const updatedMoves = moves.filter(m => m.name !== move.name);
            localStorage.setItem('moves', JSON.stringify(updatedMoves));
          }
        });

        container.appendChild(card);
      });
    });

    // Add move button and modal functionality
    const MoveBtn = document.getElementById('MoveBtn');
    const MoveMake = document.getElementById('MoveMake');
    if (MoveBtn && MoveMake) {
        const closeBtn = MoveMake.querySelector('.modal-close-btn');

        MoveBtn.addEventListener('click', () => {
            MoveMake.style.display = 'block';
        });

        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                MoveMake.style.display = 'none';
            });
        }

        // Close modal when clicking outside
        MoveMake.addEventListener('click', (e) => {
            if (e.target === MoveMake) {
                MoveMake.style.display = 'none';
            }
        });
    }
};