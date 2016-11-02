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
    <?php
    $id = $item['id'];
    $idEnd = substr($id, -8);
    if ($idEnd == 'date-box') {
    echo "<div>is a datebox</div>";
} else {
        echo '<div class="link-to-day"><a href="../day/' . $item['date'] . '">See More ></a></div>';
    }
    
    
    ?>
    
</td>
