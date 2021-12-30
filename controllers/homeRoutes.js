const router = require('express').Router();
const { BlogPost, User } = require('../models');
const withAuth = require('../utils/auth');


router.get('/homepage', async (req, res) => {
  try {
    const BlogPostData = await BlogPost.findAll()
    //   include: [
    //     {
    //       model: User,
    //       attributes: ['name'],
    //     },
    //   ],
    // });

    const blogposts  = BlogPostData.map(blogpost => blogpost.get({ plain: true }));
    console.log(blogposts)

    // Pass serialized data and session flag into template
    res.render('homepage', { blogposts });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/posts/:id', async (req, res) => {
  try {
    const BlogPostData = await BlogPost.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    const blogpost = BlogPostData.get({ plain: true });

    res.render('posts', {
      ...blogpost,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID

    const Blogdata = await BlogPost.findAll();
    const blogs = Blogdata.map((blogpost) => blogpost.get({ plain: true })); 

    res.render('profile', { blogs });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});

module.exports = router;