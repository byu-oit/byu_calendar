<?php
/**
 * @file
 * Template to display a column
 * 
 * - $item: The item to render within a td element.
 */
$id = (isset($item['id'])) ? 'id="' . $item['id'] . '" ' : '';
$date = (isset($item['date'])) ? ' data-date="' . $item['date'] . '" ' : '';
$day = (isset($item['day_of_month'])) ? ' data-day-of-month="' . $item['day_of_month'] . '" ' : '';
$headers = (isset($item['header_id'])) ? ' headers="'. $item['header_id'] .'" ' : '';
?>
<td <?php print $id?>class="<?php print $item['class'] ?>" colspan="<?php print $item['colspan'] ?>" rowspan="<?php print $item['rowspan'] ?>"<?php print $date . $headers . $day; ?>>
  <div class="inner">
    <?php print $item['entry'] ?>
  </div>
<!--    <div class="link-to-day-box">-->
<!--    --><?php
    $id = $item['id'];
    $idEnd = substr($id, -8);
    if ($idEnd !== 'date-box') {
      $current = current_path();
      $currentDate = substr($current, -7);
      $year = substr($currentDate, 0,4);

      if (preg_match("/^(19|20)\d\d$/", $year)) {
        // date arg exists / is normal, no change
        $prelinks = '../day/';
      } else {
        $prelinks = '../calendar/day/';
      }
      // if date is in url

      // else if this is month from menu, without date argument in url

        echo '</div><div class="link-to-day"><a href="' . $prelinks . $item['date'] . '">SEE MORE ></a></div>';
    }
    ?>
<!--    </div>-->
</td>

