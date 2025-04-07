const landingCard = document.querySelector('.landing-card');

landingCard.addEventListener('click', () => {
    landingCard.style.transform = 'scale(1.5)';
    landingCard.style.opacity = '0';
    
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 800);
});

document.querySelector('.photo-container').addEventListener('click', () => {
    const container = document.querySelector('.photo-container');
    container.style.transform = 'scale(1.1)';
    container.style.opacity = '0';
    
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 800);
});

// Add hover effect to quote
const quote = document.querySelector('.quote-text');
quote.addEventListener('mouseover', () => {
    quote.style.fontStyle = 'normal';
    quote.style.fontWeight = '500';
});

document.addEventListener('DOMContentLoaded', function() {
    const text = "Creative Developer";
    const typingText = document.querySelector('.typing-text');
    
    // Reset the text content
    typingText.textContent = '';
    
    let currentIndex = 0;
    
    function typeText() {
        if (currentIndex < text.length) {
            typingText.textContent += text[currentIndex];
            currentIndex++;
            setTimeout(typeText, 100); // 100ms delay between each character
        }
    }
    
    // Start typing
    typeText();
}); 