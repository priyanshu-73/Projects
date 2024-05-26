const asyncHandler = require('express-async-handler');


const homepage = asyncHandler (async (req, res) => {
    const locals ={
        title: 'NodeJs Notes',
        description: 'Free Notes app'
    };
    
    res.render('index', {
        locals,
        layout: '../views/layouts/front-page'
    });
})

const about = asyncHandler (async (req, res) => {
    const locals ={
        title: 'About - NodeJs Notes',
        description: 'Free Notes app'
    };
    
    res.render('about', locals);
})

module.exports = {homepage, about}
