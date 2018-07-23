console.log('Starting app.js');
const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');
const notes = require('./notes.js');
const argv = yargs.argv;
var command = argv._[0];
console.log('Command: ', command);
console.log('Yargs', argv);

if (command === 'add') {
  var note = notes.addNote(argv.title, argv.body);
  if (note) {
        console.log('Note created');
        notes.logNote(note);
  } else {
    console.log('Note title taken');
  }
} else if (command === 'list') {
  var allNotes = notes.getAll();
    console.log(`fetching ${allNotes.length} note`);
    allNotes.forEach((note) => notes.logNote(note));
} else if (command === 'read') {
    note = notes.getNote(argv.title);
    console.log(note);
    if (note) {
        console.log('Note Selected');
        notes.logNote(note);
    } else {
        console.log('Note title taken');
    }
} else if (command === 'remove') {
  	var removed = notes.removeNote(argv.title);
  	var massage = removed ? 'removed' : 'not removed';
  	console.log(massage);
} else {
  console.log('Command not recognized');
}
