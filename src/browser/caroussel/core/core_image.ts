//
// module core.image {
//
//     export enum enumImageResizeMode {
//         fit_vertically, //the image should fit vertically
//         fit_horizontal, //the image should fit horizontally
//         fit_vh, //the image should fit both, the longer size will be reduce to fit in the target
//         square, //the image will be resize to fit best in a square, if the image is a rectangle part of it will be lost
//     }
//
//     export function fitImageInContainer( $img: JQuery, maxWidth: number, maxHeight: number, mode: enumImageResizeMode, centerInParent?: boolean ) {
//         centerInParent = centerInParent == undefined ? false : centerInParent;
//         var newImg = new Image();
//
//         newImg.onload = function () {
//             var coeffHeight: number = maxHeight / newImg.height;
//             var coeffWidth: number = maxWidth / newImg.width;
//             //var coeff = coeffHeight < coeffWidth ? coeffHeight : coeffWidth;
//             var coeff = Math.min( coeffHeight, coeffWidth );
//
//             if ( mode == enumImageResizeMode.fit_vh ) {
//                 if ( coeff < 1 ) { //reduce size, does not increase image
//                     $img.height( $img.height() * coeff );
//                 } else {
//                     $img.height( newImg.height );
//                     $img.width( newImg.width );
//                 };
//             // } else if ( mode == enumImageResizeMode.fit_vertically ) {
//                 $img.height( $img.height() * coeffHeight );
//             } else if ( mode == enumImageResizeMode.fit_horizontal ) {
//                 $img.width( $img.width() * coeffWidth );
//             }
//
//             if ( centerInParent ) {
//                 $img.css( "left", ( maxWidth - $img.width() ) / 2 + 'px' );
//                 $img.css( "top", ( maxHeight - $img.height() ) / 2 + 'px' );
//             }
//             $img.css( "visibility", "visible" );
//         }
//
//             newImg.src = $img.attr( 'src' ); // this must be done AFTER setting onload
//     }
// }