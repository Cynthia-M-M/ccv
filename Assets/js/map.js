document.addEventListener('DOMContentLoaded', function() {
    // Check if map element exists
    const mapElement = document.getElementById('regional-map');
    if (!mapElement) return;
    
    // Define map markers data
    const mapMarkers = [
        // Africa
        { region: 'africa', type: 'hq', lat: 25, lng: 35, name: 'Nairobi, Kenya', desc: 'AAMECC Headquarters' },
        { region: 'africa', type: 'presence', lat: 30, lng: 31, name: 'Cairo, Egypt', desc: 'Regional Office' },
        { region: 'africa', type: 'presence', lat: 34, lng: 18, name: 'Cape Town, South Africa', desc: 'Regional Office' },
        { region: 'africa', type: 'presence', lat: 9, lng: 7, name: 'Abuja, Nigeria', desc: 'Partner Office' },
        { region: 'africa', type: 'partner', lat: 14, lng: 17, name: 'Dakar, Senegal', desc: 'Partner Network' },
        { region: 'africa', type: 'partner', lat: 32, lng: 13, name: 'Tripoli, Libya', desc: 'Partner Network' },
        
        // Asia
        { region: 'asia', type: 'presence', lat: 3, lng: 101, name: 'Kuala Lumpur, Malaysia', desc: 'Regional Office' },
        { region: 'asia', type: 'presence', lat: 1, lng: 103, name: 'Singapore', desc: 'Partner Office' },
        { region: 'asia', type: 'presence', lat: 28, lng: 77, name: 'New Delhi, India', desc: 'Regional Office' },
        { region: 'asia', type: 'partner', lat: 39, lng: 116, name: 'Beijing, China', desc: 'Partner Network' },
        { region: 'asia', type: 'partner', lat: 13, lng: 100, name: 'Bangkok, Thailand', desc: 'Partner Network' },
        
        // Middle East
        { region: 'middle-east', type: 'presence', lat: 25, lng: 55, name: 'Dubai, UAE', desc: 'Regional Office' },
        { region: 'middle-east', type: 'presence', lat: 24, lng: 45, name: 'Riyadh, Saudi Arabia', desc: 'Partner Office' },
        { region: 'middle-east', type: 'partner', lat: 25, lng: 51, name: 'Doha, Qatar', desc: 'Partner Network' },
        { region: 'middle-east', type: 'partner', lat: 23, lng: 58, name: 'Muscat, Oman', desc: 'Partner Network' }
    ];
    
    // Create tooltip element
    const tooltip = document.createElement('div');
    tooltip.className = 'map-tooltip';
    tooltip.innerHTML = '<h5>Location</h5><p>Description</p>';
    document.body.appendChild(tooltip);
    
    // Create markers on the map
    function createMarkers() {
        // Clear existing markers
        const existingMarkers = mapElement.querySelectorAll('.map-marker');
        existingMarkers.forEach(marker => marker.remove());
        
        // Get active region filter
        const activeRegion = document.querySelector('.map-control-btn.active')?.dataset.region || 'all';
        
        // Create new markers based on filter
        mapMarkers.forEach(marker => {
            if (activeRegion === 'all' || marker.region === activeRegion) {
                const markerElement = document.createElement('div');
                markerElement.className = `map-marker ${marker.type}`;
                
                // Position marker on map using percentage coordinates
                // These are approximate conversions from lat/lng to relative positions
                const x = ((marker.lng + 180) / 360) * 100; // Convert longitude to percentage
                const y = ((90 - marker.lat) / 180) * 100;  // Convert latitude to percentage
                
                markerElement.style.left = `${x}%`;
                markerElement.style.top = `${y}%`;
                
                // Add data attributes
                markerElement.dataset.name = marker.name;
                markerElement.dataset.desc = marker.desc;
                markerElement.dataset.region = marker.region;
                
                // Add event listeners
                markerElement.addEventListener('mouseenter', showTooltip);
                markerElement.addEventListener('mouseleave', hideTooltip);
                
                // Add to map
                mapElement.appendChild(markerElement);
            }
        });
    }
    
    // Show tooltip on marker hover
    function showTooltip(e) {
        const marker = e.target;
        tooltip.innerHTML = `<h5>${marker.dataset.name}</h5><p>${marker.dataset.desc}</p>`;
        
        // Position tooltip near marker
        const rect = marker.getBoundingClientRect();
        tooltip.style.left = `${rect.left + window.scrollX}px`;
        tooltip.style.top = `${rect.top + window.scrollY - 60}px`;
        
        // Show tooltip
        tooltip.style.opacity = '1';
    }
    
    // Hide tooltip
    function hideTooltip() {
        tooltip.style.opacity = '0';
    }
    
    // Handle region filter buttons
    const filterButtons = document.querySelectorAll('.map-control-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Update markers
            createMarkers();
            
            // Highlight corresponding region info
            const region = this.dataset.region;
            const regionItems = document.querySelectorAll('.region-stat-item');
            
            regionItems.forEach(item => {
                if (region === 'all' || item.dataset.region === region) {
                    item.classList.add('active');
                } else {
                    item.classList.remove('active');
                }
            });
        });
    });
    
    // Handle region stat item clicks
    const regionItems = document.querySelectorAll('.region-stat-item');
    regionItems.forEach(item => {
        item.addEventListener('click', function() {
            const region = this.dataset.region;
            const button = document.querySelector(`.map-control-btn[data-region="${region}"]`);
            if (button) button.click();
        });
    });
    
    // Initialize map
    function initMap() {
        // Set "all" button as active by default
        const allButton = document.querySelector('.map-control-btn[data-region="all"]');
        if (allButton) allButton.classList.add('active');
        
        // Create initial markers
        createMarkers();
        
        // Add animation class to map container
        const mapContainer = document.querySelector('.interactive-map-container');
        mapContainer.classList.add('map-loaded');
    }
    
    // Initialize map with slight delay to ensure DOM is ready
    setTimeout(initMap, 500);
});