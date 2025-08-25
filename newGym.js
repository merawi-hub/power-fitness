// DOM Elements
document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();
    
    // Navigation
    const header = document.getElementById('header');
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    // Page Navigation
    const navLinks = document.querySelectorAll('.nav-link');
    const pages = document.querySelectorAll('.page');
    
    // Tabs
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    // Login Tabs
    const loginTabBtns = document.querySelectorAll('.login-tab-btn');
    const loginTabContents = document.querySelectorAll('.login-tab-content');
    
    // Password Toggle
    const passwordToggles = document.querySelectorAll('.password-toggle');
    
    // Payment Process
    const selectPlanBtns = document.querySelectorAll('.select-plan-btn');
    const toPaymentBtn = document.getElementById('to-payment-btn');
    const backToInfoBtn = document.getElementById('back-to-info-btn');
    const completePaymentBtn = document.getElementById('complete-payment-btn');
    const changePlanBtn = document.getElementById('change-plan-btn');
    
    // Scroll Event for Header
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Mobile Menu Toggle
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Toggle icon
            if (menuToggle.querySelector('i').classList.contains('fa-bars')) {
                menuToggle.querySelector('i').classList.remove('fa-bars');
                menuToggle.querySelector('i').classList.add('fa-times');
            } else {
                menuToggle.querySelector('i').classList.remove('fa-times');
                menuToggle.querySelector('i').classList.add('fa-bars');
            }
        });
    }
    
    // Page Navigation
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetPage = this.getAttribute('data-page');
            
            // Update active nav link
            navLinks.forEach(link => link.classList.remove('active'));
            document.querySelectorAll(`[data-page="${targetPage}"]`).forEach(link => {
                link.classList.add('active');
            });
            
            // Show target page
            pages.forEach(page => page.classList.remove('active'));
            document.getElementById(targetPage).classList.add('active');
            
            // Close mobile menu if open
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                menuToggle.querySelector('i').classList.remove('fa-times');
                menuToggle.querySelector('i').classList.add('fa-bars');
            }
            
            // Scroll to top
            window.scrollTo(0, 0);
        });
    });
    
    // Tab Functionality
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Update active tab button
            tabBtns.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Show target tab content
            tabContents.forEach(content => content.classList.remove('active'));
            document.getElementById(`${tabId}-tab`).classList.add('active');
        });
    });
    
    // Login Tabs
    if (loginTabBtns.length > 0) {
        loginTabBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const tabId = this.getAttribute('data-tab');
                
                // Update active tab button
                loginTabBtns.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                // Show target tab content
                loginTabContents.forEach(content => content.classList.remove('active'));
                document.getElementById(tabId).classList.add('active');
            });
        });
    }
    
    // Password Toggle
    passwordToggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            const passwordInput = this.previousElementSibling;
            const icon = this.querySelector('i');
            
            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
            } else {
                passwordInput.type = 'password';
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
            }
        });
    });
    
    // Payment Process
    if (selectPlanBtns.length > 0) {
        // Select Plan
        selectPlanBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const plan = this.getAttribute('data-plan');
                const price = this.getAttribute('data-price');
                const period = this.getAttribute('data-period');
                
                // Update selected plan info
                document.getElementById('selected-plan-name').textContent = plan;
                document.getElementById('selected-plan-price').textContent = `$${price}/${period === 'monthly' ? 'month' : 'year'}`;
                
                // Update payment summary
                document.getElementById('summary-plan').textContent = `${plan} Plan (${period})`;
                document.getElementById('summary-plan-price').textContent = `$${price}`;
                
                // Calculate total
                const registrationFee = 49.99;
                const total = parseFloat(price) + registrationFee;
                document.getElementById('summary-total').textContent = `$${total.toFixed(2)}`;
                
                // Navigate to payment page if not already there
                if (!document.getElementById('payment').classList.contains('active')) {
                    pages.forEach(page => page.classList.remove('active'));
                    document.getElementById('payment').classList.add('active');
                    
                    // Update nav links
                    navLinks.forEach(link => link.classList.remove('active'));
                    document.querySelectorAll('[data-page="payment"]').forEach(link => {
                        link.classList.add('active');
                    });
                    
                    // Scroll to top
                    window.scrollTo(0, 0);
                }
            });
        });
        
        // Change Plan
        if (changePlanBtn) {
            changePlanBtn.addEventListener('click', function() {
                // Scroll to plans section
                const plansSection = document.querySelector('.membership-plans');
                plansSection.scrollIntoView({ behavior: 'smooth' });
            });
        }
        
        // Payment Steps
        if (toPaymentBtn) {
            toPaymentBtn.addEventListener('click', function() {
                // Update steps
                document.querySelector('.step[data-step="1"]').classList.remove('active');
                document.querySelector('.step[data-step="2"]').classList.add('active');
                document.querySelector('.progress').style.width = '50%';
                
                // Show payment form
                document.getElementById('step-1-form').classList.remove('active');
                document.getElementById('step-2-form').classList.add('active');
            });
        }
        
        if (backToInfoBtn) {
            backToInfoBtn.addEventListener('click', function() {
                // Update steps
                document.querySelector('.step[data-step="2"]').classList.remove('active');
                document.querySelector('.step[data-step="1"]').classList.add('active');
                document.querySelector('.progress').style.width = '0%';
                
                // Show personal info form
                document.getElementById('step-2-form').classList.remove('active');
                document.getElementById('step-1-form').classList.add('active');
            });
        }
        
        if (completePaymentBtn) {
            completePaymentBtn.addEventListener('click', function() {
                // Get form data
                const email = document.getElementById('email').value;
                const plan = document.getElementById('selected-plan-name').textContent;
                const period = document.getElementById('summary-plan').textContent.includes('monthly') ? 'Monthly' : 'Annual';
                
                // Generate random membership ID
                const membershipId = 'PF-' + Math.floor(100000 + Math.random() * 900000);
                
                // Calculate next billing date (1 month from now)
                const nextDate = new Date();
                nextDate.setMonth(nextDate.getMonth() + 1);
                const nextBillingDate = nextDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
                
                // Update confirmation details
                document.getElementById('membership-id').textContent = membershipId;
                document.getElementById('membership-plan').textContent = plan;
                document.getElementById('membership-cycle').textContent = period;
                document.getElementById('next-billing-date').textContent = nextBillingDate;
                document.getElementById('confirmation-email').textContent = email || 'your email address';
                
                // Update steps
                document.querySelector('.step[data-step="2"]').classList.remove('active');
                document.querySelector('.step[data-step="3"]').classList.add('active');
                document.querySelector('.progress').style.width = '100%';
                
                // Show confirmation
                document.getElementById('step-2-form').classList.remove('active');
                document.getElementById('step-3-form').classList.add('active');
            });
        }
    }


document.addEventListener("DOMContentLoaded", function() {
  const btn = document.getElementById("getDirectionsBtn");
  if(!btn) return console.error("Get Directions button not found!");

  btn.addEventListener("click", function() {
    const destination = "Gondar Tewodros Square, Gondar, Ethiopia";
    const origin = prompt("Enter your starting location:", "");
    if(origin){
      const url = `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}`;
      window.open(url, "_blank");
    } else {
      alert("Please enter a starting location.");
    }
  });
});


    
    // Form Submissions
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            // In a real application, you would handle form submission here
            console.log('Form submitted:', this.id);
            
            // For newsletter form, show a success message
            if (this.classList.contains('newsletter-form')) {
                const input = this.querySelector('input[type="email"]');
                const originalValue = input.value;
                input.value = '';
                
                const successMessage = document.createElement('div');
                successMessage.className = 'success-message';
                successMessage.textContent = 'Thank you for subscribing!';
                successMessage.style.color = 'var(--primary)';
                successMessage.style.marginTop = '0.5rem';
                
                this.appendChild(successMessage);
                
                setTimeout(() => {
                    successMessage.remove();
                }, 3000);
            }
        });
    });
});