'use strict';

var TREBEKISH = /(?:alex )?trebek/i;

/**
 * Given an image url, convert to a mustached version
 * using http://mustachify.me
 */
function mustachifyUrl(href) {
  var url = "http://mustachify.me/4?src=" + escape(toAbsoluteURL(href));
  return url;
}

/**
 * Given a filename for a static resource, returns the resource's absolute
 * URL. Supports file paths with or without origin/protocol.
 */
function toAbsoluteURL (url) {
  // Handle absolute URLs (with protocol-relative prefix)
  // Example: //domain.com/file.png
  if (url.search(/^\/\//) != -1) {
    return window.location.protocol + url
  }

  // Handle absolute URLs (with explicit origin)
  // Example: http://domain.com/file.png
  if (url.search(/:\/\//) != -1) {
    return url
  }

  // Handle absolute URLs (without explicit origin)
  // Example: /file.png
  if (url.search(/^\//) != -1) {
    return window.location.origin + url
  }

  // Handle relative URLs
  // Example: file.png
  var base = window.location.href.match(/(.*\/)/)[0]
  return base + url
}

function isTrebekImg (img) {
  var $img = $(img);
  var alt = $img.attr('alt');
  var title = $img.attr('title');
  return (TREBEKISH.test(alt) || TREBEKISH.test(title))
}


$('img').each(function(index, Element){
  var $img = $(this);
  var src = $img.attr('src');

  if (isTrebekImg($img)){
    $img.attr('src', mustachifyUrl(src));
  }
});

// console.log(imgs);
