const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

let posts = [
    { id: 1, user: 'Rahul', content: 'Hello World!', likes: 0 }
];

app.get('/', (req, res) => {
    res.render('index', { posts });
});

// Post creation
app.post('/create-post', (req, res) => {
    const newPost = {
        id: posts.length + 1,
        user: req.body.username,
        content: req.body.content,
        likes: 0
    };
    posts.push(newPost);
    res.redirect('/');
});

// Like Post
app.post('/like/:id', (req, res) => {
    const postId = parseInt(req.params.id);
    const post = posts.find(p => p.id === postId);
    if(post) post.likes += 1;
    res.redirect('/');
});

app.listen(3000, () => console.log('Social App running on http://localhost:3000'));