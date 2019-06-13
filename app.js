
//Définition des modules
var express = require("express"); 
var mongoose = require("mongoose"); 
var nunjucks = require('nunjucks'); //permet de generer nos pages web, inclure des donnés à l’interrieur …
//var bodyParser = require('body-parser'); // Charge le middleware de gestion des paramètres   
var multer = require('multer'); // gere les champs de type fichier 

//permet de traiter les champs de type fichier et d’enregistrer ce fichier dans un rep dans notre appli
var upload = multer({ 

dest: __dirname + '/uploads'
});

//connexion à la BDD
mongoose.connect('mongodb://localhost/dealabs', { useNewUrlParser: true }); 

//définir les différents model
//require('./models/Deal');


//On instancie une nouvelle appli express
const app = express();

//app.use(bodyParser.urlencoded());
app.use(upload.single('file')); // enregistrer les fichier 'file' dans le dossier uploads

//acceder au fichier bootstrap.min.css depuis un navigateur   
app.use('/css', express.static(__dirname +'/node_modules/bootstrap/dist/css'));

//utiliser les routeurs dèja définis 
app.use('/',require('./routes/deals'));
//app.use('/types',require('./routes/types'));

app.use('/uploads', express.static(__dirname + '/uploads')); 

//configuration de nunjucks
nunjucks.configure('vues',{
	autoescape : true,    //echaper les caractère html presents dans dif var
	express : app		//
});

//On définit une route qui execute une fonction (req : requette envoyé au serveur, rep : reponse envoyé au client)
/*app.get('/',function(req,res){
    res.send("server started")
});
*/
//Définition et mise en place du port d'écoute

app.listen(3000);


