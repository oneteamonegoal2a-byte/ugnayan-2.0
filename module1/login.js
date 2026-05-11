document.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.tab-btn');
    const footerResident = document.getElementById('footer-resident');
    const footerAdmin = document.getElementById('footer-admin');
    const loginForm = document.getElementById('loginForm');
    
    let currentRole = 'resident'; // Default starting role

    // Handle Tab Switching
    tabs.forEach(tab => {
        tab.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Remove active class from all tabs
            tabs.forEach(t => t.classList.remove('active'));
            // Add active class to clicked tab
            tab.classList.add('active');
            
            // Get role from data attribute
            currentRole = tab.getAttribute('data-role');
            
            // Toggle visibility of footer instructions
            if (currentRole === 'admin') {
                footerResident.style.display = 'none';
                footerAdmin.style.display = 'block';
            } else {
                footerAdmin.style.display = 'none';
                footerResident.style.display = 'block';
            }
        });
    });

    // Password Visibility Toggle
    const togglePassword = document.querySelector('.toggle-password');
    const passwordInput = document.querySelector('input[type="password"]');

    togglePassword.addEventListener('click', function () {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        
        // Toggle FontAwesome eye icon
        this.classList.toggle('fa-eye');
        this.classList.toggle('fa-eye-slash');
    });

    // Handle Form Submission Mock Routing
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault(); 
        
        // Simulating routing based on the selected tab
        if (currentRole === 'resident') {
            window.location.href = 'resident.html'; // Routes to the Resident Dashboard
        } else {
            window.location.href = 'admin.html'; // Routes to the Admin Dashboard created earlier
        }
    });
});