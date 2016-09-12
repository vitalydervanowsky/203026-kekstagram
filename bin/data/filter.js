'use strict';

module.exports = function(list, filterID) {
  switch(filterID) {
    case 'filter-new':
      list.sort(function(a, b) {
        return b.created - a.created;
      });
      break;
    case 'filter-discussed':
      list.sort(function(a, b) {
        return b.comments - a.comments;
      });
      break;
  }
  return list;
};
