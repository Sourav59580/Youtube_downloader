const express = require('express');
const app = express();
const fs = require('fs')
const youtubedl = require('youtube-dl')
const bodyParser = require('body-parser')

//use express static folder
app.use(express.static("./public"))

// set view engine
app.set("view engine", "ejs")

// Use body-parser
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// Route
app.get('/', (req, res) => {
    res.render('index');
})

app.post('/video360', (req, res) => {
    var url = req.body.url
    console.log(url);

    youtubedl.getInfo(url, ['--format=18'], function(err, info) {
        if (err) throw err
        res.send(info.url)
            //console.log('url:', info.url)
            //console.log('size: ' + info.size)
            //console.log('filename: ' + info._filename)

    })
})

app.post('/video720', (req, res) => {
    var url = req.body.url
    console.log(url);

    youtubedl.getInfo(url, ['--format=22'], function(err, info) {
        if (err) throw err
        res.send(info.url)
    })
})

app.post("/audio144",(req,res)=>{
    var url = req.body.url
    console.log(url);

    youtubedl.getInfo(url, ['--format=251'], function(err, info) {
        if (err) throw err
        res.send(info.url)
    })
})



// const video = youtubedl('https://www.youtube.com/watch?v=dh0ToEruFVg',
//     // Optional arguments passed to youtube-dl.
//     ['--format=22'],
//     // Additional options can be given for calling `child_process.execFile()`.
//     { cwd: __dirname })

// // Will be called when the download starts.
// video.on('info', function(info) {
//     console.log('Download started')
//     console.log('filename: ' + info._filename)
//     console.log('size: ' + info.size)
// })

// video.pipe(fs.createWriteStream('myvideo.mp4'))




//   https://www.youtube.com/watch?v=dh0ToEruFVg


const PORT = process.env.PORT || 3000

app.listen(PORT, () => console.log(`Server is running at port ${ PORT }`))