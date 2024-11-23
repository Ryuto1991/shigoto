<?php
/**
 * Theme functions and definitions
 *
 * @package Work_Encyclopedia
 */

if (!defined('_S_VERSION')) {
    define('_S_VERSION', '1.0.0');
}

/**
 * Sets up theme defaults and registers support for various WordPress features.
 */
function work_encyclopedia_setup() {
    // Add default posts and comments RSS feed links to head.
    add_theme_support('automatic-feed-links');

    // Let WordPress manage the document title.
    add_theme_support('title-tag');

    // Enable support for Post Thumbnails on posts and pages.
    add_theme_support('post-thumbnails');

    // Register navigation menus
    register_nav_menus(array(
        'primary' => esc_html__('Primary Menu', 'work-encyclopedia'),
        'footer' => esc_html__('Footer Menu', 'work-encyclopedia'),
    ));

    // Add theme support for selective refresh for widgets.
    add_theme_support('customize-selective-refresh-widgets');

    // Add support for core custom logo.
    add_theme_support('custom-logo', array(
        'height' => 250,
        'width' => 250,
        'flex-width' => true,
        'flex-height' => true,
    ));

    // Add support for full and wide align images.
    add_theme_support('align-wide');

    // Add support for responsive embeds.
    add_theme_support('responsive-embeds');
}
add_action('after_setup_theme', 'work_encyclopedia_setup');

/**
 * Enqueue scripts and styles.
 */
function work_encyclopedia_scripts() {
    wp_enqueue_style('work-encyclopedia-style', get_stylesheet_uri(), array(), _S_VERSION);
    
    if (is_singular() && comments_open() && get_option('thread_comments')) {
        wp_enqueue_script('comment-reply');
    }
}
add_action('wp_enqueue_scripts', 'work_encyclopedia_scripts');

/**
 * Custom template tags for this theme.
 */
require get_template_directory() . '/inc/template-tags.php';