// Dark mode
const darkModeToggle = document.getElementById('darkModeToggle');
let isDark = localStorage.getItem('darkMode') === 'true' || 
             window.matchMedia('(prefers-color-scheme: dark)').matches;

function toggleDarkMode() {
    isDark = !isDark;
    document.documentElement.classList.toggle('dark', isDark);
    localStorage.setItem('darkMode', isDark);
}

darkModeToggle.addEventListener('click', toggleDarkMode);
document.documentElement.classList.toggle('dark', isDark);

// Blog posts
let posts = JSON.parse(localStorage.getItem('posts') || '[]');
const postForm = document.getElementById('postForm');
const postList = document.getElementById('postList');
const modal = document.getElementById('previewModal');
const previewTitle = document.getElementById('previewTitle');
const previewContent = document.getElementById('previewContent');

function savePosts() {
    localStorage.setItem('posts', JSON.stringify(posts));
}

function createPost(title, content, file) {
    const post = {
        id: Date.now().toString(),
        title,
        content,
        date: new Date().toLocaleDateString(),
        file: file ? {
            name: file.name,
            type: file.type,
            url: URL.createObjectURL(file)
        } : null
    };
    posts.unshift(post);
    savePosts();
    renderPosts();
}

function deletePost(id) {
    const post = posts.find(p => p.id === id);
    if (post?.file?.url) {
        URL.revokeObjectURL(post.file.url);
    }
    posts = posts.filter(post => post.id !== id);
    savePosts();
    renderPosts();
}

function togglePost(id) {
    const content = document.querySelector(`#post-content-${id}`);
    content.classList.toggle('show');
}

async function downloadPost(post) {
    if (post.file) {
        const a = document.createElement('a');
        a.href = post.file.url;
        a.download = post.file.name;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    } else {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        
        doc.setFontSize(16);
        doc.text(post.title, 20, 20);
        
        doc.setFontSize(12);
        doc.text(`Date: ${post.date}`, 20, 30);
        
        const contentLines = doc.splitTextToSize(post.content, 170);
        doc.text(contentLines, 20, 40);
        
        doc.save(`${post.title.toLowerCase().replace(/\s+/g, '-')}.pdf`);
    }
}

function previewPost(post) {
    previewTitle.textContent = post.title;
    
    if (post.file) {
        if (post.file.type === 'application/pdf') {
            previewContent.innerHTML = `
                <embed src="${post.file.url}" type="application/pdf" width="100%" height="600px">
            `;
        } else {
            previewContent.innerHTML = `
                <iframe src="${post.file.url}" width="100%" height="600px"></iframe>
            `;
        }
    } else {
        previewContent.innerHTML = `<p>${post.content}</p>`;
    }
    
    modal.classList.add('show');
}

function renderPosts() {
    postList.innerHTML = posts.map(post => `
        <div class="post">
            <div class="post-header" onclick="togglePost('${post.id}')">
                <div>
                    <h3 class="post-title">${post.title}</h3>
                    <p class="post-date">${post.date}</p>
                </div>
                <div class="post-actions" onclick="event.stopPropagation()">
                    ${post.file ? `
                        <button class="action-button" onclick="previewPost(${JSON.stringify(post).replace(/"/g, '&quot;')})">
                            <svg xmlns="http://www.w3.org/2000/svg" class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
                                <circle cx="12" cy="12" r="3"></circle>
                            </svg>
                        </button>
                    ` : ''}
                    <button class="action-button" onclick="downloadPost(${JSON.stringify(post).replace(/"/g, '&quot;')})">
                        <svg xmlns="http://www.w3.org/2000/svg" class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                            <polyline points="17 8 12 3 7 8"></polyline>
                            <line x1="12" y1="3" x2="12" y2="15"></line>
                        </svg>
                    </button>
                    <button class="action-button" onclick="deletePost('${post.id}')">
                        <svg xmlns="http://www.w3.org/2000/svg" class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M3 6h18"></path>
                            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                        </svg>
                    </button>
                </div>
            </div>
            <div id="post-content-${post.id}" class="post-content">
                ${post.content ? `<p>${post.content}</p>` : ''}
                ${post.file ? `
                    <div class="file-info">
                        <svg xmlns="http://www.w3.org/2000/svg" class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
                            <polyline points="14 2 14 8 20 8"></polyline>
                        </svg>
                        <span>${post.file.name}</span>
                    </div>
                ` : ''}
            </div>
        </div>
    `).join('');
}

postForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;
    const file = document.getElementById('file').files[0];
    
    if (title && (content || file)) {
        createPost(title, content, file);
        postForm.reset();
    }
});

modal.querySelector('.close-button').addEventListener('click', () => {
    modal.classList.remove('show');
});

// Initial render
renderPosts();