document.addEventListener('DOMContentLoaded', () => {
    
    // --- Navbar Scroll Effect ---
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // --- Mobile Menu Toggle ---
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');
    let isMenuOpen = false;

    function toggleMenu() {
        isMenuOpen = !isMenuOpen;
        if (isMenuOpen) {
            mobileMenu.classList.add('active');
            menuBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        } else {
            mobileMenu.classList.remove('active');
            menuBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
            document.body.style.overflow = '';
        }
    }

    menuBtn.addEventListener('click', toggleMenu);

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (isMenuOpen) toggleMenu();
        });
    });

    // --- Scroll Animations (Intersection Observer) ---
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: unobserve after animating
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach(el => {
        observer.observe(el);
    });

    // Trigger initial hero animation manually for immediate load effect
    setTimeout(() => {
        const heroContent = document.querySelector('.hero-content');
        if(heroContent) {
            heroContent.classList.add('visible');
        }
    }, 100);

    // --- Chatbot Logic ---
    const chatbotToggle = document.getElementById('chatbotToggle');
    const chatbotWindow = document.getElementById('chatbotWindow');
    const chatbotClose = document.getElementById('chatbotClose');
    const chatInput = document.getElementById('chatInput');
    const chatSend = document.getElementById('chatSend');
    const chatbotBody = document.getElementById('chatbotBody');

    // Toggle Chatbot
    chatbotToggle.addEventListener('click', () => {
        chatbotWindow.classList.toggle('active');
    });

    chatbotClose.addEventListener('click', () => {
        chatbotWindow.classList.remove('active');
    });

    // Send Message
    function sendMessage() {
        const text = chatInput.value.trim();
        if (!text) return;

        // Add user message
        const userMsg = document.createElement('div');
        userMsg.className = 'chat-msg user';
        userMsg.textContent = text;
        chatbotBody.appendChild(userMsg);
        
        chatInput.value = '';
        scrollToBottom();

        // Simulate Bot Reply
        setTimeout(() => {
            const botMsg = document.createElement('div');
            botMsg.className = 'chat-msg bot';
            
            // Simple keyword-based responses
            const lowerText = text.toLowerCase();
            let reply = "Thanks for your message! For direct assistance, please click the WhatsApp button on our site or email us at matsoftwaresolutions2026@gmail.com.";
            
            if (lowerText.includes('price') || lowerText.includes('cost') || lowerText.includes('package')) {
                reply = "Our packages start with the Basic Static plan. Check out the 'Packages' section above, or message us on WhatsApp for a custom quote!";
            } else if (lowerText.includes('hello') || lowerText.includes('hi')) {
                reply = "Hello! How can we help you build your dream website?";
            } else if (lowerText.includes('dynamic') || lowerText.includes('static')) {
                reply = "We offer both Static and Dynamic websites tailored precisely to your brand's needs!";
            }

            botMsg.innerHTML = reply;
            chatbotBody.appendChild(botMsg);
            scrollToBottom();
        }, 1000);
    }

    chatSend.addEventListener('click', sendMessage);

    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    function scrollToBottom() {
        chatbotBody.scrollTop = chatbotBody.scrollHeight;
    }
});
