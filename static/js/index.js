/* Data for Skill Cards */
const skillsData = [
    { name: "Python", icon: "fa-brands fa-python", color: "#3776AB" },
    { name: "JavaScript", icon: "fa-brands fa-js", color: "#F7DF1E" },
    { name: "HTML", icon: "fa-brands fa-html5", color: "#E34F26" },
    { name: "CSS", icon: "fa-brands fa-css3-alt", color: "#1572B6" },
    { name: "C", icon: "fa-solid fa-c", color: "#00599C" },
    { name: "C++", icon: "fa-solid fa-code", color: "#00599C" },
    { name: "Java", icon: "fa-brands fa-java", color: "#007396" },
    { name: "SQL", icon: "fa-solid fa-database", color: "#003B57" },
    { name: "Django", icon: "fa-solid fa-d", color: "#092E20" },
    { name: "Flask", icon: "fa-solid fa-flask", color: "#000" },
    { name: "React", icon: "fa-brands fa-react", color: "#61DAFB" },
    { name: "Node.js", icon: "fa-brands fa-node", color: "#339933" },
    { name: "Express.js", icon: "fa-brands fa-node-js", color: "#000" },
    { name: "MongoDB", icon: "fa-solid fa-leaf", color: "#47A248" },
    { name: "MySQL", icon: "fa-solid fa-database", color: "#4479A1" },
    { name: "SQLite", icon: "fa-solid fa-server", color: "#003B57" },
    { name: "Git", icon: "fa-brands fa-git-alt", color: "#F05032" },
    { name: "GitHub", icon: "fa-brands fa-github", color: "#181717" },
    { name: "Linux", icon: "fa-brands fa-linux", color: "#FCC624" },
    { name: "Bash", icon: "fa-solid fa-terminal", color: "#4EAA25" },
    { name: "Docker", icon: "fa-brands fa-docker", color: "#2496ED" },
    { name: "Kubernetes", icon: "fa-solid fa-dharmachakra", color: "#326CE5" },
    { name: "AWS", icon: "fa-brands fa-aws", color: "#FF9900" },
    { name: "Azure", icon: "fa-brands fa-microsoft", color: "#0078D4" },
    { name: "GCP", icon: "fa-brands fa-google", color: "#4285F4" },
    { name: "TensorFlow", icon: "fa-solid fa-brain", color: "#FF6F00" },
    { name: "PyTorch", icon: "fa-solid fa-fire", color: "#EE4C2C" },
    { name: "NumPy", icon: "fa-solid fa-cube", color: "#013243" },
    { name: "Pandas", icon: "fa-solid fa-table", color: "#150458" },
    { name: "Matplotlib", icon: "fa-solid fa-chart-line", color: "#11557C" },
    { name: "OpenCV", icon: "fa-solid fa-eye", color: "#5C3EE8" },
    { name: "Machine Learning", icon: "fa-solid fa-robot", color: "#FF9900" },
    { name: "Deep Learning", icon: "fa-solid fa-network-wired", color: "#FF9900" },
    { name: "DSA", icon: "fa-solid fa-sitemap", color: "#222" },
    { name: "REST API", icon: "fa-solid fa-cloud-arrow-down", color: "#E34F26" },
    { name: "GraphQL", icon: "fa-solid fa-circle-nodes", color: "#E10098" },
    { name: "FastAPI", icon: "fa-solid fa-bolt", color: "#009688" },
    { name: "Bootstrap", icon: "fa-brands fa-bootstrap", color: "#7952B3" },
    { name: "TailwindCSS", icon: "fa-solid fa-wind", color: "#38B2AC" },
    { name: "TypeScript", icon: "fa-brands fa-js", color: "#3178C6" },
    { name: "Next.js", icon: "fa-solid fa-n", color: "#000" },
    { name: "Redux", icon: "fa-solid fa-arrows-spin", color: "#764ABC" },
    { name: "Firebase", icon: "fa-solid fa-fire-flame-curved", color: "#FFCA28" },
    { name: "Cybersecurity", icon: "fa-solid fa-shield-halved", color: "#222" },
    { name: "Data Analysis", icon: "fa-solid fa-magnifying-glass-chart", color: "#222" },
    { name: "OOPs", icon: "fa-solid fa-cubes", color: "#222" },
    { name: "System Design", icon: "fa-solid fa-server", color: "#222" },
    { name: "DevOps", icon: "fa-solid fa-infinity", color: "#222" },
    { name: "Microservices", icon: "fa-solid fa-puzzle-piece", color: "#222" }
];

const skillBox = document.getElementById("skillBox");

