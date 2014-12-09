var express = require('express');
var fs = require('fs');
var bodyParser = require('body-parser');
var app = express();

app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(function (req, res, next) {
  res.set('Content-Type', 'application/json');
  next();
});

app.get('/notes', function (req, res) {
  // Open the existing notes file
  fs.readFile(__dirname + '/data/notes.json', 'utf8', function (err, data) {

    // If we get an error, log it and return
    if (err) {
      res.status(500).end();
      return console.log(err);
    }

    res.status(200).send(data);

  });
})

// Update a note
app.post('/notes/:id', function (req, res) {
  // Open the existing notes file
  fs.readFile(__dirname + '/data/notes.json', 'utf8', function (err, data) {
    
    // If we get an error, log it and return
    if (err) {
      res.status(500).end();
      return console.log(err);
    }

    // Try to parse the JSON or return
    try {
      data = JSON.parse(data);
    } catch (e) {
      res.status(500).end();
      return console.log(e);
    }

    // Add body item to notes array
    data.forEach(function (note, index) {
      if (note.id == req.params.id) {
        data[index] = req.body;
      }
    });

    // Write file back to server
    fs.writeFile(__dirname + '/data/notes.json', JSON.stringify(data), function (err) {
      
      // If we get an error, log it and return
      if (err) {
        res.status(500).end();
        return console.log(err);
      }

      // No errors, everything is done so return new data
      res.status(200).send(data);
    });
  });
});

// Create a new note
app.put('/notes', function (req, res) {
  // Open the existing notes file
  fs.readFile(__dirname + '/data/notes.json', 'utf8', function (err, data) {
    
    // If we get an error, log it and return
    if (err) {
      res.status(500).end();
      return console.log(err);
    }

    // Try to parse the JSON or return
    try {
      data = JSON.parse(data);
    } catch (e) {
      res.status(500).end();
      return console.log(e);
    }

    // Add body item to notes array
    data.push(req.body);

    // Write file back to server
    fs.writeFile(__dirname + '/data/notes.json', JSON.stringify(data), function (err) {
      
      // If we get an error, log it and return
      if (err) {
        res.status(500).end();
        return console.log(err);
      }

      // No errors, everything is done so return new data
      res.status(201).send(data);
    });
  });
});

// Delete a note
app.delete('/notes/:id', function (req, res) {
  // Open the existing notes file
  fs.readFile(__dirname + '/data/notes.json', 'utf8', function (err, data) {
    
    // If we get an error, log it and return
    if (err) {
      res.status(500).end();
      return console.log(err);
    }

    // Try to parse the JSON or return
    try {
      data = JSON.parse(data);
    } catch (e) {
      res.status(500).end();
      return console.log(e);
    }

    // Add body item to notes array
    var index = -1;
    data.forEach(function (note, i) {
      if (note.id == req.params.id) {
        index = i;
      }
    });

    // If we found an item by that id, remove it
    if (index >= 0) {
      data.splice(index, 1);
    }

    // Write file back to server
    fs.writeFile(__dirname + '/data/notes.json', JSON.stringify(data), function (err) {
      
      // If we get an error, log it and return
      if (err) {
        res.status(500).end();
        return console.log(err);
      }

      // No errors, everything is done so return
      res.status(204).end();
    });
  });
});

var port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Server started. Open http://localhost:3000 in your browser.');
});
