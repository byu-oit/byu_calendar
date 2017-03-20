<?php

/**
 * Implements template_preprocess_html().
 *
 */
function byu_calendar_preprocess_html(&$variables) {
//  // Add conditional CSS for IE. To use uncomment below and add IE css file
//  drupal_add_css(path_to_theme() . '/css/ie.css', array('weight' => CSS_THEME, 'browsers' => array('!IE' => FALSE), 'preprocess' => FALSE));
// drupal_add_css('http://ajax.googleapis.com/ajax/libs/angular_material/1.1.0-rc2/angular-material.min.css', array('weight' => CSS_THEME, 'browsers' => array('!IE' => FALSE), 'preprocess' => FALSE));
//  // Need legacy support for IE downgrade to Foundation 2 or use JS file below
//  // drupal_add_js('http://ie7-js.googlecode.com/svn/version/2.1(beta4)/IE7.js', 'external');
  drupal_add_css('//cloud.typography.com/75214/6517752/css/fonts.css', array('type' => 'external'));
  drupal_add_js('//cdn.byu.edu/2017-core-components/latest/components.js', 'external');
	
	
    // Populate the body classes.
  if ($suggestions = theme_get_suggestions(arg(), 'page', '-')) {
    foreach ($suggestions as $suggestion) {
      if ($suggestion != 'page-front') {
        // Add current suggestion to page classes to make it possible to theme
        // the page depending on the current page type (e.g. node, admin, user,
        // etc.) as well as more specific data like node-12 or node-edit.
        $variables['classes_array'][] = drupal_html_class($suggestion);
      }
    }
  }

  // If on an individual node page, add the node type to body classes.
  if ($node = menu_get_object()) {
    $vars['classes_array'][] = drupal_html_class('node-type-' . $node->type);
  }

    if ($variables['user']) {
        $numRoles = 0;
        foreach($variables['user']->roles as $key => $role){
          $role_class = 'role-' . drupal_clean_css_identifier($role);
          $variables['classes_array'][] = $role_class;
            $numRoles++;
        }
        $numRolesClass = 'number-of-roles-' . $numRoles;
        $variables['classes_array'][] = $numRolesClass;
    }


    
    
}

/**
 * Implements template_preprocess_page
 *
 */
function byu_calendar_preprocess_page(&$variables) {

 // Convenience variables
  if (!empty($variables['page']['sidebar_first'])){
    $left = $variables['page']['sidebar_first'];
  }

  if (!empty($variables['page']['sidebar_second'])) {
    $right = $variables['page']['sidebar_second'];
  }

  // Dynamic sidebars
  if (!empty($left) && !empty($right)) {  //both sidebars
    $variables['main_grid'] = 'large-6 push-3';
    $variables['sidebar_first_grid'] = 'large-2 pull-6';
    $variables['sidebar_sec_grid'] = 'large-3';
  } elseif (empty($left) && !empty($right)) { //only right sidebar
    $variables['main_grid'] = 'large-9';
    $variables['sidebar_first_grid'] = '';
    $variables['sidebar_sec_grid'] = 'large-3';
  } elseif (!empty($left) && empty($right)) { // only left sidebar
    $variables['main_grid'] = 'large-9 large-push-0 push-3';
    $variables['sidebar_first_grid'] = 'large-2 pull-9 left-sidebar-only thin-left-sidebar';
    $variables['sidebar_sec_grid'] = '';
  } else {  //no sidebars
    $variables['main_grid'] = 'large-12';
    $variables['sidebar_first_grid'] = '';
    $variables['sidebar_sec_grid'] = '';
  }
	/* search box variable was removed from D7, adding it back in to use in page.tpl.php */
	$search_box = drupal_render(drupal_get_form('search_form'));
  	$variables['search_box'] = $search_box;
	
}

/**
 * Implements template_preprocess_node
 *
 */
//function byu_calendar_preprocess_node(&$variables) {
//}

/**
 * Implements hook_preprocess_block()
 */
