// Initialize sample data
function initializeData() {
    if (!localStorage.getItem('complaints')) {
        localStorage.setItem('complaints', JSON.stringify([
            {
                id: 1,
                title: 'Noise Complaint - Purok 1',
                description: 'Excessive noise from neighbor\'s party',
                category: 'noise',
                status: 'pending',
                date: '2024-01-20',
                anonymous: false
            }
        ]));
    }

    if (!localStorage.getItem('alerts')) {
        localStorage.setItem('alerts', JSON.stringify([
            {
                id: 1,
                title: 'Typhoon Warning Signal #2',
                message: 'Typhoon Carina approaching. Expect strong winds and heavy rains. Prepare emergency kits.',
                priority: 'urgent',
                date: '2024-01-25',
                active: true
            }
        ]));
    }

    if (!localStorage.getItem('events')) {
        localStorage.setItem('events', JSON.stringify([
            {
                id: 1,
                title: 'Barangay Fiesta Celebration',
                date: '2024-02-10',
                location: 'Barangay Plaza',
                time: '8:00 AM - 6:00 PM',
                rsvp: false
            }
        ]));
    }

    if (!localStorage.getItem('items')) {
        localStorage.setItem('items', JSON.stringify([
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

    if (!localStorage.getItem('documents')) {
        localStorage.setItem('documents', JSON.stringify([
            {
                id: 1,
                type: 'Barangay Clearance',
                status: 'ready',
                requestedDate: '2024-01-22',
                pickupDate: '2024-01-25'
            }
        ]));
    }

    if (!localStorage.getItem('messages')) {
        localStorage.setItem('messages', JSON.stringify([
            {
                id: 1,
                from: 'Barangay Secretary',
                subject: 'Document Pickup Reminder',
                message: 'Your document request has been approved. Please pick up on January 25.',
                date: '2024-01-25',
                read: false
            }
        ]));
    }
}

document.addEventListener('DOMContentLoaded', () => {
    initializeData();
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
            showModule(module);
        });
    });

    // Notification Bell Click Interaction
    const notificationBell = document.querySelector('.notification-bell');
    if (notificationBell) {
        notificationBell.addEventListener('click', () => {
            showModule('messages');
        });
    }

    // RSVP Button Interaction for Events
    const rsvpButtons = document.querySelectorAll('.btn-rsvp');
    rsvpButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            if (this.innerText === 'RSVP') {
                this.innerText = 'Going';
                this.style.backgroundColor = '#E8F5E9';
                this.style.borderColor = '#A5D6A7';
                this.style.color = '#2E7D32';
            } else {
                this.innerText = 'RSVP';
                this.style.backgroundColor = 'white';
                this.style.borderColor = '#E0E0E0';
                this.style.color = '#333333';
            }
        });
    });

    // Quick Access Cards
    const qaCards = document.querySelectorAll('.qa-card');
    qaCards.forEach(card => {
        card.addEventListener('click', function(e) {
            e.preventDefault();
            const moduleName = this.querySelector('span').textContent.toLowerCase().replace(/\s+/g, '-');
            showModule(moduleName);
        });
    });
});

// Module display function
function showModule(moduleName) {
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
    moduleContent.innerHTML = getModuleHTML(moduleName);
    mainContent.appendChild(moduleContent);

    // Initialize module functionality
    initializeModule(moduleName);
}

