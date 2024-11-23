<?php
/**
 * The template for displaying search results pages
 *
 * @package Work_Encyclopedia
 */

get_header();
?>

<main id="primary" class="site-main">
    <?php if (have_posts()) : ?>
        <header class="page-header">
            <h1 class="page-title">
                <?php
                printf(
                    /* translators: %s: search query. */
                    esc_html__('Search Results for: %s', 'work-encyclopedia'),
                    '<span>' . get_search_query() . '</span>'
                );
                ?>
            </h1>
        </header>

        <?php
        while (have_posts()) :
            the_post();
            get_template_part('template-parts/content', 'search');
        endwhile;

        the_posts_navigation();
    else :
        get_template_part('template-parts/content', 'none');
    endif;
    ?>
</main>

<?php
get_footer();