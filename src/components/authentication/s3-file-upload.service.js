'use strict';

angular.module('pick6Admin')
.factory('uploadImage',function($upload, $q){

    function uploadToS3(filesArray,folderName){
      var deferred = $q.defer();
      // if(!angular.isArray(filesArray) && !filesArray.length){
      //   deferred.reject('error');
      // }
      console.log(filesArray)
      var file = filesArray[0],
          fileName = file.name;
      // var numID = userID.match(/[0-9]+/);

// Make sure to put in your aws access key id, your policy string from irb output and yur signature from irb output
      $upload.upload({
        url: 'https://pick6-admin.s3.amazonaws.com/',
        method: 'POST',
        fields: {
          key: folderName + '/' + fileName,
          'Content-Type': file.type,
          acl: 'public-read',
          AWSAccessKeyId: 'AKIAIUKIGS5JQ5XAUGWQ',
          policy: 'eyJleHBpcmF0aW9uIjoiMjAyMC0wMS0wMVQwMDowMDowMFoiLCJjb25kaXRpb25zIjpbeyJidWNrZXQiOiJwaWNrNi1hZG1pbiJ9LHsiYWNsIjogInB1YmxpYy1yZWFkIn0sWyJzdGFydHMtd2l0aCIsIiRDb250ZW50LVR5cGUiLCIiXSxbInN0YXJ0cy13aXRoIiwiJGtleSIsIiJdLFsiY29udGVudC1sZW5ndGgtcmFuZ2UiLCAwLCA1MjQyODgwMDBdXX0=',
          signature: 'OMm+Z+GZnKL/vZxwW/RU3ZLvTnA='
        },
        //this is the image you want to upload (must have been through base 64 encoding first)
        file: file
      })
      .then(function(data){
        //the link where photo can be accessed
        console.log(data)
        var filelink ='https://s3-us-west-2.amazonaws.com/pick6-admin/' + folderName + '/' + fileName;
        deferred.resolve({savedUrl: filelink});
        //function that sends file link to database
      },function(err){
        console.log('upload to S3 error: ' + err);
        deferred.reject('error');
      });
      return deferred.promise;
    }

  function setThumbnail(file,cb){
    _imageToBase64(file,function(base64){
      var fileName = file.name;
      cb(fileName,base64);
    });
  }

  //turns image into Base 64 file type to allow uploading
  function _imageToBase64(file,cb){
    if(file && file.type.indexOf('image') > -1){
      var fr = new FileReader();
      fr.readAsDataURL(file);
      fr.onload = function(e){
        cb(e.target.result);
      };
    }
  }

  return {
    uploadToS3: uploadToS3,
    setThumbnail: setThumbnail,
    };
  });