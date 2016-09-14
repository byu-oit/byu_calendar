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
<div class="calendar-calendar animated fadeInLeft"><div class="month-view">
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
$currentDate = substr($current, -8);  // 2016-W33

$week = substr($currentDate, -2);
//$week = $week-2;  // calendar uses the week id of the week before

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
//      $dayBeforeStart = $weekStartTime
//      echo $weekStartTime;
$weekEndTime = $weekStartTime + (6*24*3600);

      
     
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
              $simpleDate = substr($id,-10);
              
              $year = substr($simpleDate, 0, 4);
              $month = substr($simpleDate, 5, 2);
              $day = substr($simpleDate, 8, 2);
              $dateTime = mktime(0,0,0, $month, $day, $year);
              $day = date('j', $dateTime);
              $dayofweek = date('w', $dateTime);


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
//              if($week == $currentWeek) {
//                  $class .= " current-week";
//              }
          
              
              ?>
          <td id="<?php print $cell['id']; ?>" class="<?php print $cell['class']; print $class; ?>">
              <div class="month mini-day-on  <?php print $dateTime . " " . $id . ' weekday-' . $dayofweek;  ?>">
                <a href="../week/<?php print $year . '-W' . $week;  ?>"><?php print $day;  ?></a>
              </div>
          </td>
          
        <?php endforeach; ?>
      </tr>
      
    <?php endforeach; ?>
  </tbody>
</table>
</div></div>