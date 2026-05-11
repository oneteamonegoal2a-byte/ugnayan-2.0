document.addEventListener('DOMContentLoaded', () => {
    const steps = document.querySelectorAll('.form-step');
    const progressSteps = document.querySelectorAll('.step');
    const btnNext = document.querySelectorAll('.btn-next');
    const btnPrev = document.querySelectorAll('.btn-prev');
    const btnSubmitFinal = document.querySelector('.btn-submit-final');
    
    const regHeader = document.getElementById('regHeader');
    const progressBar = document.getElementById('progressBar');
    const successState = document.getElementById('successState');
    
    let currentStepNum = 0; // Index based (0 to 3)

    // Function to update UI based on step
    function updateFormSteps() {
        // Update form views
        steps.forEach((step, index) => {
            if (index === currentStepNum) {
                step.classList.add('active');
            } else {
                step.classList.remove('active');
            }
        });

        // Update progress bar
        progressSteps.forEach((progress, index) => {
            if (index === currentStepNum) {
                progress.classList.add('active');
                progress.classList.remove('completed');
            } else if (index < currentStepNum) {
                progress.classList.add('completed');
                progress.classList.remove('active');
            } else {
                progress.classList.remove('active', 'completed');
            }
        });
        
        // Scroll to top of card smoothly
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Handle "Next" Buttons
    btnNext.forEach(btn => {
        btn.addEventListener('click', () => {
            if (currentStepNum < steps.length - 1) {
                // Here you would normally validate the inputs before proceeding
                currentStepNum++;
                updateFormSteps();
            }
        });
    });

    // Handle "Previous" Buttons
    btnPrev.forEach(btn => {
        btn.addEventListener('click', () => {
            if (currentStepNum > 0) {
                currentStepNum--;
                updateFormSteps();
            }
        });
    });

    // Handle Final Submission
    if (btnSubmitFinal) {
        btnSubmitFinal.addEventListener('click', (e) => {
            e.preventDefault();

            // Check if terms are accepted (basic validation)
            const termsCheckbox = document.querySelector('input[type="checkbox"]');
            if(!termsCheckbox.checked) {
                alert("Please certify that the information is correct.");
                return;
            }

            // Collect form data
            const formData = collectFormData();

            // Save as pending application
            savePendingApplication(formData);

            // Hide the active form step
            steps.forEach(step => step.classList.remove('active'));

            // Hide progress bar and header to show full success modal feel
            regHeader.style.display = 'none';
            progressBar.style.display = 'none';

            // Show success state
            successState.style.display = 'block';
            successState.style.animation = 'fadeIn 0.5s ease';
        });
    }

    // Function to collect form data
    function collectFormData() {
        const data = {
            fullName: document.querySelector('input[placeholder="Enter your full name"]').value,
            email: document.querySelector('input[type="email"]').value,
            phone: document.querySelector('input[placeholder="+63 XXX XXX XXXX"]').value,
            purok: document.querySelector('select').value,
            address: document.querySelector('textarea').value,
            documents: [] // In a real system, this would be populated with uploaded files
        };
        return data;
    }

    // Function to save pending application
    function savePendingApplication(data) {
        const pendingApplications = JSON.parse(localStorage.getItem('pendingApplications') || '[]');

        const newApplication = {
            id: pendingApplications.length + 1,
            name: data.fullName,
            purok: data.purok,
            applicationDate: new Date().toISOString().split('T')[0],
            email: data.email,
            phone: data.phone,
            documents: [
                { type: 'ID', fileName: 'valid_id.jpg', url: '#' },
                { type: 'Proof of Residence', fileName: 'proof_residence.pdf', url: '#' }
            ],
            status: 'pending'
        };

        pendingApplications.push(newApplication);
        localStorage.setItem('pendingApplications', JSON.stringify(pendingApplications));
    }
});