* convert the project in ES6
	=> move to node 4.0, typescript 1.7
	=> use of import vs required
	=> use of Promise
		=> use of async/await?
	=> decoupled routes vs bl
	=> remove mongoose
	=> use neDB

20160102:
* remove share/model folder and move everything in the different "owner" folder
* create core function to register route. The goal is paramaterize the Authentication (boolean) and autorisation (string)

20151121:
* user management migrated to nedb
* refresh AT for user, create util.login / util.check for asynch control


NEXT
*	create an admin page for neDB
* 	use decorator to add runtime check on datamodel
* 	review user password creation/comparaison performance or make it async
* 	clean the role of each layer
	route
	bl
	dbaccess

	do the same for UI?

* 	create restMessage class to normalize exchange data between front end / back end
	restMessage peut être une classe avec un ID unique généré par le client,
	il sera sérialisé / persisté sur le server pour supporter le replay
	la response reprendra un maximum du contenu du message pour traçabilité
	cela pourrait bien être le support pour la Tx fonctionnelle
	le back end ajoutera le maximum d'information pour tracer monitorer le system



* externalise modules using npm interdependencies. The current module will become independent npm package with their own life cycle, mtg will reference these package in order to provide the features expected.
	=> authentication package
		user is separated package?
	=> autorisation package
	=> pictures package
	=> paintings package
	!
	http://justjs.com/posts/npm-link-developing-your-own-npm-modules-without-tears
