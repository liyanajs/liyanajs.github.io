console.log("Liyana's portfolio is running!");


document.addEventListener("DOMContentLoaded", function() {
    
    // 1. SELECT ELEMENTS
    const modal = document.getElementById("galleryModal");
    const openBtn = document.getElementById("openGalleryBtn");
    
    // If this page doesn't have a gallery button, stop running
    if (!openBtn || !modal) return; 

    const modalImg = document.getElementById("modalImage");
    const closeBtn = document.querySelector(".close-btn");
    const nextBtn = document.getElementById("nextBtn");
    const prevBtn = document.getElementById("prevBtn");
    
    const galleryImages = [
        "../images/dashboard/1.png", 
        "../images/dashboard/2.png",
        "../images/dashboard/3.png",
        "../images/dashboard/4.png",
        "../images/dashboard/5.png",
        "../images/dashboard/6.png"
    ];
    
    let currentIndex = 0;

    function updateGallery(index) {
        // Handle looping (if at end, go to start)
        if (index >= galleryImages.length) {
            currentIndex = 0;
        } else if (index < 0) {
            currentIndex = galleryImages.length - 1;
        } else {
            currentIndex = index;
        }
        
        // Set the image source
        modalImg.src = galleryImages[currentIndex];
    }

    openBtn.addEventListener("click", function(e) {
        e.preventDefault(); // Stop page from jumping
        modal.style.display = "flex"; // Show modal
        updateGallery(0); // Start at first image
    });

    closeBtn.addEventListener("click", function() {
        modal.style.display = "none";
    });

    window.addEventListener("click", function(e) { //click outside to close
        if (e.target === modal) {
            modal.style.display = "none";
        }
    });

    nextBtn.addEventListener("click", function() {
        updateGallery(currentIndex + 1);
    });

    prevBtn.addEventListener("click", function() {
        updateGallery(currentIndex - 1);
    });
    
    // Optional: Keyboard support (Left/Right/Esc)
    document.addEventListener("keydown", function(e) {
        if (modal.style.display === "flex") {
            if (e.key === "ArrowRight") updateGallery(currentIndex + 1);
            if (e.key === "ArrowLeft") updateGallery(currentIndex - 1);
            if (e.key === "Escape") modal.style.display = "none";
        }
    });

});