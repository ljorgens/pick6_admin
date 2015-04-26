'use strict';

angular.module('pick6Admin')
.controller('AddPlayerCtrl', ['$firebaseArray', '$modalInstance', 'FBURL', 'uploadImage', function ($firebaseArray, $modalInstance, FBURL, uploadImage) {

  var vm = this,
      list = $firebaseArray(new Firebase(FBURL + '/players'));

  vm.submitForm = function(valid, player){
    if(!valid){
      return;
    }
    //uploadImage.uploadToS3()
    console.log(vm.files)
    if(!vm.files) {
      vm.errorMessage = 'Please select a photo to upload';
      return;
    }
    uploadImage.uploadToS3(vm.files,'players').then(function(data){
      console.log(data);
      player.url = data.savedUrl;
      list.$add(player);
      $modalInstance.close()
    },function(err){
      console.log('error',err);
    });
    return;
  }

  // vm.fileSelected = uploadImage.uploadToS3(vm.files,'123','martinpic.jpg');

  vm.formData = {};

  vm.dismiss = function(){
    $modalInstance.dismiss()
  }

  vm.formFields = [
      {
        key: 'name',
        type: 'input',
        templateOptions: {
          type: 'text',
          label: 'Name',
          placeholder: 'Name',
          required: true
        }
      },
      {
        key: 'number',
        type: 'input',
        templateOptions: {
          type: 'number',
          label: 'Number',
          required: true
        }
      }
    ];

}]);