//function byu_calendar_preprocess_block(&$variables) {
//  // Add wrapping div with global class to all block content sections.
//  $variables['content_attributes_array']['class'][] = 'block-content';
//
//  // Convenience variable for classes based on block ID
//  $block_id = $variables['block']->module . '-' . $variables['block']->delta;
//
//  // Add classes based on a specific block
//  switch ($block_id) {
//    // System Navigation block
//    case 'system-navigation':
//      // Custom class for entire block
//      $variables['classes_array'][] = 'system-nav';
//      // Custom class for block title
//      $variables['title_attributes_array']['class'][] = 'system-nav-title';
//      // Wrapping div with custom class for block content
//      $variables['content_attributes_array']['class'] = 'system-nav-content';
//      break;
//
//    // User Login block
//    case 'user-login':
//      // Hide title
//      $variables['title_attributes_array']['class'][] = 'element-invisible';
//      break;
//
//    // Example of adding Foundation classes
//    case 'block-foo': // Target the block ID
//      // Set grid column or mobile classes or anything else you want.
//      $variables['classes_array'][] = 'six columns';
//      break;
//  }
//
//  // Add template suggestions for blocks from specific modules.
//  switch($variables['elements']['#block']->module) {
//    case 'menu':
//      $variables['theme_hook_suggestions'][] = 'block__nav';
//    break;
//  }
//}

//function byu_calendar_preprocess_views_view(&$variables) {
//}

/**
 * Implements template_preprocess_panels_pane().
 *
 */
//function byu_calendar_preprocess_panels_pane(&$variables) {
//}

/**
 * Implements template_preprocess_views_views_fields().
 *
 */
//function byu_calendar_preprocess_views_view_fields(&$variables) {
//}

/**
 * Implements theme_form_element_label()
 * Use foundation tooltips
 */
//function byu_calendar_form_element_label($variables) {
//  if (!empty($variables['element']['#title'])) {
//    $variables['element']['#title'] = '<span class="secondary label">' . $variables['element']['#title'] . '</span>';
//  }
//  if (!empty($variables['element']['#description'])) {
//    $variables['element']['#description'] = ' <span data-tooltip="top" class="has-tip tip-top" data-width="250" title="' . $variables['element']['#description'] . '">' . t('?') . '</span>';
//  }
//  return theme_form_element_label($variables);
//}

/**
 * Implements hook_preprocess_button().
 */
//function byu_calendar_preprocess_button(&$variables) {
//  $variables['element']['#attributes']['class'][] = 'button';
//  if (isset($variables['element']['#parents'][0]) && $variables['element']['#parents'][0] == 'submit') {
//    $variables['element']['#attributes']['class'][] = 'secondary';
//  }
//}

/**
 * Implements hook_form_alter()
 * Example of using foundation sexy buttons
 */
//function byu_calendar_form_alter(&$form, &$form_state, $form_id) {
//  // Sexy submit buttons
//  if (!empty($form['actions']) && !empty($form['actions']['submit'])) {
//    $classes = (is_array($form['actions']['submit']['#attributes']['class']))
//      ? $form['actions']['submit']['#attributes']['class']
//      : array();
//    $classes = array_merge($classes, array('secondary', 'button', 'radius'));
//    $form['actions']['submit']['#attributes']['class'] = $classes;
//  }
//}

/**
 * Implements hook_form_FORM_ID_alter()
 * Example of using foundation sexy buttons on comment form
 */
//function byu_calendar_form_comment_form_alter(&$form, &$form_state) {
  // Sexy preview buttons
//  $classes = (is_array($form['actions']['preview']['#attributes']['class']))
//    ? $form['actions']['preview']['#attributes']['class']
//    : array();
//  $classes = array_merge($classes, array('secondary', 'button', 'radius'));
//  $form['actions']['preview']['#attributes']['class'] = $classes;
//}


/**
 * Implements template_preprocess_panels_pane().
 */
// function zurb_foundation_preprocess_panels_pane(&$variables) {
// }

/**
* Implements template_preprocess_views_views_fields().
*/
/* Delete me to enable
function THEMENAME_preprocess_views_view_fields(&$variables) {
 if ($variables['view']->name == 'nodequeue_1') {

   // Check if we have both an image and a summary
   if (isset($variables['fields']['field_image'])) {

     // If a combined field has been created, unset it and just show image
     if (isset($variables['fields']['nothing'])) {
       unset($variables['fields']['nothing']);
     }

   } elseif (isset($variables['fields']['title'])) {
     unset ($variables['fields']['title']);
   }

   // Always unset the separate summary if set
   if (isset($variables['fields']['field_summary'])) {
     unset($variables['fields']['field_summary']);
   }
 }
}

// */

