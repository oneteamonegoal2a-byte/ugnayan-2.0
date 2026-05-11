// Initialize sample data
function initializeAdminData() {
    if (!localStorage.getItem('residents')) {
        localStorage.setItem('residents', JSON.stringify([
            {
                id: 1,
                name: 'Juan Dela Cruz',
                purok: 'Purok 1',
                status: 'approved',
                email: 'juan.delacruz@email.com'
            }
        ]));
    }

    if (!localStorage.getItem('adminComplaints')) {
        localStorage.setItem('adminComplaints', JSON.stringify([
            {
                id: 1,
                title: 'Noise Complaint - Purok 1',
                description: 'Excessive noise from neighbor\'s party',
                resident: 'Juan Dela Cruz',
                priority: 'high',
                status: 'pending',
                date: '2024-01-20',
                assignedTo: null
            }
        ]));
    }

    if (!localStorage.getItem('adminAlerts')) {
        localStorage.setItem('adminAlerts', JSON.stringify([
            {
                id: 1,
                title: 'Typhoon Warning Signal #2',
                message: 'Typhoon Carina approaching. Expect strong winds and heavy rains.',
                priority: 'urgent',
                date: '2024-01-25',
                active: true,
                recipients: 1248
            }
        ]));
    }

    if (!localStorage.getItem('adminEvents')) {
        localStorage.setItem('adminEvents', JSON.stringify([
            {
                id: 1,
                title: 'Barangay Fiesta Celebration',
                date: '2024-02-10',
                location: 'Barangay Plaza',
                attendees: 45
            }
        ]));
    }

    if (!localStorage.getItem('inventory')) {
        localStorage.setItem('inventory', JSON.stringify([
            {
                id: 1,
                name: 'Monobloc Chairs',
                total: 100,
                available: 80,
                borrowed: 20
            },
            {
                id: 2,
                name: 'Tents',
                total: 15,
                available: 10,
                borrowed: 5
            }
        ]));
    }

    if (!localStorage.getItem('documentRequests')) {
        localStorage.setItem('documentRequests', JSON.stringify([
            {
                id: 1,
                resident: 'Juan Dela Cruz',
                type: 'Barangay Clearance',
                status: 'ready',
                requestedDate: '2024-01-22'
            }
        ]));
    }

    if (!localStorage.getItem('blotterRecords')) {
        localStorage.setItem('blotterRecords', JSON.stringify([
            {
                id: '2024-001',
                type: 'Dispute Resolution',
                reportedBy: 'Juan Dela Cruz',
                date: '2024-01-15',
                status: 'resolved'
            }
        ]));
    }

    if (!localStorage.getItem('healthPrograms')) {
        localStorage.setItem('healthPrograms', JSON.stringify([
            {
                id: 1,
                title: 'Free Medical Mission',
                date: '2024-02-05',
                location: 'Barangay Health Center',
                registered: 25
            }
        ]));
    }

    if (!localStorage.getItem('bhwList')) {
        localStorage.setItem('bhwList', JSON.stringify([
            {
                id: 1,
                name: 'Maria Santos',
                purok: 'Purok 1',
                households: 45,
                lastVisit: '2024-01-20'
            }
        ]));
    }

    if (!localStorage.getItem('pendingApplications')) {
        localStorage.setItem('pendingApplications', JSON.stringify([
            {
                id: 1,
                name: 'Maria Santos',
                purok: 'Purok 2',
                applicationDate: '2024-01-20',
                email: 'maria.santos@email.com',
                phone: '+63 987 654 3210',
                documents: [
                    { type: 'ID', fileName: 'valid_id.jpg', url: '#' },
                    { type: 'Proof of Residence', fileName: 'proof_residence.pdf', url: '#' },
                    { type: 'Birth Certificate', fileName: 'birth_cert.pdf', url: '#' }
                ],
                status: 'pending'
            },
            {
                id: 2,
                name: 'Carlos Mendoza',
                purok: 'Purok 4',
                applicationDate: '2024-01-25',
                email: 'carlos.mendoza@email.com',
                phone: '+63 912 345 6789',
                documents: [
                    { type: 'ID', fileName: 'valid_id.jpg', url: '#' },
                    { type: 'Proof of Residence', fileName: 'cedula.pdf', url: '#' }
                ],
                status: 'pending'
            },
            {
                id: 3,
                name: 'Ana Reyes',
                purok: 'Purok 1',
                applicationDate: '2024-01-28',
                email: 'ana.reyes@email.com',
                phone: '+63 945 678 1234',
                documents: [
                    { type: 'ID', fileName: 'valid_id.jpg', url: '#' },
                    { type: 'Proof of Residence', fileName: 'barangay_cert.pdf', url: '#' },
                    { type: 'Birth Certificate', fileName: 'birth_cert.pdf', url: '#' }
                ],
                status: 'pending'
            }
        ]));
    }
}

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOMContentLoaded fired');
    initializeAdminData();
    loadPendingApplications();
    // Handle Navigation Active States
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            // Add active class to clicked link
            this.classList.add('active');

            // Show corresponding module
            const module = this.querySelector('i').nextSibling.textContent.trim().toLowerCase().replace(/\s+/g, '-');
            showAdminModule(module);
        });
    });
});

