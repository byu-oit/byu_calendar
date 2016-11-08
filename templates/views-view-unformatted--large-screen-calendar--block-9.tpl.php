<?php

/**
 * @file
 * Default simple view template to display a list of rows.
 *
 * @ingroup views_templates
 */
?>
<?php if (!empty($title)): ?>

<?php
$current = current_path();
$currentDate = substr($current, -10);

if (preg_match("/^(19|20)\d\d[-](0[1-9]|1[012])[-](0[1-9]|[12][0-9]|3[01])$/", $currentDate)) {
	// is normal
} else {
    $currentDate = date("Y-m-d");
}
$year = substr($currentDate, 0, 4);
$mid = substr($currentDate, -5, 2);
$did = substr($currentDate, -2);



$titleFormatted = date("j |  l, F Y", mktime(0, 0, 0, $mid, $did, $year));


?>

  <h3><?php print $titleFormatted; ?></h3>
<?php endif; ?>
<?php foreach ($rows as $id => $row): ?>
  <div<?php if ($classes_array[$id]) { print ' class="' . $classes_array[$id] .'"';  } ?>>
    <?php print $row; ?>
  </div>
<?php endforeach; ?>