/**
 * Implements hook_css_alter().
 */
//function byu_calendar_css_alter(&$css) {
//  // Always remove base theme CSS.
//  $theme_path = drupal_get_path('theme', 'zurb_foundation');
//
//  foreach($css as $path => $values) {
//    if(strpos($path, $theme_path) === 0) {
//      unset($css[$path]);
//    }
//  }
//}

/**
 * Implements hook_js_alter().
 */
//function byu_calendar_js_alter(&$js) {
//  // Always remove base theme JS.
//  $theme_path = drupal_get_path('theme', 'zurb_foundation');
//
//  foreach($js as $path => $values) {
//    if(strpos($path, $theme_path) === 0) {
//      unset($js[$path]);
//    }
//  }
//}


function byu_calendar_date_nav_title($params) {
  $granularity = $params['granularity'];
  $view = $params['view'];
  $date_info = $view->date_info;
  $link = !empty($params['link']) ? $params['link'] : FALSE;
  $format = !empty($params['format']) ? $params['format'] : NULL;
  switch ($granularity) {
    case 'year':
      $title = $date_info->year;
      $date_arg = $date_info->year;
      break;
    case 'month':
      $format = !empty($format) ? $format : (empty($date_info->mini) ? 'F Y' : 'F Y');
      $title = date_format_date($date_info->min_date, 'custom', $format);
      $date_arg = $date_info->year .'-'. date_pad($date_info->month);
      break;
    case 'day':
      $format = !empty($format) ? $format : (empty($date_info->mini) ? 'l, F j Y' : 'l, F j');
      $title = date_format_date($date_info->min_date, 'custom', $format);
      $date_arg = $date_info->year .'-'. date_pad($date_info->month) .'-'. date_pad($date_info->day);
      break;
    case 'week':
        $format = !empty($format) ? $format : (empty($date_info->mini) ? 'F j Y' : 'F j');
      $title = t('Week of @date', array('@date' => date_format_date($date_info->min_date, 'custom', $format)));
        $date_arg = $date_info->year .'-W'. date_pad($date_info->week);
        break;
  }
  if (!empty($date_info->mini) || $link) {
      // Month navigation titles are used as links in the mini view.
    $attributes = array('title' => t('View full page month'));
      $url = date_pager_url($view, $granularity, $date_arg, TRUE);
    return l($title, $url, array('attributes' => $attributes));
  }
  else {
    return $title;
  }  
}


// fxn to replace commas with plus signs in the argument/contextual filter for subscribe category feeds
/**
* @implements hook_views_pre_view().
Parameters:
$view: The view object about to be processed.

$display_id: The machine name of the active display.

$args: An array of arguments passed into the view.
*/
function byu_calendar_views_pre_view(&$view, &$display_id, &$args){

	$feed_view_name = 'category_page_blocks';
	$feed_view_display = 'feed_1';
	
	// Check that we are altering the correct view based on $display_id
	if ($view->name == feed_view_name && $display_id == $feed_view_display) {
		
		// Load any nodes or data you might need.
		// loop through array of arguments
//		$newArgs = [];
		foreach($args as $item) {
			$newItem = str_replace(",", "+" , $item);
			// to know what's in $item
			$item = str_replace(",", "+", $item);
//			echo '<pre>'; 
//			var_dump($item);
//			$newArgs[] = $newItem;
			
//			$headertext = 'arg is ' . $item;
		}
		
//		 $header_options = array(
//			'label' => t('Header testing on ical feed'), // Administrative label. Not really needed here.
//			'content' => $headertext, // Content of header text.
//			'format' => 'filtered_html', // Format of header text
//			'empty' => 1, // Show even when there are no results. Set to zero otherwise.
//		  );
//		  $view->add_item('default', 'header', 'views', 'area', $header_options);
		
//		$args = array_map(function($val) { return str_replace(",", "+", $val); }, $args);
//		$args = array_map(function($val) { return $val+6; }, $args);
//		print_r($args);
		
		// Then finally populate the $args array.
//		$args[] = NEW_FILTER_VALUE;
	}
}