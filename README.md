# Podcast Sponsored Section Removal Tool

## Requirements
This will require Node and NPM to be installed. Once these are installed, run `npm ci` to install node modules.

## Installation Steps
To run the application run `npm start`.

## Node Scripts
Two nodes scripts are included for testing the machine learning functionality. 

The ml-data-import.js script will extract the features of one episode. This requires the podcast slug, the episode number and the file name (excluding extension) of the episode file. This can be run with the following example command, replacing the arguments as needed. 
```bash 
node ml-data-import.js podcast_slug episode_number file_name
```

The ml-testing-regression.js script will build and train the model for a single podcast. The podcast slug must be passed as an argument. An example to run this would be the following.
```bash 
node ml-testing-regression.js podcast_slug
```
At least one episode must be uploaded with at least one labelled section for this to work.

## Build Steps
To build the application to an executable file run `npm run make` This will create the /out folder where the package will be located.