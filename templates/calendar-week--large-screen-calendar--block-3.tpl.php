<?php
/**
 * @file
 * Template to display a view as a calendar week.
 * 
 * @see template_preprocess_calendar_week.
 *
 * $day_names: An array of the day of week names for the table header.
 * $rows: The rendered data for this week.
 * 
 * For each day of the week, you have:
 * $rows['date'] - the date for this day, formatted as YYYY-MM-DD.
 * $rows['datebox'] - the formatted datebox for this day.
 * $rows['empty'] - empty text for this day, if no items were found.
 * $rows['all_day'] - an array of formatted all day items.
 * $rows['items'] - an array of timed items for the day.
 * $rows['items'][$time_period]['hour'] - the formatted hour for a time period.
 * $rows['items'][$time_period]['ampm'] - the formatted ampm value, if any for a time period.
 * $rows['items'][$time_period]['values'] - An array of formatted items for a time period.
 * 
 * $view: The view.
 * $min_date_formatted: The minimum date for this calendar in the format YYYY-MM-DD HH:MM:SS.
 * $max_date_formatted: The maximum date for this calendar in the format YYYY-MM-DD HH:MM:SS.
 * 
 */
//dsm('Display: '. $display_type .': '. $min_date_formatted .' to '. $max_date_formatted);
//dsm($rows);
//dsm($items);
$index = 0;
$header_ids = array();
foreach ($day_names as $key => $value) {
  $header_ids[$key] = $value['header_id'];
}
?>
<div class="calendar-calendar"><div class="week-view">
<table class="full">
  <thead>
    <tr>
      <?php if($by_hour_count > 0 || !empty($start_times)) :?>
      <th class="calendar-agenda-hour"><?php print t('Time')?></th>
      <?php endif;?>
      <?php foreach ($day_names as $cell): ?>
        <th class="<?php print $cell['class']; ?>" id="<?php print $cell['header_id']; ?>">
          <?php print $cell['data']; ?>
        </th>
      <?php endforeach; ?>
    </tr>
  </thead>
  <tbody>
    <?php for ($i = 0; $i < $multiday_rows; $i++): ?>
    <?php 
      $colpos = 0; 
      $rowclass = "all-day";
      if( $i == 0) {
        $rowclass .= " first";
      }
      if( $i == $multiday_rows - 1) {
        $rowclass .= " last";
      }
    ?>
    <tr class="<?php print $rowclass?>">
     
  
    <?php endfor; ?>  
	<?php $numItems = sizeof($items);
        //print $numItems;
      ?>
	   <?php if($numItems > 0) :?>
    <?php foreach ($items as $time): ?>
    <tr class="not-all-day and-all-day">
      
        
        <?php 
        $current = current_path();
        //$current = 'askldjasldfkjasldf/calendar/week/2016-W33';
        $currentDate = substr($current, -8);  // 2016-W33

        $weekCheck = substr($current, -3,1);
        if($weekCheck == 'W') {
            // is normal
        } else if ($weekCheck == 'w') {
            $currentDate = substr($current, -8,5) . 'W' . substr($currentDate,-2);
        } else {
            // get current date, calc week id
            $today = date ("Y-m-d");
            $dayNumber = date ("z");
            $year = date("Y");
            $timeNow = time();

            $startWYear = '1 January ' . $year;
            $yearStartTime = strtotime($startWYear);
            $todaysTime = $yearStartTime + ($dayNumber * 24 * 3600);

            $yearStartWeekday = date('w', $yearStartTime);
            //echo $year . ' started on a ' . $yearStartWeekday;
            $weekStartJanDay = 7 - $yearStartWeekday;
            $week2StartTime = $yearStartTime + ($weekStartJanDay*24*3600); 
            $week = 2+ floor(($todaysTime - $week2StartTime)/(7 * 24 * 3600));
			// add leading zeroes
			$week = sprintf("%02d", $week);  // should be 01 if 1
            $currentDate = $year . '-W' . $week;
			
			// add leading zeroes
			$week = sprintf("%02d", $week);  // should be 01 if 1

        }
        
        
        
