/* Name:     app.js
 * Project:  FEND - FE Applications - Cat Clicker Premuim MVO
 * Author:   Colin Ashley
 * Date:     9th May 2018
*/

/* Model (data) */
let model = {
  cats: [
    { name: 'Stinky', imgURL: 'images/stinky.jpg', clicks: 0 },
    { name: 'Smelly', imgURL: 'images/Smelly.jpg', clicks: 0 },
    { name: 'Fleabag', imgURL: 'images/Fleabag.jpg', clicks: 0},
    { name: 'Itchy', imgURL: 'images/Itchy.jpg', clicks: 0},
    { name: 'Scary', imgURL: 'images/Scary.jpg', clicks: 0 }
  ],
  currCat: null
};

/* octopus */
let octopus = {
  // initialize the list and initial image views
  init: function() {
    model.currCat = model.cats[0];
    viewList.init();
    viewCurrCat.init();
    viewAdmin.init();
  },

  getCatList: function() {
    return model.cats;
  },

  setCurrCat: function(cat) {
    model.currCat = cat;
  },

  incrementClicks: function() {
    model.currCat.clicks++;
    viewCurrCat.render();
  },

  getCurrCat: function() {
    return model.currCat;
  },

  populateAdmin: function() {
    viewAdmin.inputName.value = model.currCat.name;
    viewAdmin.inputURL.value = model.currCat.imgURL;
    viewAdmin.inputClicks.value = model.currCat.clicks;
  },

  updateCat: function() {
    model.currCat.name = viewAdmin.inputName.value;
    model.currCat.imgURL =  viewAdmin.inputURL.value;
    model.currCat.clicks = viewAdmin.inputClicks.value;
    viewCurrCat.render();
  }
};

/* view */
let viewList = {
  init: function() {
    // store the DOM element for easy access later
    this.catList = document.getElementsByClassName('catList')[0];
    // display the list
    this.render();
  },

  render: function() {
    const cats = octopus.getCatList();
    // create the list
    this.catList.innerHTML='';
    for (cat of cats) {
      let catEntry = document.createElement('li');
      catEntry.textContent = cat.name;
      this.catList.appendChild(catEntry);
      // add an event listener for the list entry
      catEntry.addEventListener('click', (function(catCopy) {
        return function() {
          octopus.setCurrCat(catCopy);
          octopus.populateAdmin();
          viewCurrCat.render();
        };
      })(cat));
    }
  }
};

let viewCurrCat = {
  init: function() {
    // locate the image on the page
    this.mainImage = document.getElementsByClassName('mainImage')[0];
    // setup event listener for image click
    this.mainImage.addEventListener('click', function() {
      octopus.incrementClicks();
    });
    // display default cat
    this.render();
  },

  render: function() {
    let liveCat = octopus.getCurrCat();
    this.mainImage.innerHTML = '<img class="featured-image" src="' + liveCat.imgURL + '"></img>';
    this.mainImage.innerHTML += '<div class="counter">' + liveCat.name + ' has ' + liveCat.clicks + ' Clicks</div>';
  }
}

let viewAdmin = {
  init: function() {
    // admin button event listener
    this.adminForm = document.getElementsByClassName('admin-form')[0];
    this.adminBtn = document.getElementsByClassName('admin-button')[0];
    this.adminBtn.addEventListener('click', function() {
      viewAdmin.render();
    });

    // set admin current values
    this.inputName = document.getElementById('input-name');
    this.inputURL = document.getElementById('input-url');
    this.inputClicks = document.getElementById('input-clicks');

    // cancel button event listener
    this.cancelBtn = document.getElementsByClassName('cancel-button')[0];
      this.cancelBtn.addEventListener('click', function() {
        viewAdmin.hide();
    });

    // save button event listenner
    this.saveBtn = document.getElementsByClassName('save-button')[0];
        this.saveBtn.addEventListener('click', function() {
          viewAdmin.save();
    });
  },

  save: function() {
    octopus.updateCat();
    this.hide();
    viewList.render();
  },

  hide: function() {
    this.adminForm.style.display = 'none';
  },

  render: function() {
      octopus.populateAdmin();
      this.adminForm.style.display = 'block';
  }
}

// main code
octopus.init();