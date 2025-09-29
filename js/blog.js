class Blog {
  constructor(id, title, content1,content2,content3,content4,image, date, author, tags,files) {
    this.id = id;
    this.title = title;
    this.content1 = content1 || "";
    this.content2 = content2 || "";
    this.content3 = content3 || "";
    this.content4 = content4 || "";
    this.image = image;
    this.date = date || "20, MAR 2025";
    this.author = author || "ADMIN";
    this.tags = tags || ["LIFESTYLE"];
    this.files = files || [];
  }
}


let allPosts = [];
let currentPage = 1;
const postsPerPage = 5;

function renderPosts(page = 1) {
  const blogList = document.getElementById('blog-list');
  blogList.innerHTML = '';
  const start = (page - 1) * postsPerPage;
  const end = start + postsPerPage;
  const pagePosts = allPosts.slice(start, end);

  pagePosts.forEach(post => {
    const postDiv = document.createElement('div');
    postDiv.className = 'post';
    postDiv.innerHTML = `
      <div class="post-media post-thumb">
        <a href="blog-single.html?id=${post.id}">
          <img src="${post.image}" alt="${post.title}">
        </a>
      </div>
      <h3 class="post-title"><a href="blog-single.html?id=${post.id}">${post.title}</a></h3>
      <div class="post-meta">
        <ul>
          <li><i class="ion-calendar"></i> ${post.date}</li>
          <li><i class="ion-android-people"></i> POSTED BY ${post.author}</li>
          <li>
            ${post.tags.map(tag => `<a href=""><i class="ion-pricetags"></i> ${tag}</a>`).join(',')}
          </li>
        </ul>
      </div>
      <div class="post-content">
        <p>${post.content1.substring(0, 400)}...</p>
        <a href="blog-single.html?id=${post.id}" class="btn btn-main">Continue Reading</a>
      </div>
    `;
    blogList.appendChild(postDiv);
  });
  renderPagination();
}

function renderPagination() {
  const totalPages = Math.ceil(allPosts.length / postsPerPage);
  const pagination = document.querySelector('.pagination.post-pagination');
  if (!pagination) return;
  pagination.innerHTML = '';

  // Prev button
  pagination.innerHTML += `<li class="page-item${currentPage === 1 ? ' disabled' : ''}">
    <a class="page-link" href="#" data-page="${currentPage - 1}">Prev</a></li>`;

  // Page numbers
  for (let i = 1; i <= totalPages; i++) {
    pagination.innerHTML += `<li class="page-item${currentPage === i ? ' active' : ''}">
      <a class="page-link" href="#" data-page="${i}">${i}</a></li>`;
  }

  // Next button
  pagination.innerHTML += `<li class="page-item${currentPage === totalPages ? ' disabled' : ''}">
    <a class="page-link" href="#" data-page="${currentPage + 1}">Next</a></li>`;

  // Add click event listeners
  pagination.querySelectorAll('.page-link').forEach(link => {
    link.onclick = function(e) {
      e.preventDefault();
      const page = parseInt(this.getAttribute('data-page'));
      if (!isNaN(page) && page >= 1 && page <= totalPages) {
        currentPage = page;
        renderPosts(currentPage);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };
  });
}

// Load blogs.json and initialize
fetch('blogs.json')
  .then(res => res.json())
  .then(posts => {
    // Sort by id descending (newest first)
    posts.sort((a, b) => b.id - a.id);

    allPosts = posts.map(postData =>
    new Blog(postData.id, postData.title, postData.content1,
    postData.content2,
    postData.content3,
    postData.content4, postData.image, postData.date, postData.author, postData.tags,
    postData.files)
    );
    renderPosts(currentPage);
  });

// fetch('blogs.json')
//   .then(res => res.json())
//   .then(blogs => {
//     const container = document.getElementById('blog-list');
//     blogs.forEach(postData => {
//       const post = new Blog(postData.id, postData.title, postData.content, postData.image);
//       const postDiv = document.createElement('div');
//       postDiv.className = 'post';
//       postDiv.innerHTML = `
//         <div class="post-media post-thumb">
//           <img src="${post.image}" alt="${post.title}" />
//         </div>
//         <h2 class="post-title">${post.title}</h2>
//         <div class="post-meta">
//          <ul>
//           <li>
//             <i class="ion-calendar"></i> 20, MAR 2025
//           </li>
//           <li>
//             <i class="ion-android-people"></i> POSTED BY ADMIN
//           </li>
//           <li>
//             <a href=""><i class="ion-pricetags"></i> LIFESTYLE</a>,<a href=""> TRAVEL</a>, <a href="">FASHION</a>
//           </li>
//          </ul>
//         </div>
//         <div class="post-content">
//          <p>${post.content.substring(0, 100)}...</p>
//          <a href="blog-single.html?id=${post.id}" class="read-more">Read More</a>
//         </div>

//       `;
//       container.appendChild(postDiv);
//     });
//   });


//Latest Posts Sidebar (IDs 5 to 9)
fetch('blogs.json')
  .then(res => res.json())
  .then(blogs => {
    const latestPosts = blogs.filter(blog => blog.id >= 1 && blog.id <= 5);
    const sidebar = document.querySelector('.widget-latest-post');
    if (sidebar) {
      // Remove existing static posts
      sidebar.innerHTML = `<h4 class="widget-title">Latest Posts</h4>`;
      latestPosts.forEach(blog => {
        const mediaDiv = document.createElement('div');
        mediaDiv.className = 'media';
        mediaDiv.innerHTML = `
          <a class="pull-left" href="blog-single.html?id=${blog.id}">
            <img class="media-object" src="${blog.image}" alt="Image">
          </a>
          <div class="media-body">
            <h4 class="media-heading"><a href="blog-single.html?id=${blog.id}">${blog.title}</a></h4>
            <p>${blog.content1.substring(0, 60)}...</p>
          </div>
        `;
        sidebar.appendChild(mediaDiv);
      });
    }
});
