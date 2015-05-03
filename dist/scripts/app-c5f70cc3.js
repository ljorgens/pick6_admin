"use strict";angular.module("pick6Admin",["ngAnimate","ngCookies","ngTouch","ngSanitize","ui.router","ui.bootstrap","googlechart","firebase","smart-table","formly","formlyBootstrap","angularFileUpload"]).constant("FBURL","https://torid-torch-2199.firebaseio.com/").config(["$stateProvider","$urlRouterProvider",function(e,a){var t={currentAuth:["Auth",function(e){return e.$requireAuth()}]};e.state("home",{url:"/",templateUrl:"app/main/splash.html",controller:"SplashCtrl"}).state("sign-in",{url:"/sign-in",templateUrl:"components/authentication/sign-in.html",controller:"SignInCtrl",controllerAs:"signIn"}).state("change-password",{url:"/change-password",templateUrl:"components/authentication/change-password.html",controller:"ChangePasswordCtrl",controllerAs:"changePassword"}).state("team",{templateUrl:"components/team/team.html",controller:"TeamCtrl",resolve:t}).state("team.dashboard",{url:"^/dashboard",templateUrl:"components/team/dashboard/dashboard.html",controller:"DashboardCtrl",controllerAs:"dashboard",resolve:t}).state("team.editPoints",{url:"^/edit",templateUrl:"components/team/edit-points/edit-points.html",controller:"EditPointsCtrl",controllerAs:"EditPoints",resolve:t}).state("team.players",{url:"^/players",templateUrl:"components/team/players/players.html",controller:"PlayersCtrl",controllerAs:"players",resolve:t}).state("team.createGame",{url:"^/create-game",templateUrl:"components/team/games/create-game.html",controller:"CreateGameCtrl",controllerAs:"addGame",resolve:t}).state("team.editGame",{url:"^/edit-game/:gameId",templateUrl:"components/team/games/create-game.html",controller:"EditGameCtrl",controllerAs:"addGame",resolve:t}).state("team.games",{url:"^/games",templateUrl:"components/team/games/games.html",controller:"GamesCtrl",controllerAs:"games",resolve:t}).state("team.current-game",{url:"^/current-game",templateUrl:"components/team/current-game/current-game.html",controller:"CurrentGameCtrl",controllerAs:"currentGame",resolve:t}).state("team.badges",{url:"^/badges",templateUrl:"components/team/badges/badges.html",controller:"BadgesCtrl",controllerAs:"badges",resolve:t}).state("team.coupons",{url:"^/coupons",templateUrl:"components/team/coupons/coupons.html",controller:"CouponsCtrl",controllerAs:"coupons",resolve:t}),a.otherwise("/")}]).run(["$rootScope","$location","formlyConfig",function(e,a,t){e.$on("$routeChangeError",function(e,t,o,n){"AUTH_REQUIRED"===n&&a.path("/")}),t.setType({name:"file",template:'<div><label for="fileInput">{{options.templateOptions.label}}ok {{model}}</label><input type="file" ng-model="model[options.key]" id="fileInput" /></div>'})}]),angular.module("pick6Admin").controller("PlayersCtrl",["$firebaseArray","$modal","FBURL",function(e,a,t){var o=this,n=e(new Firebase(t+"/players"));o.playerList=n,o.removeGame=function(e){var a=games[e];games.$remove(a).then(function(e){e.key()===a.$id})},o.openAddPlayer=function(){a.open({templateUrl:"components/team/players/create-player.html",controller:"AddPlayerCtrl",controllerAs:"player"})}}]),angular.module("pick6Admin").controller("AddPlayerCtrl",["$firebaseArray","$modalInstance","FBURL","uploadImage",function(e,a,t,o){var n=this,s=e(new Firebase(t+"/players"));n.submitForm=function(e,t){return e?(console.log(n.files),n.files?void o.uploadToS3(n.files,"players").then(function(e){console.log(e),t.url=e.savedUrl,s.$add(t),a.close()},function(e){console.log("error",e)}):void(n.errorMessage="Please select a photo to upload")):void 0},n.formData={},n.dismiss=function(){a.dismiss()},n.formFields=[{key:"name",type:"input",templateOptions:{type:"text",label:"Name",placeholder:"Name",required:!0}},{key:"number",type:"input",templateOptions:{type:"number",label:"Number",required:!0}}]}]),angular.module("pick6Admin").controller("GamesCtrl",["$firebaseArray","$modal","FBURL",function(e,a,t){var o=e(new Firebase(t+"/games")),n=this;n.gamesList=o,n.removeGame=function(e){var a=o[e];o.$remove(a).then(function(e){e.key()===a.$id})},n.editGame=function(e){console.log(e),a.open({templateUrl:"components/team/games/editGameTemplate.html",controller:"EditGameController",controllerAs:"editGame",resolve:{gameToEdit:function(){return e}}})}}]),angular.module("pick6Admin").controller("EditGameController",["$firebaseObject","$modal","$modalInstance","FBURL","gameToEdit",function(e,a,t,o,n){var s=this,r=n.$id,l=e(new Firebase(o+"/games/"+r));l.$loaded().then(function(){var e=angular.copy(l);e.date=new Date(e.date),s.formData=e}),s.updateGame=function(){var a=e(new Firebase(o+"/games/"+r));a.date=s.formData.date.getTime(),a.opponent=s.formData.opponent,a.address=s.formData.address,a.$save();var t=angular.copy(a);t.date=new Date(t.date),s.formData=t,s.dismiss()},s.dismiss=function(){t.dismiss()},s.formFields=[{key:"opponent",type:"input",templateOptions:{type:"text",label:"Opponent",placeholder:"Opponent",required:!0}},{key:"date",type:"input",templateOptions:{type:"date",label:"Game Date",required:!0}},{key:"date",type:"input",templateOptions:{type:"time",label:"Game Time",required:!0}},{key:"address",type:"input",templateOptions:{type:"text",label:"Address",placeholder:"Address",required:!0}}]}]),angular.module("pick6Admin").controller("CreateGameCtrl",["$firebaseArray","FBURL",function(e,a){var t=new Firebase(a+"/games"),o=this,n=e(t);o.formData={},o.saveGame=function(e){if(e){var a=angular.copy(o.formData);a.date=o.formData.date.getTime(),console.log(a),n.$add(a),o.gameAdded=!0}},o.formFields=[{key:"opponent",type:"input",templateOptions:{type:"text",label:"Opponent",placeholder:"Opponent",required:!0}},{key:"date",type:"input",templateOptions:{type:"date",label:"Game Date",required:!0}},{key:"date",type:"input",templateOptions:{type:"time",label:"Game Time",required:!0}},{key:"address",type:"input",templateOptions:{type:"text",label:"Address",placeholder:"Address",required:!0}}]}]),angular.module("pick6Admin").controller("EditPointsCtrl",["$firebaseObject","FBURL","uploadImage",function(e,a,t){var o=new Firebase(a+"/pointRules"),n=e(o);this.data=n,this.savePoints=function(e){e.$save(),this.alert=!0},this.fileSelected=t.uploadToS3}]),angular.module("pick6Admin").controller("DashboardCtrl",function(){this.fanAttendance={data:[["Date","Attendace"],["01-18-2015",50],["01-19-2015",45],["01-21-2015",52],["01-22-2015",70],["01-24-2015",90],["01-25-2015",145],["01-26-2015",165],["01-27-2015",163],["01-28-2015",183],["01-29-2015",173]],type:"ColumnChart",options:{title:"Fan Attendace (Last 10 Games)",width:800,height:240,legend:"none",vAxis:{viewWindowMode:"explicit",textStyle:{color:"#58585a",fontName:"AvenirLight"}},hAxis:{textStyle:{color:"#58585a",fontName:"AvenirHeavy"}},titleTextStyle:{color:"#58585a",fontSize:14,fontName:"AvenirHeavy"},annotations:{textStyle:{fontSize:18,fontName:"AvenirLight",bold:!0}}}}}),angular.module("pick6Admin").controller("CurrentGameCtrl",["$firebaseObject","$firebaseArray","$modal","FBURL",function(e,a,t,o){var n=this,s=e(new Firebase(o+"/currentGame")),r=a(new Firebase(o+"/players"));n.playerList=r,n.game=s,n.removePlayer=function(e){for(var a=0;a<s.currentPlayers.length;a++)if(s.currentPlayers[a].number===e.number)return s.currentPlayers.splice(a,1),void s.$save()},n.addPlayer=function(e){s.currentPlayers=s.currentPlayers||[];for(var a=0;a<s.currentPlayers.length;a++)if(s.currentPlayers[a].number===e.number)return;s.currentPlayers.push(e),s.$save()}}]),angular.module("pick6Admin").controller("EditCouponCtrl",["$firebaseObject","$modalInstance","FBURL","couponToEdit",function(e,a,t,o){var n=this,s=o.$id,r=e(new Firebase(t+"/coupons/"+s));r.$loaded().then(function(){n.formData=r}),n.submitForm=function(e,t){e&&(t.$save(),a.close())},n.formData={},n.dismiss=function(){a.dismiss()},n.formFields=[{key:"name",type:"input",templateOptions:{type:"text",label:"Name",placeholder:"Name",required:!0}},{key:"points",type:"input",templateOptions:{type:"number",label:"Points",required:!0}},{key:"availableCount",type:"input",templateOptions:{type:"number",label:"Available",required:!0}}]}]),angular.module("pick6Admin").controller("AddCouponCtrl",["$firebaseArray","$modalInstance","FBURL",function(e,a,t){var o=e(new Firebase(t+"/coupons")),n=this;n.submitForm=function(e,t){e&&(o.$add(t),a.close())},n.formData={},n.dismiss=function(){a.dismiss()},n.formFields=[{key:"name",type:"input",templateOptions:{type:"text",label:"Name",placeholder:"Name",required:!0}},{key:"points",type:"input",templateOptions:{type:"number",label:"Points",required:!0}},{key:"availableCount",type:"input",templateOptions:{type:"number",label:"Available",required:!0}}]}]),angular.module("pick6Admin").factory("CouponService",[function(){}]),angular.module("pick6Admin").controller("CouponsCtrl",["$firebaseArray","$modal","FBURL",function(e,a,t){for(var o=e(new Firebase(t+"/coupons")),n=this,s=[{name:"one",points:45,availableCount:20},{name:"two",points:30,availableCount:20},{name:"three",points:44,availableCount:15},{name:"four",points:22,availableCount:14},{name:"five",points:25,availableCount:12},{name:"six",points:28,availableCount:22},{name:"seven",points:30,availableCount:16}],r=0;r<s.length;r++);n.removeCoupon=function(e){var a=o[e];o.$remove(a).then(function(e){e.key()===a.$id})},n.couponList=o,n.openAddCoupon=function(){a.open({templateUrl:"components/team/coupons/create-coupon.html",controller:"AddCouponCtrl",controllerAs:"coupon"})},n.editCoupon=function(e){a.open({templateUrl:"components/team/coupons/create-coupon.html",controller:"EditCouponCtrl",controllerAs:"coupon",resolve:{couponToEdit:function(){return e}}})}}]),angular.module("pick6Admin").controller("EditBadgeCtrl",["$firebaseObject","$modalInstance","FBURL","badgeToEdit",function(e,a,t,o){var n=this,s=o.$id,r=e(new Firebase(t+"/badges/"+s));r.$loaded().then(function(){n.formData=r}),n.submitForm=function(e,t){e&&(t.$save(),a.close())},n.formData={},n.dismiss=function(){a.dismiss()},n.formFields=[{key:"name",type:"input",templateOptions:{type:"text",label:"Name",placeholder:"Name",required:!0}},{key:"points",type:"input",templateOptions:{type:"number",label:"Points",required:!0}},{key:"secretCode",type:"input",templateOptions:{type:"text",label:"Secret Code",required:!0}}]}]),angular.module("pick6Admin").controller("AddBadgeCtrl",["$firebaseArray","$modalInstance","FBURL",function(e,a,t){var o=e(new Firebase(t+"/badges")),n=this;n.submitForm=function(e,t){e&&(o.$add(t),a.close())},n.formData={},n.dismiss=function(){a.dismiss()},n.formFields=[{key:"name",type:"input",templateOptions:{type:"text",label:"Name",placeholder:"Name",required:!0}},{key:"points",type:"input",templateOptions:{type:"number",label:"Points",required:!0}},{key:"secretCode",type:"input",templateOptions:{type:"text",label:"Secret Code",required:!0}}]}]),angular.module("pick6Admin").controller("BadgesCtrl",["$firebaseArray","$modal","FBURL",function(e,a,t){var o=this,n=e(new Firebase(t+"/badges"));o.removeCoupon=function(e){var a=n[e];n.$remove(a).then(function(e){e.key()===a.$id})},o.badgeList=n,o.openAddBadge=function(){a.open({templateUrl:"components/team/badges/create-badge.html",controller:"AddBadgeCtrl",controllerAs:"badge"})},o.editCoupon=function(e){a.open({templateUrl:"components/team/badges/create-badge.html",controller:"EditBadgeCtrl",controllerAs:"badge",resolve:{badgeToEdit:function(){return e}}})}}]),angular.module("pick6Admin").controller("TeamCtrl",function(){}),angular.module("pick6Admin").controller("NavbarCtrl",["AuthenticationService",function(){}]),angular.module("pick6Admin").controller("SidebarCtrl",["AuthenticationService",function(e){this.signUserOut=e.signUserOut}]),angular.module("pick6Admin").controller("SignInCtrl",["$state","AuthenticationService",function(e,a){var t=this;t.user={email:"",password:""},t.signUserIn=function(o){a.signUserIn(o).then(function(t){t.password.isTemporaryPassword?(a.storeUserForReset(o),e.go("change-password")):e.go("team.dashboard")},function(e){t.errorMessage=e.message})},t.resetPassword=function(e){e&&a.resetPassword(e).then(function(){t.resetPasswordMessage="Password reset email sent successfully!"},function(e){t.resetPasswordMessage=e.message})}}]),angular.module("pick6Admin").factory("uploadImage",["$upload","$q",function(e,a){function t(t,o){var n=a.defer();console.log(t);var s=t[0],r=s.name;return e.upload({url:"https://pick6-admin.s3.amazonaws.com/",method:"POST",fields:{key:o+"/"+r,"Content-Type":s.type,acl:"public-read",AWSAccessKeyId:"AKIAIUKIGS5JQ5XAUGWQ",policy:"eyJleHBpcmF0aW9uIjoiMjAyMC0wMS0wMVQwMDowMDowMFoiLCJjb25kaXRpb25zIjpbeyJidWNrZXQiOiJwaWNrNi1hZG1pbiJ9LHsiYWNsIjogInB1YmxpYy1yZWFkIn0sWyJzdGFydHMtd2l0aCIsIiRDb250ZW50LVR5cGUiLCIiXSxbInN0YXJ0cy13aXRoIiwiJGtleSIsIiJdLFsiY29udGVudC1sZW5ndGgtcmFuZ2UiLCAwLCA1MjQyODgwMDBdXX0=",signature:"OMm+Z+GZnKL/vZxwW/RU3ZLvTnA="},file:s}).then(function(e){console.log(e);var a="https://s3-us-west-2.amazonaws.com/pick6-admin/"+o+"/"+r;n.resolve({savedUrl:a})},function(e){console.log("upload to S3 error: "+e),n.reject("error")}),n.promise}function o(e,a){n(e,function(t){var o=e.name;a(o,t)})}function n(e,a){if(e&&e.type.indexOf("image")>-1){var t=new FileReader;t.readAsDataURL(e),t.onload=function(e){a(e.target.result)}}}return{uploadToS3:t,setThumbnail:o}}]),angular.module("pick6Admin").controller("ChangePasswordCtrl",["$state","AuthenticationService",function(e,a){var t=this;t.changePassword=function(e,o){e===o&&a.changePassword(e).then(function(){t.message="Password changed successfully!"},function(e){t.message=e.message})}}]),angular.module("pick6Admin").factory("Auth",["$firebaseAuth","FBURL",function(e,a){var t=new Firebase(a);return e(t)}]).factory("AuthenticationService",["$firebaseAuth","$q","$state","$rootScope","FBURL",function(e,a,t,o,n){function s(e){if(e){var t=a.defer();return u.$authWithPassword({email:e.email,password:e.password,remember:"default"}).then(function(a){b({email:e.email,uid:a.uid,token:a.token,admin:!0}),g=!0,o.userEmail=a.password.email,t.resolve(a)}).catch(function(e){t.reject(e)}),t.promise}}function r(e){var t=a.defer();return u.$resetPassword({email:e}).then(function(){t.resolve(!0)}).catch(function(e){t.reject(e)}),t.promise}function l(e){var t=a.defer();return u.$changePassword({email:f.email,oldPassword:f.password,newPassword:e}).then(function(){m(),t.resolve(!0)}).catch(function(e){t.reject(e)}),t.promise}function i(){p.unauth(),g=!1,t.go("home")}function d(e){f=e}function m(){f=null}function c(){return g}var p=new Firebase(n),u=e(p),g=!1,f={},b=function(e){p.child("users").child(e.uid).set(e)},h={ref:p,isLoggedIn:c,signUserIn:s,signUserOut:i,resetPassword:r,storeUserForReset:d,changePassword:l};return h}]),angular.module("pick6Admin").controller("SplashCtrl",function(){}),angular.module("pick6Admin").run(["$templateCache",function(e){e.put("app/main/splash.html",'<div class="splash"><img class="front-image" src="assets/images/newfrontpage-banner.png" alt="Frontpage banner"><div class="row center copyright"><div class="col-sm-12"><p>Copyright © 2015 Pick6 Sports Solutions LLC</p></div></div></div>'),e.put("components/authentication/change-password.html",'<div class="sign-in center-block"><h1>Change Password</h1><form class="form-horizontal" ng-submit="changePassword.changePassword(pass1,pass2);"><div class="form-group"><label for="inputPassword1" class="col-sm-2 control-label">Password</label><div class="col-sm-10"><input type="password" class="form-control" id="inputPassword1" placeholder="Password" ng-model="pass1"></div></div><div class="form-group"><label for="inputPassword2" class="col-sm-2 control-label">Retype Password</label><div class="col-sm-10"><input type="password" class="form-control" id="inputPassword2" placeholder="Retype Password" ng-model="pass2"></div></div><div class="form-group"><div class="col-sm-offset-2 col-sm-10"><span class="text-danger">{{changePassword.message}}</span></div></div><div class="form-group"><div class="col-sm-offset-2 col-sm-10"><button type="submit" class="btn btn-default">Change Password</button></div></div></form></div>'),e.put("components/authentication/sign-in.html",'<div class="sign-in center-block"><form class="form-horizontal" ng-submit="signIn.signUserIn(signIn.user);"><div class="form-group"><label for="inputEmail3" class="col-sm-2 control-label">Email</label><div class="col-sm-10"><input type="email" class="form-control" id="inputEmail3" placeholder="Email" ng-model="signIn.user.email"></div></div><div class="form-group"><label for="inputPassword3" class="col-sm-2 control-label">Password</label><div class="col-sm-10"><input type="password" class="form-control" id="inputPassword3" placeholder="Password" ng-model="signIn.user.password"></div></div><div class="form-group"><div class="col-sm-offset-2 col-sm-10"><span class="text-danger">{{signIn.errorMessage}}</span></div></div><div class="form-group"><div class="col-sm-offset-2 col-sm-10"><button type="submit" class="btn btn-default">Sign in</button> <a href="" ng-click="showResetPassword = true" class="small">Forgot password?</a></div></div></form><form class="form-inline" ng-show="showResetPassword" ng-submit="signIn.resetPassword(resetEmail);"><h4>Reset Password</h4><div class="form-group"><label for="resetPassword">Email</label> <input type="email" class="form-control" id="resetPassword" ng-model="resetEmail"></div><button type="submit" class="btn btn-default">Reset Password</button></form><div><p>{{signIn.resetPasswordMessage}}</p></div></div>'),e.put("components/navbar/sidebar.html",'<ul class="nav navbar-nav side-nav sidebar" ng-controller="SidebarCtrl as sidebar"><li><a ui-sref="team.dashboard"><i class="fa fa-dashboard"></i> Team Dashboard</a></li><li><a ui-sref="team.editPoints"><i class="fa fa-gears"></i> Edit Points</a></li><li><a ui-sref="team.players"><i class="fa fa-users"></i> Players</a></li><li><a ui-sref="team.createGame"><i class="fa fa-edit"></i> Create New Game</a></li><li><a ui-sref="team.games"><i class="fa fa-gear"></i> All Games</a></li><li><a ui-sref="team.current-game"><i class="fa fa-calendar-o"></i> Current Game</a></li><li><a ui-sref="team.badges"><i class="fa fa-bookmark-o"></i> Badges</a></li><li><a ui-sref="team.coupons"><i class="fa fa-trophy"></i> Coupons</a></li><li><a href="" ng-click="sidebar.signUserOut();"><i class="fa fa-sign-out"></i> Log Out</a></li></ul>'),e.put("components/navbar/top-navbar.html",'<nav class="navbar navbar-static-top navbar-inverse navigation" ng-controller="NavbarCtrl as navBar"><div class="container-fluid"><a class="navbar-brand" href="http://pick6fan.com/" target="_blank">Pick6 Home</a><ul class="nav navbar-nav navbar-right"><a class="navbar-brand" ui-sref="sign-in" ng-hide="isLoggedIn();">Sign In</a> <a class="navbar-brand" ng-show="isLoggedIn();">Signed In As: {{userEmail}}</a></ul></div></nav>'),e.put("components/team/team.html",'<div ng-include="\'components/navbar/sidebar.html\'"></div><div ui-view="" class="team"></div>'),e.put("components/team/badges/badges.html",'<div id="wrapper"><div class="container sidebar-container"><div class="col-md-12"><h2>All Badges</h2><button class="btn btn-default" ng-click="badges.openAddBadge()">Add Badge</button><table class="table table-striped" st-table="badges.couponList"><tr><th>Name</th><th>Points</th><th>Secret Code</th><th>Edit</th><th>Delete</th></tr><tr ng-repeat="coupon in badges.badgeList"><td>{{coupon.name}}</td><td>{{coupon.points}}</td><td>{{coupon.secretCode}}</td><td><i class="fa fa-edit pointer" ng-click="badges.editCoupon(coupon)"></i></td><td><i class="glyphicon glyphicon-remove pointer" ng-click="badges.removeCoupon($index)"></i></td></tr></table></div></div></div>'),e.put("components/team/badges/create-badge.html",'<div class="modal-header"><h3 class="modal-title">Add Badge:</h3></div><div class="modal-body"><div class="container sidebar-container"><form name="badge.couponForm" ng-submit="badge.submitForm(badge.couponForm.$valid, badge.formData)" novalidate=""><formly-form model="badge.formData" fields="badge.formFields" class="col-md-6"><button type="submit" class="btn btn-primary">Update Badge</button> <button class="btn btn-warning" ng-click="badge.dismiss();">Cancel</button></formly-form></form></div></div>'),e.put("components/team/coupons/coupons.html",'<div id="wrapper"><div class="container sidebar-container"><div class="col-md-12"><h2>All Coupons</h2><button class="btn btn-default" ng-click="coupons.openAddCoupon()">Add Coupon</button><table class="table table-striped" st-table="coupons.couponList"><tr><th>Name</th><th>Points</th><th>Available</th><th>Edit</th><th>Delete</th></tr><tr ng-repeat="coupon in coupons.couponList"><td>{{coupon.name}}</td><td>{{coupon.points}}</td><td>{{coupon.availableCount}}</td><td><i class="fa fa-edit pointer" ng-click="coupons.editCoupon(coupon)"></i></td><td><i class="glyphicon glyphicon-remove pointer" ng-click="coupons.removeCoupon($index)"></i></td></tr></table></div></div></div>'),e.put("components/team/coupons/create-coupon.html",'<div class="modal-header"><h3 class="modal-title">Add Coupon:</h3></div><div class="modal-body"><div class="container sidebar-container"><form name="coupon.couponForm" ng-submit="coupon.submitForm(coupon.couponForm.$valid, coupon.formData)" novalidate=""><formly-form model="coupon.formData" fields="coupon.formFields" class="col-md-6"><button type="submit" class="btn btn-primary">Update Coupon</button> <button class="btn btn-warning" ng-click="coupon.dismiss();">Cancel</button></formly-form></form></div></div>'),e.put("components/team/current-game/current-game.html",'<div class="container sidebar-container"><div class="col-md-12"><h2>Current Game</h2><h1>VS. {{currentGame.game.opponent}}</h1><p>{{currentGame.game.date | date:\'medium\'}}</p><h2>Current Players</h2><span ng-hide="currentGame.game.currentPlayers.length">None</span><div class="media" ng-repeat="player in currentGame.game.currentPlayers"><div class="media-left media-middle"><a href="#"><img class="media-object" ng-src="{{player.url}}" alt="..."></a></div><div class="media-body"><h4 class="media-heading">{{player.name}}</h4>{{player.number}}<br><button ng-click="currentGame.removePlayer(player)">Remove</button></div></div><h2>All Players</h2><div class="media" ng-repeat="player in currentGame.playerList"><div class="media-left media-middle"><a href="#"><img class="media-object" ng-src="{{player.url}}" alt="..."></a></div><div class="media-body"><h4 class="media-heading">{{player.name}}</h4>{{player.number}}<br><button ng-click="currentGame.addPlayer(player)">Add</button></div></div></div></div>'),e.put("components/team/dashboard/dashboard.html",'<div class="container sidebar-container"><div class="row"><div class="col-md-3"><h3>Top Players</h3><ol><li></li><li></li><li></li></ol></div><div class="col-md-3"><h3>Top Badges</h3><ol><li>White Jersey</li><li>US Division Team</li><li>Moda Center Game</li></ol></div><div class="col-md-3"><h3>Top Coupons</h3><ol></ol></div><div class="col-md-3"><h3>Top #</h3><ol><li>#winterhawks</li><li>#GoHawks</li><li>#gohawks</li></ol></div></div><div class="row"><div class="col-md-9"><h1>Winterhawks</h1><h2>Fan Data</h2><div google-chart="" chart="dashboard.fanAttendance"></div></div><div class="col-md-3"><h3>Top Fan Scores</h3><h3>Tonight\'s Game</h3><ol><li>Kda0621</li><li>Coug2022</li><li>Breakout12</li><li>jhoodenpyl06</li><li>OldWazzu</li><li>JJZ</li></ol><h3>All-Time</h3><ol><li>Nicklawson</li><li>Mopineyro</li><li>Apple1</li><li>Krobinett</li><li>RichF</li></ol></div></div></div>'),e.put("components/team/edit-points/edit-points.html",'<div class="container sidebar-container"><h1>Edit Points</h1><div class="col-md-6"><form ng-submit="EditPoints.savePoints(EditPoints.data)"><div class="form-group"><label for="team_points_per_goal">Points per goal</label> <input class="form-control" type="number" ng-model="EditPoints.data.perGoal" name="team[points_per_goal]" id="team_points_per_goal"></div><div class="form-group"><label for="team_points_per_assist">Points per assist</label> <input class="form-control" type="number" ng-model="EditPoints.data.perAssist" name="team[points_per_assist]" id="team_points_per_assist"></div><div class="form-group"><label for="team_points_per_good_play">Points per good play</label> <input class="form-control" type="number" ng-model="EditPoints.data.perGoodPlay" name="team[points_per_good_play]" id="team_points_per_good_play"></div><div class="form-group"><label for="team_points_per_checkin">Points per checkin</label> <input class="form-control" type="number" ng-model="EditPoints.data.perCheckin" name="team[points_per_checkin]" id="team_points_per_checkin"></div><input type="submit" name="commit" value="Update Team" class="btn btn-primary"><div ng-show="EditPoints.alert"><alert ng-hide="close" close="close = true">Update Complete</alert></div></form></div></div><div class="form-group dog-form-img"><label>Upload Dog Photo</label> <img ng-show="EditPoints.files[0].dataUrl" ng-src=""> <input type="file" ng-model="EditPoints.files" ng-file-select="" accept="images/*"> <button ng-click="EditPoints.fileSelected(EditPoints.files,\'123\',\'martinpic.jpg\')">Upload</button></div>'),e.put("components/team/games/create-game.html",'<div class="container sidebar-container"><h2>Create New Game:</h2><form name="addGame.gameForm" ng-submit="addGame.saveGame(addGame.gameForm.$valid)" novalidate=""><formly-form model="addGame.formData" fields="addGame.formFields" class="col-md-6"><button type="submit" class="btn btn-primary">Create Game</button></formly-form></form></div><div ng-show="addGame.gameAdded"><alert ng-hide="close" close="close = true">Game Added</alert></div>'),e.put("components/team/games/editGameTemplate.html",'<div class="modal-header"><h3 class="modal-title">Edit Game:</h3></div><div class="modal-body"><div class="container sidebar-container"><form name="addGame.gameForm" ng-submit="editGame.updateGame(addGame.gameForm.$valid)" novalidate=""><formly-form model="editGame.formData" fields="editGame.formFields" class="col-md-6"><button type="submit" class="btn btn-primary">Update Game</button> <button class="btn btn-warning" ng-click="editGame.dismiss();">Cancel</button></formly-form></form></div></div>'),e.put("components/team/games/games.html",'<div class="container sidebar-container"><div class="col-md-12"><h2>All Games</h2><table class="table table-striped" st-table="games.gamesList"><tr><th>Name</th><th>Address</th><th>Date</th><th>Time</th><th>Edit</th><th>Delete</th></tr><tr ng-repeat="game in games.gamesList"><td>{{game.opponent}}</td><td>{{game.address}}</td><td>{{game.date | date:\'fullDate\'}}</td><td>{{game.date | date:\'shortTime\'}}</td><td><i class="fa fa-edit pointer" ng-click="games.editGame(game)"></i></td><td><i class="glyphicon glyphicon-remove pointer" ng-click="games.removeGame($index)"></i></td></tr></table></div></div>'),e.put("components/team/players/create-player.html",'<div class="modal-header"><h3 class="modal-title">Add Player:</h3></div><div class="modal-body"><div class="container sidebar-container"><form name="player.playerForm" ng-submit="player.submitForm(player.playerForm.$valid, player.formData)" novalidate=""><formly-form model="player.formData" fields="player.formFields" class="col-md-6"><input type="file" ng-model="player.files" ng-file-select="" accept="images/*"> <button type="submit" class="btn btn-primary">Add Player</button> <button class="btn btn-warning" ng-click="player.dismiss();">Cancel</button><div ng-show="player.errorMessage">{{player.errorMessage}}</div></formly-form></form></div></div>'),e.put("components/team/players/players.html",'<div class="col-md-12"><h2>All Players</h2><a class="btn btn-default" ng-click="players.openAddPlayer()">Add a player</a><div class="media" ng-repeat="player in players.playerList"><div class="media-left media-middle"><a href="#"><img class="media-object" ng-src="{{player.url}}" alt="..."></a></div><div class="media-body"><h4 class="media-heading">{{player.name}}</h4>{{player.number}}</div></div></div>')}]);