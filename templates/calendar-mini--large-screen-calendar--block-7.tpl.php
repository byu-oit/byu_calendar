<?php
/**
 * @file
 * Template to display a view as a mini calendar month.
 * 
 * @see template_preprocess_calendar_mini.
 *
 * $day_names: An array of the day of week names for the table header.
 * $rows: An array of data for each day of the week.
 * $view: The view.
 * $min_date_formatted: The minimum date for this calendar in the format YYYY-MM-DD HH:MM:SS.
 * $max_date_formatted: The maximum date for this calendar in the format YYYY-MM-DD HH:MM:SS.
 * 
 * $show_title: If the title should be displayed. Normally false since the title is incorporated
 *   into the navigation, but sometimes needed, like in the year view of mini calendars.
 * 
 */
//dsm('Display: '. $display_type .': '. $min_date_formatted .' to '. $max_date_formatted);dsm($day_names);
$params = array(
  'view' => $view,
  'granularity' => 'month',
  'link' => FALSE,
);
?>
<div class="calendar-calendar animatedx fadeInLeftx"><div class="month-view">
<?php if ($show_title): ?>
<div class="date-nav-wrapper clear-block">
  <div class="date-nav">
    <div class="date-heading">
      <?php print theme('date_nav_title', $params) ?>
    </div>
  </div>
</div> 
<?php endif; ?> 
<table class="mini">
  <thead>
    <tr>
      <?php foreach ($day_names as $cell): ?>
        <th class="<?php print $cell['class']; ?>">
          <?php print $cell['data']; ?>
        </th>
      <?php endforeach; ?>
    </tr>
  </thead>
  <tbody>
      <?php
      // calculate what dates are in the current week from id
      $current = current_path();
    //$current = 'askldjasldfkjasldf/calendar/week/2016-W33';
    $currentDate = substr($current, -10);  // 2016-W33
    if (preg_match("/^(19|20)\d\d[-](0[1-9]|1[012])[-](0[1-9]|[12][0-9]|3[01])$/", $currentDate)) {
        // is normal
		$prelinks = '../day/';
    } else if ($current == 'node') {
		// it is front
		$currentDate = date("Y-m-d");
		$prelinks = '../calendar/day/' ;
	} else {
		// on ../day wo a date argument
        $currentDate = date("Y-m-d");
		$prelinks = '../calendar/day/';
    }

    $year = substr($currentDate, 0, 4);
    $mid = substr($currentDate, 5, 2);
    // '2016-08-10';
    //$dateTime is unix of this day's date
    
    $dateOb = date_create_from_format('Y-m-d', $currentDate);
    $todaysTime = date_timestamp_get($dateOb);


    // calc week id
    $dayNumber = date_format($dateOb, 'z'); // returns 0 - 365
    $startWYear = '1 January ' . $year;
    $yearStartTime = strtotime($startWYear);
    $todaysTime = $yearStartTime + ($dayNumber * 24 * 3600);

    $yearStartWeekday = date('w', $yearStartTime);
    //echo $year . ' started on a ' . $yearStartWeekday;
    $weekStartJanDay = 7 - $yearStartWeekday;
    $week2StartTime = $yearStartTime + ($weekStartJanDay*24*3600); 
    $week = 2+ floor(($todaysTime - $week2StartTime)/(7 * 24 * 3600));

    $weeksToAdd = $week - 2;
    $weekStartTime = $week2StartTime + ((7*($weeksToAdd)))*24*3600;
    $weekEndTime = $weekStartTime + (6*24*3600);

	  // add leading zeroes
		$week = sprintf("%02d", $week);  // should be 01 if 1
     
      ?>
      
      
      <?php $rowid=0; ?>
    <?php foreach ((array) $rows as $row): ?>
      <?php $rowid++; ?>
      <tr class="row-<?php print $rowid; ?>">
        <?php foreach ($row as $cell): ?>
          
            <?php /*print $cell['data'];  */?>
            <?php
            //calculate week and set link
            $id = $cell['id'];
            $todaysId = 'large_screen_calendar-' . $currentDate;
            $simpleDate = substr($id,-10);
//            $dateOb = date_create_from_format('Y-m-d', $simpleDate);
            $year = substr($simpleDate, 0, 4);
            $month = substr($simpleDate, 5, 2);
            $day = substr($simpleDate, 8, 2);
            $dateTime = mktime(0,0,0, $month, $day, $year);
            $day = date('j', $dateTime);
            $dayofweek = date('w', $dateTime);

            //calc each day's week id
//            $dayNumber = date_format($dateOb, 'z'); // returns 0 - 365
            $thatWeek = 2+ floor( (($dateTime - $week2StartTime)+3600)/(7 * 24 * 3600) );
		  // add leading zeroes
			$thatWeek = sprintf("%02d", $thatWeek);  // should be 01 if 1
		  
              if($rowid == '1' and $day > 24) {
                  $class = ' last-month';
              } elseif ($rowid > 3 and $day < 7) {
                  $class = ' next-month';
              } else {
                  $class = ' this-month';
              }
          
                // if current week, add highlight class
              if(($dateTime >= ($weekStartTime - 3600)) && ($dateTime <= $weekEndTime)) {
                  $class .= " current-week";
              }
            if($id == $todaysId) {
                $class .= ' is-today';
            }
              
              ?>
          <td id="<?php print $cell['id']; ?>" class="<?php print $cell['class']; print $class; ?>">
              <div class="month mini-day-on  <?php print $id . ' weekday-' . $dayofweek;  ?>">
                <a href=" <?php print $prelinks ; print $simpleDate;  ?>"><?php print $day;  ?></a>
              </div>
          </td>
          
        <?php endforeach; ?>
      </tr>
      
    <?php endforeach; ?>
  </tbody>
</table>
</div></div>