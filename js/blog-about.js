const params = new URLSearchParams(window.location.search);
const blogId = params.get('id');

fetch('blogs.json')
  .then(res => res.json())
  .then(blogs => {
    const blog = blogs.find(b => b.id == blogId);
    if (blog) {
      document.getElementById('blog-title').textContent = blog.title;
      document.getElementById('blog-content').textContent = blog.content;
      const img = document.querySelector('.post-thumb img');
      if (img) {
        img.src = blog.image;
        img.alt = blog.title;
      }
    } else {
      document.getElementById('blog-title').textContent = 'Blog not found';
      document.getElementById('blog-content').textContent = '';
    }
  });