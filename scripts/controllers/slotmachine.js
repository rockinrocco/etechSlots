'use strict';

/**
 * @ngdoc function
 * @name etechSlotApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the etechSlotApp
 */
angular.module('etechSlotApp')
  .controller('slotMachineController',["$scope","ngAudio",'$cookies', function ($scope,ngAudio,$cookies) {

    $scope.spin = ngAudio.load("sounds/spinning.mp3"); // returns NgAudioObject
     $scope.fastPayout = ngAudio.load("sounds/fastpayout.mp3"); // returns NgAudioObject

    $scope.payout = ngAudio.load("sounds/payout.mp3"); // returns NgAudioObject


    $scope.list = $cookies.get('nameList');
    console.log("s");

    this.getInformation = true;
    this.showSlot = false;
    var slotMachineCtrl = this;
      slotMachineCtrl.machineName = "Etech Slots";
      slotMachineCtrl.minBet = 1;
      slotMachineCtrl.maxBet = 1;
	  slotMachineCtrl.credits = 3;
      slotMachineCtrl.dayWinnings = 0;
      slotMachineCtrl.lifetimeWinnings = 500;
      slotMachineCtrl.name = "";
      slotMachineCtrl.email = "";
      slotMachineCtrl.numIconsPerReel = 3;
      slotMachineCtrl.windowID = 1;
      slotMachineCtrl.showBackButton = false;

      this.prizes = [];
      var prize1 = {'id':1,'payout_winnings':"Yeti Items",
      'image1':{'image_name':'prize_1'},
      'image2':{'image_name':'prize_1'},
      'image3':{'image_name':'prize_1'},
  	};
  	      var prize2 = {'id':2,'payout_winnings':"Etech Jar",
      'image1':{'image_name':'prize_2'},
      'image2':{'image_name':'prize_2'},
      'image3':{'image_name':'prize_2'},
  	};
  	      var prize3 = {'id':0,'payout_winnings':"Wine Stopper",
      'image1':{'image_name':'prize_3'},
      'image2':{'image_name':'prize_3'},
      'image3':{'image_name':'prize_3'},
  	};
	this.prizes.push(prize1);
	this.prizes.push(prize2);
	this.prizes.push(prize3);

console.log(this.prizes)

	this.playSlots = function(){
		if(slotMachineCtrl.name != '' && slotMachineCtrl.email != ''){
			slotMachineCtrl.showSlot = true;
			slotMachineCtrl.getInformation = false;
			var currentList = $cookies.get('nameList');
			if(currentList == null){
				currentList = [];
			};
			currentList = currentList + "|| Name: " + slotMachineCtrl.name + " Email: " + slotMachineCtrl.email;
			    $cookies.put('nameList',currentList);
    	  slotMachineCtrl.credits = 3;

		}
	}

	this.goBack = function(){
		slotMachineCtrl.showBackButton = false;
		$("#spinButton").removeClass("hidden");
		slotMachineCtrl.name="";
		slotMachineCtrl.email="";
		slotMachineCtrl.getInformation = true;
    	slotMachineCtrl.showSlot = false;
	}
     
var slotMachine = {
	// Set the proper height for the reels in the CSS file, rule: #slotMachineContainer #ReelContainer .reel
	// Set it to 3 * stripHeight
	// Also set the top property to the initial position you want to show
	stripHeight: 720, // Update this to match the strip PNG
	alignmentOffset: 86, // Play around with this until reels are properly aligned post-spin

	firstReelStopTime: 667,
	secondReelStopTime: 575, // since first reel's stop time, not since animation beginning
	thirdReelStopTime: 568, // since second reel's stop time, not since animation beginning
	payoutStopTime: 700, // since last reel's stop time, not since animation beginning

	reelSpeedDifference: 1, // speed difference between the 3 reels
	reelSpeed1Delta: 30, // "Fast speed" 
	reelSpeed1Time: 0, // How long does fast speed lasts.
	reelSpeed2Delta: 40, // Slow speed

	positioningTime: 200,
	bounceHeight: 200,
	bounceTime: 1000,

	winningsFormatPrefix: '',  // If winnings are "money", set prefix to be '$', '£', etc. If everything is unit-less, leave as is.

	spinURL: '/slots/spin.php', // point to the server component to call to get spin results.

	curBet: slotMachineCtrl.minBet,
	soundEnabled: true,
	
	spinning: false,

	init: function() {
		$('#betSpinUp').click(function() { slotMachine.change_bet(+1); });
		$('#betSpinDown').click(function() { slotMachine.change_bet(-1); });
		$('#spinButton').click(function() { slotMachine.spin(); });

		$('#soundOffButton').click(function() { slotMachine.toggle_sound(); });		

		if (slotMachine.get_balance() < slotMachineCtrl.minBet) {
			slotMachine.disable_spin_button();
		}
	},

	//----------------------------------------------------

	get_balance: function() {
		return slotMachineCtrl.credits + 1;
	},


	toggle_sound: function() {
		if ($('#soundOffButton').hasClass("off")) {
			ngAudio.unmute();
		} else {
			ngAudio.mute();
		}
		$('#soundOffButton').toggleClass("off");
	},

	enable_spin_button: function() {
		$('#spinButton').removeClass("disabled");
	},

	disable_spin_button: function() {
		$('#spinButton').addClass("disabled");
	},

	//----------------------------------------------------

	spin: function() {
		// Validate that we can spin
		if ($('#spinButton').hasClass("disabled")) { return false; }
		if (slotMachine.spinning) { return false; }
		
		// Clean up the UI
		slotMachineCtrl.credits--;
		if(slotMachineCtrl.credits == 0){
			$("#spinButton").addClass("hidden");
			slotMachineCtrl.showBackButton = true;
		}
		slotMachine.spinning = true;
		slotMachine.show_won_state(false);
		slotMachine.disable_spin_button();

		// Deduct the bet from the number of credits

		// Make the reels spin
		slotMachine._start_reel_spin(1, 0);
		slotMachine._start_reel_spin(2, slotMachine.secondReelStopTime);
		slotMachine._start_reel_spin(3, slotMachine.secondReelStopTime + slotMachine.thirdReelStopTime);

			$scope.spin.play();

		var fnStopReelsAndEndSpin = function() {
				// Make the reels stop spinning one by one
		var spinData = {};
		spinData.success = true;

		console.log($scope.spinsSinceLastWin);

		if($scope.spinsSinceLastWin == 11){
		$scope.spinsSinceLastWin = 0;
		spinData.prize = {};
		spinData.prize.id = $scope.currentPrize;
		spinData.reels = [$scope.currentPrize,$scope.currentPrize,$scope.currentPrize];
		spinData.prize.winType = true;
		$scope.spinsSinceLastWin = 0;
		$scope.currentPrize = ($scope.currentPrize + 1) % 3;

		} else {		
		spinData.reels = [$scope.reel1,$scope.reel2,$scope.reel3];
		$scope.reel1 = ($scope.reel1 + 1) % 3;
		$scope.reel2 = ($scope.reel2 + 1) % 3;
		$scope.reel3 = ($scope.reel3 + 1) % 3;
		spinData.success = true;
		}
		$scope.spinsSinceLastWin++;
		var baseTimeout = 1000;
				window.setTimeout(function(){
				 slotMachine._stop_reel_spin(1, spinData.reels[0]); }, 
				 baseTimeout);

				baseTimeout += slotMachine.secondReelStopTime;

				window.setTimeout(function(){ 
					slotMachine._stop_reel_spin(2, spinData.reels[1]); }, 
					baseTimeout);

				baseTimeout += slotMachine.thirdReelStopTime;
				window.setTimeout(function(){ 
					slotMachine._stop_reel_spin(3, spinData.reels[2]); },
					 baseTimeout);

				baseTimeout += slotMachine.payoutStopTime; // This must be related to the timing of the final animation. Make it a bit less, so the last reel is still bouncing when it lights up
				window.setTimeout(function(){ slotMachine.end_spin(spinData); }, baseTimeout);
		}

		fnStopReelsAndEndSpin(); 

	},

	show_won_state: function(bWon, prize_id, win_type) {
		if (bWon) {
			if (win_type) {
				$('#PageContainer, #SlotsOuterContainer').addClass(win_type);
			} else {
				$('#PageContainer, #SlotsOuterContainer').addClass("won");
			}
			$('#trPrize_' + prize_id).addClass("won");
		} else {
			$('.trPrize').removeClass("won");
			$('#PageContainer, #SlotsOuterContainer').removeClass(); // remove all classes
			$('#lastWin').html("");
		}
	},

	end_spin: function(data) {
		if (data.prize != null) {
			$scope.fastPayout.play();
			slotMachine.show_won_state(true, data.prize.id, data.prize.winType);

		}
			slotMachine._end_spin_after_payout(data);	
	},

	_format_winnings_number: function(winnings) {
		if (winnings == Math.floor(winnings)) {
			return winnings;
		} else {
			return winnings.toFixed(2);
		}
	},
	
	// These are the things that need to be done after the payout counter stops increasing, if there is a payout
	_end_spin_after_payout: function(data) {
		slotMachine.spinning = false;		
		slotMachine.enable_spin_button();		
	},


	abort_spin_abruptly: function() {
		slotMachine._stop_reel_spin(1, null);
		slotMachine._stop_reel_spin(2, null);
		slotMachine._stop_reel_spin(3, null);
	},

	// -----------------------------------
	
	// timeOffset is how much time later than the previous reel we expect this reel to stop spinning.
	_start_reel_spin: function(i, timeOffset) {
		var startTime = Date.now();
		var elReel = $('#reel' + i); // cache for performance
		elReel.css({top: -(Math.random() * slotMachine.stripHeight * 2) }); // Change the initial position so that, if a screenshot is taken mid-spin, reels are mis-aligned
		var curPos = parseInt(elReel.css("top"), 10);

		var fnAnimation = function(){
			elReel.css({top: curPos});
			
			if (Date.now() < startTime + slotMachine.reelSpeed1Time + timeOffset) {
				curPos += slotMachine.reelSpeed1Delta;
			} else {
				curPos += slotMachine.reelSpeed2Delta;
			}
			curPos += i * slotMachine.reelSpeedDifference;
			if (curPos > 0) {curPos = -slotMachine.stripHeight * 2;}
		};
		var timerID = window.setInterval(fnAnimation, 20);
		elReel.data("spinTimer", timerID);
	},
	_stop_reel_spin: function(i, outcome) {
		var elReel = $('#reel' + i); // cache for performance
		var timerID = elReel.data("spinTimer");
		window.clearInterval(timerID);
		elReel.data("spinTimer", null);


		if (outcome != null) {
			// the whole strip repeats thrice, so we don't have to care about looping
			// alignmentOffset is kind of empirical...
			var distanceBetweenIcons = slotMachine.stripHeight / 3;
			var finalPosition = -slotMachine.stripHeight -((outcome - 1) * distanceBetweenIcons) + slotMachine.alignmentOffset;

			
			// Animation two: Elastic Easing
			elReel.css({ top: finalPosition - slotMachine.stripHeight })
				.animate({ top: finalPosition + slotMachine.bounceHeight}, slotMachine.positioningTime, 'linear', function() {
					elReel.animate({top: finalPosition}, slotMachine.bounceTime, 'easeOutElastic');
				});
		}
	}
};

slotMachine.init();







  }]);
