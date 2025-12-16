// ============================================
// Showcase Page Functionality
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    // Filter functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const showcaseItems = document.querySelectorAll('.showcase-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            // Filter items
            showcaseItems.forEach(item => {
                if (filterValue === '*' || item.classList.contains(filterValue.replace('.', ''))) {
                    item.style.display = 'block';
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(30px) scale(0.95)';
                    
                    setTimeout(() => {
                        item.style.transition = 'all 0.6s ease';
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0) scale(1)';
                    }, 50);
                } else {
                    item.style.transition = 'all 0.3s ease';
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(-30px) scale(0.95)';
                    
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
    
    // Load more functionality
    const loadMoreBtn = document.getElementById('load-more-btn');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            // This would typically load more items via AJAX
            // For now, we'll just show a message
            this.textContent = 'All items loaded';
            this.disabled = true;
            this.style.opacity = '0.5';
        });
    }
    
    // Smooth scroll for showcase items
    showcaseItems.forEach(item => {
        item.addEventListener('click', function() {
            // Add click functionality if needed
            // Could open a modal or navigate to project detail page
        });
    });
});