//        $dateOb = date_create_from_format('Y-W', $currentDate);
        $year = substr($currentDate, 0, 4);
        $lastYear = $year -1;
        $nextYear = $year +1;

        $week = substr($currentDate, -2);
		// add leading zeroes
		$week = sprintf("%02d", $week);  // should be 01 if 1
		
        $startWYear = '1 January ' . $year;
        //this week start time
        $yearStartTime = strtotime($startWYear);
		$yearStartWeekday = date('w', $yearStartTime);
        //echo $year . ' started on a ' . $yearStartWeekday;
        //echo '<br>';
        // week 2 started on Jan 
        $weekStartJanDay = 7 - $yearStartWeekday;
        $week2StartTime = $yearStartTime + ($weekStartJanDay*24*3600); 
        $weeksToAdd = $week - 2;
        $weekStartTime = $week2StartTime + ((7*($weeksToAdd)))*24*3600;
        $weekEndTime = $weekStartTime + (6*24*3600);



        //put $lastWeekTime into yyyy-mm--dd format
        $weekStart = date('Y-m-d', $weekStartTime);
        $weekEnd = date('Y-m-d', $weekEndTime);
        //echo $weekStart . ' through ' . $weekEnd;
        
        
        
        ?>
        
      <?php $curpos = 0; ?>
      <?php foreach ($columns as $index => $column): ?>
        <?php $colpos = (isset($time['values'][$column][0])) ? $time['values'][$column][0]['wday'] : $index; ?>
        <?php for ($i = $curpos; $i < $colpos; $i++): ?>
        

        <td class="calendar-agenda-items single-day all-day-items">
          <div class="calendar">
            <div class="inner">&nbsp</div>
          </div>
        </td>
        <?php endfor; ?>   
        <?php $curpos = $colpos + 1;?>  <!-- curpos goes through 1 - 7 for weekdays  -->

        <td class="calendar-agenda-items single-day" headers="<?php print $header_ids[$index] ?>">        <?php
                $weekday = $curpos;  
                $daystoadd = $weekday -1;
                $daytodisplay = $weekStartTime + ($daystoadd *24*3600); // gets the unix day of current day
                $simpleDate = date('Y-m-d', $daytodisplay);
                $classicDate = date('F j, Y', $daytodisplay);
            echo "<div><a name='" . $simpleDate . "'></a></div>" ; 
        ?>
            <div class="weekview-day-header">
                <?php
                
                $date = date_create($simpleDate); // creates date object
                $day = date_format($date, 'j') ;
                $weekday = date_format($date, 'l') ;
                $monthyear = date_format($date, 'F Y') ;
                echo "<a name='" . $simpleDate . "'></a>" . 
                    
                    "<div class='list-header'>" .
                    "<div class='list-header-week'>" . $weekday . "</div>" .
                    "<div class='list-header-fulldate'>" . $classicDate . "</div>" .
                "</div>" ;

                ?>
            </div>
              
            <div class="calendar-items-container"> 
                <div class="calendar weekview all-day-items">
                    <?php 
                        //print "current pos is " . $curpos; 
                        $j = $curpos -1; //convert id's to 0 - 6 for weekdays
						$all_day_items = $all_day[$j];
						for ($a = 0; $a < sizeof($all_day_items); $a++) {
							print_r($all_day[$j][$a]['entry']);
						}
//                        print_r($all_day[$j][0]['entry']);

					
                    ?>
                </div>  
                <?php if(!empty($time['values'][$column])) :?>
                    <?php foreach($time['values'][$column] as $item) :?>
                    <div class="calendar calendar-item">
                        <div class="inner">
                            <?php print $item['entry'] ?>
                        </div>
                    </div>
                    <?php endforeach; ?>
                <?php else: ?>
                    <?php if(empty($all_day[$j][0]['entry'])): ?>
               
				<!-- no events -->
                    <div class="empty-text">
                        <p>No events.</p>
                    </div>
                    <?php endif; ?>
                <?php endif; ?>
        </div>
   
    </td>
      <?php endforeach; ?>   
		
		
      <?php for ($i = $curpos; $i < 7; $i++): ?>
        <td class="calendar-agenda-items single-day">
          <div class="calendar">
            <div class="inner">&nbsp</div>
          </div>
        </td>
      <?php endfor; ?>   
    </tr>
   <?php endforeach; ?>   
	
<?php else: ?>
      <!--  no week results -->
		<div class="empty-text">
			<p>No events.</p>
		</div>
	  
<?php endif; ?>	  
	  
	  
  </tbody>
</table>
</div></div>
