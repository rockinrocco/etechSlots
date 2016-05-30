<?php
//=====================================================
//Modify HERE
//=====================================================
$numIconsPerReel = 6; // Configure here how many icons are in each reel
$minBet = 1; // Configure the minimum bet a user can make
$maxBet = 10; // Configure them maximum bet a user can make

// Read this information from the logged user's profile.
$credits = 10;
$dayWinnings = 0;
$lifetimeWinnings = 500;

$windowID = rand(); // WindowID is used to identify each Window, in case the user opens more than one at a time, and spins in all of them. Sent straight up to the server.
$machineName = 'default';

//=====================================================
//End Modify HERE
//=====================================================

?>
<!DOCTYPE html>
<html>
<head>
	<title>Slot Machine</title>
	<link type="text/css" rel="stylesheet" href="css/slots.css" />
	<link type="text/css" rel="stylesheet" href="css/template1.css" />
</head>

<body>

<div id="PageContainer">
	<div id="PageContainerInner"> <!-- Just to be able to set the "won!" extra background -->

		<div id="prizes_list">
			<?php
			//=====================================================
			//Modify HERE (render prize table)
			//=====================================================
			$prizes = array(
				array('id' => 1, 'payout_winnings' => 200, 'image1' => array('image_name' => 'prize_6'), 'image2' => array('image_name' => 'prize_6'), 'image3' => array('image_name' => 'prize_6')),
				array('id' => 2, 'payout_winnings' => 50, 'image1' => array('image_name' => 'prize_4'), 'image2' => array('image_name' => 'prize_4'), 'image3' => array('image_name' => 'prize_4')),
				array('id' => 3, 'payout_winnings' => 20, 'image1' => array('image_name' => 'prize_2'), 'image2' => array('image_name' => 'prize_2'), 'image3' => array('image_name' => 'prize_2')),
				array('id' => 4, 'payout_winnings' => 16, 'image1' => array('image_name' => 'prize_1slash3'), 'image2' => array('image_name' => 'prize_5slash2'), 'image3' => array('image_name' => 'prize_4slash6')),
				array('id' => 5, 'payout_winnings' => 15, 'image1' => array('image_name' => 'prize_5'), 'image2' => array('image_name' => 'prize_5'), 'image3' => array('image_name' => 'prize_5')),
				array('id' => 6, 'payout_winnings' => 14, 'image1' => array('image_name' => 'prize_1'), 'image2' => array('image_name' => 'prize_1'), 'image3' => array('image_name' => 'prize_1')),
				array('id' => 7, 'payout_winnings' => 12, 'image1' => array('image_name' => 'prize_3'), 'image2' => array('image_name' => 'prize_3'), 'image3' => array('image_name' => 'prize_3')),
				array('id' => 8, 'payout_winnings' => 7, 'image1' => array('image_name' => 'prize_1slash3slash5'), 'image2' => array('image_name' => 'prize_1slash3slash5'), 'image3' => array('image_name' => 'prize_1slash3slash5')),
				array('id' => 9, 'payout_winnings' => 1, 'image1' => array('image_name' => 'prize_stardot5'), 'image2' => array('image_name' => 'prize_stardot5'), 'image3' => array('image_name' => 'prize_stardot5')),
			);
			foreach($prizes as $prize) { ?>
					<div id="trPrize_<?php echo $prize['id']; ?>" class="trPrize">
						<div class="tdReels">
							<div class="reel1 reelIcon <?php echo $prize['image1']['image_name']; ?>"></div>
							<div class="reel2 reelIcon <?php echo $prize['image2']['image_name']; ?>"></div>
							<div class="reel3 reelIcon <?php echo $prize['image3']['image_name']; ?>"></div>
							<div class="clearer"></div>
						</div>
						<span class="tdPayout" data-basePayout="<?php echo $prize['payout_winnings']; ?>"><?php echo (float) $prize['payout_winnings']; ?></span>
						<div class="clearer"></div>
					</div>
			<?php }
			//=====================================================
			//End Modify HERE
			//=====================================================
			?>
		</div>

		<div id="slotMachineContainer">

			<div id="ReelContainer">
				<div id="reel1" class="reel"></div>
				<div id="reel2" class="reel"></div>
				<div id="reel3" class="reel"></div>
				<div id="reelOverlay"></div>
			</div>

			<div id="loggedOutMessage" style="display: none;"><span class="large">Sorry, you have been logged off.</span><br />
				<b>No bids</b> have been deducted from this spin, because you're not logged in anymore.
				Please <a href="/login">login</a> and try again.
			</div>

			<div id="failedRequestMessage" style="display: none;"><span class="large">Sorry, we're unable to display your spin because your connection to our server was lost. </span><br />
				Rest assured that your spin was not wasted.
				Please check your connection and <a href="#" onclick="window.location.reload();">refresh</a> to try again.
			</div>
			<div id="betContainer">
				<span id="lastWin"></span>
				<span id="credits"><?php echo $credits; ?></span>
				<span id="bet"><?php echo $minBet; ?></span>
				<span id="dayWinnings"><?php echo $dayWinnings; ?></span>
				<span id="lifetimeWinnings"><?php echo $lifetimeWinnings; ?></span>
				<div id="betSpinUp"></div>
				<div id="betSpinDown"></div>
			</div>

			<div id="spinButton"></div>
		</div>

		<div id="soundOffButton"></div>

		<script type="text/javascript">
			var machineName = '<?php echo $machineName; ?>';
			var minBet = <?php echo $minBet; ?>;
			var maxBet = <?php echo $maxBet; ?>;
			var numIconsPerReel = <?php echo $numIconsPerReel; ?>;
			var windowID = <?php echo $windowID; ?>;
		</script>
		<script type="text/javascript" src="js/jquery-1.7.1.min.js"></script>
		<script type="text/javascript" src="js/jquery-ui-1.8.17.custom.min.js"></script>
		<script type="text/javascript" src="js/soundmanager2.js"></script>
		<script type="text/javascript" src="js/slots.js"></script>
	</div>
</div>
</body>
</html>