// Get HTML for each module
function getModuleHTML(moduleName) {
    switch(moduleName) {
        case 'my-profile':
            return `
                <div class="module-header">
                    <h2>My Profile</h2>
                    <button class="btn-primary" onclick="editProfile()">Edit Profile</button>
                </div>
                <div class="profile-content">
                    <div class="profile-card">
                        <div class="profile-avatar">J</div>
                        <div class="profile-info">
                            <h3>Juan Dela Cruz</h3>
                            <p>Resident ID: RES-2024-001</p>
                            <p>Purok 1, Barangay San Juan</p>
                            <p>Email: juan.delacruz@email.com</p>
                            <p>Phone: +63 912 345 6789</p>
                        </div>
                    </div>
                </div>
            `;
        case 'complaints':
            return `
                <div class="module-header">
                    <h2>Complaints</h2>
                    <button class="btn-primary" onclick="fileComplaint()">File New Complaint</button>
                </div>
                <div class="complaints-content">
                    <div class="complaints-list">
                        <div class="complaint-item">
                            <div class="complaint-header">
                                <h4>Noise Complaint - Purok 1</h4>
                                <span class="status status-pending">Pending</span>
                            </div>
                            <p>Filed on: January 20, 2024</p>
                            <p>Description: Excessive noise from neighbor's party</p>
                        </div>
                    </div>
                </div>
            `;
        case 'alerts-&-calamity':
            return `
                <div class="module-header">
                    <h2>Alerts & Calamity Announcements</h2>
                </div>
                <div class="alerts-content">
                    <div class="alert-banner urgent">
                        <div class="alert-icon">
                            <i class="fa-solid fa-triangle-exclamation"></i>
                        </div>
                        <div class="alert-content">
                            <h4>URGENT: Typhoon Warning Signal #2</h4>
                            <p>Typhoon Carina approaching. Expect strong winds and heavy rains. Prepare emergency kits.</p>
                            <small>Posted: January 25, 2024 2:30 PM</small>
                        </div>
                    </div>
                    <div class="past-alerts">
                        <h3>Past Announcements</h3>
                        <div class="alert-item">
                            <h4>Flood Warning - Purok 3</h4>
                            <p>Heavy rainfall expected. Residents advised to stay indoors.</p>
                            <small>January 20, 2024</small>
                        </div>
                    </div>
                </div>
            `;
        case 'events-&-schedule':
            return `
                <div class="module-header">
                    <h2>Events & Schedule</h2>
                </div>
                <div class="events-content">
                    <div class="calendar-view">
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
                                    <p>Time: 8:00 AM - 6:00 PM</p>
                                </div>
                                <button class="btn-rsvp">RSVP</button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        case 'borrow-items':
            return `
                <div class="module-header">
                    <h2>Borrow Items</h2>
                    <button class="btn-primary" onclick="requestItem()">Request Item</button>
                </div>
                <div class="items-content">
                    <div class="available-items">
                        <h3>Available Items</h3>
                        <div class="item-grid">
                            <div class="item-card">
                                <div class="item-icon"><i class="fa-solid fa-chair"></i></div>
                                <h4>Monobloc Chairs</h4>
                                <p>Available: 50</p>
                                <button class="btn-secondary">Request</button>
                            </div>
                            <div class="item-card">
                                <div class="item-icon"><i class="fa-solid fa-tent"></i></div>
                                <h4>Tents</h4>
                                <p>Available: 10</p>
                                <button class="btn-secondary">Request</button>
                            </div>
                        </div>
                    </div>
                    <div class="my-requests">
                        <h3>My Requests</h3>
                        <div class="request-item">
                            <p>Monobloc Chairs (20) - Approved</p>
                            <small>Pickup: January 18, 2024</small>
                        </div>
                    </div>
                </div>
            `;
        case 'document-requests':
            return `
                <div class="module-header">
                    <h2>Document Requests</h2>
                    <button class="btn-primary" onclick="requestDocument()">Request Document</button>
                </div>
                <div class="documents-content">
                    <div class="request-list">
                        <div class="request-item">
                            <div class="request-header">
                                <h4>Barangay Clearance</h4>
                                <span class="status status-ready">Ready for Pickup</span>
                            </div>
                            <p>Requested: January 22, 2024</p>
                            <p>Pickup Date: January 25, 2024</p>
                        </div>
                    </div>
                </div>
            `;
        case 'blotter-records':
            return `
                <div class="module-header">
                    <h2>My Blotter Records</h2>
                </div>
                <div class="blotter-content">
                    <div class="blotter-list">
                        <div class="blotter-item">
                            <h4>Incident Report #2024-001</h4>
                            <p>Type: Dispute Resolution</p>
                            <p>Date: January 15, 2024</p>
                            <p>Status: Resolved</p>
                        </div>
                    </div>
                </div>
            `;
        case 'healthcare':
            return `
                <div class="module-header">
                    <h2>Healthcare</h2>
                </div>
                <div class="healthcare-content">
                    <div class="health-programs">
                        <h3>Upcoming Health Programs</h3>
                        <div class="program-item">
                            <h4>Free Medical Mission</h4>
                            <p>Date: February 5, 2024</p>
                            <p>Location: Barangay Health Center</p>
                            <button class="btn-secondary">Schedule Appointment</button>
                        </div>
                    </div>
                    <div class="health-reminders">
                        <h3>Health Reminders</h3>
                        <div class="reminder-item">
                            <p>Annual Health Checkup due in 2 weeks</p>
                        </div>
                    </div>
                </div>
            `;
        case 'bhw-info':
            return `
                <div class="module-header">
                    <h2>My BHW Information</h2>
                </div>
                <div class="bhw-content">
                    <div class="bhw-card">
                        <div class="bhw-avatar">M</div>
                        <div class="bhw-info">
                            <h4>Maria Santos</h4>
                            <p>BHW - Purok 1</p>
                            <p>Contact: +63 987 654 3210</p>
                        </div>
                    </div>
                    <div class="visit-schedule">
                        <h3>Next Visit Schedule</h3>
                        <p>February 1, 2024 - 9:00 AM</p>
                    </div>
                </div>
            `;
        case 'messages':
            return `
                <div class="module-header">
                    <h2>Messages</h2>
                    <button class="btn-primary" onclick="sendMessage()">Send Message</button>
                </div>
                <div class="messages-content">
                    <div class="message-list">
                        <div class="message-item">
                            <div class="message-header">
                                <h4>Barangay Secretary</h4>
                                <small>January 25, 2024</small>
                            </div>
                            <p>Your document request has been approved. Please pick up on January 25.</p>
                        </div>
                    </div>
                </div>
            `;
        default:
            return '<div class="module-placeholder"><h2>Module Coming Soon</h2></div>';
    }
}

// Initialize module functionality
function initializeModule(moduleName) {
    // Add specific event listeners for each module
    switch(moduleName) {
        case 'events-&-schedule':
            const rsvpBtns = document.querySelectorAll('.btn-rsvp');
            rsvpBtns.forEach(btn => {
                btn.addEventListener('click', function() {
                    if (this.innerText === 'RSVP') {
                        this.innerText = 'Going';
                        this.style.backgroundColor = '#E8F5E9';
                        this.style.borderColor = '#A5D6A7';
                        this.style.color = '#2E7D32';
                    } else {
                        this.innerText = 'RSVP';
                        this.style.backgroundColor = 'white';
                        this.style.borderColor = '#E0E0E0';
                        this.style.color = '#333333';
                    }
                });
            });
            break;
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

// Module action functions
function editProfile() {
    const content = `
        <form id="profileForm">
            <div class="form-group">
                <label>Full Name</label>
                <input type="text" value="Juan Dela Cruz" required>
            </div>
            <div class="form-group">
                <label>Email</label>
                <input type="email" value="juan.delacruz@email.com" required>
            </div>
            <div class="form-group">
                <label>Phone</label>
                <input type="tel" value="+63 912 345 6789" required>
            </div>
            <div class="form-group">
                <label>Address</label>
                <input type="text" value="Purok 1, Barangay San Juan" required>
            </div>
            <div class="form-actions">
                <button type="button" class="btn-secondary" onclick="closeModal()">Cancel</button>
                <button type="submit" class="btn-primary">Save Changes</button>
            </div>
        </form>
    `;
    openModal('Edit Profile', content);
}

function fileComplaint() {
    const content = `
        <form id="complaintForm">
            <div class="form-group">
                <label>Complaint Category</label>
                <select required>
                    <option value="">Select Category</option>
                    <option value="noise">Noise</option>
                    <option value="dispute">Dispute</option>
                    <option value="sanitation">Sanitation</option>
                    <option value="other">Other</option>
                </select>
            </div>
            <div class="form-group">
                <label>Description</label>
                <textarea placeholder="Describe your complaint..." required></textarea>
            </div>
            <div class="form-group">
                <label>Attach Evidence (Photo/Video)</label>
                <input type="file" accept="image/*,video/*" multiple>
            </div>
            <div class="form-group">
                <label class="checkbox-label">
                    <input type="checkbox"> Submit anonymously
                </label>
            </div>
            <div class="form-actions">
                <button type="button" class="btn-secondary" onclick="closeModal()">Cancel</button>
                <button type="submit" class="btn-primary">Submit Complaint</button>
            </div>
        </form>
    `;
    openModal('File New Complaint', content);
}

function requestItem() {
    const items = JSON.parse(localStorage.getItem('items') || '[]');
    const options = items.map(item => 
        `<option value="${item.id}">${item.name} (Available: ${item.available})</option>`
    ).join('');

    const content = `
        <form id="itemRequestForm">
            <div class="form-group">
                <label>Select Item</label>
                <select id="itemSelect" required>
                    <option value="">Choose an item</option>
                    ${options}
                </select>
            </div>
            <div class="form-group">
                <label>Quantity</label>
                <input type="number" min="1" max="50" required>
            </div>
            <div class="form-group">
                <label>Borrow Date</label>
                <input type="date" required>
            </div>
            <div class="form-group">
                <label>Return Date</label>
                <input type="date" required>
            </div>
            <div class="form-group">
                <label>Purpose</label>
                <textarea placeholder="Purpose of borrowing..." required></textarea>
            </div>
            <div class="form-actions">
                <button type="button" class="btn-secondary" onclick="closeModal()">Cancel</button>
                <button type="submit" class="btn-primary">Submit Request</button>
            </div>
        </form>
    `;
    openModal('Request Item', content);
}

function requestDocument() {
    const content = `
        <form id="documentRequestForm">
            <div class="form-group">
                <label>Document Type</label>
                <select required>
                    <option value="">Select Document</option>
                    <option value="clearance">Barangay Clearance</option>
                    <option value="residency">Certificate of Residency</option>
                    <option value="indigency">Certificate of Indigency</option>
                    <option value="good-moral">Certificate of Good Moral</option>
                </select>
            </div>
            <div class="form-group">
                <label>Purpose</label>
                <textarea placeholder="Purpose of requesting document..." required></textarea>
            </div>
            <div class="form-group">
                <label>Upload Requirements</label>
                <input type="file" accept=".pdf,.jpg,.jpeg,.png" multiple>
                <small>Valid ID, Proof of residence, etc.</small>
            </div>
            <div class="form-actions">
                <button type="button" class="btn-secondary" onclick="closeModal()">Cancel</button>
                <button type="submit" class="btn-primary">Submit Request</button>
            </div>
        </form>
    `;
    openModal('Request Document', content);
}

function sendMessage() {
    const content = `
        <form id="messageForm">
            <div class="form-group">
                <label>Subject</label>
                <input type="text" placeholder="Message subject..." required>
            </div>
            <div class="form-group">
                <label>Message</label>
                <textarea placeholder="Type your message here..." required></textarea>
            </div>
            <div class="form-group">
                <label>Attach Files (optional)</label>
                <input type="file" multiple>
            </div>
            <div class="form-actions">
                <button type="button" class="btn-secondary" onclick="closeModal()">Cancel</button>
                <button type="submit" class="btn-primary">Send Message</button>
            </div>
        </form>
    `;
    openModal('Send Message', content);
}