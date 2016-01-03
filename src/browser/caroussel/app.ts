// /// <reference path="core/core_pubsub.ts" />
// /// <reference path="core/core.ts" />
// /// <reference path="core/core_restAPI.ts" />
// /// <reference path="libs/typings/jquery/jquery.d.ts" />
// /// <reference path="libs/typings/jquery.RL.d.ts" />
// /// <reference path="carrousel.ts"/>     
// 
// //ajouter le caroussel sur labiographie
// //voir si on peut monter les boutons
// //voir si on peut changer les couleurs
//     // des boutons
//     // ou contranste du fond
// //mettre le détail en fixe
// //Vignette
//     //carré sans distorsion   
// 
// // class cmdLoadPaints implements core.pubsub.IPubSubMsg { };
// // class evtPaintsLoaded implements core.pubsub.IPubSubMsg { };
// // 
// // class cmdLoadBiography implements core.pubsub.IPubSubMsg { };
// // //class evtBiographyLoaded implements core.pubsub.IPubSubMsg { };
// // 
// // 
// // class cmdLoadPaint implements core.pubsub.IPubSubMsg { constructor( public paintId: string ) { } };
// // class evtPaintLoaded implements core.pubsub.IPubSubMsg { constructor( public paint: models.paints.Paint ) { } };
// // 
// // class cmdUpdatePaint implements core.pubsub.IPubSubMsg { constructor( public paintId: string ) { } };
// // class evtPaintUpdated implements core.pubsub.IPubSubMsg { constructor( public paint: models.paints.Paint ) { } };
// // 
// // class cmdJumpToPage_AboutMe implements core.pubsub.IPubSubMsg { };
// // //class evtPageShowned_AboutMe implements core.pubsub.IPubSubMsg { };
// // 
// // class cmdJumpToPage_Paints implements core.pubsub.IPubSubMsg { };
// // //class evtPageShowned_Paints implements core.pubsub.IPubSubMsg { };
// // 
// // class cmdJumpToPage_News implements core.pubsub.IPubSubMsg { };
// // class cmdJumpToPage_ContactMe implements core.pubsub.IPubSubMsg { };
// // 
// // class cmdShowPaint implements core.pubsub.IPubSubMsg { constructor( public item: caroussel.IGalleryItem ) { } };
// // 
// // //class cmdImageDetailQuit implements core.pubsub.IPubSubMsg { };
// // 
// // 
// // var $imgScroller: JQuery;
// // gApp = new core.App();
// // 
// // window.onload = () => {
// //     
// //     gApp.PubSub.subscribe( new cmdLoadPaints, function ( cmdLoadPaint ) {
// //         var ps: models.paints.Paints;
// //         ps = new models.paints.Paints();
// //         $.mobile.loading( 'show' );
// //         ps.getAll();
// //     });
// 
// 
//     //gApp.PubSub.subscribe( new cmdShowPaint( null ), function ( evt: cmdShowPaint) {
//     //   //alert( "Paint clicked:" + evt.item.thumbnailUrl );
// 
//     //});
// 
//     //gApp.PubSub.subscribe( new models.paints.evtPaintsGetted( null, null, null ), function ( evt: models.paints.evtPaintsGetted ) {
//     //    if ( evt.error ) {
//     //        alert( "error: loading the paintings data!!:" + evt.error );
//     //    } else {
//     //        var items = [];
// 
//     //        $car.clearItems();
// 
//     //        jQuery.each<cpla.models.Paints>( evt.value, function ( key: number, val: cpla.models.Paints ) {
//     //            var strOnClick = [
//     //                "var $a = $( this );",
//     //                "var p = JSON.parse( $a.data(\"paint\"));",
//     //                "gApp.PubSub.publish( new cmdJumpToPage_ImageDetail( p ) );"
//     //            ].join( " " );
//     //            var strA = [
//     //                //ok mais background different de image"<a href='#' style=\"background-image:url('" + val.Thumbnail +"')\" onclick=' var $a = $(this); var p = JSON.parse($a.data(\"paint\")); gApp.PubSub.publish( new cmdJumpToPage_ImageDetail(p) );'>" +
//     //                "<a href='#' onclick='" + strOnClick + "'>",
//     //                "<img src ='" + val.Thumbnail + "' class='myThumb'/> ",
//     //                //"<div class= 'myThumb' style=\"background-image:url('" + val.Thumbnail +"')\"></div>" + 
//     //                "<h2>" + val.Name + "</h2>",
//     //                "<p class='ui-li-aside'>" + val.Description + "</p>",
//     //                "</a>"
//     //            ].join( " " );
//     //            var $a = $( strA );
//     //            $a.data( "paint", JSON.stringify( val ) );
//     //            var $li = $( "<li></li>" );
//     //            $li.prepend( $a );
//     //            items.push( $li );
// 
//     //            $car.addItem( {
//     //                thumbnailUrl: val.Thumbnail
//     //            });
// 
//     //        });
//     //        //$( "#listPaints" ).html( items ).listview( "refresh" );
//     //        //resizeMyThumb();
//     //    }
//     //    $.mobile.loading( 'hide' );
//     //});
// // 
// //     gApp.PubSub.subscribe( new models.paints.evtPaintsGetted( null, null, null ), function ( evt: models.paints.evtPaintsGetted ) {
// //         if ( evt.error ) {
// //             alert( "error: loading the paintings data!!:" + evt.error );
// //         } else {
// //             var items = [];
// // 
// //             gallery.clearItems();
// // 
// //             jQuery.each<cpla.models.Paints>( evt.value, function ( key: number, val: cpla.models.Paints ) {
// // 
// //                     gallery.addItem( {
// //                         thumbnailUrl: val.Thumbnail,
// //                         PaintId: val.PaintId,
// //                         Name: val.Name,
// //                         Description: val.Description,
// //                         Year: val.Year,
// //                         PictureUrl: val.Picture,
// //                         Size: val.Size    
// //                 });
// // 
// //             });
// // 
// //             gallery.selectFirstItem();      
// //         }
// //         $.mobile.loading( 'hide' );
// //     });
// 
// //     gApp.PubSub.subscribe( new cmdJumpToPage_Paints, function ( cmdJumpToPage_Paints ) {
// //         //$.mobile.changePage( "#pagePaints" );
// //         $.mobile.changePage( "#pageImageDetail" );
// //     });
// // 
// //     gApp.PubSub.subscribe( new cmdJumpToPage_AboutMe, function ( cmdJumpToPage_AboutMe ) {
// //         $.mobile.changePage( "#pageMe" );
// //     });
// // 
// //     gApp.PubSub.subscribe( new cmdJumpToPage_News, function ( cmdJumpToPage_Events ) {
// //         $.mobile.changePage( "#pageNews" );
// //     });
// // 
// //     gApp.PubSub.subscribe( new cmdJumpToPage_ContactMe, function () {
// //         $.mobile.changePage( "#pageContactMe" );
// //     });
// // 
// //     gApp.PubSub.subscribe( new cmdLoadBiography, function ( cmdLoadBiography ) {
// //         var bio: models.aboutMes.AboutMes;
// //         bio = new models.aboutMes.AboutMes();
// //         $.mobile.loading( 'show' );
// //         bio.get();
// //     });
// 
// //     gApp.PubSub.subscribe( new models.aboutMes.evtBiographyGetted( null, null, null ), function ( evt: models.aboutMes.evtBiographyGetted ) {
// //         if ( evt.error ) {
// //             alert( "error: loading the paintings data!!:" + evt.error );
// //         } else {
// //             $( '#biography' ).html( evt.value.Biographie );
// //         }
// //         $.mobile.loading( 'hide' );
// //     });
// // 
// //     $( "#pagePaints" ).on( "pageshow", function ( evt: JQueryEventObject ) {
// //         gApp.PubSub.publish( new cmdLoadPaints() );
// //         //alert( "paint shown" );
// //     });
// // 
// //     $( "#pageMe" ).on( "pageshow", function ( evt: JQueryEventObject ) {
// //         gApp.PubSub.publish( new cmdLoadBiography() );
// //         //alert( "me shown" );
// //     });
// 
//     //$( "#pageMe" ).trigger( "pageshow" );// mobile.changePage( "#pageMe" );
//     //$( "#pageImageDetail" ).trigger( "pagebeforeshow" );
//     //$( "#pageImageDetail" ).trigger( "pageshow" );
// 
//     //The first page is already loaded, I manually trigger the load of the paints
// //     gApp.PubSub.publish( new cmdLoadPaints() );
// // 
// // }
// 
// 
// //    var infiniteLoopRunning: boolean = false;       
// 
// // var gallery: caroussel.Gallery;
// 
// $( "#pageImageDetail" ).on( "pageshow", function ( evt: JQueryEventObject ) {
// 
//     if ( gallery == undefined ) {
// 
//         //calculate the dimensions
//         var windowHeight = $( window ).height(); //Get available screen height, not including any browser chrome
//         var headerHeight = $( '#pageImageDetailHeader' ).outerHeight() + 1; //Get height of page header
//         var $footer = $( '#pageImageDetailFooter' );
//         var footerHeight = $footer.outerHeight(); // I do not know why 20 is mising Get height of page header
//         var $pageContent = $( '#pageImageDetailContent' );
//         var pageContentPaddingTop = parseInt( $( this ).css( "padding-top" ).replace( "px", "" ) );
//         var pageContentPaddingBottom = pageContentPaddingTop // ne retourne pas de valeur ?? parseInt( $pageContent.css( "padding-bottom" ).replace( "px", "" ) );
//         var winContentHeight = windowHeight - headerHeight - footerHeight - pageContentPaddingTop - pageContentPaddingBottom; //Calculate out new height (-2 if you have a 1px border on content container)
// 
//         // //define the place for the "graphical object
//         // $pageContent.width( $( window ).width() );
//         // $pageContent.height( winContentHeight );
//         // $pageContent.css( 'top', headerHeight + 'px' );
// 
//         //create the "dynamic object"
//         gallery = new caroussel.Gallery( $( '#gallery' ) );
// 
//         //define events on the objects
//         gallery.onItemClick.add( function ( item: caroussel.IGalleryItem ) {
//             gApp.PubSub.publish( new cmdShowPaint( item ) );
//         });
// 
//         //request load paintings
//         // if ( gApp != undefined ) gApp.PubSub.publish( new cmdLoadPaints() );
//         // else alert( "gApp undefined!" );
//     }
// });
// 
