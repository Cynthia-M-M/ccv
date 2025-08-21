const CONFIG = {
    contact: {
        email: 'info@aamecc.org',
        phone: '+254 712 885 069',
        address: 'Westlands, Nairobi',
        country: 'Kenya'
    },
    social: {
        facebook: 'https://www.facebook.com/AAMECC',
        twitter: 'https://x.com/aamecc_',
        linkedin: 'https://www.linkedin.com/company/africa-asia-middle-east-chamber-commerce/',
        instagram: 'https://www.instagram.com/_aamecc/',
        whatsapp: 'https://wa.me/+254712885069'
    },
    organization: {
        name: 'AAMECC',
        fullName: 'Africa, Asia, and Middle-East Chamber of Commerce',
        description: 'The Africa, Asia, Middle East Chamber of Commerce (AAMECC) is dedicated to fostering business partnerships, enhancing trade relations, and promoting economic growth across these regions.'
    }
};

// Function to populate elements with config data
function populateConfigData() {
    // Replace email addresses
    document.querySelectorAll('[data-config="email"]').forEach(element => {
        if (element.tagName === 'A') {
            element.href = `mailto:${CONFIG.contact.email}`;
        }
        element.textContent = CONFIG.contact.email;
    });

    // Replace phone numbers
    document.querySelectorAll('[data-config="phone"]').forEach(element => {
        if (element.tagName === 'A') {
            element.href = `tel:${CONFIG.contact.phone.replace(/\s/g, '')}`;
        }
        element.textContent = CONFIG.contact.phone;
    });

    // Replace social media links
    document.querySelectorAll('[data-config="social"]').forEach(element => {
        const platform = element.getAttribute('data-platform');
        if (CONFIG.social[platform]) {
            element.href = CONFIG.social[platform];
        }
    });

    // Replace organization info
    document.querySelectorAll('[data-config="org-name"]').forEach(element => {
        element.textContent = CONFIG.organization.name;
    });

    document.querySelectorAll('[data-config="org-full-name"]').forEach(element => {
        element.textContent = CONFIG.organization.fullName;
    });
}

// Run when DOM is loaded
document.addEventListener('DOMContentLoaded', populateConfigData); 