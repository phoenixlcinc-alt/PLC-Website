// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll for anchor links
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Mobile menu toggle (if needed for smaller screens)
    const createMobileMenu = () => {
        const nav = document.querySelector('.nav');
        const navList = document.querySelector('.nav-list');
        
        if (window.innerWidth <= 768) {
            // Create mobile menu button
            const mobileMenuBtn = document.createElement('button');
            mobileMenuBtn.className = 'mobile-menu-btn';
            mobileMenuBtn.innerHTML = `
                <span></span>
                <span></span>
                <span></span>
            `;
            
            // Insert before nav
            nav.insertBefore(mobileMenuBtn, navList);
            
            // Toggle mobile menu
            mobileMenuBtn.addEventListener('click', () => {
                navList.classList.toggle('mobile-menu-open');
                mobileMenuBtn.classList.toggle('active');
            });
        }
    };

    // Newsletter form handling
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = this.querySelector('input[type="email"]').value;
            const name = this.querySelector('input[type="text"]').value;
            
            if (email && name) {
                // Simulate form submission
                showNotification('Thank you for subscribing to our newsletter!', 'success');
                this.reset();
            } else {
                showNotification('Please fill in all fields.', 'error');
            }
        });
    }

    // Quote button functionality
    const quoteButtons = document.querySelectorAll('.btn-secondary');
    quoteButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const serviceName = this.closest('.service-card').querySelector('.service-title').textContent;
            showQuoteModal(serviceName);
        });
    });

    // Contact button functionality
    const contactBtn = document.querySelector('.contact-btn');
    if (contactBtn) {
        contactBtn.addEventListener('click', function() {
            window.location.href = 'tel:904-294-4134';
        });
    }

    // Scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.service-card, .about-content, .newsletter-content');
    animateElements.forEach(el => {
        observer.observe(el);
    });

    // Initialize mobile menu on load
    createMobileMenu();

    // Recreate mobile menu on resize
    window.addEventListener('resize', createMobileMenu);
});

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Style the notification
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '15px 20px',
        borderRadius: '8px',
        color: 'white',
        fontWeight: '500',
        zIndex: '9999',
        transform: 'translateX(100%)',
        transition: 'transform 0.3s ease',
        maxWidth: '300px',
        wordWrap: 'break-word'
    });

    // Set background color based on type
    switch (type) {
        case 'success':
            notification.style.backgroundColor = '#4CAF50';
            break;
        case 'error':
            notification.style.backgroundColor = '#F44336';
            break;
        default:
            notification.style.backgroundColor = '#2196F3';
    }

    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    // Remove after 4 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 4000);
}

// Quote modal functionality
function showQuoteModal(serviceName) {
    const modal = document.createElement('div');
    modal.className = 'quote-modal';
    modal.innerHTML = `
        <div class="modal-overlay">
            <div class="modal-content">
                <button class="modal-close">&times;</button>
                <h3>Get a Quote for ${serviceName}</h3>
                <form class="quote-form">
                    <div class="form-group">
                        <label>Name *</label>
                        <input type="text" name="name" required>
                    </div>
                    <div class="form-group">
                        <label>Email *</label>
                        <input type="email" name="email" required>
                    </div>
                    <div class="form-group">
                        <label>Phone *</label>
                        <input type="tel" name="phone" required>
                    </div>
                    <div class="form-group">
                        <label>Property Address *</label>
                        <textarea name="address" required></textarea>
                    </div>
                    <div class="form-group">
                        <label>Property Size (sq ft)</label>
                        <input type="number" name="size">
                    </div>
                    <div class="form-group">
                        <label>Service Needed</label>
                        <select name="service">
                            <option value="${serviceName}">${serviceName}</option>
                            <option value="Mowing">Mowing</option>
                            <option value="Hedge Trimming">Hedge Trimming</option>
                            <option value="Clean Up">Clean Up</option>
                            <option value="All Services">All Services</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Additional Notes</label>
                        <textarea name="notes" rows="3"></textarea>
                    </div>
                    <button type="submit" class="btn-primary">Request Quote</button>
                </form>
            </div>
        </div>
    `;

    // Add modal styles
    const modalStyles = document.createElement('style');
    modalStyles.textContent = `
        .quote-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 10000;
        }
        
        .modal-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
        }
        
        .modal-content {
            background: white;
            border-radius: 12px;
            padding: 30px;
            max-width: 500px;
            width: 100%;
            max-height: 90vh;
            overflow-y: auto;
            position: relative;
        }
        
        .modal-close {
            position: absolute;
            top: 15px;
            right: 20px;
            background: none;
            border: none;
            font-size: 24px;
            cursor: pointer;
            color: #666;
        }
        
        .modal-content h3 {
            margin-bottom: 20px;
            color: var(--primary-green);
            font-size: 24px;
        }
        
        .quote-form .form-group {
            margin-bottom: 20px;
        }
        
        .quote-form label {
            display: block;
            margin-bottom: 5px;
            font-weight: 500;
            color: #333;
        }
        
        .quote-form input,
        .quote-form textarea,
        .quote-form select {
            width: 100%;
            padding: 12px;
            border: 1px solid #ddd;
            border-radius: 6px;
            font-size: 14px;
            font-family: inherit;
        }
        
        .quote-form input:focus,
        .quote-form textarea:focus,
        .quote-form select:focus {
            outline: none;
            border-color: var(--primary-green);
        }
        
        .quote-form textarea {
            resize: vertical;
            min-height: 80px;
        }
    `;
    
    document.head.appendChild(modalStyles);
    document.body.appendChild(modal);

    // Handle modal close
    const closeModal = () => {
        modal.remove();
        modalStyles.remove();
    };

    modal.querySelector('.modal-close').addEventListener('click', closeModal);
    modal.querySelector('.modal-overlay').addEventListener('click', (e) => {
        if (e.target === e.currentTarget) {
            closeModal();
        }
    });

    // Handle form submission
    modal.querySelector('.quote-form').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // Simulate form submission
        showNotification('Thank you! We\'ll contact you within 24 hours with your quote.', 'success');
        closeModal();
    });

    // ESC key to close
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
}

// Add CSS animations
const animationStyles = document.createElement('style');
animationStyles.textContent = `
    .service-card,
    .about-content,
    .newsletter-content {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease;
    }
    
    .animate-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
    
    .mobile-menu-btn {
        display: none;
        flex-direction: column;
        gap: 4px;
        background: none;
        border: none;
        cursor: pointer;
        padding: 10px;
    }
    
    .mobile-menu-btn span {
        width: 25px;
        height: 3px;
        background: var(--primary-green);
        transition: all 0.3s ease;
    }
    
    .mobile-menu-btn.active span:nth-child(1) {
        transform: rotate(45deg) translate(6px, 6px);
    }
    
    .mobile-menu-btn.active span:nth-child(2) {
        opacity: 0;
    }
    
    .mobile-menu-btn.active span:nth-child(3) {
        transform: rotate(-45deg) translate(6px, -6px);
    }
    
    @media (max-width: 768px) {
        .mobile-menu-btn {
            display: flex;
        }
        
        .nav-list {
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: white;
            flex-direction: column;
            padding: 20px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            transform: translateY(-100%);
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
        }
        
        .nav-list.mobile-menu-open {
            transform: translateY(0);
            opacity: 1;
            visibility: visible;
        }
    }
`;

document.head.appendChild(animationStyles);
