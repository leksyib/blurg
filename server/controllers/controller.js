import request from 'request'
import cheerio from 'cheerio'
import Movie from '../models/movie'

exports.scrapeData = (req, res) => {
  const { url } = req.body
  if(url.includes('imdb.com')){
    let json = {}
    // call imdb endpoint
    request(url, async (error, response, html) => {
      if(!error || (response.statusCode !== 404 || '404')){
        let $ = cheerio.load(html)
        let title, release
        // find css class with title_wrapper and get data from it
        $('.title_wrapper').filter(function(){
          let data = $(this)
          title = data.children().first().text().trim()
          release = data.children().last().children().last().text().trim()
          json.title = title
          json.release = release
        })
        json.summary = $('.summary_text').text().trim()
        if(!json.title){
          res.json({
            success: false,
            message: 'Url is not valid'
          })
        }
        // check if movie exists
        const movie = await Movie.findOne({ title: json.title })
        if(movie){
          res.status(200).json(movie)
        }else{
          const newMovie = await Movie.create(json)
          res.status(200).json(newMovie)
        }
      }else{
        res.status(400).json({
          success: false,
          message: 'Url is not valid'
        })
      }
    })
  }else{
    res.json({
      success: false,
      message: 'Please enter a valid imdb url'
    })
  }
}

exports.getAllMovies = async(req, res) => {
  const movies = await Movie.find()
  res.status(200).json({
    movies
  })
}

exports.getOneMovie = async (req, res) => {
  const movie = await Movie.findById(req.params.id)
  if(movie){
    res.status(200).json(movie)
  }else{
    res.status(400).json({
      success: false,
      message: 'Movie not found'
    })
  }
}