const asyncHandler = require("express-async-handler");
const Note = require("../models/Notes");
const mongoose = require('mongoose')


const dashboard = async (req, res) => {
    let perPage = 8;
    let page = req.query.page || 1;
    const locals ={
        title: 'Dashboard',
        description: 'Free Notes app'
    };

    try {

        const notes = await Note.aggregate([
            {
                $sort: {
                    updatedAt: -1,
                }
            },
            {
                $project: {
                    title: { $substr: ['$title', 0, 30] },
                    body: { $substr: ['$body', 0, 100] },
                }
            }
        ])
        .skip(perPage * page - perPage)
        .limit(perPage)
        .exec()
        
        const count = await Note.countDocuments();

        res.render('dashboard/index', {
        //   userName: req.user.firstName,
          locals,
          notes,
          layout: "../views/layouts/dashboard",
          current: page,
          pages: Math.ceil(count / perPage)
        });
    
        
    } catch (error) {
        console.log(error);
        
    }
    
}


const dashboardViewNote = asyncHandler (async (req, res) => {
    const note = await Note.findById({_id: req.params.id})

    if(note){
        res.render('dashboard/view-note', {
            noteID: req.params.id,
            note,
            layout: '../views/layouts/dashboard'
        });
    }
    else{
        res.send("Something is wrong.")
    }
})

const dashboardUpdateNote = async (req, res) => {
    try {
        await Note.findOneAndUpdate(
            {_id: req.params.id},
            {title: req.body.title, body: req.body.body}
        );
    
        res.redirect('/dashboard');
    } catch (error) {
        console.log(error);
    }
}

const dashboardDeleteNode = async (req, res) => {
    try {
        await Note.deleteOne({_id: req.params.id});
        res.redirect('/dashboard')
    } catch (error) {
        console.log(error);
        
    }
}

const dashboardAddNote = async (req, res) => {
    res.render('dashboard/add', {
        layout: '../views/layouts/dashboard'
    });
}

const dashboardAddNoteSubmit = async (req, res) => {
    try {
        await Note.create(req.body);
        res.redirect('/dashboard')
    } catch (error) {
        console.log(error);
        
    }
}

const dashboardSearch = async (req, res) => {
    try {
        res.render('dashboard/search', {
            searchResults: "",
            layout: '../views/layouts/dashboard'
        })
    } catch (error) {
        
    }
}

exports.dashboardSearch = async (req, res) => {
    try {
      res.render("dashboard/search", {
        searchResults: "",
        layout: "../views/layouts/dashboard",
      });
    } catch (error) {}
  };

const dashboardSearchSubmit = async (req, res) => {
    try {
      let searchTerm = req.body.searchTerm;
      if(!searchTerm){
        console.log('missing');
        
      }
      const searchNoSpecialChars = searchTerm.replace(/[^a-zA-Z0-9 ]/g, "");
  
      const searchResults = await Note.find({
        $or: [
          { title: { $regex: new RegExp(searchNoSpecialChars, "i") } },
          { body: { $regex: new RegExp(searchNoSpecialChars, "i") } },
        ],
      })
  
      res.render("dashboard/search", {
        searchResults,
        layout: "../views/layouts/dashboard",
      });
    } catch (error) {
      console.log(error);
    }
  };

module.exports ={ dashboard, dashboardSearch, dashboardSearchSubmit, dashboardDeleteNode, dashboardUpdateNote, dashboardAddNoteSubmit, dashboardViewNote, dashboardAddNote };