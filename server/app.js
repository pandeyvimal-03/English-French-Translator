const express = require('express')

const LanguageDetect = require('languagedetect');
const {check , validationResult} = require('express-validator')
const { translate } = require ('@vitalets/google-translate-api') ;

const cors = require('cors')

const dotenv = require('dotenv')
dotenv.config()



const app = express();
const port = process.env.PORT

// using middlewares
app.use(express.json())
app.use(express.urlencoded({extended : false}))

// setting up cors
    app.use(cors({
        origin: [ process.env.HOST],
        methods: ['GET', 'POST'] 
    }));

app.post('/' ,[check('text').notEmpty().withMessage('Please Enter the text ')] ,  async (req , res)=>{

// checking wether the text is provided or not if not provided we will return 

    const error = validationResult(req)
    if(!error.isEmpty()){
        return res.status(500).json({success : false ,message : error.errors[0].msg})
    }
    
      const txt = req.body.text;

// checking the language is english or not 

      const lngDetector = new LanguageDetect();
      const language  = lngDetector.detect(txt);
      const eng = language.some((e) => {
        return e[0] === 'english';
    });
      
      if(!eng){
        return res.status(500).json({success : false , message : 'Ensure that the provide text is in english'})
       }
    
// translating the provided text

     try {
        
         const { text } = await translate(txt, { to: 'fr' });
         return res.status(200).json({success : true ,  text : text})

     } catch (error) {
        return res.status(500).json({success : false , message : 'Internal server error ! Please try again letter'})
     }
     
      

})

// initializing our server

app.listen(port)