/* Dynamically Create Skill Cards */
skillsData.forEach(item => {
    const card = document.createElement("a");
    const linkUrl = "/" + item.name.replace(/\s+/g, '-');
    card.href = linkUrl;
    card.classList.add('skill-card'); // Use CSS class for most styles

    // Custom inline styles for dynamic data (color) and necessary positioning overrides
    card.style.cssText = `
        flex: 0 0 80%;
        max-width: 80%;
        scroll-snap-align: center;
        /* Desktop size overrides for better consistency */
        @media (min-width: 900px) {
            flex: 0 0 calc(33.333% - 14px);
            max-width: calc(33.333% - 14px);
        }
    `;

    card.innerHTML = `
        <div class="skill-icon" style="color: ${item.color || '#333'};">
            <i class="${item.icon}"></i>
        </div>
        <h3 class="skill-name">${item.name}</h3>
        <p class="skill-description">
            Learn ${item.name} with real-world examples.
        </p>
    `;

    // Add Hover/Touch Effects via JavaScript
    card.addEventListener("touchstart", () => card.style.transform = "scale(0.97)");
    card.addEventListener("touchend", () => card.style.transform = "scale(1)");

    card.addEventListener("mouseenter", () => {
        card.style.transform = "translateY(-3px)";
        card.style.boxShadow = "0 8px 20px rgba(0,0,0,0.12)";
    });
    card.addEventListener("mouseleave", () => {
        card.style.transform = "translateY(0)";
        card.style.boxShadow = "0 4px 15px rgba(0,0,0,0.08)";
    });

    skillBox.appendChild(card);
});


/* ---- Menu and Search Bar Functions ---- */

let currentOpenSubmenuId = null;

function closeAllSubmenus() {
    document.querySelectorAll('.submenu-box').forEach(box => {
        box.style.left = '-500px';
        box.style.display = 'none';
    });
    currentOpenSubmenuId = null;
}

function openSearch() {
    document.getElementById("searchBox").style.display = "flex";
}

function closeSearch() {
    document.getElementById("searchBox").style.display = "none";
}

function toggleMenu() {
    const sidebar = document.getElementById("sidebar");
    if (sidebar.style.left === "0px") {
        closeMenu();
    } else {
        sidebar.style.left = "0";
    }
}

function closeMenu() {
    document.getElementById("sidebar").style.left = "-260px";
    closeAllSubmenus();
}

function openSub(id, element) {
    const sidebar = document.getElementById("sidebar");
    
    // Only proceed if the sidebar is currently open
    if (sidebar.style.left !== "0px") {
        closeAllSubmenus();
        return;
    }

    const submenu = document.getElementById(id);
    const isCurrentlyOpen = currentOpenSubmenuId === id;
    const eventType = event.type;

    if (eventType === 'touchstart') {
        event.preventDefault();
        if (isCurrentlyOpen) {
            closeAllSubmenus();
            return;
        }
    } else if (eventType === 'mouseenter' && isCurrentlyOpen) {
        return;
    }

    closeAllSubmenus();
    currentOpenSubmenuId = id;

    // Set position and display
    submenu.style.left = `150px`; // Position next to the sidebar's width (250px)
    submenu.style.display = 'block';
}

/* OUTSIDE CLICK CLOSE HANDLER */
document.addEventListener("click", function(e) {
    const sidebar = document.getElementById("sidebar");
    const ham = document.querySelector(".hamburger");
    const submenuBoxes = document.querySelectorAll('.submenu-box');
    const searchBox = document.getElementById("searchBox");
    const searchIcon = document.querySelector(".search-icon");
    
    let clickedInside = false;

    // Check if click was inside sidebar, hamburger, submenu, search box, or search icon
    if (sidebar.contains(e.target) || ham.contains(e.target) || searchBox.contains(e.target) || searchIcon.contains(e.target)) {
        clickedInside = true;
    }

    submenuBoxes.forEach(box => {
        if (box.contains(e.target)) {
            clickedInside = true;
        }
    });

    if (!clickedInside) {
        closeMenu();
        closeSearch();
    }
});


/* ---- Slow + Smooth Swiping/Dragging Control for SkillBox ---- */
let isDown = false,
    startX,
    scrollLeft,
    isDragging = false;

skillBox.addEventListener("mousedown", e => {
    isDown = true;
    startX = e.pageX - skillBox.offsetLeft;
    scrollLeft = skillBox.scrollLeft;
    skillBox.style.scrollBehavior = "auto";
    skillBox.style.cursor = "grabbing";
    isDragging = false;
});

skillBox.addEventListener("mouseleave", () => {
    isDown = false;
    skillBox.style.cursor = "grab";
});

skillBox.addEventListener("mouseup", () => {
    isDown = false;
    skillBox.style.scrollBehavior = "smooth";
    skillBox.style.cursor = "grab";
});

skillBox.addEventListener("mousemove", e => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - skillBox.offsetLeft;
    const walk = (x - startX) * 1.2;
    skillBox.scrollLeft = scrollLeft - walk;

    // Set isDragging flag if movement is significant
    if (Math.abs(x - startX) > 5) {
        isDragging = true;
    }
});

// Prevent default link click while dragging
const links = skillBox.querySelectorAll('a');
links.forEach(link => {
    link.addEventListener('click', function(e) {
        // If user moved significantly, prevent the click to avoid opening a link during scroll
        if (isDragging) {
            e.preventDefault();
        }
        // Reset drag flag after click check
        isDragging = false;
    });
});
