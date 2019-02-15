const Profile = require('../models/Profile.js');

module.exports = function findIdOfElement(property,propertyValue) {
   Profile.findOne({ property: propertyValue }, function(err, element) {
        return element._id;
   });
};