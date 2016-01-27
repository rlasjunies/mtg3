* convert the project in ES6
	=> move to node 4.0, typescript 1.7
	=> use of import vs required
	=> use of Promise
		=> use of async/await?
	=> decoupled routes vs bl
	=> remove mongoose
	=> use neDB

20160127 Remaining issues:
* loading bar not working anymore
* user list not shown on mobile
* no automatic tests
* external login not working on mobile
* project initialisation npm install, jspm install ... to be recheck
        => test the installation from blank fields
* npm script commands obsoletes
*

20160123:
* fix strange behavior in FF (work around bug on autofill)

20160119:
* fix when changing roles of the users ... after authorization does not work anymore

20160117:
* fix the google authentication, the problem was on create salt on empty paswword property :-(
* fix user list

20160109:
* add System.yml: file to build a modul graph dependency (from pluralsight JSPM training course)
* finalize the conversion to ES6 via SystemJS
* fix several issues
* remaining issues:
    * Google / external authentication does not work
    * users list, does not shows displayName, green color if active
    * when changing the roles of the users ... after authorization does not work anymore
    * login layout not correct in FireFox
    * loading bar not working anymore

20160105:
* conversion des fichiers htm en htm.ts, import des fichier *.htm
* utilisation du plug-in gulp-html-to-ts
    => le plug-in n'est tjrs pas fonctionnel, il faut le corriger ou le forker
    => tester le download du plugin via github/rlasjunies

reste à finaliser les imports de tous les fichiers

20160104:
* ajout des fichiers de configuration de angular
* manque encore le chargement des templates
=> il faut installer le plug-in JSPM text pour indiquer le format de récupération
?? quel sera l'impact sur le compilateur TS de la syntaxe ... from "myTpl!text"

20160103:
* initialisation de la migration vers systemjs

ARRET en-cours;
* ajout des services, controlleurs dans app.ts un à un
=> à finir, le problème est que je ne sais quel est le prochain fichier a charger

? est-ce vraiment nécessaire de passer à systemjs?
? il vaut mieux que le UI soit dans un projet a part; le considérer comme un plug-in du serveur. Comme ça il sera plus facile de migrer vers une autre UI. ( ng2 ;-), mais d'abord il faut finir


20160102:
* remove share/model folder and move everything in the different "owner" folder
* create core function to register route. The goal is paramaterize the Authentication (boolean) and autorisation (string)
* test of creating local npm package with typescript

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
