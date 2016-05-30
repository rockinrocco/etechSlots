<?php

// Sample responses that allow you to test your CSS
// Uncomment one of these at a time.

// Regular spin, no prize
echo json_encode(array('success' => true, 'reels' => array(1, 2.5, 3), 'prize' => null, 'credits' => 9, 'dayWinnings' => 10, 'lifetimeWinnings' => 500));

// Prize, pays credits only
//echo json_encode(array('success' => true, 'reels' => array(1, 2.5, 3), 'prize' => array('id' => 1, 'payoutCredits' => 10, 'payoutWinnings' => 0), 'credits' => 19, 'dayWinnings' => 00, 'lifetimeWinnings' => 500));

// Prize, pays winnings only
//echo json_encode(array('success' => true, 'reels' => array(1, 2.5, 3), 'prize' => array('id' => 2, 'payoutCredits' => 0, 'payoutWinnings' => 100), 'credits' => 9, 'dayWinnings' => 100, 'lifetimeWinnings' => 600));

// Error (logged out)
//echo json_encode(array('success' => false, 'error' => 'loggedOut'));

// Error (other)
//echo json_encode(array('success' => false, 'error' => 'You do not have enough credits for this spin'));
