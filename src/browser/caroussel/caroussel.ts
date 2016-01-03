// /// <reference path="./core/core_image.ts" />
// /// <reference path="./core/core_event.ts" />
// /// <reference path="./core/core_misc.ts" />
// /// <reference path="../../../typings/browser.d.ts"/>
// namespace caroussel {
//
//     export interface IArrowParam {
//         text?: string;
//         height?: number;
//     }
//
//     export interface ICarrouselParam {
//         top?: number;
//         left?: number;
//         height?: number;
//         width?: number;
//         ArrowUP?: IArrowParam;
//         ArrowDOWN?: IArrowParam;
//     }
//
//     export enum enumViewerDetail_visibility {
//         show_always,
//         appears_adn_disappears,
//         hide
//     }
//
//     export interface IViewerDetailParam {
//         //top?: number;
//         //left?: number;
//         visibility?: enumViewerDetail_visibility;
//         height?: number;
//         width?: number;
//     }
//
//     export interface IImageViewerParam {
//         top?: number;
//         left?: number;
//         height?: number;
//         width?: number;
//         viewerDetail?: IViewerDetailParam;
//     }
//
//     export interface IGalleryParam {
//         top?: number;
//         left?: number;
//         height?: number;
//         width?: number;
//         caroussel?: ICarrouselParam;
//         imageviewer?: IImageViewerParam;
//         padding:number;
//     }
//
//     export interface IGalleryItem {
//         thumbnailUrl: string;
//         PaintId: number;
//         Name: string;
//         Description: string;
//         Year: string;
//         PictureUrl: string;
//         Size: string;
//         onclick?: ( evt: JQueryEventObject) => void;
//     }
//
//     export interface IGalleryItemEvent extends core.event.IEvent {
//         add( listener: (item:IGalleryItem) => void ): void;
//         remove( listener: ( item: IGalleryItem) => void ): void;
//         trigger( ...a: any[]): void;
//     }
//
//     export class ImageViewer {
//         private DEFAULT_SETTINGS: IImageViewerParam;
//         $me: JQuery;
//         $img: JQuery;
//         $imgDetails: JQuery;
//
//         constructor( imageViewer: JQuery, param?: IImageViewerParam ) {
//             this.$me = imageViewer;
//
//             this.DEFAULT_SETTINGS = {
//                 top: parseInt( this.$me.parent().css('top').replace( "px", "" ) ),
//                 left: parseInt( this.$me.parent().css( 'left' ).replace( "px", "" ) ) + 150,
//                 height: this.$me.parent().height(),
//                 width: this.$me.parent().width() - 150,
//                 viewerDetail: {
//                     visibility: enumViewerDetail_visibility.show_always,
//                     height: this.$me.parent().height(),
//                     width: 200,
//                 }
//             }
//
//             if ( param != undefined && param.top != undefined ) this.DEFAULT_SETTINGS.top = param.top;
//             if ( param != undefined && param.left != undefined ) this.DEFAULT_SETTINGS.left = param.left;
//             if ( param != undefined && param.height != undefined ) this.DEFAULT_SETTINGS.height = param.height;
//             if ( param != undefined && param.width != undefined ) this.DEFAULT_SETTINGS.width = param.width;
//             if ( param != undefined && param.viewerDetail != undefined ) {
//                 if ( param != undefined && param.viewerDetail != undefined && param.viewerDetail.visibility != undefined ) this.DEFAULT_SETTINGS.viewerDetail.visibility = param.viewerDetail.visibility;
//                 if ( param != undefined && param.viewerDetail != undefined && param.viewerDetail.height != undefined ) this.DEFAULT_SETTINGS.viewerDetail.height = param.viewerDetail.height;
//                 if ( param != undefined && param.viewerDetail != undefined && param.viewerDetail.width != undefined ) this.DEFAULT_SETTINGS.viewerDetail.width = param.viewerDetail.width;
//             }
//
//             this.$me.css( "top", this.DEFAULT_SETTINGS.top );
//             this.$me.css( "left", this.DEFAULT_SETTINGS.left );
//             this.$me.width( this.DEFAULT_SETTINGS.width);
//             this.$me.height( this.DEFAULT_SETTINGS.height );
//
//             this.$img = $( "<img id='carousselImageViewer' class='carousselImageViewer' style='position:absolute;background-color=pink'/>" );
//             this.$me.append( this.$img );
//
//             //TODO Delegate the HTML creation to calling component
//             var $imgDetailsHTML = $( ["<div id='carousselImageViewerDetail' class='carousselImageViewerDetail flyout hidden' style='position:absolute;background-color=green'>",
//                                         //"<div data - role='fieldcontain' class='ui-hide-label'>",
//                 //                            "<label for='name'>Nom:</label>",
//                 //"<input type='text' disabled='disabled' style='float: left' name='name' id='name' value='' placeholder='NomPlaceHolder'/>",
//                 //"<label for='description'>Description:</label>",
//                 //"<input type='text' disabled='disabled' style='float: left' name='description' id='description' value='' placeholder='DescriptionPLaceHolder'/>",
//                 "<p>Nom:</p><p id='name'></p>",
//                 "<p>Description:</p><p id='description'></p > ",
//
//                                         //"</div>",
//                                   "</div>"].join( "" ));
//             this.$imgDetails = this.$me.append( $imgDetailsHTML );
//
//             $imgDetailsHTML.css( "top", parseInt(this.$me.css( "top" ).replace("px","") ));
//             $imgDetailsHTML.css( "left", parseInt(this.$me.css('left').replace('px','')) + this.$me.width() - this.DEFAULT_SETTINGS.viewerDetail.width );
//             $imgDetailsHTML.width( this.DEFAULT_SETTINGS.width  );
//             $imgDetailsHTML.height( this.DEFAULT_SETTINGS.height );
//         }
//
//         source( url: string ) {
//             this.$img.fadeOut( 250, () => {
//                 //this.$imgViewer.attr( "visibility", "hidden" );
//                 this.$img.attr( "src", url );
//                 core.image.fitImageInContainer( this.$img, this.$me.width(), this.$me.height(), core.image.enumImageResizeMode.fit_vh, true );
//                 this.$img.fadeIn(250);
//
//                 $( '#carousselImageViewerDetail' ).removeClass( 'hidden' );
//                 setTimeout( function () {
//                     $( '#carousselImageViewerDetail' ).addClass( 'hidden' );
//                 }, 2000 );
//             });
//         }
//     }
//
//     export class Carrousel {
//         $me: JQuery;
//         $roller: JQuery
//         private DEFAULT_SETTINGS: ICarrouselParam;
//
//         constructor( $caroussel: JQuery, param?: ICarrouselParam ) {
//             this.$me = $caroussel;
//             this.$roller = $( "<div id='roller' style='overflow:hidden; position:absolute; background-color:yellow'></div>" );
//             this.$me.append( this.$roller);
//
//             this.DEFAULT_SETTINGS = {
//                 top: parseInt( this.$me.parent().css( "top" ).replace("px","")),
//                 left: parseInt( this.$me.parent().css( "left" ).replace( "px", "" )),
//                 height: this.$me.parent().height(),
//                 width: 150,
//                 //thumbnailWidth: 150,
//                 ArrowUP: {
//                     text: 'GO UP',
//                     height: 50,
//                 },
//                 ArrowDOWN: {
//                     text: 'GO DOWN',
//                     height: 50,
//                 },
//             };
//
//             if ( param != undefined && param.top != undefined ) this.DEFAULT_SETTINGS.top = param.top;
//             if ( param != undefined && param.left != undefined ) this.DEFAULT_SETTINGS.left = param.left;
//             //if ( param != undefined && param.thumbnailWidth != undefined ) this.DEFAULT_SETTINGS.thumbnailWidth = param.thumbnailWidth;
//             if ( param != undefined && param.height != undefined ) this.DEFAULT_SETTINGS.height = param.height;
//             if ( param != undefined && param.width != undefined ) this.DEFAULT_SETTINGS.width = param.width;
//             if ( param != undefined && param.ArrowUP != undefined ) {
//                 if ( param != undefined && param.ArrowUP != undefined && param.ArrowUP.text != undefined ) this.DEFAULT_SETTINGS.ArrowUP.text = param.ArrowUP.text;
//                 if ( param != undefined && param.ArrowUP != undefined && param.ArrowUP.height != undefined ) this.DEFAULT_SETTINGS.ArrowUP.height = param.ArrowUP.height;
//                 }
//             if ( param != undefined && param.ArrowDOWN != undefined ) {
//                     if ( param != undefined && param.ArrowDOWN != undefined && param.ArrowDOWN.text != undefined ) this.DEFAULT_SETTINGS.ArrowDOWN.text = param.ArrowDOWN.text;
//                     if ( param != undefined && param.ArrowDOWN != undefined && param.ArrowDOWN.height != undefined ) this.DEFAULT_SETTINGS.ArrowDOWN.height = param.ArrowDOWN.height;
//             }
//
//             this.$me.css( "top", this.DEFAULT_SETTINGS.top );
//             this.$me.css( "left", this.DEFAULT_SETTINGS.left );
//             this.$me.height( this.DEFAULT_SETTINGS.height );
//             this.$me.width( this.DEFAULT_SETTINGS.width );
//
//
//
//             var $ArrowUP = $( "<div id='" + core.misc.GUID_new() + "' class='flyout hidden'><p align='center'>" + this.DEFAULT_SETTINGS.ArrowUP.text + "</p></div>" );
//             var $ArrowDOWN = $( "<div id='" + core.misc.GUID_new() + "' class='flyout hidden'><p align='center'>" + this.DEFAULT_SETTINGS.ArrowDOWN.text + "</p></div>" );
//
//             //Add ArrowUP
//             this.$me.parent().append( $ArrowUP );
//             $ArrowUP.css( "top", this.DEFAULT_SETTINGS.top ); // + this.DEFAULT_SETTINGS.padding);
//             $ArrowUP.css( "left", this.DEFAULT_SETTINGS.left );// + this.DEFAULT_SETTINGS.padding );
//             $ArrowUP.height( this.DEFAULT_SETTINGS.ArrowUP.height );
//             $ArrowUP.width( this.DEFAULT_SETTINGS.width );// + pageContentPaddingLeft + pageContentPaddingRight );
//
//             //Add ArrowDOWN
//             this.$me.parent().append( $ArrowDOWN );
//             $ArrowDOWN.css( "top", this.DEFAULT_SETTINGS.height - this.DEFAULT_SETTINGS.ArrowDOWN.height );// + this.DEFAULT_SETTINGS.top + this.DEFAULT_SETTINGS.padding * 2);
//             $ArrowDOWN.css( "left", this.DEFAULT_SETTINGS.left );// + this.DEFAULT_SETTINGS.padding);
//             $ArrowDOWN.height( this.DEFAULT_SETTINGS.ArrowDOWN.height );
//             $ArrowDOWN.width( this.DEFAULT_SETTINGS.width);// + pageContentPaddingLeft + pageContentPaddingRight );
//
//             this.$me.hover( function () {
//                 $ArrowUP.removeClass( 'hidden' );
//                 $ArrowDOWN.removeClass( 'hidden' );
//
//             }, function () {
//                     $ArrowUP.addClass( 'hidden' );
//                     $ArrowDOWN.addClass( 'hidden' );
//                 });
//
//             //important to do it after the ilgViewer creation because there are some .flyout classes
//             $( ".flyout" ).hover( function () {
//                 $( ".flyout" ).removeClass( 'hidden' );
//             }, function () {
//                     $( ".flyout" ).addClass( 'hidden' );
//                 });
//
//             //this.$roller.kinetic();
//
//             this.$roller.css( "top", 0 );
//             this.$roller.css( "left", 0 );
//             this.$roller.height( this.DEFAULT_SETTINGS.height );
//             this.$roller.width( this.DEFAULT_SETTINGS.width );
//
//             $ArrowUP.on( 'mousedown', ( evt: JQueryEventObject ) => {
//             //    this.$roller.kinetic( "start", { velocityY: -10 });
//             });
//
//             $ArrowUP.on( 'mouseup', ( evt: JQueryEventObject ) => {
//             //    this.$roller.kinetic( "end" );
//             });
//
//             $ArrowDOWN.on( 'mousedown', ( evt: JQueryEventObject ) => {
//             //    this.$roller.kinetic( "start", { velocityY: 10 });
//             });
//
//             $ArrowDOWN.on( 'mouseup', ( evt: JQueryEventObject ) => {
//             //    this.$roller.kinetic( "end" );
//             });
//         }
//     }
//
//     export class Gallery {
//         private DEFAULT_SETTINGS: IGalleryParam;
//         $me: JQuery;
//         caroussel: Carrousel;
//         imageViewer: ImageViewer;
//
//         onItemClick: IGalleryItemEvent = new core.event.TypedEvent();
//
//         constructor( $gallery: JQuery, param?: IGalleryParam ) {
//             this.$me = $gallery;
//             this.DEFAULT_SETTINGS = {
//                 top: 0,
//                 left: 0,
//                 height: this.$me.parent().height(),
//                 width: this.$me.parent().width(),
//                 padding: 10,
//             };
//
//             //if ( param != undefined ) {
//             if ( param != undefined && param.top != undefined ) this.DEFAULT_SETTINGS.top = param.top;
//             if ( param != undefined && param.left != undefined ) this.DEFAULT_SETTINGS.left = param.left;
//             if ( param != undefined && param.height != undefined ) this.DEFAULT_SETTINGS.height = param.height;
//             if ( param != undefined && param.width != undefined ) this.DEFAULT_SETTINGS.width = param.width;
//                 //if ( param.padding != undefined ) this.DEFAULT_SETTINGS.padding = param.padding;
//             //}
//
//             $gallery.attr( 'style', 'overflow:hidden; position:absolute; background-color:red;' );
//             $gallery.css( "top", this.DEFAULT_SETTINGS.top );
//             $gallery.css( "left", this.DEFAULT_SETTINGS.left );
//             $gallery.height( this.DEFAULT_SETTINGS.height );
//             $gallery.width( this.DEFAULT_SETTINGS.width );
//
//             var $caroussel = $( "<div id='caroussel' style='background-color:blue'></div>" );
//             $gallery.append( $caroussel );
//             this.caroussel = new Carrousel( $caroussel );
//
//             var $imgViewer = $( "<div></div>" );
//             $gallery.append( $imgViewer );
//             this.imageViewer = new ImageViewer( $imgViewer);
//
//
//
//         }
//
//         addItem( item: IGalleryItem ) {
//             //if ( item.thumbnailwidth == undefined ) item.thumbnailwidth = this.DEFAULT_SETTINGS.thumbnailWidth;
//
//             var $img = $( "<img id ='" + core.misc.GUID_new() + "' class ='carousselItem' style='visibility:hidden;' src='" + item.thumbnailUrl + "'/>" );
//             //fitImageInContainer( $img, 150, 150, enumImageResizeMode.fit_vh );
//             $img.css( "visibility", "visible" );
//             $img.on( 'click', ( evt: JQueryEventObject ) => {
//                 this.imageViewer.source( item.PictureUrl );
//
//                 //TODO delegate the feeding/rendering of the viewer detail
//                 $( ".carousselImageViewerDetail #name" ).html( "<b>"+ item.Name +"</b>" );
//                 $( ".carousselImageViewerDetail #description" ).html( "<b>" + item.Description + "</b>");
//             });
//             this.caroussel.$roller.append( $img );
//         }
//
//         clearItems() {
//             //delete all the items in the roller
//             this.caroussel.$roller.empty();
//         }
//
//         selectFirstItem() {
//             //console.log( "id img:" + this.$roller.find( ":first-child" ).attr( "id" ) );
//             this.caroussel.$roller.find( ":first-child").trigger( 'click' );
//         }
//     }
// }
