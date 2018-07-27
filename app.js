// console.log('Starting app.js');

const fs = require('fs');
const _ = require('lodash');

const yargs = require('yargs');
const notes = require('./notes.js');

const titleOptions = {
    describe: 'Title of note',
    demand: true,
    alias: 't'
};

const bodyOptions = {
    describe: 'body of note',
    demand: true,
    alias: 'b'
};

const argv = yargs.command('add', 'Add a new note', {
        title : titleOptions,
        body: bodyOptions
    })
    .command('list', 'List all note')
    .command('read', 'Read a note', {
        title : titleOptions,

    })
    .command('remove', 'Remove a note', {
        title : titleOptions,
    })
    .help().argv;
var command = argv._[0];

// console.log('Command: ', command);
// console.log('Yargs', argv);

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
    console.log(`Fetching ${allNotes.length} note`);
    allNotes.forEach((note) => notes.logNote(note));

} else if (command === 'read') {

    note = notes.getNote(argv.title);

    console.log(note);
    if (note) {
        console.log('Note Selected');
        notes.logNote(note);
    } else {
        console.log('Note not found');
    }

} else if (command === 'remove') {

  	var removed = notes.removeNote(argv.title);
  	var massage = removed ? 'Note Removed' : 'Note not found';
  	console.log(massage);

} else {
  console.log('Command not recognized');
}
