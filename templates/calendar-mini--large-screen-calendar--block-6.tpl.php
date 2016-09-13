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
              $date = mktime(0,0,0, $month, $day, $year);
              $day = date('j', $date);
              $dayofweek = date('w', $date);
              $week = date('W',$date);
              if($dayofweek > 0) { // adjust for sunday, have its id go with week after it, not week before
                  $week = $week+1;
              }
              else {
//                  $week = $week -1;
              }
              if($rowid == '1' and $day > 24) {
                  $class = ' last-month';
              } elseif ($rowid > 3 and $day < 7) {
                  $class = ' next-month';
              } else {
                  $class = ' this-month';
              }
                // if current week, add highlight class
              $current = current_path();
              $currentWeek = substr($current, -2);
              if($week == $currentWeek) {
                  $class .= " current-week";
              }
          
              
              ?>
          <td id="<?php print $cell['id']; ?>" class="<?php print $cell['class']; print $class; ?>">
              <div class="month mini-day-on  <?php print $id . ' weekday-' . $dayofweek;  ?>">
                <a href="../week/<?php print $year . '-W' . $week;  ?>"><?php print $day;  ?></a>
              </div>
          </td>
          
        <?php endforeach; ?>
      </tr>
      
    <?php endforeach; ?>
  </tbody>
</table>
</div></div>