// Module display function for admin
function showAdminModule(moduleName) {
    const mainContent = document.querySelector('.main-content');
    const dashboardContainer = document.querySelector('.dashboard-container');

    // Hide dashboard and show module content
    if (moduleName === 'dashboard') {
        dashboardContainer.style.display = 'block';
        // Remove any existing module content
        const existingModule = document.querySelector('.module-content');
        if (existingModule) existingModule.remove();
        return;
    }

    dashboardContainer.style.display = 'none';

    // Remove existing module content
    const existingModule = document.querySelector('.module-content');
    if (existingModule) existingModule.remove();

    // Create module content
    const moduleContent = document.createElement('div');
    moduleContent.className = 'module-content';
    moduleContent.innerHTML = getAdminModuleHTML(moduleName);
    mainContent.appendChild(moduleContent);

    // Initialize module functionality
    initializeAdminModule(moduleName);
}

// Get HTML for each admin module
function getAdminModuleHTML(moduleName) {
    switch(moduleName) {
        case 'residents':
            return `
                <div class="module-header">
                    <h2>Resident Management</h2>
                    <button class="btn-primary" onclick="adminAddResident()">Add Resident</button>
                </div>
                <div class="residents-content">
                    <div class="residents-table">
                        <table>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Purok</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Juan Dela Cruz</td>
                                    <td>Purok 1</td>
                                    <td><span class="status-approved">Approved</span></td>
                                    <td>
                                        <button class="btn-secondary">View</button>
                                        <button class="btn-secondary">Edit</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            `;
        case 'complaints':
            return `
                <div class="module-header">
                    <h2>Complaint Management</h2>
                    <div class="filters">
                        <select>
                            <option>All Status</option>
                            <option>Pending</option>
                            <option>Ongoing</option>
                            <option>Resolved</option>
                        </select>
                        <select>
                            <option>All Priority</option>
                            <option>High</option>
                            <option>Medium</option>
                            <option>Low</option>
                        </select>
                    </div>
                </div>
                <div class="complaints-content">
                    <div class="complaints-list">
                        <div class="complaint-item">
                            <div class="complaint-header">
                                <h4>Noise Complaint - Purok 1</h4>
                                <span class="priority-high">High Priority</span>
                                <span class="status status-pending">Pending</span>
                            </div>
                            <p>Filed by: Juan Dela Cruz</p>
                            <p>Description: Excessive noise from neighbor's party</p>
                            <div class="complaint-actions">
                                <button class="btn-secondary" onclick="adminAssignComplaint()">Assign to Staff</button>
                                <button class="btn-secondary" onclick="adminUpdateStatus()">Update Status</button>
                                <button class="btn-secondary" onclick="adminRespondComplaint()">Respond</button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        case 'calamity-alerts':
            return `
                <div class="module-header">
                    <h2>Calamity Alerts Management</h2>
                    <button class="btn-primary" onclick="adminCreateAlert()">Create New Alert</button>
                </div>
                <div class="alerts-content">
                    <div class="active-alerts">
                        <h3>Active Alerts</h3>
                        <div class="alert-item urgent">
                            <div class="alert-header">
                                <h4>Typhoon Warning Signal #2</h4>
                                <span class="priority-urgent">Urgent</span>
                            </div>
                            <p>Typhoon Carina approaching. Expect strong winds and heavy rains.</p>
                            <div class="alert-actions">
                                <button class="btn-secondary">Edit</button>
                                <button class="btn-danger">Deactivate</button>
                            </div>
                        </div>
                    </div>
                    <div class="alert-history">
                        <h3>Alert History</h3>
                        <div class="alert-item">
                            <h4>Flood Warning - Purok 3</h4>
                            <p>Heavy rainfall expected. Residents advised to stay indoors.</p>
                            <small>January 20, 2024</small>
                        </div>
                    </div>
                </div>
            `;
        case 'scheduling':
            return `
                <div class="module-header">
                    <h2>Event Scheduling</h2>
                    <button class="btn-primary" onclick="adminCreateEvent()">Create Event</button>
                </div>
                <div class="scheduling-content">
                    <div class="calendar-section">
                        <h3>Upcoming Events</h3>
                        <div class="event-list">
                            <div class="event-item">
                                <div class="event-date">
                                    <span class="month">Feb</span>
                                    <span class="day">10</span>
                                </div>
                                <div class="event-details">
                                    <h4>Barangay Fiesta Celebration</h4>
                                    <p>Location: Barangay Plaza</p>
                                    <p>Attendees: 45 confirmed</p>
                                </div>
                                <div class="event-actions">
                                    <button class="btn-secondary">Edit</button>
                                    <button class="btn-secondary">View RSVPs</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        case 'item-management':
            return `
                <div class="module-header">
                    <h2>Item Management</h2>
                    <button class="btn-primary" onclick="adminAddItem()">Add New Item</button>
                </div>
                <div class="items-content">
                    <div class="inventory-table">
                        <table>
                            <thead>
                                <tr>
                                    <th>Item</th>
                                    <th>Total</th>
                                    <th>Available</th>
                                    <th>Borrowed</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Monobloc Chairs</td>
                                    <td>100</td>
                                    <td>80</td>
                                    <td>20</td>
                                    <td>
                                        <button class="btn-secondary">Edit</button>
                                        <button class="btn-secondary">View Requests</button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Tents</td>
                                    <td>15</td>
                                    <td>10</td>
                                    <td>5</td>
                                    <td>
                                        <button class="btn-secondary">Edit</button>
                                        <button class="btn-secondary">View Requests</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="pending-requests">
                        <h3>Pending Requests</h3>
                        <div class="request-item">
                            <p>Juan Dela Cruz - Monobloc Chairs (20)</p>
                            <div class="request-actions">
                                <button class="btn-success">Approve</button>
                                <button class="btn-danger">Reject</button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        case 'document-requests':
            return `
                <div class="module-header">
                    <h2>Document Requests</h2>
                    <div class="filters">
                        <select>
                            <option>All Status</option>
                            <option>Pending</option>
                            <option>Processing</option>
                            <option>Ready</option>
                        </select>
                    </div>
                </div>
                <div class="documents-content">
                    <div class="requests-table">
                        <table>
                            <thead>
                                <tr>
                                    <th>Resident</th>
                                    <th>Document Type</th>
                                    <th>Status</th>
                                    <th>Requested Date</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Juan Dela Cruz</td>
                                    <td>Barangay Clearance</td>
                                    <td><span class="status-ready">Ready</span></td>
                                    <td>Jan 22, 2024</td>
                                    <td>
                                        <button class="btn-secondary">View</button>
                                        <button class="btn-secondary">Mark Complete</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            `;
        case 'blotter-records':
            return `
                <div class="module-header">
                    <h2>Blotter Records</h2>
                    <button class="btn-primary" onclick="adminAddBlotterRecord()">Add New Record</button>
                </div>
                <div class="blotter-content">
                    <div class="blotter-table">
                        <table>
                            <thead>
                                <tr>
                                    <th>Incident #</th>
                                    <th>Type</th>
                                    <th>Reported By</th>
                                    <th>Date</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>2024-001</td>
                                    <td>Dispute Resolution</td>
                                    <td>Juan Dela Cruz</td>
                                    <td>Jan 15, 2024</td>
                                    <td><span class="status-resolved">Resolved</span></td>
                                    <td>
                                        <button class="btn-secondary">View</button>
                                        <button class="btn-secondary">Edit</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            `;
        case 'healthcare':
            return `
                <div class="module-header">
                    <h2>Healthcare Management</h2>
                    <button class="btn-primary" onclick="adminScheduleHealthProgram()">Schedule Program</button>
                </div>
                <div class="healthcare-content">
                    <div class="health-programs">
                        <h3>Scheduled Health Programs</h3>
                        <div class="program-item">
                            <h4>Free Medical Mission</h4>
                            <p>Date: February 5, 2024</p>
                            <p>Location: Barangay Health Center</p>
                            <p>Registered: 25 residents</p>
                            <div class="program-actions">
                                <button class="btn-secondary">View Registrations</button>
                                <button class="btn-secondary">Edit</button>
                            </div>
                        </div>
                    </div>
                    <div class="health-stats">
                        <h3>Health Statistics</h3>
                        <div class="stats-grid">
                            <div class="stat-item">
                                <h4>Immunized Children</h4>
                                <p>85%</p>
                            </div>
                            <div class="stat-item">
                                <h4>Pregnancy Monitoring</h4>
                                <p>12 active</p>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        case 'bhw-module':
            return `
                <div class="module-header">
                    <h2>BHW Module</h2>
                    <button class="btn-primary" onclick="adminAddBHW()">Add BHW</button>
                </div>
                <div class="bhw-content">
                    <div class="bhw-list">
                        <h3>Barangay Health Workers</h3>
                        <div class="bhw-card">
                            <div class="bhw-avatar">M</div>
                            <div class="bhw-info">
                                <h4>Maria Santos</h4>
                                <p>BHW - Purok 1</p>
                                <p>Households: 45</p>
                                <p>Last Visit: Jan 20, 2024</p>
                            </div>
                            <div class="bhw-actions">
                                <button class="btn-secondary">View Profile</button>
                                <button class="btn-secondary">Schedule Visits</button>
                            </div>
                        </div>
                    </div>
                    <div class="household-mapping">
                        <h3>Household Profiling</h3>
                        <div class="profiling-stats">
                            <div class="stat-item">
                                <h4>Total Households</h4>
                                <p>320</p>
                            </div>
                            <div class="stat-item">
                                <h4>Priority Groups</h4>
                                <p>45</p>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        case 'communication':
            return `
                <div class="module-header">
                    <h2>Communication Center</h2>
                    <button class="btn-primary" onclick="adminBroadcastMessage()">Broadcast Message</button>
                </div>
                <div class="communication-content">
                    <div class="messages-section">
                        <h3>Recent Messages</h3>
                        <div class="message-list">
                            <div class="message-item">
                                <div class="message-header">
                                    <h4>From: Juan Dela Cruz</h4>
                                    <small>January 25, 2024</small>
                                </div>
                                <p>Question about document processing time.</p>
                                <div class="message-actions">
                                    <button class="btn-secondary">Reply</button>
                                    <button class="btn-secondary">Mark Read</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="broadcast-history">
                        <h3>Broadcast History</h3>
                        <div class="broadcast-item">
                            <h4>Document Pickup Reminder</h4>
                            <p>Sent to 15 residents</p>
                            <small>January 24, 2024</small>
                        </div>
                    </div>
                </div>
            `;
        default:
            return '<div class="module-placeholder"><h2>Module Coming Soon</h2></div>';
    }
}

// Initialize admin module functionality
function initializeAdminModule(moduleName) {
    // Add specific event listeners for each admin module
    switch(moduleName) {
        // Add module-specific initialization here
    }
}

// Modal functionality
function openModal(title, content) {
    document.getElementById('modal-title').textContent = title;
    document.getElementById('modal-body').innerHTML = content;
    document.getElementById('modal').style.display = 'block';
}

function closeModal() {
    document.getElementById('modal').style.display = 'none';
}

// Close modal when clicking outside or on close button
document.addEventListener('click', function(e) {
    const modal = document.getElementById('modal');
    const modalContent = document.querySelector('.modal-content');
    if (e.target === modal || e.target.classList.contains('modal-close')) {
        closeModal();
    }
});

function loadPendingApplications() {
    console.log('loadPendingApplications called');
    const applications = JSON.parse(localStorage.getItem('pendingApplications') || '[]');
    console.log('Applications found:', applications);
    const pendingContainer = document.querySelector('.list-group');

    if (!pendingContainer) {
        console.log('Pending container not found');
        return;
    }

    // Clear existing items
    pendingContainer.innerHTML = '';

    // Add pending applications
    applications.forEach(app => {
        const avatarLetter = app.name.charAt(0).toUpperCase();
        const avatarClass = getAvatarClass(app.id);

        const listItem = document.createElement('div');
        listItem.className = 'list-item';
        listItem.innerHTML = `
            <div class="item-info">
                <div class="avatar-sm ${avatarClass}">${avatarLetter}</div>
                <div>
                    <h4>${app.name}</h4>
                    <p>${app.purok} • ${app.applicationDate}</p>
                </div>
            </div>
            <div class="item-actions">
                <button class="btn-view-docs" onclick="viewDocuments(${app.id})">View Documents</button>
                <button class="btn-approve" onclick="approveApplication(${app.id})">Approve</button>
                <button class="btn-reject" onclick="rejectApplication(${app.id})">Reject</button>
            </div>
        `;
        pendingContainer.appendChild(listItem);
    });
}

function getAvatarClass(id) {
    const classes = ['', 'bg-blue', 'bg-green', 'bg-purple', 'bg-orange'];
    return classes[id % classes.length];
}

// Document viewing and application management functions
function viewDocuments(applicationId) {
    const applications = JSON.parse(localStorage.getItem('pendingApplications') || '[]');
    const application = applications.find(app => app.id === applicationId);

    if (!application) {
        alert('Application not found.');
        return;
    }

    const documentsHTML = application.documents.map(doc => `
        <div class="document-item">
            <div class="document-info">
                <i class="fa-solid fa-file"></i>
                <div>
                    <h4>${doc.type}</h4>
                    <p>${doc.fileName}</p>
                </div>
            </div>
            <div class="document-actions">
                <button class="btn-view" onclick="viewDocument('${doc.fileName}')">View</button>
                <button class="btn-download" onclick="downloadDocument('${doc.fileName}')">Download</button>
            </div>
        </div>
    `).join('');

    const content = `
        <div class="application-details">
            <div class="applicant-info">
                <h3>${application.name}</h3>
                <p><strong>Purok:</strong> ${application.purok}</p>
                <p><strong>Email:</strong> ${application.email}</p>
                <p><strong>Phone:</strong> ${application.phone}</p>
                <p><strong>Application Date:</strong> ${application.applicationDate}</p>
            </div>
            <div class="documents-section">
                <h4>Uploaded Documents (${application.documents.length})</h4>
                <div class="documents-list">
                    ${documentsHTML}
                </div>
            </div>
        </div>
        <div class="form-actions">
            <button type="button" class="btn-secondary" onclick="closeModal()">Close</button>
            <button type="button" class="btn-success" onclick="approveApplication(${applicationId}); closeModal();">Approve Application</button>
            <button type="button" class="btn-danger" onclick="rejectApplication(${applicationId}); closeModal();">Reject Application</button>
        </div>
    `;

    openModal(`Review Application - ${application.name}`, content);
}

function viewDocument(fileName) {
    // In a real application, this would open the document in a new tab or modal
    alert(`Viewing document: ${fileName}\n\nIn a real system, this would display the document content or open it in a viewer.`);
}

function downloadDocument(fileName) {
    // In a real application, this would trigger a download
    alert(`Downloading: ${fileName}\n\nIn a real system, this would download the file.`);
}

function approveApplication(applicationId) {
    const applications = JSON.parse(localStorage.getItem('pendingApplications') || '[]');
    const residents = JSON.parse(localStorage.getItem('residents') || '[]');

    const applicationIndex = applications.findIndex(app => app.id === applicationId);
    if (applicationIndex === -1) {
        alert('Application not found.');
        return;
    }

    const application = applications[applicationIndex];

    // Add to approved residents
    const newResident = {
        id: residents.length + 1,
        name: application.name,
        purok: application.purok,
        status: 'approved',
        email: application.email
    };
    residents.push(newResident);
    localStorage.setItem('residents', JSON.stringify(residents));

    // Remove from pending applications
    applications.splice(applicationIndex, 1);
    localStorage.setItem('pendingApplications', JSON.stringify(applications));

    alert(`Application for ${application.name} has been approved.`);
    location.reload(); // Refresh to update the dashboard
}

function rejectApplication(applicationId) {
    const applications = JSON.parse(localStorage.getItem('pendingApplications') || '[]');

    const applicationIndex = applications.findIndex(app => app.id === applicationId);
    if (applicationIndex === -1) {
        alert('Application not found.');
        return;
    }

    const application = applications[applicationIndex];

    // Remove from pending applications
    applications.splice(applicationIndex, 1);
    localStorage.setItem('pendingApplications', JSON.stringify(applications));

    alert(`Application for ${application.name} has been rejected.`);
    location.reload(); // Refresh to update the dashboard
}
    const content = `
        <form id="addResidentForm">
            <div class="form-group">
                <label>Full Name</label>
                <input type="text" placeholder="Enter full name" required>
            </div>
            <div class="form-group">
                <label>Email</label>
                <input type="email" placeholder="email@example.com" required>
            </div>
            <div class="form-group">
                <label>Phone</label>
                <input type="tel" placeholder="+63 XXX XXX XXXX" required>
            </div>
            <div class="form-group">
                <label>Purok</label>
                <select required>
                    <option value="">Select Purok</option>
                    <option value="purok-1">Purok 1</option>
                    <option value="purok-2">Purok 2</option>
                    <option value="purok-3">Purok 3</option>
                </select>
            </div>
            <div class="form-group">
                <label>Address</label>
                <textarea placeholder="Complete address..." required></textarea>
            </div>
            <div class="form-actions">
                <button type="button" class="btn-secondary" onclick="closeModal()">Cancel</button>
                <button type="submit" class="btn-primary">Add Resident</button>
            </div>
        </form>
    `;
    openModal('Add New Resident', content);
}

function adminAssignComplaint() {
    const content = `
        <form id="assignComplaintForm">
            <div class="form-group">
                <label>Assign to Staff Member</label>
                <select required>
                    <option value="">Select Staff</option>
                    <option value="staff-1">Barangay Secretary</option>
                    <option value="staff-2">Barangay Captain</option>
                    <option value="staff-3">Admin Assistant</option>
                </select>
            </div>
            <div class="form-group">
                <label>Priority Level</label>
                <select required>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>
            </div>
            <div class="form-group">
                <label>Notes</label>
                <textarea placeholder="Additional notes..."></textarea>
            </div>
            <div class="form-actions">
                <button type="button" class="btn-secondary" onclick="closeModal()">Cancel</button>
                <button type="submit" class="btn-primary">Assign Complaint</button>
            </div>
        </form>
    `;
    openModal('Assign Complaint', content);
}

function adminUpdateStatus() {
    const content = `
        <form id="updateStatusForm">
            <div class="form-group">
                <label>New Status</label>
                <select required>
                    <option value="pending">Pending</option>
                    <option value="ongoing">Ongoing</option>
                    <option value="resolved">Resolved</option>
                </select>
            </div>
            <div class="form-group">
                <label>Update Notes</label>
                <textarea placeholder="Status update details..." required></textarea>
            </div>
            <div class="form-actions">
                <button type="button" class="btn-secondary" onclick="closeModal()">Cancel</button>
                <button type="submit" class="btn-primary">Update Status</button>
            </div>
        </form>
    `;
    openModal('Update Complaint Status', content);
}

function adminRespondComplaint() {
    const content = `
        <form id="respondComplaintForm">
            <div class="form-group">
                <label>Response Message</label>
                <textarea placeholder="Type your response to the resident..." required></textarea>
            </div>
            <div class="form-group">
                <label>Attach Files (optional)</label>
                <input type="file" multiple>
            </div>
            <div class="form-actions">
                <button type="button" class="btn-secondary" onclick="closeModal()">Cancel</button>
                <button type="submit" class="btn-primary">Send Response</button>
            </div>
        </form>
    `;
    openModal('Respond to Complaint', content);
}

function adminCreateAlert() {
    const content = `
        <form id="createAlertForm">
            <div class="form-group">
                <label>Alert Title</label>
                <input type="text" placeholder="Alert title..." required>
            </div>
            <div class="form-group">
                <label>Priority Level</label>
                <select required>
                    <option value="info">Info</option>
                    <option value="warning">Warning</option>
                    <option value="urgent">Urgent</option>
                </select>
            </div>
            <div class="form-group">
                <label>Alert Message</label>
                <textarea placeholder="Detailed alert message..." required></textarea>
            </div>
            <div class="form-group">
                <label>Target Audience</label>
                <select required>
                    <option value="all">All Residents</option>
                    <option value="purok-1">Purok 1 Only</option>
                    <option value="purok-2">Purok 2 Only</option>
                    <option value="purok-3">Purok 3 Only</option>
                </select>
            </div>
            <div class="form-group">
                <label>Attach Files (Maps, Advisories)</label>
                <input type="file" multiple accept=".pdf,.jpg,.jpeg,.png">
            </div>
            <div class="form-group">
                <label class="checkbox-label">
                    <input type="checkbox" checked> Schedule for immediate broadcast
                </label>
            </div>
            <div class="form-actions">
                <button type="button" class="btn-secondary" onclick="closeModal()">Cancel</button>
                <button type="submit" class="btn-primary">Create Alert</button>
            </div>
        </form>
    `;
    openModal('Create New Alert', content);
}

function adminCreateEvent() {
    const content = `
        <form id="createEventForm">
            <div class="form-group">
                <label>Event Title</label>
                <input type="text" placeholder="Event title..." required>
            </div>
            <div class="form-group">
                <label>Event Date</label>
                <input type="date" required>
            </div>
            <div class="form-group">
                <label>Start Time</label>
                <input type="time" required>
            </div>
            <div class="form-group">
                <label>End Time</label>
                <input type="time" required>
            </div>
            <div class="form-group">
                <label>Location</label>
                <input type="text" placeholder="Event location..." required>
            </div>
            <div class="form-group">
                <label>Description</label>
                <textarea placeholder="Event description..." required></textarea>
            </div>
            <div class="form-group">
                <label>Target Group</label>
                <select required>
                    <option value="all">All Residents</option>
                    <option value="purok-1">Purok 1 Only</option>
                    <option value="purok-2">Purok 2 Only</option>
                    <option value="purok-3">Purok 3 Only</option>
                </select>
            </div>
            <div class="form-actions">
                <button type="button" class="btn-secondary" onclick="closeModal()">Cancel</button>
                <button type="submit" class="btn-primary">Create Event</button>
            </div>
        </form>
    `;
    openModal('Create New Event', content);
}

function adminAddItem() {
    const content = `
        <form id="addItemForm">
            <div class="form-group">
                <label>Item Name</label>
                <input type="text" placeholder="Item name..." required>
            </div>
            <div class="form-group">
                <label>Total Quantity</label>
                <input type="number" min="1" placeholder="Total available items..." required>
            </div>
            <div class="form-group">
                <label>Description</label>
                <textarea placeholder="Item description..." required></textarea>
            </div>
            <div class="form-group">
                <label>Borrowing Limits</label>
                <input type="number" min="1" placeholder="Max items per resident..." required>
            </div>
            <div class="form-group">
                <label>Condition</label>
                <select required>
                    <option value="excellent">Excellent</option>
                    <option value="good">Good</option>
                    <option value="fair">Fair</option>
                    <option value="poor">Poor</option>
                </select>
            </div>
            <div class="form-actions">
                <button type="button" class="btn-secondary" onclick="closeModal()">Cancel</button>
                <button type="submit" class="btn-primary">Add Item</button>
            </div>
        </form>
    `;
    openModal('Add New Item', content);
}

function adminAddBlotterRecord() {
    const content = `
        <form id="addBlotterForm">
            <div class="form-group">
                <label>Incident Type</label>
                <select required>
                    <option value="">Select Type</option>
                    <option value="dispute">Dispute Resolution</option>
                    <option value="theft">Theft</option>
                    <option value="assault">Assault</option>
                    <option value="vandalism">Vandalism</option>
                    <option value="other">Other</option>
                </select>
            </div>
            <div class="form-group">
                <label>Reported By</label>
                <input type="text" placeholder="Name of complainant..." required>
            </div>
            <div class="form-group">
                <label>Incident Date</label>
                <input type="date" required>
            </div>
            <div class="form-group">
                <label>Incident Time</label>
                <input type="time" required>
            </div>
            <div class="form-group">
                <label>Location</label>
                <input type="text" placeholder="Incident location..." required>
            </div>
            <div class="form-group">
                <label>Incident Description</label>
                <textarea placeholder="Detailed description of the incident..." required></textarea>
            </div>
            <div class="form-group">
                <label>Attach Evidence</label>
                <input type="file" multiple accept=".pdf,.jpg,.jpeg,.png,.mp4">
            </div>
            <div class="form-actions">
                <button type="button" class="btn-secondary" onclick="closeModal()">Cancel</button>
                <button type="submit" class="btn-primary">Add Record</button>
            </div>
        </form>
    `;
    openModal('Add Blotter Record', content);
}

function adminScheduleHealthProgram() {
    const content = `
        <form id="scheduleHealthForm">
            <div class="form-group">
                <label>Program Title</label>
                <input type="text" placeholder="Program title..." required>
            </div>
            <div class="form-group">
                <label>Program Type</label>
                <select required>
                    <option value="vaccination">Vaccination Drive</option>
                    <option value="checkup">Medical Checkup</option>
                    <option value="mission">Medical Mission</option>
                    <option value="seminar">Health Seminar</option>
                </select>
            </div>
            <div class="form-group">
                <label>Program Date</label>
                <input type="date" required>
            </div>
            <div class="form-group">
                <label>Start Time</label>
                <input type="time" required>
            </div>
            <div class="form-group">
                <label>Location</label>
                <input type="text" placeholder="Program location..." required>
            </div>
            <div class="form-group">
                <label>Description</label>
                <textarea placeholder="Program details..." required></textarea>
            </div>
            <div class="form-group">
                <label>Target Group</label>
                <select required>
                    <option value="all">All Residents</option>
                    <option value="children">Children (0-12)</option>
                    <option value="senior">Senior Citizens</option>
                    <option value="pregnant">Pregnant Women</option>
                </select>
            </div>
            <div class="form-actions">
                <button type="button" class="btn-secondary" onclick="closeModal()">Cancel</button>
                <button type="submit" class="btn-primary">Schedule Program</button>
            </div>
        </form>
    `;
    openModal('Schedule Health Program', content);
}

function adminAddBHW() {
    const content = `
        <form id="addBHWForm">
            <div class="form-group">
                <label>Full Name</label>
                <input type="text" placeholder="BHW full name..." required>
            </div>
            <div class="form-group">
                <label>Contact Number</label>
                <input type="tel" placeholder="+63 XXX XXX XXXX" required>
            </div>
            <div class="form-group">
                <label>Email</label>
                <input type="email" placeholder="bhw@example.com" required>
            </div>
            <div class="form-group">
                <label>Assigned Purok</label>
                <select required>
                    <option value="">Select Purok</option>
                    <option value="purok-1">Purok 1</option>
                    <option value="purok-2">Purok 2</option>
                    <option value="purok-3">Purok 3</option>
                </select>
            </div>
            <div class="form-group">
                <label>Specialization</label>
                <select required>
                    <option value="general">General Health Worker</option>
                    <option value="maternal">Maternal Care</option>
                    <option value="child">Child Health</option>
                    <option value="elderly">Elderly Care</option>
                </select>
            </div>
            <div class="form-actions">
                <button type="button" class="btn-secondary" onclick="closeModal()">Cancel</button>
                <button type="submit" class="btn-primary">Add BHW</button>
            </div>
        </form>
    `;
    openModal('Add Barangay Health Worker', content);
}

function adminBroadcastMessage() {
    const content = `
        <form id="broadcastForm">
            <div class="form-group">
                <label>Message Title</label>
                <input type="text" placeholder="Message title..." required>
            </div>
            <div class="form-group">
                <label>Message Type</label>
                <select required>
                    <option value="announcement">General Announcement</option>
                    <option value="reminder">Reminder</option>
                    <option value="urgent">Urgent Notice</option>
                    <option value="update">Status Update</option>
                </select>
            </div>
            <div class="form-group">
                <label>Message Content</label>
                <textarea placeholder="Type your message..." required></textarea>
            </div>
            <div class="form-group">
                <label>Target Audience</label>
                <select required>
                    <option value="all">All Residents</option>
                    <option value="purok-1">Purok 1 Only</option>
                    <option value="purok-2">Purok 2 Only</option>
                    <option value="purok-3">Purok 3 Only</option>
                </select>
            </div>
            <div class="form-group">
                <label>Attach Files (optional)</label>
                <input type="file" multiple>
            </div>
            <div class="form-group">
                <label class="checkbox-label">
                    <input type="checkbox" checked> Send immediately
                </label>
            </div>
            <div class="form-actions">
                <button type="button" class="btn-secondary" onclick="closeModal()">Cancel</button>
                <button type="submit" class="btn-primary">Broadcast Message</button>
            </div>
        </form>
    `;
    openModal('Broadcast Message', content);
}