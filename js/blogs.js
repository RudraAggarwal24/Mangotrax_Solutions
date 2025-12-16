// ============================================
// Blogs Page Functionality
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    // Filter functionality
    const filterButtons = document.querySelectorAll('.blog-filter-btn');
    const blogItems = document.querySelectorAll('.blog-card-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            // Filter items
            blogItems.forEach(item => {
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
    
    // Search functionality
    const searchInput = document.getElementById('blog-search');
    const searchBtn = document.querySelector('.search-btn-blog');
    
    function performSearch() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        
        if (searchTerm === '') {
            // Show all items if search is empty
            blogItems.forEach(item => {
                item.style.display = 'block';
                item.style.opacity = '1';
                item.style.transform = 'translateY(0) scale(1)';
            });
            return;
        }
        
        blogItems.forEach(item => {
            const title = item.querySelector('.blog-card-title').textContent.toLowerCase();
            const excerpt = item.querySelector('.blog-card-excerpt').textContent.toLowerCase();
            const category = item.querySelector('.blog-card-category').textContent.toLowerCase();
            
            if (title.includes(searchTerm) || excerpt.includes(searchTerm) || category.includes(searchTerm)) {
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
    }
    
    if (searchBtn) {
        searchBtn.addEventListener('click', function(e) {
            e.preventDefault();
            performSearch();
        });
    }
    
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                performSearch();
            }
        });
        
        // Real-time search as user types (with debounce)
        let searchTimeout;
        searchInput.addEventListener('input', function() {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(performSearch, 300);
        });
    }
    
    // Load more functionality
    const loadMoreBtn = document.getElementById('load-more-blogs-btn');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            // This would typically load more items via AJAX
            // For now, we'll just show a message
            this.textContent = 'All articles loaded';
            this.disabled = true;
            this.style.opacity = '0.5';
        });
    }
    
    // Smooth scroll for blog cards
    blogItems.forEach(item => {
        item.addEventListener('click', function(e) {
            // Only navigate if clicking on the card itself, not on links
            if (!e.target.closest('.blog-card-link')) {
                const link = item.querySelector('.blog-card-link');
                if (link) {
                    link.click();
                }
            }
        });
    });
});

