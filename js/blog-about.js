//const params = new URLSearchParams(window.location.search);
//const blogId = params.get('id');
function getBlogIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id');
}

fetch('blogs.json')
  .then(res => res.json())
  .then(blogs => {
    const blogId = getBlogIdFromUrl();
    const blog = blogs.find(b => b.id == blogId);
    if (blog) {
      document.getElementById('blog-title').textContent = blog.title;
      document.getElementById('blog-content').textContent = blog.content;
      const img = document.querySelector('.post-thumb img');
      if (img) {
        img.src = blog.image;
        img.alt = blog.title;
      }
      // Insert content1, content2, content3, content4
      const contentDiv = document.getElementById('blog-content');
      const ps = contentDiv.querySelectorAll('p');
      const blockquote = contentDiv.querySelector('blockquote.quote-post p');
      if (ps.length >= 3 && blockquote) {
          ps[0].textContent = blog.content1 || '';
          blockquote.textContent = blog.content2 || '';
          ps[1].textContent = blog.content3 || '';
          ps[2].textContent = blog.content4 || '';
      }

       const filesDiv = document.getElementById('blog-files');
            filesDiv.innerHTML = ''; // Clear previous
            if (blog.files && blog.files.length > 0) {
                blog.files.forEach(file => {
                    if (file.url) {
                        const link = document.createElement('a');
                        link.href = file.url;
                        link.textContent = `Download: ${file.name}`;
                        link.className = 'btn btn-success my-2';
                        link.setAttribute('download', '');
                        filesDiv.appendChild(link);
                    }
                });
            }
    } else {
      document.getElementById('blog-title').textContent = 'Blog not found';
      document.getElementById('blog-content').textContent = '';
    }
  });