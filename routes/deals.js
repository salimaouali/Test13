// définition des routes
//instancier un nouveau routeur (permet d'executer des actions en fonction du passe qui a été appelé dans le navigateur )
var router = require('express').Router();

var Deal = require('./../models/Deal');
 //définir les routes 
router.get('/',(req, res)=>{ //31
	Deal.find({/*récupere tout*/}).then(deals =>{
		res.render('deals/index.html', {deals : deals});
	}) ;

}); 

router.get('/new', (req, res)=>{
	var deal= new Deal();
	res.render('deals/edit.html', {deal: deal, endpoint : '/'});


});

router.get('/edit/:id', (req,res)=>{
Deal.findById(req.params.id). then(deal=>{
	res.render('deals/edit.html',{deal: deal, endpoint :'/'+deal._id.toString()});
})

});
router.get('/delete/:id', (req,res)=>{
Deal.findOneAndRemove({_id: req.params.id}).then(()=>{
	res.redirect('/');
})

});

router.get('/:id', (req, res)=>{
Deal.findById(req.params.id).then(deal=>{
res.render('deals/show.html', {deal: deal})
},
err=> res.status(500).send(err));
});



router.post('/:id?', (req, res)=>{

	new Promise((resolve, reject)=>{

		 if(req.params._id){  // si on passe un id on recupere l element dans la base et on vas l'editer sinon on crée un nouveau

			Deal.findById(req.params._id).then(resolve, reject);
		}
		else {
			resolve(new Deal());
		}
	}).then(deal=> {
		deal.name = req.body.name;
		deal.description = req.body.description;
		deal.prix = req.body.prix;
		deal.lien = req.body.lien;
		deal.dateFin=req.body.dateFin;

		deal.picture = req.file.filename;

		return deal.save();

	}).then(()=> {
		res.redirect('/');
	})

});


//expoter le routeur 
module.exports = router;
